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
    <div className="flex flex-col md:flex-row max-w-2xl text-black bg-gray-50 px-3 py-2 shadow-lg rounded-lg w-full h-full">
      {selectedDateTasks.length > 0 ? (
        <div className="w-full">
          <h3 className="text-lg font-semibold text-center">
            Tasks for {singleSelectedDate?.toDateString()}:
          </h3>
          <ul className="list-disc pl-4 mt-2">
            {selectedDateTasks.map((task) => (
              <li key={task.id} className="mb-2">
                <h4 className="font-semibold">{task.title}</h4>
                <p>{task.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500 w-full">
          No tasks for{" "}
          {singleSelectedDate ? singleSelectedDate.toDateString() : "this date"}
        </p>
      )}
    </div>
  );
};

export default TaskList;
