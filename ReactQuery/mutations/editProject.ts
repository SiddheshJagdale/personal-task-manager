// hooks/useUpdateProject.ts
import axios from "axios";
import { ProjectData } from "@/ReactQuery/types/addProject"; // Import the types

// The updateProject function with error handling and proper return type
const updateProject = async (
  projectData: ProjectData
): Promise<ProjectData> => {
  try {
    const response = await axios.put(
      `/api/projects/${projectData.id}`,
      projectData
    );
    return response.data; // This should match the structure of ProjectResponse
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || "Failed to update project");
  }
};
