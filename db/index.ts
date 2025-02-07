import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { users, projects, tasks } from "@/db/schema";

const client = postgres(process.env.DATABASE_URL!, {
  ssl: { rejectUnauthorized: false },
  connection: {
    family: 4,
  },
});
export const db = drizzle(client, { schema: { users, projects, tasks } });
