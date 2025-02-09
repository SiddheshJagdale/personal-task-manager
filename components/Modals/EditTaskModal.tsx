import React, { useCallback, useEffect, useState } from "react";
import Modal from "./Modal";
import useCurrentUser from "@/hooks/useCurrentuser";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useTasks } from "@/hooks/useTasks";
import { useTaskStore } from "@/zustand/useTaskStore";
import { useProjectStore } from "@/zustand/useProjectStore";
import { updateTask } from "@/ReactQuery/mutations/updateTask";

const EditTaskModal = () => {
  const {
    isEditTaskOpen,
    closeEditTask,
    resetNewTask,
    editTaskData,
    setEditTaskData,
    updateTask: UpdateTask,
  } = useTaskStore();
  const { selectedProjectId } = useProjectStore();
  const { data: currentUser } = useCurrentUser();
  const { refetch } = useTasks(selectedProjectId as string, currentUser?.id);

  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(Date);
  const [completed, setCompleted] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [projectId, setProjectId] = useState("");

  const titleText = "Edit Task";

  // Set up the mutation with React Query
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      toast.success("Task updated successfully!");
      refetch(); // Refetch tasks after update
      resetNewTask();
      closeEditTask();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update task");
    },
  });

  useEffect(() => {
    if (isEditTaskOpen && editTaskData) {
      const {
        id,
        title,
        description,
        dueDate,
        completed,
        isImportant,
        projectId,
      } = editTaskData;
      setId(id);
      setTitle(title);
      setDescription(description || "");
      setDueDate(dueDate as string);
      setCompleted(completed);
      setIsImportant(isImportant);
      setProjectId(projectId as string);
    }
    UpdateTask(id, {
      title: title,
      description: description,
      dueDate: dueDate,
      completed: completed,
      isImportant: isImportant,
    });
  }, [isEditTaskOpen, editTaskData]);

  const handleSubmit = useCallback(async () => {
    try {
      await mutateAsync({
        taskId: id,
        projectId: selectedProjectId as string,
        title,
        description,
        dueDate,
        completed,
        isImportant,
      });
      // After mutation, update task in the Zustand store
      setEditTaskData({
        id,
        title,
        description,
        dueDate,
        completed,
        isImportant,
        projectId,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error("An error occurred while updating the task");
      }
    }
  }, [
    title,
    description,
    dueDate,
    completed,
    isImportant,
    id,
    projectId,
    mutateAsync,
    setEditTaskData,
    selectedProjectId,
  ]);

  const Body = (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-lg">
      {/* Task Title */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-black text-base sm:text-lg md:text-xl font-medium">
          Task Title
        </label>
        <input
          type="text"
          value={title}
          placeholder="Enter task title"
          className="px-3 py-2 rounded-lg border-2 border-gray-300 text-black bg-white text-base focus:border-blue-500 focus:outline-none"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-black text-base sm:text-lg md:text-xl font-medium">
          Description
        </label>
        <textarea
          value={description}
          rows={4}
          placeholder="Enter task description"
          className="px-3 py-2 rounded-lg border-2 border-gray-300 text-black bg-white text-base focus:border-blue-500 focus:outline-none"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Due Date */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-black text-base sm:text-lg md:text-xl font-medium">
          Due Date
        </label>
        <input
          type="date"
          value={dueDate}
          className="px-3 py-2 rounded-lg border-2 border-gray-300 text-black bg-white text-base focus:border-blue-500 focus:outline-none"
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      {/* Checkboxes */}
      <div className="flex flex-row gap-4">
        <label className="flex items-center gap-2 text-black text-base sm:text-lg md:text-xl font-medium">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
            className="w-5 h-5 accent-blue-500"
          />
          Completed
        </label>
        <label className="flex items-center gap-2 text-black text-base sm:text-lg md:text-xl font-medium">
          <input
            type="checkbox"
            checked={isImportant}
            onChange={() => setIsImportant(!isImportant)}
            className="w-5 h-5 accent-blue-500"
          />
          Important
        </label>
      </div>
    </div>
  );

  return (
    <Modal
      body={Body}
      title={titleText}
      isOpen={isEditTaskOpen}
      onClose={closeEditTask}
      onSubmit={handleSubmit}
      actionLabel={isPending ? "Updating..." : "Update Task"}
      submitButton
    />
  );
};

export default EditTaskModal;
