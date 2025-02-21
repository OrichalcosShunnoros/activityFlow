import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TaskTag = {
  id: string;
  name: string;
  color: string;
};

export type TaskLink = {
  url: string;
  title: string;
};

export type TaskConnection = {
  id: string;
  sourceId: string;
  targetId: string;
  description: string;
};

export type TaskReminder = {
  id: string;
  taskId: string;
  date: Date;
  message: string;
  isCompleted: boolean;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "doing" | "done" | "blocked";
  startDate?: Date;
  endDate?: Date;
  tags: TaskTag[];
  links: TaskLink[];
  attachments: string[];
  priority: "low" | "medium" | "high";
  points: number;
  completedAt?: Date;
};

type UserProgress = {
  level: number;
  experience: number;
  badges: string[];
};

type TaskStore = {
  tasks: Task[];
  connections: TaskConnection[];
  reminders: TaskReminder[];
  userProgress: UserProgress;
  tags: TaskTag[];
  addTask: (
    task: Omit<Task, "id" | "tags" | "links" | "attachments" | "points">
  ) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, status: Task["status"]) => void;
  addTag: (taskId: string, tag: Omit<TaskTag, "id">) => void;
  removeTag: (taskId: string, tagId: string) => void;
  addLink: (taskId: string, link: TaskLink) => void;
  removeLink: (taskId: string, url: string) => void;
  addConnection: (connection: Omit<TaskConnection, "id">) => void;
  removeConnection: (sourceId: string, targetId: string) => void;
  addReminder: (reminder: Omit<TaskReminder, "id" | "isCompleted">) => void;
  completeReminder: (reminderId: string) => void;
  searchTasks: (query: string) => Task[];
  completeTask: (taskId: string) => void;
};

const POINTS_PER_TASK = 10;
const EXPERIENCE_PER_LEVEL = 100;

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      connections: [],
      reminders: [],
      tags: [],
      userProgress: {
        level: 1,
        experience: 0,
        badges: [],
      },

      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: crypto.randomUUID(),
              tags: [],
              links: [],
              attachments: [],
              points: POINTS_PER_TASK,
            },
          ],
        })),

      updateTask: (id, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
          connections: state.connections.filter(
            (conn) => conn.sourceId !== id && conn.targetId !== id
          ),
          reminders: state.reminders.filter((rem) => rem.taskId !== id),
        })),

      moveTask: (taskId, newStatus) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          ),
        })),

      addTag: (taskId, tag) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  tags: [...task.tags, { ...tag, id: crypto.randomUUID() }],
                }
              : task
          ),
        })),

      removeTag: (taskId, tagId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, tags: task.tags.filter((tag) => tag.id !== tagId) }
              : task
          ),
        })),

      addLink: (taskId, link) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, links: [...task.links, link] }
              : task
          ),
        })),

      removeLink: (taskId, url) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  links: task.links.filter((link) => link.url !== url),
                }
              : task
          ),
        })),

      addConnection: (connection) =>
        set((state) => ({
          connections: [
            ...state.connections,
            { ...connection, id: crypto.randomUUID() },
          ],
        })),

      removeConnection: (sourceId, targetId) =>
        set((state) => ({
          connections: state.connections.filter(
            (conn) =>
              !(conn.sourceId === sourceId && conn.targetId === targetId)
          ),
        })),

      addReminder: (reminder) =>
        set((state) => ({
          reminders: [
            ...state.reminders,
            { ...reminder, id: crypto.randomUUID(), isCompleted: false },
          ],
        })),

      completeReminder: (reminderId) =>
        set((state) => ({
          reminders: state.reminders.map((rem) =>
            rem.id === reminderId ? { ...rem, isCompleted: true } : rem
          ),
        })),

      searchTasks: (query) => {
        const state = get();
        const searchLower = query.toLowerCase();
        return state.tasks.filter(
          (task) =>
            task.title.toLowerCase().includes(searchLower) ||
            task.description.toLowerCase().includes(searchLower) ||
            task.tags.some((tag) =>
              tag.name.toLowerCase().includes(searchLower)
            )
        );
      },

      completeTask: (taskId) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === taskId);
          if (!task || task.status === "done") return state;

          const earnedPoints = task.points;
          let { level, experience } = state.userProgress;

          experience += earnedPoints;
          while (experience >= EXPERIENCE_PER_LEVEL) {
            experience -= EXPERIENCE_PER_LEVEL;
            level += 1;
          }

          return {
            tasks: state.tasks.map((t) =>
              t.id === taskId
                ? { ...t, status: "done", completedAt: new Date() }
                : t
            ),
            userProgress: {
              level,
              experience,
              badges: state.userProgress.badges,
            },
          };
        }),
    }),
    { name: "task-storage" }
  )
);
