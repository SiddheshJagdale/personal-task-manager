"use client";

import { FaPlus } from "react-icons/fa"; // Import the Plus icon
import { useCallback } from "react";
import { useTaskStore } from "@/zustand/useTaskStore";

const AddTaskButton = () => {
  const { openAddTask } = useTaskStore();
  const handleClick = useCallback(() => {
    openAddTask();
  }, [openAddTask]);
  return (
    <div
      className="hidden lg:flex flex-col justify-center gap-2 bg-blue-500 hover:bg-blue-600  duration-100 px-4 py-2 rounded-lg shadow-lg max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md mb-4 hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
      onClick={handleClick}
    >
      <button className="flex items-center justify-center py-1 w-full">
        <FaPlus size={22} />
      </button>
      <span className="text-sm md:text-md font-medium text-center">
        Add Task
      </span>
    </div>
  );
};

export default AddTaskButton;
