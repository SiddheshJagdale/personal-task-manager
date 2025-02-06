"use client";

import React from "react";
import { useTaskStore } from "@/zustand/useTaskStore";

const TaskList = () => {
  const { tasks, selectedDate } = useTaskStore();

  // Ensure selectedDate is a single Date object (not an array)
  const singleSelectedDate = Array.isArray(selectedDate)
    ? selectedDate[0]
    : selectedDate;

  const selectedDateTasks = tasks.filter((task) => {
    if (!singleSelectedDate || !task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    return taskDate.toDateString() === singleSelectedDate.toDateString();
  });

  return (
    <div className="flex flex-col md:flex-row max-w-3xl mx-auto text-black bg-gray-50 px-6 py-4 shadow-xl rounded-lg w-full">
      {selectedDateTasks.length > 0 ? (
        <div className="w-full">
          <h3 className="text-xl font-semibold text-center text-blue-600 mb-4">
            Tasks for {singleSelectedDate?.toDateString()}:
          </h3>
          <ul className="space-y-4">
            {selectedDateTasks.map((task) => (
              <li
                key={task.id}
                className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="font-semibold text-lg text-gray-800 hover:text-blue-500">
                  {task.title}
                </h3>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500 w-full mt-8">
          No tasks for{" "}
          {singleSelectedDate ? singleSelectedDate.toDateString() : "this date"}
        </p>
      )}
    </div>
  );
};

export default TaskList;
