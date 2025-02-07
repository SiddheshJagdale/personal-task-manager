import { NextResponse } from "next/server";
import { db } from "@/db"; // Database connection
import { users } from "@/db/schema"; // Users table schema
import { eq } from "drizzle-orm"; // Equality operator for filtering

export async function PUT(
  req: Request,
  context: { params: Promise<{ userId: string }> }
) {
  // Destructure the userId from context params
  const { userId } = await context.params;

  // Parse incoming request data
  const { name, email, profileImage } = await req.json();

  // Validate required fields
  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  try {
    // Perform the update query using Drizzle ORM
    const updatedUser = await db
      .update(users)
      .set({ name, email, profileImage: profileImage || null })
      .where(eq(users.id, userId)) // Filter by userId
      .returning(); // Return the updated user data

    // Handle case when the user is not found
    if (updatedUser.length === 0) {
      return NextResponse.json(
        { error: "User not found or you do not have permission to update it" },
        { status: 404 }
      );
    }

    // Return the updated user as the response
    return NextResponse.json(updatedUser[0], { status: 200 });
  } catch (error) {
    // Handle any internal errors
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
