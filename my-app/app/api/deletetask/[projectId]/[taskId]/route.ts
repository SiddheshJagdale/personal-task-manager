import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { tasks } from "@/db/schema";
import { eq, and } from "drizzle-orm";

// DELETE request handler
export async function DELETE(
  req: Request,
  { params }: { params: { projectId: string; taskId: string } }
) {
  const { projectId, taskId } = params;

  try {
    // Deleting the task from the tasks table and storing the result
    const task = await db
      .delete(tasks)
      .where(and(eq(tasks.id, taskId), eq(tasks.projectId, projectId)))
      .returning(); // This returns the deleted task(s), if needed

    if (task.length === 0) {
      return NextResponse.json(
        { message: "Task not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Task deleted successfully", deletedTask: task },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the task" },
      { status: 500 }
    );
  }
}
