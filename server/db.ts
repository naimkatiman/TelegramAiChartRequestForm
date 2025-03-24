import { drizzle } from "drizzle-orm/neon-serverless";
import { neon } from "@neondatabase/serverless";

// Check if the DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Create a SQL client
const sql = neon(process.env.DATABASE_URL);

// Create a Drizzle ORM instance
export const db = drizzle(sql);
