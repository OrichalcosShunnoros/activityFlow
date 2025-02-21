import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Task, useTaskStore } from "../store/taskStore";
import {
  Pencil,
  Trash2,
  Link,
  Tag,
  Calendar,
  Star,
  CheckCircle,
} from "lucide-react";
import { TaskModal } from "./TaskModal";

type TaskCardProps = {
  task: Task;
};

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const completeTask = useTaskStore((state) => state.completeTask);

  const [showDetails, setShowDetails] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm cursor-move ${
          task.status === "done" ? "opacity-50 line-through" : ""
        }`}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
              {task.title}
              {task.priority && (
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    priorityColors[task.priority]
                  }`}
                >
                  {task.priority}
                </span>
              )}
            </h4>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                completeTask(task.id);
              }}
              className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200"
            >
              <CheckCircle size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowEditModal(true);
              }}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(task.id);
              }}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails((prev) => !prev);
            }}
            className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {showDetails ? "Ocultar detalles" : "Mostrar detalles"}
          </button>
        </div>

        {showDetails && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {task.description}
            </p>

            {task.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {task.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                    style={{ backgroundColor: tag.color, color: "#fff" }}
                  >
                    <Tag size={12} />
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {task.links.length > 0 && (
              <div className="mt-2">
                {task.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:text-primary-dark text-sm"
                  >
                    <Link size={12} />
                    {link.title}
                  </a>
                ))}
              </div>
            )}

            {(task.startDate || task.endDate) && (
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Calendar size={12} />
                {task.startDate && (
                  <span>
                    Begin: {new Date(task.startDate).toLocaleDateString()}
                  </span>
                )}
                {task.endDate && (
                  <span className="ml-2">
                    End: {new Date(task.endDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            )}

            {task.points > 0 && (
              <div className="mt-2 text-xs text-yellow-500 dark:text-yellow-400 flex items-center gap-1">
                <Star size={12} />
                {task.points} points
              </div>
            )}
          </div>
        )}
      </div>

      {showEditModal && (
        <TaskModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          task={task}
        />
      )}
    </>
  );
};
