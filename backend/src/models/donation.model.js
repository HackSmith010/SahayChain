import pool from '../database/db.js';

export const createDonationTable = async () => {
  const donationQuery = `
    CREATE TABLE IF NOT EXISTS donations (
      donation_id SERIAL PRIMARY KEY,
      donor_id INT REFERENCES donors(id) ON DELETE SET NULL,
      request_id INT REFERENCES requests(request_id) ON DELETE CASCADE UNIQUE,
      supplier_id INT REFERENCES suppliers(id) ON DELETE SET NULL,
      status donation_status DEFAULT 'created',
      blockchain_tx TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;
  await pool.query(donationQuery);
  console.log("--> 'donations' table setup complete.");
};

export const DonationModel = {
  create: async ({ donor_id, request_id }) => {
    const sql = `INSERT INTO donations (donor_id, request_id) VALUES ($1, $2) RETURNING *;`;
    const { rows } = await query(sql, [donor_id, request_id]);
    return rows[0];
  }
};
