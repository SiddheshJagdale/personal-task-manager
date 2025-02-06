import { NextRequest, NextResponse } from "next/server";
import { projects } from "@/db/schema";
import { db } from "@/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, description, priority, userId } = body;

    if (!id || !name || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.insert(projects).values({
      id,
      name,
      description,
      userId,
      priority,
    });

    return NextResponse.json({ message: "Project created successfully!" });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
