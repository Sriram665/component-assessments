import React from 'react';
import UserDashboard from './components/user-dashboard';

export default function Home() {
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">User Management Dashboard</h1>
      <UserDashboard />
    </main>
  );
}
