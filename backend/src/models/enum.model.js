import pool from "../database/db.js";

export const createEnums = async () => {
  const enumQuery = `
    DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
            CREATE TYPE user_role AS ENUM ('donor', 'institution', 'supplier', 'admin');
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'verification_status') THEN
            CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected');
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'request_status') THEN
            CREATE TYPE request_status AS ENUM ('open', 'fulfilled', 'flagged');
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'donation_status') THEN
            CREATE TYPE donation_status AS ENUM ('created', 'dispatched', 'delivered');
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'doc_status') THEN
            CREATE TYPE doc_status AS ENUM ('pending', 'approved', 'rejected');
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'event_type') THEN
            CREATE TYPE event_type AS ENUM ('CREATED', 'DISPATCHED', 'DELIVERED');
        END IF;
    END
    $$;
  `;
  await pool.query(enumQuery);
  console.log("--> ENUM types created or already existed.");
};