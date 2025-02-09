import React, { useCallback, useEffect, useState } from "react";
import Modal from "./Modal";
import useCurrentUser from "@/hooks/useCurrentuser";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { updateProject } from "@/ReactQuery/mutations/updateProject";
import { useProjects } from "@/hooks/useProjects";
import { useProjectStore } from "@/zustand/useProjectStore";

type Priority = "low" | "medium" | "high";
type Status = "ongoing" | "completed";

const EditProjectModal = () => {
  const {
    isEditProjectOpen,
    closeEditProject,
    resetNewProject,
    editProjectData,
    updateProject: UpdateProject,
  } = useProjectStore(); // Access editProjectData from Zustand

  const { data: currentUser } = useCurrentUser();
  const { refetch } = useProjects(currentUser?.id);
  const [name, setName] = useState<string>("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [status, setStatus] = useState<Status>("ongoing");

  const title = "Edit Project";

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      toast.success("Project updated successfully!");
      refetch();
      resetNewProject(); // Reset the form state after successful submission
      closeEditProject(); // Close the modal
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error("Error updating project:", error);
        toast.error(error.message || "Failed to update project");
      }
    },
  });

  // UseEffect to sync the project data when modal opens
  useEffect(() => {
    if (isEditProjectOpen && editProjectData) {
      const { id, name, description, priority, status } = editProjectData;
      setName(name);
      setId(id);
      setDescription(description);
      setPriority(priority as Priority);
      setStatus(status as Status);
    }
  }, [isEditProjectOpen, editProjectData]); // Dependency on modal state and project data

  const handleSubmit = useCallback(async () => {
    if (!name || !description) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      await mutateAsync({
        id: id,
        name,
        description,
        priority,
        status,
        createdAt: editProjectData?.createdAt,
        userId: currentUser?.id, // Ensure it's associated with the logged-in user
      });
      UpdateProject(id, {
        name: name,
        description: description,
        priority: priority,
        status: status,
        createdAt: editProjectData?.createdAt,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error("An error occurred while updating the project");
      }
    }
  }, [
    name,
    description,
    priority,
    status,
    id,
    currentUser?.id,
    mutateAsync,
    editProjectData?.createdAt,
  ]);

  const Body = (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-lg">
      {/* Name Input */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-black text-base sm:text-lg md:text-xl font-medium">
          Project Name
        </label>
        <input
          type="text"
          value={name}
          placeholder="Enter project name"
          className="px-3 py-2 rounded-lg border-2 border-gray-300 text-black bg-white text-base focus:border-blue-500 focus:outline-none"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Description Input */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-black text-base sm:text-lg md:text-xl font-medium">
          Description
        </label>
        <textarea
          value={description}
          rows={4}
          placeholder="Enter project description"
          className="px-3 py-2 rounded-lg border-2 border-gray-300 text-black bg-white text-base focus:border-blue-500 focus:outline-none"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Priority Dropdown */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-black text-base sm:text-lg md:text-xl font-medium">
          Priority
        </label>
        <select
          value={priority}
          className="px-3 py-2 rounded-lg border-2 border-gray-300 text-black bg-white text-base focus:border-blue-500 focus:outline-none"
          onChange={(e) => setPriority(e.target.value as Priority)} // Explicitly cast as Priority type
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Status Dropdown */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-black text-base sm:text-lg md:text-xl font-medium">
          Status
        </label>
        <select
          value={status}
          className="px-3 py-2 rounded-lg border-2 border-gray-300 text-black bg-white text-base focus:border-blue-500 focus:outline-none"
          onChange={(e) => setStatus(e.target.value as Status)} // Explicitly cast as Status type
        >
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="paused">Paused</option>
        </select>
      </div>
    </div>
  );

  return (
    <Modal
      body={Body}
      title={title}
      isOpen={isEditProjectOpen}
      onClose={closeEditProject}
      onSubmit={handleSubmit}
      actionLabel={isPending ? "Updating..." : "Update Project"}
      submitButton
    />
  );
};

export default EditProjectModal;
