import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db/index";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { and } from "drizzle-orm";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ taskId: string; projectId: string }> }
) {
  const { taskId, projectId } = await context.params;
  const body = await req.json();
  const { title, description, dueDate, completed, isImportant } = body;

  try {
    // Convert dueDate from string to Date object if present
    const updateData = {
      title,
      description,
      ...(dueDate !== undefined && { dueDate: new Date(dueDate) }),
      completed,
      isImportant,
    };

    const result = await db
      .update(tasks)
      .set(updateData)
      .where(and(eq(tasks.id, taskId), eq(tasks.projectId, projectId)));

    if (!result) {
      throw new Error("No task found");
    }

    return NextResponse.json({ message: "Task updated successfully!" });
  } catch (error: unknown) {
    console.error("Error updating task:", error);

    let errorMessage = "Failed to update task";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
