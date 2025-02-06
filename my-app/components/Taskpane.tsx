// components/Taskpane.tsx
import React from "react";
import { useTaskStore } from "@/zustand/useTaskStore";

const Taskpane = () => {
  const { ongoingTaskCount, completedTaskCount, importantTaskCount } =
    useTaskStore();

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-3xl shadow-lg bg-black rounded-lg p-4 text-white gap-4">
      <div className="flex-1 text-center">
        <h3 className="font-bold">Important Tasks</h3>
        <p>{importantTaskCount}</p>
      </div>
      <div className="flex-1 text-center">
        <h3 className="font-bold">Completed Tasks</h3>
        <p>{completedTaskCount}</p>
      </div>
      <div className="flex-1 text-center">
        <h3 className="font-bold">Ongoing Tasks</h3>
        <p>{ongoingTaskCount}</p>
      </div>
    </div>
  );
};

export default Taskpane;
