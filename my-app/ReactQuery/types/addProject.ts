export type ProjectData = {
  id: string;
  name: string;
  description: string;
  status?: "ongoing" | "completed"; // Default: "ongoing"
  priority?: "low" | "medium" | "high"; // Default: "medium"
  createdAt?: string; // ISO string format
  userId?: string; // Optional for the logged-in user
};
