import pool from "../database/db.js";
import { supabase } from "../utils/supabaseClient.utils.js";

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
    await pool.query(userQuery);
    console.log("--> 'users' table setup complete.");
};

export const UserModel = {
    create: async ({ email, password, name, role, phone }) => {
        const { data: authData, error: authError } =
            await supabase.auth.admin.createUser({
                email,
                password,
                phone,
                user_metadata: { name, role },
            });

        if (authError) {
            throw new Error(`Supabase Auth Error: ${authError.message}`);
        }

        const sql = `
      INSERT INTO users (auth_id, name, email, phone, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
        const { rows } = await pool.query(sql, [
            authData.user.id,
            name,
            email,
            phone,
            role,
        ]);
        return rows[0];
    },
};
