'use client';

import React from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth.context";
import ThemeToggle from "@/components/theme-toggle";
import LogoutButton from "@/components/logout-button";

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-800 shadow-md">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>
      <nav className="flex items-center gap-4">
        {user && (
          <>
            <Link
              href="/users"
              className="text-sm font-medium text-gray-800 dark:text-white hover:underline"
            >
              Users
            </Link>
            <Link
              href="/tasks"
              className="text-sm font-medium text-gray-800 dark:text-white hover:underline"
            >
              Tasks
            </Link>
          </>
        )}
        <ThemeToggle />
        <LogoutButton />
      </nav>
    </header>
  );
};

export default Header;
