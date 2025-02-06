import React, { useCallback } from "react";
import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import {
  MdOutlineLowPriority,
  MdOutlinePendingActions,
  MdOutlinePriorityHigh,
} from "react-icons/md";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useCurrentUser from "@/hooks/useCurrentuser";
import { useProjects } from "@/hooks/useProjects";
import { useProjectStore } from "@/zustand/useProjectStore";
import { deleteProject } from "@/ReactQuery/mutations/deleteProject";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { format } from "date-fns"; // Import date-fns for date formatting

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: "ongoing" | "completed";
  priority: "low" | "medium" | "high";
}

const statusColors = {
  ongoing: "text-yellow-600",
  completed: "text-green-600",
};

const priorityColors = {
  low: "text-blue-600",
  medium: "text-orange-500",
  high: "text-red-600",
};

const ProjectCard = ({
  id,
  name,
  description,
  createdAt,
  status,
  priority,
}: ProjectCardProps) => {
  const { data: currentUser } = useCurrentUser();
  const { setSelectedProject, selectedProjectId } = useProjectStore();
  const { openEditProject } = useProjectStore();

  const handleEdit = () => {
    setSelectedProject(id); // Set selected project
    openEditProject({
      id,
      name,
      description,
      status,
      priority,
      createdAt,
    });
  };

  const { refetch } = useProjects(currentUser?.id); // Refresh projects after delete

  const { mutateAsync } = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast.success("Project deleted successfully!");
      refetch(); // Refresh project list
    },
    onError: (error: Error) => {
      console.error("Error deleting project:", error);
      toast.error(error.message || "Failed to delete project");
    },
  });

  const handleDelete = useCallback(async () => {
    if (!id) {
      return toast.error("Some error occurred");
    }
    try {
      await mutateAsync(id);
    } catch (err) {
      console.log(err);
      toast.error(`Error: ${err}`);
    }
  }, [id, mutateAsync]); // Add 'id' to dependencies

  const formattedDate = format(new Date(createdAt), "MMMM dd, yyyy");

  return (
    <div
      className={`flex flex-col bg-white rounded-2xl shadow-lg p-6 w-full max-w-4xl border
         ${
           selectedProjectId === id
             ? "border-blue-500 shadow-md"
             : "border-gray-200"
         }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{name}</h2>

        <div className="flex justify-end items-center space-x-4 mt-4">
          <button
            onClick={handleDelete}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 transition"
          >
            <MdDeleteOutline className="text-white text-xl" />
          </button>
          <button
            onClick={handleEdit}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 transition"
          >
            <CiEdit className="text-white text-xl" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-lg mb-4">{description}</p>
      <p className="text-sm text-gray-500">Created on: {formattedDate}</p>

      <div className="mt-4 flex items-center space-x-3">
        <span className="text-sm font-semibold text-gray-700">Status:</span>
        {status === "completed" ? (
          <FaCheckCircle className={`text-lg ${statusColors[status]}`} />
        ) : (
          <FaRegCircle
            className={`text-lg text-black ${statusColors[status]}`}
          />
        )}
        <span
          className={`text-sm text-black font-semibold ${statusColors[status]}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="mt-2 flex items-center space-x-3">
        <span className="text-sm font-semibold text-gray-700">Priority:</span>
        {priority === "low" && (
          <MdOutlineLowPriority
            className={`text-lg ${priorityColors[priority]}`}
          />
        )}
        {priority === "medium" && (
          <MdOutlinePendingActions
            className={`text-lg ${priorityColors[priority]}`}
          />
        )}
        {priority === "high" && (
          <MdOutlinePriorityHigh
            className={`text-lg ${priorityColors[priority]}`}
          />
        )}
        <span className={`text-sm font-semibold ${priorityColors[priority]}`}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
