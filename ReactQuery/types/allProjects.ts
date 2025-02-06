export type Project = {
  id: string;
  name: string;
  description: string;
  userId: string; // The user the project belongs to
  createdAt: string; // Timestamp for project creation
  status: string; // Status of the project (e.g., "ongoing", "completed")
  priority: string; // Priority level of the project (e.g., "low", "medium", "high")
};
