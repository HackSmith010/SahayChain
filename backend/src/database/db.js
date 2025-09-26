import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

let pool;

if (!pool) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });
}

async function testConnection() {
  try {
    const client = await pool.connect();
    client.release();
    console.log("✅ Database connection established");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
}

testConnection();

export default pool;
