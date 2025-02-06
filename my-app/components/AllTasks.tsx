import React, { useEffect } from "react";
import { useTasks } from "@/hooks/useTasks";
import useCurrentUser from "@/hooks/useCurrentuser";
import { useProjectStore } from "@/zustand/useProjectStore";
import TaskCard from "@/components/Taskcard";
import { useTaskStore } from "@/zustand/useTaskStore";

const AllTasks = () => {
  const { data: currentUser } = useCurrentUser();
  const { selectedProjectId } = useProjectStore();
  const { tasks, setTasks } = useTaskStore();

  const {
    data: Tasks,
    isLoading,
    error,
  } = useTasks(selectedProjectId as string, currentUser?.id);

  // ✅ Use useEffect to update Zustand store only when tasks change
  useEffect(() => {
    if (Array.isArray(Tasks) && Tasks.length > 0) {
      setTasks(Tasks);
    }
  }, [Tasks, setTasks]);

  // Loading state
  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  // Error handling
  if (error) {
    return <div>Error fetching tasks: {error.message}</div>;
  }

  return (
    <div className="w-full h-full">
      {tasks && tasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {tasks.map((task) => (
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
          <p className="text-xl text-black">No tasks available</p>
        </div>
      )}
    </div>
  );
};

export default AllTasks;
