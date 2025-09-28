import pool from '../database/db.js';

export const createSupplierTable = async () => {
  const supplierQuery = `
    CREATE TABLE IF NOT EXISTS suppliers (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
      gstin VARCHAR UNIQUE NOT NULL,
      rating FLOAT DEFAULT 0.0,
      capacity_info TEXT,
      is_verified BOOLEAN DEFAULT FALSE -- <-- ADD THIS LINE
    );
  `;
  await pool.query(supplierQuery);
  console.log("--> 'suppliers' table setup complete.");
};

export const SupplierModel = {
  create: async ({ user_id, gstin }) => {
    const sql = `INSERT INTO suppliers (user_id, gstin) VALUES ($1, $2) RETURNING *;`;
    const { rows } = await pool.query(sql, [user_id, gstin]);
    return rows[0];
  },
};
