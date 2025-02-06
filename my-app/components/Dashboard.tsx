import React, { useEffect } from "react";
import Banner from "./Banner";
import TaskCalendar from "./Calendar";
import TaskList from "./Tasklist";
import Taskpane from "./Taskpane";
import useCurrentUser from "@/hooks/useCurrentuser";
import { useTaskStore } from "@/zustand/useTaskStore";
import { useProjectStore } from "@/zustand/useProjectStore";
import { useTasks } from "@/hooks/useTasks";
import { useProjects } from "@/hooks/useProjects";

const Dashboard = () => {
  const { data: currentUser } = useCurrentUser();
  const { setTasks } = useTaskStore();
  const { setProjects, selectedProjectId } = useProjectStore();

  // Fetch projects for the current user
  const { data: projects, isSuccess: projectsLoaded } = useProjects(
    currentUser?.id
  );

  // Fetch tasks only if a project is selected and a user exists
  const { data: tasks, isSuccess: tasksLoaded } = useTasks(
    selectedProjectId as string,
    currentUser?.id
  );

  useEffect(() => {
    if (projectsLoaded && projects) {
      setProjects(projects); // Store fetched projects in Zustand
    }
  }, [projects, projectsLoaded, setProjects]);

  useEffect(() => {
    if (tasksLoaded && tasks) {
      setTasks(tasks); // Store fetched tasks in Zustand
    }
  }, [tasks, tasksLoaded, setTasks]);

  return (
    <div className="p-2 md:p-3 lg:p-4 w-full h-auto">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <Banner />
        <TaskCalendar />
      </div>

      {/* Task List Section */}
      <div className="flex lg:flex-row flex-col-reverse gap-4 w-full h-full">
        <div className="w-full max-w-3xl lg:w-full rounded-lg h-full">
          <Taskpane />
        </div>
        <div className="w-full max-w-2xl lg:w-1/3 h-full">
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
