import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index"; // Ensure this points to your Drizzle ORM instance
import { projects, tasks } from "@/db/schema"; // Import projects and tasks table schema
import { eq } from "drizzle-orm";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    // Step 1: Delete tasks related to the project
    await db.delete(tasks).where(eq(tasks.projectId, id));

    // Step 2: Delete the project
    await db.delete(projects).where(eq(projects.id, id));

    return NextResponse.json(
      { message: "Project and its associated tasks deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project and its tasks" },
      { status: 500 }
    );
  }
}
