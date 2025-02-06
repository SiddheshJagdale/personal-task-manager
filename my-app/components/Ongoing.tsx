import React from "react";
import { useTasks } from "@/hooks/useTasks"; // Import the hook
import { Task } from "@/ReactQuery/types/allTasks";
import useCurrentUser from "@/hooks/useCurrentuser"; // Import the Task type
import { useProjectStore } from "@/zustand/useProjectStore";
import TaskCard from "@/components/Taskcard"; // Import the TaskCard component

const Ongoing = () => {
  const { data: currentUser } = useCurrentUser();
  const { selectedProjectId } = useProjectStore();

  // Use the hook to fetch tasks for the given projectId and userId
  const {
    data: tasks,
    isLoading,
    error,
  } = useTasks(selectedProjectId as string, currentUser?.id);

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error fetching tasks: {error.message}</div>;
  }

  // Filter tasks to only include ongoing tasks (not completed)
  const ongoingTasks = tasks?.filter((task: Task) => !task.completed) || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {ongoingTasks.length > 0 ? (
        ongoingTasks.map((task: Task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description || ""}
            isCompleted={task.completed}
            isImportant={task.isImportant}
            duedate={task.dueDate || "No due date"}
            id={task.id}
          />
        ))
      ) : (
        <p>No ongoing tasks available</p>
      )}
    </div>
  );
};

export default Ongoing;
