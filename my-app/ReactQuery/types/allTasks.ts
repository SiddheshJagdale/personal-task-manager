export type Task = {
  id: string; // Unique task identifier (string type due to UUID)
  title: string; // Title of the task
  description: string | null; // Description of the task (can be null)
  dueDate: string | null; // Due date of the task (can be null)
  completed: boolean; // Whether the task is completed or not
  isImportant: boolean; // Flag indicating if the task is important
  userId: string;
  projectId: string; // The project to which the task belongs (references `projects.id`)
};
