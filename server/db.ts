import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Check if the DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Create a Postgres.js client
const client = postgres(process.env.DATABASE_URL, { max: 1 });

// Create a Drizzle ORM instance
export const db = drizzle(client);
