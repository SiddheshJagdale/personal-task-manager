import axios from "axios";
import { ProjectData } from "@/ReactQuery/types/addProject"; // Reuse the same ProjectData type

export const deleteProject = async (id: String) => {
  try {
    console.log(id);
    const response = await axios.delete(`/api/deleteproject/${id}`);
    return response.data; // Return the updated project data
  } catch (error: any) {
    // Provide a more informative error message
    throw new Error(error?.response?.data?.error || "Failed to update project");
  }
};
