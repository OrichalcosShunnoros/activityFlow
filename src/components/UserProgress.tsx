import React from "react";
import { Trophy, Award } from "lucide-react";
import { useTaskStore } from "../store/taskStore";

export const UserProgress: React.FC = () => {
  const userProgress = useTaskStore((state) => state.userProgress);
  const experienceToNextLevel = 100;
  const progressPercentage =
    ((userProgress.experience % experienceToNextLevel) /
      experienceToNextLevel) *
    100;

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Trophy className="text-yellow-500" size={24} />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Level {userProgress.level}
        </h3>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-4">
        <div
          className="bg-primary h-2.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-300">
        {userProgress.experience} XP
      </div>

      {userProgress.badges.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <Award size={16} />
            Badges
          </h4>
          <div className="flex flex-wrap gap-2">
            {userProgress.badges.map((badge, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary-dark"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
