import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import AddTaskButton from "./AddTaskButton";
import LogoutButton from "./LogoutButton";
import useCurrentUser from "@/hooks/useCurrentuser";
import { useProjectStore } from "@/zustand/useProjectStore";
import { useProjects } from "@/hooks/useProjects";
import useEditUser from "@/zustand/useUserStore";
import Avatar from "./Avatar";

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
  const [showUserInfo, setShowUserInfo] = useState(false); // State to toggle hover info
  const userEditModal = useEditUser();
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

  const handleUserHover = () => setShowUserInfo(true);
  const handleUserLeave = () => setShowUserInfo(false);

  const handleEditClick = () => userEditModal.onOpen(); // Open modal on edit button click

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

          {/* Profile Section with hover effect */}
          <div
            className="mb-4 flex flex-col items-center gap-1 relative"
            onMouseEnter={handleUserHover}
            onMouseLeave={handleUserLeave}
          >
            <Avatar image={currentUser?.profileImage} />
            <div className="text-black text-center">
              <div className="text-lg font-medium">{currentUser?.name}</div>
            </div>

            {/* Hovered User Information */}
            {showUserInfo && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 p-4 bg-white border shadow-lg rounded-lg w-48 sm:w-56 lg:w-64 z-50">
                {/* Centering the Avatar */}
                <div className="flex justify-center">
                  <Avatar image={currentUser?.profileImage} />
                </div>

                {/* Centering Name & Email */}
                <div className="text-center mt-2">
                  <div className="font-medium text-black">
                    {currentUser?.name}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    {currentUser?.email}
                  </div>
                </div>

                {/* Aligning Edit Button to the Left */}
                <button
                  onClick={handleEditClick}
                  className="mt-2 text-blue-500 hover:text-blue-700 text-xs sm:text-sm text-left w-full"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Project Selection */}
          {selectedProjectId !== null && (
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
          )}

          {/* Navigation Tabs */}
          <div className="flex-grow flex flex-col items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
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
          className="fixed top-4 left-4 p-3 bg-gray-700 rounded-md text-white shadow-md z-50 sm:hidden"
        >
          <GiHamburgerMenu size={24} />
        </button>
      )}

      {/* Edit User Modal */}
      {/* {isModalOpen && <EditUserModal onClose={() => setIsModalOpen(false)} />} */}
    </>
  );
};

export default Sidebar;
