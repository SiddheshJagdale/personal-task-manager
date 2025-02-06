import { drizzle } from "drizzle-orm/node-postgres";
import { users, projects, tasks } from "@/db/schema"; // Import your tables

// Initialize db with schema
export const db = drizzle(process.env.DATABASE_URL!, {
  schema: { users, projects, tasks },
});
