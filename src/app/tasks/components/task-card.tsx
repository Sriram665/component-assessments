import { CheckCircle, Circle, Pencil, Trash2 } from "lucide-react";

interface Task {
  title: string;
  description: string;
  category: "Work" | "Personal" | "Health";
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "In Progress" | "Completed";
  dueDate: string;
}

interface Props {
  index: number;
  task: Task;
  editTask: (index: number) => void;
  deleteTask: (index: number) => void;
  markAsComplete: (index: number) => void;
  toggleSelect: () => void;
  selected: boolean;
  theme: string;
}

export default function TaskCard({
  index,
  task,
  editTask,
  deleteTask,
  markAsComplete,
  toggleSelect,
  selected,
  theme,
}: Props) {
  const badgeColor = {
    Work: "bg-blue-100 text-blue-800",
    Personal: "bg-green-100 text-green-800",
    Health: "bg-pink-100 text-pink-800",
    High: "bg-red-100 text-red-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Low: "bg-gray-100 text-gray-800",
    Pending: "bg-orange-100 text-orange-800",
    "In Progress": "bg-indigo-100 text-indigo-800",
    Completed: "bg-emerald-100 text-emerald-800",
  };

  const cardStyle =
    theme === "dark"
      ? "bg-gray-800 text-white border border-gray-700"
      : "bg-white text-black shadow";

  const isDone = task.status === "Completed";

  return (
    <div
      className={`relative rounded-xl p-4 transition-all duration-200 ${cardStyle} ${
        isDone ? "opacity-60 line-through" : ""
      } ${selected ? "ring-2 ring-blue-500" : ""}`}
    >
      <div className="absolute top-3 left-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={toggleSelect}
          className="form-checkbox h-4 w-4 text-blue-600"
        />
      </div>

      <div className="pl-6 flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => markAsComplete(index)}
            className={`text-green-500 hover:scale-110 transition-transform`}
            title="Toggle Complete"
          >
            {isDone ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Circle className="h-5 w-5" />
            )}
          </button>
          <h3 className="text-lg font-semibold leading-tight">{task.title}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => editTask(index)}
            className="text-gray-400 hover:text-blue-500"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteTask(index)}
            className="text-gray-400 hover:text-red-500"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-3 pl-6">{task.description}</p>

      <div className="pl-6 flex flex-wrap gap-2 text-xs font-medium">
        <span className={`px-2 py-1 rounded-full ${badgeColor[task.category]}`}>
          {task.category}
        </span>
        <span className={`px-2 py-1 rounded-full ${badgeColor[task.priority]}`}>
          {task.priority}
        </span>
        <span className={`px-2 py-1 rounded-full ${badgeColor[task.status]}`}>
          {task.status}
        </span>
        <span className="ml-auto text-xs text-gray-400">📅 {task.dueDate}</span>
      </div>
    </div>
  );
}
