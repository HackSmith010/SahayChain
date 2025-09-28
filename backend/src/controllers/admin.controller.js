import pool from "../database/db.js";
import { supabase } from "../utils/supabaseClient.utils.js";

export const getPendingInstitutions = async (req, res) => {
    try {
        const sql = `
            SELECT u.id as user_id, u.name, i.id as institution_id, i.reg_number, i.verification_status
            FROM users u
            JOIN institutions i ON u.id = i.user_id
            WHERE i.verification_status = 'pending';
        `;
        const { rows } = await pool.query(sql);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching pending institutions",
            error: error.message,
        });
    }
};

export const verifyInstitution = async (req, res) => {
    try {
        const { institutionId } = req.params;
        const { newStatus } = req.body;

        if (!["approved", "rejected"].includes(newStatus)) {
            return res
                .status(400)
                .json({ message: "Invalid status provided." });
        }

        const institutionSql = `
            UPDATE institutions SET verification_status = $1 WHERE id = $2 RETURNING *;
        `;
        const { rows: updatedInstitutions } = await pool.query(institutionSql, [
            newStatus,
            institutionId,
        ]);

        if (updatedInstitutions.length === 0) {
            return res.status(404).json({ message: "Institution not found." });
        }

        if (newStatus === "approved") {
            const userSql = `UPDATE users SET is_verified = TRUE WHERE id = $1;`;
            await pool.query(userSql, [updatedInstitutions[0].user_id]);
        }

        res.status(200).json({
            message: `Institution status updated to ${newStatus}.`,
            institution: updatedInstitutions[0],
        });
    } catch (error) {
        res.status(500).json({
            message: "Error verifying institution",
            error: error.message,
        });
    }
};

export const getPendingSuppliers = async (req, res) => {
    try {
        const sql = `
            SELECT u.id as user_id, u.name, s.id as supplier_id, s.gstin, s.is_verified
            FROM users u
            JOIN suppliers s ON u.id = s.user_id
            WHERE s.is_verified = FALSE;
        `;
        const { rows } = await pool.query(sql);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching pending suppliers",
            error: error.message,
        });
    }
};

export const verifySupplier = async (req, res) => {
    try {
        const { supplierId } = req.params;
        const { is_verified } = req.body;

        if (typeof is_verified !== "boolean") {
            return res.status(400).json({
                message: "Invalid status provided. Must be true or false.",
            });
        }

        const supplierSql = `
            UPDATE suppliers SET is_verified = $1 WHERE id = $2 RETURNING *;
        `;
        const { rows: updatedSuppliers } = await pool.query(supplierSql, [
            is_verified,
            supplierId,
        ]);

        if (updatedSuppliers.length === 0) {
            return res.status(404).json({ message: "Supplier not found." });
        }

        if (is_verified) {
            const userSql = `UPDATE users SET is_verified = TRUE WHERE id = $1;`;
            await pool.query(userSql, [updatedSuppliers[0].user_id]);
        }

        res.status(200).json({
            message: `Supplier verification status updated.`,
            supplier: updatedSuppliers[0],
        });
    } catch (error) {
        res.status(500).json({
            message: "Error verifying supplier",
            error: error.message,
        });
    }
};

export const manuallyConfirmUser = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }
        const {
            data: { user },
            error,
        } = await supabase.auth.admin.updateUserById(userId, {
            email_confirm: true,
        });
        if (error) throw error;
        res.status(200).json({ message: "User confirmed successfully!", user });
    } catch (error) {
        res.status(500).json({
            message: "Error confirming user",
            error: error.message,
        });
    }
};

export const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { newRole } = req.body;
        if (!newRole) {
            return res
                .status(400)
                .json({ message: "The 'newRole' is required." });
        }

        const {
            data: { user },
            error: getError,
        } = await supabase.auth.admin.getUserById(userId);
        if (getError) throw getError;

        const updatedMetadata = { ...user.user_metadata, role: newRole };

        const {
            data: { updatedUser },
            error: updateError,
        } = await supabase.auth.admin.updateUserById(userId, {
            user_metadata: updatedMetadata,
        });
        if (updateError) throw updateError;

        res.status(200).json({
            message: `User role updated to ${newRole}`,
            user: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating user role",
            error: error.message,
        });
    }
};

export const checkGstinDetails = async (req, res) => {
    try {
        const { gstin } = req.body;
        if (!gstin || gstin.length !== 15) {
            return res
                .status(400)
                .json({ message: "A valid 15-character GSTIN is required." });
        }

        const apiUrl = `https://sheet.gstincheck.co.in/check/${process.env.GSTIN_API_KEY}/${gstin}`;

        const response = await axios.get(apiUrl);

        if (response.data.flag === false) {
            return res
                .status(404)
                .json({
                    message: "GSTIN not found or invalid.",
                    details: response.data,
                });
        }

        res.status(200).json({
            message: "GSTIN details fetched successfully.",
            details: response.data,
        });
    } catch (error) {
        console.error(
            "GSTIN Verification Error:",
            error.response ? error.response.data : error.message
        );
        res.status(500).json({
            message: "An error occurred during GSTIN verification.",
            error: error.response ? error.response.data : error.message,
        });
    }
};
