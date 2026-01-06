import dotenv from "dotenv";
dotenv.config();

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema"; // <-- FIXED

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Supabase
  },
});

export const db = drizzle(pool, { schema });

// Optional test
export async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Database connected:", res.rows[0]);
  } catch (err) {
    console.error("Database connection error:", err);
  }
}
