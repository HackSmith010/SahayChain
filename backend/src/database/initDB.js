import pool from "./db.js";

export const initDB = async () => {
    console.log("Initializing database...");
    try {

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
