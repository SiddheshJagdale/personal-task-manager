"use client";

import React, { useEffect } from "react";
import useCurrentUser from "@/hooks/useCurrentuser";
import { useProjects } from "@/hooks/useProjects"; // Path to your custom hook
import { useProjectStore } from "@/zustand/useProjectStore"; // Import the Zustand store
import ProjectCard from "./ProjectCard"; // Import the ProjectCard component
import AddProjectButton from "./AddProjectButton";

const Projects = () => {
  // Fetch the current user's data
  const { data: currentUser, isLoading, error } = useCurrentUser();

  // Access Zustand store to get/set projects
  const { setProjects } = useProjectStore();

  // Fetch projects using the useProjects hook, passing the userId
  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    refetch,
  } = useProjects(currentUser?.id);

  // Trigger refetch if currentUser is available
  useEffect(() => {
    if (currentUser) {
      refetch();
    }
  }, [currentUser, refetch]);

  // Update Zustand store when projects are fetched
  useEffect(() => {
    if (projects) {
      // Ensure that the status and priority are correctly typed before passing to the store
      const typedProjects = projects.map((project) => ({
        ...project,
        status: project.status as "ongoing" | "completed", // Assert status type
        priority: project.priority as "low" | "medium" | "high", // Assert priority type
      }));
      setProjects(typedProjects);
    }
  }, [projects, setProjects]);

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (isProjectsLoading) {
    return <div>Loading projects...</div>;
  }

  if (error || isProjectsError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4 py-3">
      {projects?.length === 0 ? (
        <p>No projects found for this user.</p>
      ) : (
        projects?.map((project) => (
          <ProjectCard
            id={project.id}
            key={project.id}
            name={project.name}
            description={project.description}
            createdAt={project.createdAt}
            status={project.status as "ongoing" | "completed"} // Ensure correct type
            priority={project.priority as "low" | "medium" | "high"} // Ensure correct type
          />
        ))
      )}
      <AddProjectButton />
    </div>
  );
};

export default Projects;
