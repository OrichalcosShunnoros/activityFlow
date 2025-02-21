import { DndContext, DragEndEvent, closestCorners } from "@dnd-kit/core";
import { TaskColumn } from "./TaskColumn";
import { useTaskStore } from "../store/taskStore";

export const TaskBoard: React.FC = () => {
  const { tasks, moveTask } = useTaskStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      moveTask(active.id as string, over.id as any);
    }
  };

  const columns = [
    { id: "todo", title: "To Do" },
    { id: "doing", title: "In Progress" },
    { id: "done", title: "Done" },
    { id: "blocked", title: "Blocked" },
  ];

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-none p-4 max-h-80 overflow-y-auto custom-scrollbar">
        {columns.map((column) => (
          <TaskColumn
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={tasks.filter((task) => task.status === column.id)}
          />
        ))}
      </div>
    </DndContext>
  );
};
