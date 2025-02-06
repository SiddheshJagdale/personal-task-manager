import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index"; // Ensure this points to your Drizzle ORM instance
import { projects } from "@/db/schema"; // Import projects table schema
import { eq } from "drizzle-orm";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = await params.id;

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    // Delete project from DB
    await db.delete(projects).where(eq(projects.id, projectId));

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
