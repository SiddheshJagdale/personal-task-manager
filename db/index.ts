// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";
import { users, projects, tasks } from "@/db/schema"; // Import your tables

// // Initialize PostgreSQL client with SSL (Required for Supabase)
// const client = postgres(process.env.DATABASE_URL!, { ssl: "require" });

// // Initialize Drizzle ORM
// export const db = drizzle(client, {
// schema: { users, projects, tasks },
// });
import { createClient } from "@supabase/supabase-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseSchema = "public";

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// PostgreSQL connection via Supabase
const client = postgres(process.env.DATABASE_URL!, { ssl: "require" });
export const db = drizzle(client, { schema: { users, projects, tasks } });
