import pool from "./db.js";
import { createEnums } from "../models/enum.model.js";
import { createUserTable } from "../models/users.model.js";
import { createDonorTable } from "../models/donor.model.js";
import { createInstitutionTable } from "../models/institute.model.js";    
import { createDonationTable } from "../models/donation.model.js";
import { createBlockchainEventTable } from "../models/blockchainEvent.model.js";
import { createFeedbackTable } from "../models/feedback.model.js";
import { createKycDocTable } from "../models/kycDoc.model.js";
import { createLogisticsTable } from "../models/logistic.model.js";
import { createRequestTable } from "../models/request.model.js";
import { createSupplierTable } from "../models/supplier.model.js";

export const initDB = async () => {
    console.log("Initializing database...");
    try {
        
        await createEnums(pool);
        await createUserTable(pool);
        await createBlockchainEventTable(pool)
        await createDonationTable(pool);
        await createDonorTable(pool);
        await createFeedbackTable(pool);
        await createInstitutionTable(pool);
        await createKycDocTable(pool);
        await createLogisticsTable(pool);
        await createRequestTable(pool);
        await createSupplierTable(pool);

        console.log("✅ Database initialized, all tables created.");
    } catch (err) {
        console.error("❌ Database initialization failed:", err.message);
    }
};

process.on("SIGINT", async () => {
    console.log("Closing database connection...");
    await pool.end();
    process.exit(0);
});

process.on("SIGTERM", async () => {
    console.log("Closing database connection...");
    await pool.end();
    process.exit(0);
});
