import { useState } from "react";
import { TaskBoard } from "./components/TaskBoard";
import { TaskModal } from "./components/TaskModal";
import { GanttChart } from "./components/GanttChart";
import { ThemeToggle } from "./components/ThemeToggle";
import { SearchBar } from "./components/SearchBar";
import { UserProgress } from "./components/UserProgress";
import { Plus } from "lucide-react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Activity Flow
          </h1>
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <TaskBoard />
            <div className="mt-8">
              <GanttChart />
            </div>
          </div>
          <div className="lg:col-span-1">
            <UserProgress />
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-accent dark:bg-accent-dark text-white shadow-lg hover:bg-accent-dark dark:hover:bg-accent transition-colors"
      >
        <Plus size={24} />
      </button>

      <ThemeToggle />

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
