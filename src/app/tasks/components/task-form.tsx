import { Button } from "./button";
import { Input } from "./input";
import { ChangeEvent } from "react";

interface Task {
  title: string;
  description: string;
  category: "Work" | "Personal" | "Health";
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "In Progress" | "Completed";
  dueDate: string;
}

interface TaskFormProps {
  newTask: Task;
  editIndex: number | null;
  error: Partial<Record<keyof Task, string>>;
  setNewTask: (task: Task) => any;
  setEditIndex: (index: number | null) => void;
  setIsModalOpen: (open: boolean) => void;
  addTask: () => void;
  inputStyle?: string;
  theme: string | "dark" | "light";
}

export default function TaskForm({
  newTask,
  editIndex,
  error,
  setNewTask,
  setEditIndex,
  setIsModalOpen,
  addTask,
  inputStyle = "",
  theme,
}: TaskFormProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const inputBase = `w-full px-3 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === "dark" ? "!bg-gray-800 text-white border-gray-600" : "!bg-white !text-black border-gray-300"}`;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTask();
      }}
      className="space-y-4"
    >
      <div>
        <label className="block font-medium mb-1">Title</label>
        <Input
          name="title"
          value={newTask.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className={inputBase}
        />
        {error.title && <p className="text-red-500 text-sm mt-1">{error.title}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={newTask.description}
          onChange={handleChange}
          placeholder="Describe the task"
          rows={3}
          className={inputBase}
        />
        {error.description && <p className="text-red-500 text-sm mt-1">{error.description}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select name="category" value={newTask.category} onChange={handleChange} className={inputBase}>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Health">Health</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Priority</label>
          <select name="priority" value={newTask.priority} onChange={handleChange} className={inputBase}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Status</label>
          <select name="status" value={newTask.status} onChange={handleChange} className={inputBase}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          {error.status && <p className="text-red-500 text-sm mt-1">{error.status}</p>}
        </div>
        <div>
          <label className="block font-medium mb-1">Due Date</label>
          <Input
            name="dueDate"
            type="date"
            value={newTask.dueDate}
            onChange={handleChange}
            className={inputBase}
          />
          {error.dueDate && <p className="text-red-500 text-sm mt-1">{error.dueDate}</p>}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setIsModalOpen(false);
            setEditIndex(null);
          }}
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
          {editIndex !== null ? "Update Task" : "Add Task"}
        </Button>
      </div>
    </form>
  );
}
