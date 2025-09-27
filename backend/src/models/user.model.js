import pool from "../database/db.js";

export const createUserTable = async () => {
  const userQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      auth_id UUID UNIQUE, -- Reference to the auth.users table
      name VARCHAR,
      email VARCHAR UNIQUE,
      phone VARCHAR,
      role user_role NOT NULL,
      is_verified BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;
  await pool.query(userQuery)
  console.log("--> 'users' table setup complete.");
};