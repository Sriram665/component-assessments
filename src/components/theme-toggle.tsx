// components/theme-toggle.tsx

"use client";

import { useTheme } from "@/components/theme.context";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-gray-300 dark:bg-gray-700 hover:opacity-80 transition"
      title="Toggle Theme"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
    //  <Button onClick={toggleTheme} variant="ghost">
    //           {theme === "dark" ? <Sun /> : <Moon />}{" "}
    //           <span className="ml-2 hidden sm:inline">
    //             Switch to {theme === "dark" ? "Light" : "Dark"}
    //           </span>
    //         </Button>
  );
};

export default ThemeToggle;
