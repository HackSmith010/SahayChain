import pool from '../database/db.js';

export const createRequestTable = async () => {
  const requestQuery = `
    CREATE TABLE IF NOT EXISTS requests (
      request_id SERIAL PRIMARY KEY,
      institution_id INT REFERENCES institutions(id) ON DELETE CASCADE,
      item VARCHAR NOT NULL,
      quantity INT NOT NULL,
      priority VARCHAR DEFAULT 'normal',
      status request_status DEFAULT 'open',
      anomaly_score FLOAT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;
  await pool.query(requestQuery);
  console.log("--> 'requests' table setup complete.");
};

export const RequestModel = {
  create: async ({ institution_id, item, quantity }) => {
    const sql = `INSERT INTO requests (institution_id, item, quantity) VALUES ($1, $2, $3) RETURNING *;`;
    const { rows } = await pool.query(sql, [institution_id, item, quantity]);
    return rows[0];
  },
};
