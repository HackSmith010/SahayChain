import pool from "../database/db.js";

export const createDonorTable = async () => {
  const donorQuery = `
    CREATE TABLE IF NOT EXISTS donors (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
      aadhaar_hash TEXT,
      total_donations INT DEFAULT 0
    );
  `;
  await pool.query(donorQuery);
  console.log("--> 'donors' table setup complete.");
};

export const DonorModel = {
  create: async ({ user_id, aadhaar_hash }) => {
    const sql = `INSERT INTO donors (user_id, aadhaar_hash) VALUES ($1, $2) RETURNING *;`;
    const { rows } = await pool.query(sql, [user_id, aadhaar_hash]);
    return rows[0];
  },
};