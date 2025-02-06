import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import AddTaskButton from "./AddTaskButton";
import LogoutButton from "./LogoutButton";
import useCurrentUser from "@/hooks/useCurrentuser";
import { useProjectStore } from "@/zustand/useProjectStore";
import { useProjects } from "@/hooks/useProjects";

const tabs = [
  { name: "Dashboard", value: "dashboard" },
  { name: "Projects", value: "projects" },
  { name: "All tasks", value: "allTasks" },
  { name: "Ongoing", value: "ongoing" },
  { name: "Completed", value: "completed" },
  { name: "Important", value: "important" },
];

interface SidebarProps {
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onTabChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const { data: currentUser } = useCurrentUser();
  const { projects, setSelectedProject, setProjects } = useProjectStore();
  const { data: Projects } = useProjects(currentUser?.id);

  useEffect(() => {
    if (Projects) {
      setProjects(Projects);
    }
  }, [Projects, setProjects]);

  useEffect(() => {
    if (projects?.length > 0 && selectedProjectId === null) {
      setSelectedProject(projects[0].id);
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId, setSelectedProject]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleTabClick = (tabValue: string) => {
    onTabChange(tabValue);
    closeSidebar();
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedProject(selectedId);
    setSelectedProjectId(selectedId);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white z-50 transform transition-transform duration-300 shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:relative sm:translate-x-0 sm:w-full sm:h-full sm:rounded-lg sm:shadow-lg sm:border-r sm:border-neutral-700`}
      >
        <div className="flex flex-col w-full h-full p-4">
          <div
            className="md:hidden text-blue-500 text-2xl flex flex-row items-center justify-end cursor-pointer"
            onClick={closeSidebar}
          >
            <IoMdClose />
          </div>

          {/* Profile Section */}
          <div className="mb-10 flex flex-col items-center gap-4">
            <div className="bg-gray-400 h-12 w-12 rounded-full"></div>
            <div className="text-black">
              <div className="text-lg font-medium">{currentUser?.name}</div>
            </div>
          </div>

          {/* Project Selection */}
          <div className="mb-4 flex items-center justify-center w-full ">
            <select
              id="project-select"
              value={selectedProjectId || ""}
              onChange={handleProjectChange}
              className="mt-2 p-2 bg-white border max-w-lg rounded-md  text-black focus:outline-none focus:ring-2 focus:ring-blue-500 border-blue-300"
            >
              {projects?.map((project, index) => (
                <option key={index} value={project.id} className="text-black">
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Navigation Tabs */}
          <div className="flex-grow flex flex-col items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.value} // ✅ Unique key fix
                onClick={() => handleTabClick(tab.value)}
                className="text-lg py-1 px-6 rounded-md transition-colors duration-200 text-gray-500 hover:bg-blue-500 hover:text-white"
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Add Task Button */}
          <AddTaskButton />

          <div className="flex flex-row items-center justify-center w-full">
            <LogoutButton />
          </div>
        </div>
      </div>

      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 p-3 bg-neutral-800 rounded-md text-white shadow-md z-50 sm:hidden"
        >
          <GiHamburgerMenu size={24} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
