// hooks/useCurrentUser.ts
import useSWR from "swr";
import fetcher from "@/libs/fetcher"; // Adjust to correct path

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return { data, error, isLoading, mutate };
};

export default useCurrentUser;
