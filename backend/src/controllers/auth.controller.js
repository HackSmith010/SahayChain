import { UserModel } from "../models/user.model.js";
import { DonorModel } from "../models/donor.model.js";
import { InstitutionModel } from "../models/institution.model.js";
import { SupplierModel } from "../models/supplier.model.js";
import { supabase } from "../utils/supabaseClient.utils.js";
import { KycDocModel } from "../models/kycDoc.model.js";
import pool from "../database/db.js";

export const registerUser = async (req, res) => {
    // --- ADD THIS LOG ---
    console.log("Received registration payload:", req.body);

    try {
        const {
            email,
            password,
            name,
            role,
            phone,
            reg_number,
            gstin,
            doc_type,
            s3_uri,
        } = req.body;

        const newUser = await UserModel.create({
            email,
            password,
            name,
            role,
            phone,
        });
        if (!newUser) {
            throw new Error("User creation failed in the model layer.");
        }

        let profile;
        switch (role) {
            case "donor":
                profile = await DonorModel.create({ user_id: newUser.id });
                break;
            case "institution":
                if (!reg_number)
                    throw new Error(
                        "Registration number is required for institutions."
                    );
                profile = await InstitutionModel.create({
                    user_id: newUser.id,
                    reg_number,
                });
                break;
            case "supplier":
                if (!gstin) throw new Error("GSTIN is required for suppliers.");
                profile = await SupplierModel.create({
                    user_id: newUser.id,
                    gstin,
                });
                break;
            default:
                throw new Error("Invalid user role specified.");
        }

        if (
            (role === "institution" || role === "supplier") &&
            doc_type &&
            s3_uri
        ) {
            await KycDocModel.create({ user_id: newUser.id, doc_type, s3_uri });
        }

        res.status(201).json({
            message:
                "User registered successfully! Please check your email to verify your account before logging in.",
            user: { id: newUser.id, email: newUser.email },
            profile,
        });
    } catch (error) {
        console.error("Registration Error:", error.message);
        res.status(500).json({
            message: "Error registering user",
            error: error.message,
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { data: authData, error: authError } =
            await supabase.auth.signInWithPassword({
                email,
                password,
            });

        if (authError) {
            throw authError;
        }

        const userQuery = `SELECT is_verified, role FROM users WHERE email = $1;`;
        const { rows } = await pool.query(userQuery, [email]);
        const userProfile = rows[0];

        if (!userProfile) {
            return res.status(404).json({ message: "User profile not found." });
        }

        if (userProfile.role !== "donor" && !userProfile.is_verified) {
            return res.status(403).json({
                message:
                    "Login failed: Your account is pending admin approval.",
            });
        }
        res.status(200).json({
            message: "Login successful!",
            user: authData.user,
            session: authData.session,
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(401).json({ message: "Login failed", error: error.message });
    }
};

export const uploadKycDocument = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { doc_type, s3_uri } = req.body;

        if (!doc_type || !s3_uri) {
            return res
                .status(400)
                .json({ message: "Document type and URL are required." });
        }

        const newDoc = await KycDocModel.create({
            user_id: userId,
            doc_type,
            s3_uri,
        });

        res.status(201).json({
            message: "Document submitted for verification.",
            document: newDoc,
        });
    } catch (error) {
        console.error("Document Upload Error:", error.message);
        res.status(500).json({
            message: "Error submitting document",
            error: error.message,
        });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const authId = req.user.id;

        const sql = `
            SELECT 
                u.id, u.name, u.email, u.phone, u.role, u.is_verified,
                i.verification_status as institution_status,
                s.is_verified as supplier_status
            FROM users u
            LEFT JOIN institutions i ON u.id = i.user_id
            LEFT JOIN suppliers s ON u.id = s.user_id
            WHERE u.auth_id = $1;
        `;
        const { rows } = await pool.query(sql, [authId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "User profile not found." });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Get Profile Error:", error.message);
        res.status(500).json({
            message: "Error fetching user profile",
            error: error.message,
        });
    }
};

export const temporaryAdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

        if (email !== ADMIN_EMAIL) {
            return res
                .status(403)
                .json({ message: "This route is for admin use only." });
        }

        const {
            data: { users },
            error: listError,
        } = await supabase.auth.admin.listUsers();
        if (listError) throw new Error("Could not list users from Supabase.");

        const adminUser = users.find((user) => user.email === ADMIN_EMAIL);
        if (!adminUser) {
            throw new Error(`Admin user with email ${ADMIN_EMAIL} not found.`);
        }

        console.log(`Found correct admin user: ${adminUser.email}`);

        await supabase.auth.admin.updateUserById(adminUser.id, {
            email_confirm: true,
        });
        console.log(
            `Admin user ${adminUser.email} has been forcefully confirmed.`
        );

        const { data: signInData, error: signInError } =
            await supabase.auth.signInWithPassword({
                email,
                password,
            });
        if (signInError) throw signInError;

        res.status(200).json({
            message: "Admin login successful (User permanently confirmed)!",
            user: signInData.user,
            session: signInData.session,
        });
    } catch (error) {
        console.error("Admin Login Bypass Error:", error.message);
        res.status(401).json({
            message: "Admin login failed",
            error: error.message,
        });
    }
};
