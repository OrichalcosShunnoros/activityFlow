import React from "react";
import { useTaskStore } from "../store/taskStore";
import { format } from "date-fns";

export const GanttChart: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const tasksWithDates = tasks.filter((task) => task.startDate && task.endDate);

  return (
    <div className="overflow-x-none">
      <div className="min-w-[800px] p-4">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Gantt Chart
        </h2>
        <div className="space-y-2">
          {tasksWithDates.map((task) => (
            <div key={task.id} className="flex items-center">
              <div className="w-1/4 pr-4">
                <span className="text-sm font-medium dark:text-gray-200">
                  {task.title}
                </span>
              </div>
              <div className="w-3/4 h-6 relative">
                <div
                  className="absolute h-full rounded-full bg-primary-light dark:bg-primary"
                  style={{
                    left: "0%",
                    width: "100%",
                  }}
                ></div>
                <div className="absolute top-full mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {format(new Date(task.startDate!), "MMM d")} -{" "}
                  {format(new Date(task.endDate!), "MMM d")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
