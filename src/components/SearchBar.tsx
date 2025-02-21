import React, { useState } from "react";
import { Search } from "lucide-react";
import { useTaskStore } from "../store/taskStore";

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const searchTasks = useTaskStore((state) => state.searchTasks);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    searchTasks(newQuery);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
        placeholder="Search tasks..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};
