import { create } from "zustand";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  isImportant: boolean;
  completed: boolean;
  projectId?: string;
}

interface TaskStore {
  // Task Management
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;

  // Task Modal
  isAddTaskOpen: boolean;
  openAddTask: () => void;
  closeAddTask: () => void;

  isEditTaskOpen: boolean;
  openEditTask: () => void;
  closeEditTask: () => void;

  // Task Form Data
  newTask: Omit<Task, "id">;
  setNewTaskData: (data: Partial<Task>) => void;
  resetNewTask: () => void;

  editTaskData: Task | null;
  setEditTaskData: (task: Task | null) => void;

  // Task Counts
  ongoingTaskCount: number;
  completedTaskCount: number;
  importantTaskCount: number;

  // Selected Date for Calendar
  selectedDate: Date | [Date, Date] | null;
  setSelectedDate: (date: Date | [Date, Date] | null) => void;

  // Selected Project ID
  selectedProjectId: string | null;
  setSelectedProjectId: (projectId: string | null) => void;
}

const initialNewTask = {
  title: "",
  description: "",
  dueDate: "",
  isImportant: false,
  completed: false,
  projectId: undefined,
};

export const useTaskStore = create<TaskStore>((set, get) => {
  const calculateCounts = (tasks: Task[]) => ({
    ongoingTaskCount: tasks.filter((t) => !t.completed).length,
    completedTaskCount: tasks.filter((t) => t.completed).length,
    importantTaskCount: tasks.filter((t) => t.isImportant).length,
  });

  const getFilteredTasks = () => {
    const { tasks, selectedProjectId } = get();
    return selectedProjectId
      ? tasks.filter((task) => task.projectId === selectedProjectId)
      : tasks;
  };

  const updateCounts = () => {
    const filteredTasks = getFilteredTasks();
    set({ ...calculateCounts(filteredTasks) });
  };

  return {
    tasks: [],
    setTasks: (tasks) => set({ tasks, ...calculateCounts(tasks) }),
    addTask: (task) =>
      set((state) => {
        const newTasks = [...state.tasks, task];
        return { tasks: newTasks, ...calculateCounts(newTasks) };
      }),
    updateTask: (taskId, updatedTask) =>
      set((state) => {
        const newTasks = state.tasks.map((t) =>
          t.id === taskId ? { ...t, ...updatedTask } : t
        );
        return { tasks: newTasks, ...calculateCounts(newTasks) };
      }),
    deleteTask: (taskId) =>
      set((state) => {
        const newTasks = state.tasks.filter((t) => t.id !== taskId);
        return { tasks: newTasks, ...calculateCounts(newTasks) };
      }),

    // Task Modal
    isAddTaskOpen: false,
    openAddTask: () => set({ isAddTaskOpen: true }),
    closeAddTask: () => set({ isAddTaskOpen: false, newTask: initialNewTask }),

    isEditTaskOpen: false,
    openEditTask: () => set({ isEditTaskOpen: true }),
    closeEditTask: () => set({ isEditTaskOpen: false, editTaskData: null }),

    // Task Form Data
    newTask: initialNewTask,
    setNewTaskData: (data) =>
      set((state) => ({ newTask: { ...state.newTask, ...data } })),
    resetNewTask: () => set({ newTask: initialNewTask }),

    editTaskData: null,
    setEditTaskData: (task) => set({ editTaskData: task }),

    // Task Counts
    ongoingTaskCount: 0,
    completedTaskCount: 0,
    importantTaskCount: 0,

    // Selected Date
    selectedDate: null,
    setSelectedDate: (date) => set({ selectedDate: date }),

    // Selected Project ID
    selectedProjectId: null,
    setSelectedProjectId: (projectId) => {
      set({ selectedProjectId: projectId });
      updateCounts(); // Update counts when project ID changes
    },
  };
});
