import React from "react";
import { FaStar } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-hot-toast";
import { useTaskStore } from "@/zustand/useTaskStore";
import { useMutation } from "@tanstack/react-query";
import { deleteTask } from "@/ReactQuery/mutations/deleteTask";
import { useProjectStore } from "@/zustand/useProjectStore";
import { useTasks } from "@/hooks/useTasks";
import useCurrentUser from "@/hooks/useCurrentuser";

interface TaskCardProps {
  title: string;
  description: string;
  isCompleted?: boolean;
  isImportant: boolean;
  duedate: string;
  id: string;
}

const statusColors = {
  completed: "text-green-600",
  ongoing: "text-yellow-600",
};

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  isCompleted,
  isImportant,
  duedate,
  id,
}) => {
  const { openEditTask, setEditTaskData } = useTaskStore(); // Zustand function
  const { selectedProjectId } = useProjectStore();
  const { data: currentUser } = useCurrentUser();
  const { refetch } = useTasks(selectedProjectId as string, currentUser?.id);
  const { mutateAsync } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Task deleted successfully!");
      refetch();
    },
    onError: (error: any) => {
      console.error("Error deleting task:", error);
      toast.error(error.message || "Failed to delete task");
    },
  });

  const handleDelete = async () => {
    await mutateAsync({ projectId: selectedProjectId as string, taskId: id });
  };

  return (
    <div className="flex flex-col h-full w-full p-6 bg-white rounded-2xl shadow-lg border border-neutral-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold truncate text-gray-900">
          {title}
        </h2>
        {isImportant && <FaStar className="text-yellow-400 text-lg" />}
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex items-center mb-4">
        <span className="text-xs text-gray-400">Due: {duedate}</span>
      </div>

      <div className="flex items-center justify-between mt-4 space-x-3">
        <div className="flex items-center">
          <span
            className={`text-sm text-black font-semibold ${
              isCompleted ? statusColors.completed : statusColors.ongoing
            }`}
          >
            {isCompleted ? "Completed" : "Ongoing"}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleDelete}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 transition"
          >
            <MdDeleteOutline className="text-white text-xl" />
          </button>

          {/* Open Edit Modal with Task Details */}
          <button
            onClick={() => {
              openEditTask();
              setEditTaskData({
                id,
                title,
                description,
                dueDate: duedate,
                completed: isCompleted || false,
                isImportant,
              });
            }}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 transition"
          >
            <CiEdit className="text-white text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
