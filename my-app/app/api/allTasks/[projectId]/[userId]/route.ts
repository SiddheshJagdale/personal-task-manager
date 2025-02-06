// app/api/allTasks/[projectId]/[userId]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db/index"; // Assuming db is set up for PostgreSQL or Drizzle ORM
import { eq } from "drizzle-orm"; // For query filtering with Drizzle ORM
import { tasks } from "@/db/schema"; // Assuming tasks schema is defined in your Drizzle ORM setup
import { and } from "drizzle-orm";
export async function GET(
  req: NextRequest,
  context: { params: { projectId: string; userId: string } }
) {
  const { projectId, userId } = await context.params; // Retrieve projectId and userId from URL params

  if (!projectId || !userId) {
    return NextResponse.json(
      { error: "Project ID and User ID are required" },
      { status: 400 }
    );
  }

  try {
    // Fetch tasks associated with the projectId and userId using Drizzle ORM
    const userTasks = await db
      .select()
      .from(tasks)
      .where(and(eq(tasks.userId, userId), eq(tasks.projectId, projectId)));

    return NextResponse.json(userTasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
