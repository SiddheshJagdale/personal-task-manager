// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";
// import { users, projects, tasks } from "@/db/schema"; // Import your tables

// // Initialize PostgreSQL client with SSL (Required for Supabase)
// const client = postgres(process.env.DATABASE_URL!, { ssl: "require" });

// // Initialize Drizzle ORM
// export const db = drizzle(client, {
//   schema: { users, projects, tasks },
// });
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { users, projects, tasks } from "@/db/schema";

const client = postgres(process.env.DATABASE_URL!, {
  ssl: { rejectUnauthorized: false }, // Ensure SSL is used
});

export const db = drizzle(client, { schema: { users, projects, tasks } });
