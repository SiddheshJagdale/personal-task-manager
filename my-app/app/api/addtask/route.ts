import { NextResponse } from "next/server";
import { db } from "@/db"; // Ensure you have a database connection
import { tasks, projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const {
      title,
      description,
      dueDate,
      important,
      isCompleted,
      userId,
      projectId,
    } = await req.json();

    console.log("Received projectId:", projectId);

    if (!title || !description || !dueDate || !projectId) {
      return NextResponse.json(
        { error: "Title, description, due date, and project ID are required" },
        { status: 400 }
      );
    }

    // Check if the project exists in the database
    const projectExists = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId));

    if (projectExists.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Generate a unique task ID if not provided
    const taskId = uuidv4();

    // Save task to database
    const newTask = await db
      .insert(tasks)
      .values({
        id: taskId,
        title,
        description,
        dueDate: new Date(dueDate),
        completed: isCompleted, // Use 'completed' instead of 'isCompleted'
        userId,
        projectId,
        isImportant: important,
      })
      .returning(); // Returning inserted task for confirmation

    return NextResponse.json(
      { message: "Task added successfully", task: newTask },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error adding task:", error);

    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
