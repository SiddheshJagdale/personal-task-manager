import { db } from "./db"; // Ensure this is your Drizzle DB instance
import { users, projects, tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

async function seed() {
  try {
    console.log("Seeding database...");

    // Create Users
    const passwordHash = await bcrypt.hash("password123", 10);
    const userId = uuidv4();
    await db.insert(users).values({
      id: userId,
      email: "user@example.com",
      passwordHash,
    });

    // Create Projects
    const projectId1 = uuidv4();
    const projectId2 = uuidv4();
    await db.insert(projects).values([
      {
        id: projectId1,
        name: "Project Alpha",
        description: "This is the first sample project",
        userId,
      },
      {
        id: projectId2,
        name: "Project Beta",
        description: "This is the second sample project",
        userId,
      },
    ]);

    // Create Tasks
    await db.insert(tasks).values([
      {
        id: uuidv4(),
        title: "Task 1",
        description: "Complete the frontend",
        dueDate: new Date(),
        completed: false,
        isImportant: true,
        userId,
        projectId: projectId1,
      },
      {
        id: uuidv4(),
        title: "Task 2",
        description: "Fix backend API",
        dueDate: new Date(),
        completed: false,
        isImportant: false,
        userId,
        projectId: projectId1,
      },
      {
        id: uuidv4(),
        title: "Task 3",
        description: "Write project documentation",
        dueDate: new Date(),
        completed: false,
        isImportant: true,
        userId,
        projectId: projectId2,
      },
      {
        id: uuidv4(),
        title: "Task 4",
        description: "Optimize database queries",
        dueDate: new Date(),
        completed: false,
        isImportant: false,
        userId,
        projectId: projectId2,
      },
    ]);

    console.log("Seeding complete.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit();
  }
}

seed();
