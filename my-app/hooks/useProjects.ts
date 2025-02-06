// hooks/useProjects.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Project } from "@/ReactQuery/types/allProjects"; // Import Project type

const fetchProjects = async (userId: string) => {
  const response = await axios.get(`/api/allProjects/${userId}`);
  return response.data; // Return the list of projects
};

export const useProjects = (userId: string) => {
  return useQuery<Project[], Error>({
    queryKey: ["projects", userId], // Cache key for React Query
    queryFn: () => fetchProjects(userId),
    enabled: !!userId, // Only fetch when userId is available
  });
};
