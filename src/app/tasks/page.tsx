"use client";

import { useTheme } from "@/components/theme.context";
import { isThisMonth, isThisWeek, isToday, parseISO } from "date-fns";
import { Download, Plus, Upload } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "./components/button";
import { Input } from "./components/input";
import TaskCard from "./components/task-card";
import TaskForm from "./components/task-form";

interface Task {
  id: string;
  title: string;
  description: string;
  category: "Work" | "Personal" | "Health";
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "In Progress" | "Completed";
  dueDate: string;
}

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [dueDateFilter, setDueDateFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [newTask, setNewTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    category: "Work",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<Partial<Record<keyof Task, string>>>({});
  const [sortBy, setSortBy] = useState("default");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    let data = stored ? JSON.parse(stored) : [];
    data = data.map((task: any) => ({
      ...task,
      id: task.id || crypto.randomUUID(),
    }));
    setTasks(data);
    setFilteredTasks(data);
  }, []);

  useEffect(() => {
    applyFilters(tasks, search, sortBy);
  }, [tasks, search, categoryFilter, priorityFilter, statusFilter, dueDateFilter, sortBy]);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const applyFilters = (
    data: Task[],
    searchText: string,
    sortField: string
  ) => {
    let result = data.filter((task) =>
      task.title.toLowerCase().includes(searchText.toLowerCase())
    );

    if (categoryFilter !== "All")
      result = result.filter((t) => t.category === categoryFilter);

    if (priorityFilter !== "All")
      result = result.filter((t) => t.priority === priorityFilter);

    if (statusFilter !== "All")
      result = result.filter((t) => t.status === statusFilter);

    if (dueDateFilter !== "All") {
      result = result.filter((t) => {
        const date = parseISO(t.dueDate);
        return dueDateFilter === "Today"
          ? isToday(date)
          : dueDateFilter === "This Week"
          ? isThisWeek(date)
          : isThisMonth(date);
      });
    }

    if (sortField === "dueDate") {
      result.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    } else if (sortField === "priority") {
      const order = { High: 1, Medium: 2, Low: 3 };
      result.sort((a, b) => order[a.priority] - order[b.priority]);
    } else if (sortField === "status") {
      const order = { Pending: 1, "In Progress": 2, Completed: 3 };
      result.sort((a, b) => order[a.status] - order[b.status]);
    }

    setFilteredTasks(result);
  };

  const exportTasks = () => {
    const headers = [
      "id",
      "title",
      "description",
      "category",
      "priority",
      "status",
      "dueDate",
    ];
    const rows = tasks.map((task) => [
      task.id,
      task.title,
      task.description,
      task.category,
      task.priority,
      task.status,
      task.dueDate,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tasks.csv";
    link.click();
  };

  const importTasks = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        const rows = text.split("\n");
        const headers = rows[0].split(",");
        const taskData = rows.slice(1).map((row) => {
          const values = row.split(",");
          const task: Task = {
            id: values[0] || crypto.randomUUID(),
            title: values[1],
            description: values[2],
            category: values[3] as Task["category"],
            priority: values[4] as Task["priority"],
            status: values[5] as Task["status"],
            dueDate: values[6],
          };
          return task;
        });

        setTasks(taskData);
        setFilteredTasks(taskData);
        localStorage.setItem("tasks", JSON.stringify(taskData));
      } catch {
        alert("Invalid file format");
      }
    };
    reader.readAsText(file);
  };

  const deleteTask = (index: number) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    setFilteredTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const markAsComplete = (index: number) => {
    const updated = [...tasks];
    updated[index].status = "Completed";
    setTasks(updated);
    setFilteredTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const editTask = (index: number) => {
    setNewTask(tasks[index]);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const addTask = () => {
    const errors: Partial<Record<keyof Task, string>> = {};
    if (!newTask.title.trim()) errors.title = "Title is required.";
    if (!newTask.description.trim())
      errors.description = "Description is required.";
    if (!newTask.dueDate.trim()) errors.dueDate = "Due date is required.";
    if (!newTask.status) errors.status = "Status is required.";
    if (Object.keys(errors).length) {
      setError(errors);
      return;
    }

    const updatedTasks = [...tasks];
    if (editIndex !== null) {
      updatedTasks[editIndex] = newTask;
    } else {
      updatedTasks.push({ ...newTask, id: crypto.randomUUID() });
    }

    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setNewTask({
      id: "",
      title: "",
      description: "",
      category: "Work",
      priority: "Medium",
      status: "Pending",
      dueDate: "",
    });
    setEditIndex(null);
    setIsModalOpen(false);
    setError({});
  };

  const inputBase = `w-full px-3 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === "dark" ? "!bg-gray-800 text-white border-gray-600" : "!bg-white !text-black border-gray-300"}`;

  return (
    <div className={`min-h-screen p-6 ${
      theme === "dark"
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
        : "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-black"
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-2xl font-bold">
          <span className="text-purple-500">🗂️</span>
          <span>Task Manager</span>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6 w-full flex-wrap">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-start w-full lg:w-auto flex-grow">
          {/* Search */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Search</label>
            <Input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search tasks..."
              className={inputBase + " w-full sm:w-auto"}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Category</label>
            <select onChange={(e) => setCategoryFilter(e.target.value)} className="rounded px-3 py-2 border shadow">
              <option>All</option>
              <option>Work</option>
              <option>Personal</option>
              <option>Health</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Priority</label>
            <select onChange={(e) => setPriorityFilter(e.target.value)} className="rounded px-3 py-2 border shadow">
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Status</label>
            <select onChange={(e) => setStatusFilter(e.target.value)} className="rounded px-3 py-2 border shadow">
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 whitespace-nowrap">Due Date</label>
            <select onChange={(e) => setDueDateFilter(e.target.value)} className="rounded px-3 py-2 border shadow">
              <option>All</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-end gap-2">
          <Button
            variant="default"
            onClick={() => {
              setNewTask({
                id: "",
                title: "",
                description: "",
                category: "Work",
                priority: "Medium",
                status: "Pending",
                dueDate: "",
              });
              setEditIndex(null);
              setError({});
              setIsModalOpen(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="mr-1 h-4 w-4" /> Add Task
          </Button>

          <Button
            variant="default"
            onClick={() => {
              const updated: any = tasks.map((task, idx) =>
                selectedTasks.includes(idx) ? { ...task, status: "Completed" } : task
              );
              setTasks(updated);
              setFilteredTasks(updated);
              localStorage.setItem("tasks", JSON.stringify(updated));
              setSelectedTasks([]);
            }}
          >
            ✅ Mark as Completed
          </Button>

          <Button
            variant="destructive"
            onClick={() => {
              const updated = tasks.filter((_, idx) => !selectedTasks.includes(idx));
              setTasks(updated);
              setFilteredTasks(updated);
              localStorage.setItem("tasks", JSON.stringify(updated));
              setSelectedTasks([]);
            }}
          >
            🗑️ Mark as Deleted
          </Button>

          <Button onClick={exportTasks}>
            <Download className="mr-2" />
            Export CSV
          </Button>

          <Button onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2" />
            Import CSV
          </Button>

          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={importTasks}
            className="hidden"
          />
        </div>
      </div>

      {/* Task Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTasks.map((task, index) => (
          <TaskCard
            key={task.id}
            index={index}
            task={task}
            editTask={() => editTask(index)}
            deleteTask={() => deleteTask(index)}
            markAsComplete={() => markAsComplete(index)}
            theme={theme}
            selected={selectedTasks.includes(index)}
            toggleSelect={() =>
              setSelectedTasks((prev) =>
                prev.includes(index)
                  ? prev.filter((i) => i !== index)
                  : [...prev, index]
              )
            }
          />
        ))}
      </div>

      {/* Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg flex justify-center items-center z-50">
          <div
            className={`transition-all duration-300 scale-95 transform rounded-2xl p-6 w-[90%] max-w-lg shadow-2xl border border-white/20 ${
              theme === "dark"
                ? "bg-white/10 text-white"
                : "bg-white text-black"
            }`}
          >
            <TaskForm
              editIndex={editIndex}
              newTask={newTask}
              error={error}
              setNewTask={setNewTask as any}
              setEditIndex={setEditIndex}
              setIsModalOpen={setIsModalOpen}
              addTask={addTask}
              inputStyle="rounded-md px-3 py-2 border"
              theme={theme}
            />
          </div>
        </div>
      )}
    </div>
  );
}