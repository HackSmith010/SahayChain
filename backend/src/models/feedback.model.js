import pool from '../database/db.js';

export const createFeedbackTable = async () => {
  const feedbackQuery = `
    CREATE TABLE IF NOT EXISTS feedback (
      feedback_id SERIAL PRIMARY KEY,
      donation_id INT REFERENCES donations(donation_id) ON DELETE CASCADE,
      institution_id INT REFERENCES institutions(id) ON DELETE CASCADE,
      rating INT CHECK (rating BETWEEN 1 AND 5),
      comment TEXT,
      sentiment_score FLOAT
    );
  `;
  await pool.query(feedbackQuery);
  console.log("--> 'feedback' table setup complete.");
};