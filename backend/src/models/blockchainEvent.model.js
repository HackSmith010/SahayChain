import pool from '../database/db.js';

export const createBlockchainEventTable = async () => {
  const blockchainEventsQuery = `
    CREATE TABLE IF NOT EXISTS blockchain_events (
      event_id SERIAL PRIMARY KEY,
      donation_id INT REFERENCES donations(donation_id) ON DELETE CASCADE,
      event_type event_type,
      tx_hash TEXT UNIQUE,
      data_hash TEXT,
      timestamp TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;
  await pool.query(blockchainEventsQuery);
  console.log("--> 'blockchain_events' table setup complete.");
};
