// deleteTask.ts (mutation)
import axios from "axios";

interface DeleteTaskParams {
  projectId: string;
  taskId: string;
}

export const deleteTask = async ({ projectId, taskId }: DeleteTaskParams) => {
  try {
    const response = await axios.delete(
      `/api/deletetask/${projectId}/${taskId}`
    );
    return response.data; // returning the response data
  } catch (error: any) {
    console.error("Error deleting task:", error);
    throw new Error(error.response?.data?.message || "Failed to delete task");
  }
};
