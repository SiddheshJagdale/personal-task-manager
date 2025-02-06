// libs/serverAuth.ts

import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions"; // Adjust if necessary
import { db } from "@/db/index"; // Ensure this points to your Drizzle DB configuration
import { users } from "@/db/schema"; // Assuming you have a `users` table defined in your Drizzle schema
import { eq } from "drizzle-orm";

// Server-side authentication helper for App Router with Drizzle ORM
const serverAuth = async () => {
  // Get the session using next-auth
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  // Use Drizzle ORM to find the user by email
  const currentUser = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1)
    .execute();

  if (!currentUser.length) {
    throw new Error("User not found");
  }

  return currentUser[0]; // Return the user data
};

export default serverAuth;
