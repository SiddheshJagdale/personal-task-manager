"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import Projects from "@/components/Projects";
import AllTasks from "@/components/AllTasks";
import Completed from "@/components/Completed";
import Important from "@/components/Important";
import Ongoing from "@/components/Ongoing";

const Main = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "projects":
        return <Projects />;
      case "allTasks":
        return <AllTasks />;
      case "completed":
        return <Completed />;
      case "ongoing":
        return <Ongoing />;
      case "important":
        return <Important />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen bg-gray-400 w-full shadow-lg">
      {/* Sidebar */}
      <aside className="w-full md:w-64 lg:w-72 xl:w-80 p-1 md:p-2">
        <Sidebar onTabChange={handleTabChange} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-1 md:p-2">
        <div className="h-full bg-gray-200 rounded-lg shadow-sm p-2 md:p-3 lg:p-4">
          <Header title={activeTab} />
          <div className="h-[calc(100%-4rem)] overflow-y-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;