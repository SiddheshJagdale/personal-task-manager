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
    if (Tasks?.length > 0) {
      setTasks(Tasks);
    }
  }, [Tasks, setTasks]);

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error fetching tasks: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
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
        <p>No tasks available</p>
      )}
    </div>
  );
};

export default AllTasks;
