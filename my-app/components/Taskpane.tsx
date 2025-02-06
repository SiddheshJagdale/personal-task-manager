// components/Taskpane.tsx
import React from "react";
import { useTaskStore } from "@/zustand/useTaskStore";
import {
  FaTasks,
  FaExclamationCircle,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa"; // Importing icons

const Taskpane = () => {
  const { tasks, ongoingTaskCount, completedTaskCount, importantTaskCount } =
    useTaskStore();

  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-between w-full max-w-6xl  bg-gray-50 rounded-lg py-3 px-2 gap-4 shadow-lg">
      {/* All Tasks */}
      <div className="flex-1 bg-blue-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
        <FaTasks className="text-4xl mb-2" />
        <h3 className="font-bold text-lg">All Tasks</h3>
        <p className="text-2xl">{tasks?.length}</p>
      </div>

      {/* Important Tasks */}
      <div className="flex-1 bg-yellow-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
        <FaExclamationCircle className="text-4xl mb-2" />
        <h3 className="font-bold text-center text-lg">Important Tasks</h3>
        <p className="text-2xl">{importantTaskCount}</p>
      </div>

      {/* Completed Tasks */}
      <div className="flex-1 bg-green-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
        <FaCheckCircle className="text-4xl mb-2" />
        <h3 className="font-bold text-center text-lg">Completed Tasks</h3>
        <p className="text-2xl">{completedTaskCount}</p>
      </div>

      {/* Ongoing Tasks */}
      <div className="flex-1 bg-red-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
        <FaClock className="text-4xl mb-2" />
        <h3 className="font-bold text-center text-lg">Ongoing Tasks</h3>
        <p className="text-2xl">{ongoingTaskCount}</p>
      </div>
    </div>
  );
};

export default Taskpane;
