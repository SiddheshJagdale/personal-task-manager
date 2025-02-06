import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const headerTitle = () => {
    switch (title) {
      case "dashboard":
        return "Dashboard";
      case "allTasks":
        return "All Tasks";
      case "ongoing":
        return "Ongoing";
      case "projects":
        return "Projects";
      case "completed":
        return "Completed";
      case "important":
        return "Important";
      default:
        return "Dashboard";
    }
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long", // Full month name
    day: "numeric", // Day as a number
    year: "numeric", // Full year
  }).format(new Date());

  console.log(formattedDate); // Example output: "February 2, 2025"

  return (
    <div className="flex flex-row justify-between items-center h-auto w-full mb-3 ">
      <div className="flex flex-row max-w-3xl bg-gray-600 w-full rounded-md px-3 py-2">
        <h1 className="text-xl font-semibold text-gray-200  ">
          {headerTitle()}
        </h1>
      </div>

      <div className="hidden lg:flex justify-end text-md font-medium text-gray-600 max-w-md w-full rounded-md px-3 py-1">
        {formattedDate}
      </div>
    </div>
  );
};

export default Header;
