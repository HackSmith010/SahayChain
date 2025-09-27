import pool from '../database/db.js';

export const createLogisticsTable = async () => {
  const logisticsQuery = `
    CREATE TABLE IF NOT EXISTS logistics (
      logistics_id SERIAL PRIMARY KEY,
      donation_id INT REFERENCES donations(donation_id) ON DELETE CASCADE,
      route_json JSONB,
      eta TIMESTAMPTZ,
      tracking_status VARCHAR,
      otp_code VARCHAR
    );
  `;
  await pool.query(logisticsQuery);
  console.log("--> 'logistics' table setup complete.");
};

