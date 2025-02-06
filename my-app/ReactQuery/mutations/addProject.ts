// src/ReactQuery/mutations/addProject.ts

import axios from "axios";
import { ProjectData } from "@/ReactQuery/types/addProject"; // Import the ProjectData type

export const addProject = async (project: ProjectData) => {
  try {
    const response = await axios.post("/api/addproject", project);
    return response.data; // Return the server's response (e.g., project data)
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || "Failed to add project");
  }
};
