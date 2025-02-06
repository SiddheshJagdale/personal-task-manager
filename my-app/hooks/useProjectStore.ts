"use client";

import { create } from "zustand";

interface ProjectState {
  projectData: {
    name: string;
    description: string;
    status: "ongoing" | "completed";
    priority: "low" | "medium" | "high";
  };
  setProjectData: (project: Partial<ProjectState["projectData"]>) => void;
  resetProjectData: () => void;
}

const useProjectStore = create<ProjectState>((set) => ({
  projectData: {
    name: "",
    description: "",
    status: "ongoing", // Default status
    priority: "medium", // Default priority
  },
  setProjectData: (project) =>
    set((state) => ({ projectData: { ...state.projectData, ...project } })),
  resetProjectData: () =>
    set({
      projectData: {
        name: "",
        description: "",
        status: "ongoing",
        priority: "medium",
      },
    }),
}));

export default useProjectStore;
