// useProjectStore.ts
import { create } from "zustand";

type ProjectStatus = "ongoing" | "completed" | "paused";
type ProjectPriority = "low" | "medium" | "high";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
}

interface ProjectStore {
  // Project Management
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (projectId: string, updatedProject: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
  setProjects: (projects: Project[]) => void;

  // Project Modals
  isAddProjectOpen: boolean;
  isEditProjectOpen: boolean;
  editProjectData: Project | null;
  openAddProject: () => void;
  closeAddProject: () => void;
  openEditProject: (project: Project) => void;
  closeEditProject: () => void;

  // Project Form Data
  newProject: Omit<Project, "id" | "createdAt">;
  setNewProjectData: (data: Partial<Project>) => void;
  resetNewProject: () => void;

  // Project Selection
  selectedProjectId: string | null;
  setSelectedProject: (projectId: string | null) => void;
}

const initialNewProject = {
  name: "",
  description: "",
  status: "ongoing" as ProjectStatus,
  priority: "medium" as ProjectPriority,
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (projectId, updatedProject) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId ? { ...p, ...updatedProject } : p
      ),
    })),
  deleteProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== projectId),
    })),
  setProjects: (projects) => set({ projects }),

  isAddProjectOpen: false,
  isEditProjectOpen: false,
  editProjectData: null,
  openAddProject: () => set({ isAddProjectOpen: true }),
  closeAddProject: () =>
    set({ isAddProjectOpen: false, newProject: initialNewProject }),
  openEditProject: (project) =>
    set({ isEditProjectOpen: true, editProjectData: project }),
  closeEditProject: () =>
    set({ isEditProjectOpen: false, editProjectData: null }),

  newProject: initialNewProject,
  setNewProjectData: (data) =>
    set((state) => ({ newProject: { ...state.newProject, ...data } })),
  resetNewProject: () => set({ newProject: initialNewProject }),

  // Project Selection State
  selectedProjectId: null,
  setSelectedProject: (projectId) => set({ selectedProjectId: projectId }),
}));
