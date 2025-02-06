import { NextResponse } from "next/server";
import { db } from "@/db"; // Database connection
import { projects } from "@/db/schema"; // Projects table schema
import { ProjectData } from "@/ReactQuery/types/addProject"; // Project data type
import { eq } from "drizzle-orm"; // Equality operator for filtering

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // Destructure the id directly from params
  const { name, description, status, priority, userId }: ProjectData =
    await req.json(); // Extract data from the request body

  // Validate required fields
  if (!name || !userId) {
    return NextResponse.json(
      { error: "Name and userId are required" },
      { status: 400 }
    );
  }

  try {
    // Perform the update using filter to check project ID and userId
    const updatedProject = await db
      .update(projects)
      .set({ name, description, status, priority })
      .where(eq(projects.id, id)) // Filter by project ID
      // .where(eq(projects.userId, userId)) // Ensure the user is the project owner
      .returning(); // Return the updated project data

    if (updatedProject.length === 0) {
      return NextResponse.json(
        {
          error: "Project not found or you do not have permission to update it",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProject[0], { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
