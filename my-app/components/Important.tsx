import React from "react";
import { useTasks } from "@/hooks/useTasks"; // Import the hook
import { Task } from "@/ReactQuery/types/allTasks";
import useCurrentUser from "@/hooks/useCurrentuser"; // Import the Task type
import { useProjectStore } from "@/zustand/useProjectStore";
import TaskCard from "@/components/Taskcard"; // Import the TaskCard component

const Important = () => {
  const { data: currentUser } = useCurrentUser();
  const { selectedProjectId } = useProjectStore();

  // Use the hook to fetch tasks for the given projectId and userId
  const {
    data: tasks,
    isLoading,
    error,
  } = useTasks(selectedProjectId as string, currentUser?.id);

  // Loading state
  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  // Error handling
  if (error) {
    return <div>Error fetching tasks: {error.message}</div>;
  }

  // Filter important tasks
  const importantTasks = tasks?.filter((task: Task) => task.isImportant) || [];

  // Return the main content
  return (
    <div className="w-full h-full">
      {importantTasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {importantTasks.map((task: Task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description || ""}
              isCompleted={task.completed}
              isImportant={task.isImportant}
              duedate={task.dueDate || "No due date"}
              id={task.id}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col w-full h-full p-6 justify-center items-center">
          <p className="text-xl text-black">No important tasks available</p>
        </div>
      )}
    </div>
  );
};

export default Important;
