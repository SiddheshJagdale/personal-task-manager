import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db/index"; // Assuming db is set up for PostgreSQL or Drizzle ORM
import { eq } from "drizzle-orm"; // For query filtering with Drizzle ORM
import { projects } from "@/db/schema";

export async function GET(
  req: NextRequest,
  context: { params: { userId: string } } // Explicitly type the context parameter
) {
  const { userId } = await context.params; // No `await`

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Fetch projects using Drizzle ORM (adjust as per your ORM setup)
    const userProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.userId, userId));

    return NextResponse.json(userProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
