import axios from "axios";

interface UpdateTaskParams {
  taskId: string;
  projectId: string;
  title: string;
  description: string;
  dueDate: string | null;
  completed: boolean;
  isImportant: boolean;
}

export const updateTask = async ({
  taskId,
  projectId,
  title,
  description,
  dueDate,
  completed,
  isImportant,
}: UpdateTaskParams) => {
  try {
    console.log("At mutation");
    console.log(dueDate);
    const response = await axios.put(`/api/updatetask/${projectId}/${taskId}`, {
      title,
      description,
      dueDate,
      completed,
      isImportant,
    });
    return response.data; // Return the response message
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error updating task");
  }
};
