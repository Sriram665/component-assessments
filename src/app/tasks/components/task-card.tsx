import { Pencil, Trash2 } from "lucide-react";
import React from "react";
import { Button } from "./button";

// Define Task type
interface Task {
  title: string;
  category: string;
  priority: string;
  dueDate: string;
}

// Define Props type
interface TaskCardProps {
  index: number;
  theme: string | "light" | "dark";
  editTask: (index: number) => void;
  deleteTask: (index: number) => void;
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({
  index,
  theme,
  editTask,
  deleteTask,
  task,
}) => {
  return (
    <div
      key={index}
      className={`rounded-xl shadow-md p-4 flex flex-col justify-between transition ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div>
        <h2 className="font-semibold text-lg mb-1 truncate">{task.title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Category: {task.category}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Priority: {task.priority}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Due: {task.dueDate}
        </p>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="ghost" onClick={() => editTask(index)}>
          <Pencil size={16} />
        </Button>
        <Button variant="ghost" onClick={() => deleteTask(index)}>
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
