import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

// Users Table
export const users = pgTable("users", {
  id: text("id").primaryKey(), // Use string and UUID generation
  profileImage: text("profileImage"),
  name: text("name"),
  email: text("email").unique().notNull(),
  passwordHash: text("passwordHash").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

// Projects Table
export const projects = pgTable("projects", {
  id: text("id").primaryKey(), // Use string and UUID generation
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").default("ongoing"), // Status of the project
  priority: text("priority").default("medium"), // Priority level
  createdAt: timestamp("createdAt").defaultNow(),
  userId: text("userId") // Ensure this is `text` to match the `id` type in users
    .references(() => users.id)
    .notNull(), // Relationship to users
});

// Tasks Table
export const tasks = pgTable("tasks", {
  id: text("id").primaryKey(), // Use string and UUID generation
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("dueDate"),
  completed: boolean("completed").default(false),
  isImportant: boolean("isImportant").default(false),
  userId: text("userId") // Ensure this is `text` to match the `id` type in users
    .references(() => users.id)
    .notNull(), // Task creator
  projectId: text("projectId") // Ensure this is `text` to match the `id` type in projects
    .references(() => projects.id)
    .notNull(), // Task belongs to a project
});
