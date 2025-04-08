import React from "react";
import UserDashboard from "./users/components/user-dashboard";

export default function Home() {
  return (
    <main className="p-6 min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
      <UserDashboard />
    </main>
  );
}
