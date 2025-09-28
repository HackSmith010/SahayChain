import pool from '../database/db.js';

export const createInstitutionTable = async () => {
  const instituteQuery = `
    CREATE TABLE IF NOT EXISTS institutions (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
      reg_number VARCHAR UNIQUE NOT NULL,
      license_doc_uri TEXT,
      verification_status verification_status DEFAULT 'pending'
    );
  `;
  await pool.query(instituteQuery);
  console.log("--> 'institutions' table setup complete.");
};

export const InstitutionModel = {
  create: async ({ user_id, reg_number }) => {
    const sql = `INSERT INTO institutions (user_id, reg_number) VALUES ($1, $2) RETURNING *;`;
    const { rows } = await pool.query(sql, [user_id, reg_number]);
    return rows[0];
  },
};
