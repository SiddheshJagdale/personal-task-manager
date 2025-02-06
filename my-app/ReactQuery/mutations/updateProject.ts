import axios from "axios";
import { ProjectData } from "@/ReactQuery/types/addProject"; // Reuse the same ProjectData type

export const updateProject = async (project: ProjectData) => {
  try {
    console.log(project);
    const response = await axios.put(
      `/api/updateproject/${project.id}`,
      project
    );
    return response.data; // Return the updated project data
  } catch (error: any) {
    // Provide a more informative error message
    throw new Error(error?.response?.data?.error || "Failed to update project");
  }
};
