import React from "react";
import { CheckCircle, Calendar, LayoutDashboard } from "lucide-react";

const Featured = () => {
  return (
    <section className="py-16 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
      <div className="p-6 border rounded-lg shadow-md flex flex-col items-center">
        <CheckCircle className="text-blue-500 w-12 h-12 mb-4" />
        <h3 className="text-xl font-semibold">Task Management</h3>
        <p>
          Easily create, edit, and track tasks with a user-friendly interface.
        </p>
      </div>
      <div className="p-6 border rounded-lg shadow-md flex flex-col items-center">
        <Calendar className="text-blue-500 w-12 h-12 mb-4" />
        <h3 className="text-xl font-semibold">Calendar View</h3>
        <p>
          Plan ahead with an integrated calendar for better task scheduling.
        </p>
      </div>
      <div className="p-6 border rounded-lg shadow-md flex flex-col items-center">
        <LayoutDashboard className="text-blue-500 w-12 h-12 mb-4" />
        <h3 className="text-xl font-semibold">Dashboard</h3>
        <p>Get an overview of your productivity with a real-time dashboard.</p>
      </div>
    </section>
  );
};

export default Featured;
