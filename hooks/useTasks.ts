import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "@/ReactQuery/types/allTasks"; // Import Task type

const fetchTasks = async (projectId: string, userId: string) => {
  const response = await axios.get(`/api/alltasks/${projectId}/${userId}`);
  return response.data; // Return the list of tasks
};

export const useTasks = (projectId: string, userId: string) => {
  const query = useQuery<Task[], Error>({
    queryKey: ["tasks", projectId, userId], // Cache key for React Query
    queryFn: () => fetchTasks(projectId, userId),
    enabled: !!projectId && !!userId, // Only fetch when both projectId and userId are available
  });

  return { ...query, refetch: query.refetch }; // ✅ Return refetch along with other query properties
};
