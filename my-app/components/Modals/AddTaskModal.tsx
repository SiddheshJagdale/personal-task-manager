"use client";

import React, { useCallback } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { v4 as uuid } from "uuid";
import useCurrentUser from "@/hooks/useCurrentuser";
import { useTaskStore } from "@/zustand/useTaskStore";
import { useProjectStore } from "@/zustand/useProjectStore";
import { useTasks } from "@/hooks/useTasks";

const AddTaskModal = () => {
  const {
    newTask,
    setNewTaskData,
    resetNewTask,
    addTask,
    isAddTaskOpen,
    closeAddTask,
  } = useTaskStore(); // Zustand state
  const { data: currentUser } = useCurrentUser();
  const { selectedProjectId } = useProjectStore();

  const { refetch } = useTasks(selectedProjectId as string, currentUser?.id);

  const title = "Add New Task";
  const id = uuid();

  const handleSubmit = useCallback(async () => {
    try {
      const response = await axios.post("/api/addtask", {
        id: id,
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate as string, // Ensure correct format
        important: newTask.isImportant,
        isCompleted: newTask.completed,
        userId: currentUser?.id,
        projectId: selectedProjectId, // Replace with the actual projectId if needed
      });

      // Add the task to Zustand store
      addTask({
        id: id,
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        isImportant: newTask.isImportant,
        completed: newTask.completed,
        projectId: selectedProjectId as string, // Adjust if needed
      });

      toast.success("Task created successfully!");
      refetch();
      resetNewTask(); // Reset the form data
      closeAddTask(); // Close the modal after submission
    } catch (error: any) {
      console.error("Error adding task:", error);
      toast.error(error.response?.data?.error || "Failed to create task");
    }
  }, [newTask, addTask, closeAddTask, resetNewTask, currentUser?.id]);

  const Body = (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-lg">
      {/* Title Input */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-black text-base sm:text-lg md:text-xl font-medium">
          Title
        </label>
        <input
          type="text"
          value={newTask.title}
          placeholder="Enter title"
          className="px-3 py-2 rounded-lg border-2 border-gray-300 text-black bg-white text-base focus:border-blue-500 focus:outline-none"
          onChange={(e) => setNewTaskData({ title: e.target.value })}
        />
      </div>

      {/* Description Input */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-black text-base sm:text-lg md:text-xl font-medium">
          Description
        </label>
        <textarea
          value={newTask.description as string}
          rows={4}
          placeholder="Enter description"
          className="px-3 py-2 rounded-lg border-2 border-gray-300 text-black bg-white text-base focus:border-blue-500 focus:outline-none"
          onChange={(e) => setNewTaskData({ description: e.target.value })}
        />
      </div>

      {/* Date Input */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-black text-base sm:text-lg md:text-xl font-medium">
          Complete by
        </label>
        <input
          type="date"
          value={newTask.dueDate as string}
          id="task-date"
          name="task-date"
          className="px-3 py-2 rounded-lg border-2 border-gray-300 text-black bg-white text-base focus:border-blue-500 focus:outline-none"
          onChange={(e) => setNewTaskData({ dueDate: e.target.value })}
        />
      </div>

      {/* Importance Radio Buttons */}
      <div className="flex flex-row w-full justify-between items-center">
        <label className="text-black text-base sm:text-lg md:text-xl font-medium">
          Is this task important?
        </label>
        <div className="flex flex-row gap-4">
          <label className="flex items-center gap-2 text-black text-base">
            <input
              type="radio"
              name="important"
              className="w-5 h-5 accent-blue-500"
              checked={newTask.isImportant === true}
              onChange={() => setNewTaskData({ isImportant: true })}
            />
            Yes
          </label>
          <label className="flex items-center gap-2 text-black text-base">
            <input
              type="radio"
              name="important"
              className="w-5 h-5 accent-blue-500"
              checked={newTask.isImportant === false}
              onChange={() => setNewTaskData({ isImportant: false })}
            />
            No
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      body={Body}
      title={title}
      isOpen={isAddTaskOpen}
      onClose={closeAddTask}
      onSubmit={handleSubmit}
      actionLabel="Add Task"
      submitButton
    />
  );
};

export default AddTaskModal;
