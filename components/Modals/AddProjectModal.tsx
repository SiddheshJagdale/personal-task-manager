import React, { useCallback } from "react";
import Modal from "./Modal";
import { useProjectStore } from "@/zustand/useProjectStore";
import useCurrentUser from "@/hooks/useCurrentuser";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";
import { addProject } from "@/ReactQuery/mutations/addProject";
import { useProjects } from "@/hooks/useProjects";

// Define the priority type explicitly
type Priority = "low" | "medium" | "high";
type Status = "ongoing" | "completed";

const AddProjectModal = () => {
  const {
    newProject,
    setNewProjectData,
    
    isAddProjectOpen,
    closeAddProject,
    resetNewProject,
    addProject: addProjectToStore,
  } = useProjectStore();
  const { data: currentUser } = useCurrentUser();
  const { refetch } = useProjects(currentUser?.id);

  const title = "Add New Project";

  // React Query mutation to add project
  const { mutateAsync, isPending } = useMutation({
    mutationFn: addProject,
    onSuccess: (createdProject) => {
      toast.success("Project created successfully!");
      addProjectToStore(createdProject); // Add to Zustand store
      resetNewProject();
      closeAddProject();
      refetch();
    },
    onError: (error: Error) => {
      console.error("Error adding project:", error);
      toast.error(error.message || "Failed to create project");
    },
  });

  const handleSubmit = useCallback(async () => {
    if (!newProject.name || !newProject.description) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      await mutateAsync({
        id: uuidv4(),
        name: newProject.name,
        description: newProject.description,
        priority: (newProject.priority as Priority) || "medium",
        status: (newProject.status as Status) || "ongoing",
        createdAt: new Date().toISOString(),
        userId: currentUser?.id,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Some error occured while creating project.");
      }
    }
  }, [newProject, currentUser, mutateAsync]); // Removed closeAddProject from dependencies

  const Body = (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-lg">
      {/* Name Input */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-black text-base sm:text-lg md:text-xl font-medium">
          Project Name
        </label>
        <input
          type="text"
          value={newProject.name}
          placeholder="Enter project name"
          className="px-3 py-2 rounded-lg border-2 border-gray-300 text-black bg-white text-base focus:border-blue-500 focus:outline-none"
          onChange={(e) => setNewProjectData({ name: e.target.value })}
        />
      </div>

      {/* Description Input */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-black text-base sm:text-lg md:text-xl font-medium">
          Description
        </label>
        <textarea
          value={newProject.description}
          rows={4}
          placeholder="Enter project description"
          className="px-3 py-2 rounded-lg border-2 border-gray-300 text-black bg-white text-base focus:border-blue-500 focus:outline-none"
          onChange={(e) => setNewProjectData({ description: e.target.value })}
        />
      </div>

      {/* Priority Dropdown */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-black text-base sm:text-lg md:text-xl font-medium">
          Priority
        </label>
        <select
          value={newProject.priority}
          className="px-3 py-2 rounded-lg border-2 border-gray-300 text-black bg-white text-base focus:border-blue-500 focus:outline-none"
          onChange={(e) =>
            setNewProjectData({ priority: e.target.value as Priority })
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );

  return (
    <Modal
      body={Body}
      title={title}
      isOpen={isAddProjectOpen}
      onClose={closeAddProject}
      onSubmit={handleSubmit}
      actionLabel={isPending ? "Adding..." : "Add Project"}
      submitButton
    />
  );
};

export default AddProjectModal;
