import pool from "./db.js";
import { createEnums } from "../models/enum.model.js";
import { createUserTable } from "../models/user.model.js";
import { createDonorTable } from "../models/donor.model.js";
import { createInstitutionTable } from "../models/institution.model.js";
import { createSupplierTable } from "../models/supplier.model.js";
import { createKycDocTable } from "../models/kycDoc.model.js";
import { createRequestTable } from "../models/request.model.js";
import { createDonationTable } from "../models/donation.model.js";
import { createLogisticsTable } from "../models/logistic.model.js";
import { createFeedbackTable } from "../models/feedback.model.js";
import { createBlockchainEventTable } from "../models/blockchainEvent.model.js";

export const initDB = async () => {
    console.log("🚀 Initializing database...");
    try {

        await createEnums();

        await createUserTable();

        await createDonorTable();
        await createInstitutionTable();
        await createSupplierTable();
        await createKycDocTable();

        await createRequestTable();

        await createDonationTable();

        await createLogisticsTable();
        await createFeedbackTable();
        await createBlockchainEventTable();

        console.log("✅ Database initialized, all tables created.");

    } catch (err) {
        console.error("❌ Database initialization failed:", err.message);
    } finally {
        console.log("--> Closing database pool.");
    }
};
