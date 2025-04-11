"use client";

import { useTheme } from "@/components/theme.context";
import { Download, Moon, Plus, Sun, Upload } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "./components/button";
import { Input } from "./components/input";
import TaskCard from "./components/task-card";

interface Task {
  title: string;
  category: "Work" | "Personal" | "Health";
  priority: "High" | "Medium" | "Low";
  dueDate: string;
}

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState<string>("");
  const [user, setUser] = useState<{ name?: string } | null>(null);
  const [newTask, setNewTask] = useState<Task>({
    title: "",
    category: "Work",
    priority: "Medium",
    dueDate: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]") as Task[];
    if (storedUser) setUser(JSON.parse(storedUser));
    if (!storedTasks.length) {
      const dummyTasks: Task[] = [
        {
          title: "Finish UI Design",
          category: "Work",
          priority: "High",
          dueDate: "2025-04-30",
        },
        {
          title: "Doctor Appointment",
          category: "Health",
          priority: "Medium",
          dueDate: "2025-04-20",
        },
        {
          title: "Buy Groceries",
          category: "Personal",
          priority: "Low",
          dueDate: "2025-04-15",
        },
      ];
      setTasks(dummyTasks);
      setFilteredTasks(dummyTasks);
      localStorage.setItem("tasks", JSON.stringify(dummyTasks));
    } else {
      setTasks(storedTasks);
      setFilteredTasks(storedTasks);
    }
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value);
    setFilteredTasks(
      tasks.filter((task) => task.title.toLowerCase().includes(value.toLowerCase()))
    );
  };

  const filterByCategory = (category: string) => {
    if (category === "All") return setFilteredTasks(tasks);
    setFilteredTasks(tasks.filter((task) => task.category === category));
  };

  const exportToCSV = () => {
    const csvRows = [
      ["Title", "Category", "Priority", "DueDate"],
      ...tasks.map((t) => [t.title, t.category, t.priority, t.dueDate]),
    ];
    const csvContent = csvRows.map((row) =>
      row.map(String).map((v) => `"${v}"`).join(",")
    ).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "tasks.csv");
    link.click();
  };

  const importFromCSV = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const lines = (e.target?.result as string).split("\n");
      const importedTasks = lines
        .slice(1)
        .map((line) => {
          const [title, category, priority, dueDate] = line.replace(/"/g, "").split(",");
          return title && category
            ? {
                title: title.trim(),
                category: category.trim() as Task["category"],
                priority: priority?.trim() as Task["priority"],
                dueDate: dueDate?.trim() || "",
              }
            : null;
        })
        .filter(Boolean) as Task[];
      const updatedTasks = [...tasks];
      importedTasks.forEach((imported) => {
        const index = updatedTasks.findIndex(
          (t) => t.title.toLowerCase() === imported.title.toLowerCase()
        );
        if (index !== -1) updatedTasks[index] = imported;
        else updatedTasks.push(imported);
      });
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };
    reader.readAsText(file);
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;
    const updatedTasks = [...tasks];
    const existingIndex = updatedTasks.findIndex(
      (task) => task.title.toLowerCase() === newTask.title.toLowerCase()
    );
    if (editIndex !== null) {
      updatedTasks[editIndex] = newTask;
      setEditIndex(null);
    } else if (existingIndex !== -1) {
      updatedTasks[existingIndex] = newTask;
    } else {
      updatedTasks.push(newTask);
    }
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setNewTask({ title: "", category: "Work", priority: "Medium", dueDate: "" });
  };

  const editTask = (index: number) => {
    setNewTask(tasks[index]);
    setEditIndex(index);
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const inputStyle = `rounded-md border p-2 shadow-sm outline-none ${
    theme === "dark" ? "bg-gray-800 text-white border-gray-600" : "!bg-white text-black border-gray-300"
  }`;

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      } min-h-screen p-6 sm:p-8`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Welcome, {user?.name || "Guest"}
        </h1>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <Input
          placeholder="Search tasks..."
          value={search}
          className={`${inputStyle} w-full sm:w-60`}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <select className={`${inputStyle}`} onChange={(e) => filterByCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Health">Health</option>
        </select>
        <Button variant="outline" onClick={exportToCSV}>
          <Download className="mr-2" />
          Export
        </Button>
        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
          <Upload className="mr-2" />
          Import
        </Button>
        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          onChange={importFromCSV}
          className="hidden"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-6">
        <Input
          placeholder="Task title"
          value={newTask.title}
          className={inputStyle}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <select
          className={inputStyle}
          value={newTask.category}
          onChange={(e) => setNewTask({ ...newTask, category: e.target.value as Task["category"] })}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Health">Health</option>
        </select>
        <select
          className={inputStyle}
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task["priority"] })}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <Input
          type="date"
          value={newTask.dueDate}
          className={inputStyle}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
      </div>

      <div className="mb-8">
        <Button variant="default" onClick={addTask} className="w-full sm:w-auto">
          <Plus className="mr-2" />
          {editIndex !== null ? "Update Task" : "Add Task"}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTasks.map((task, index) => (
          <TaskCard
            key={index}
            index={index}
            task={task}
            deleteTask={deleteTask}
            editTask={editTask}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
}
