"use client";

import { FaPlus } from "react-icons/fa";
import { FC, useCallback } from "react";
import { useProjectStore } from "@/zustand/useProjectStore";

const AddProjectButton: FC = () => {
  const { openAddProject } = useProjectStore();

  const handleClick = useCallback(() => {
    openAddProject();
  }, [openAddProject]);

  return (
    <div
      className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-2xl shadow-lg p-6 w-full max-w-md border border-blue-600 hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="p-4 bg-white text-blue-500 rounded-full shadow-md">
          <FaPlus size={28} />
        </div>
        <h2 className="text-xl font-semibold">Add Project</h2>
      </div>
    </div>
  );
};

export default AddProjectButton;
