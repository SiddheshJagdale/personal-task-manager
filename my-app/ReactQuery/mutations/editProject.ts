// hooks/useUpdateProject.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ProjectData, ProjectResponse } from "@/ReactQuery/types/addProject"; // Import the types

// The updateProject function with error handling and proper return type
const updateProject = async (
  projectData: ProjectData
): Promise<ProjectResponse> => {
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

// The hook to use the mutation
export const useUpdateProject = () => {
  return useMutation<ProjectResponse, Error, ProjectData>(updateProject);
};
