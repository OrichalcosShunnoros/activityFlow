import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { Task } from "../store/taskStore";

type TaskColumnProps = {
  id: string;
  title: string;
  tasks: Task[];
};

export const TaskColumn: React.FC<TaskColumnProps> = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg min-w-[300px]"
    >
      <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-200">
        {title}
      </h3>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
