import pool from '../database/db.js';

export const createKycDocTable = async () => {
  const kycDocQuery = `
    CREATE TABLE IF NOT EXISTS kyc_docs (
      doc_id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      doc_type VARCHAR,
      s3_uri TEXT NOT NULL, -- This will be a Supabase Storage URL
      doc_hash TEXT,
      status doc_status DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;
  await pool.query(kycDocQuery);
  console.log("--> 'kyc_docs' table setup complete.");
};

export const KycDocModel = {
  create: async ({ user_id, doc_type, s3_uri }) => {
    const sql = `INSERT INTO kyc_docs (user_id, doc_type, s3_uri) VALUES ($1, $2, $3) RETURNING *;`;
    const { rows } = await query(sql, [user_id, doc_type, s3_uri]);
    return rows[0];
  },
};
