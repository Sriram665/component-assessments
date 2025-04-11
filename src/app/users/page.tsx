'use client';


import React, { useEffect, useState } from "react";
import { User } from "./types/user";

import { useAuth } from "@/components/auth.context";
import { useFormContext } from "@/components/form.context";
import { useTheme } from "@/components/theme.context";
import { useRouter } from "next/navigation";
import UserForm from "./components/user-form";
import UserList from "./components/user-list";
import UserProfile from "./components/user-profile";

const initialUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    role: "Admin",
    department: "IT",
    location: "New York",
    joinDate: "2020-01-15",
    isActive: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    role: "Editor",
    department: "Content",
    location: "Los Angeles",
    joinDate: "2021-03-20",
    isActive: true,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    role: "Viewer",
    department: "Marketing",
    location: "Chicago",
    joinDate: "2019-11-05",
    isActive: false,
  },
  {
    id: 4,
    name: "Sara Williams",
    email: "sara@example.com",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    role: "Editor",
    department: "Design",
    location: "Seattle",
    joinDate: "2022-05-10",
    isActive: true,
  },
  {
    id: 5,
    name: "Mike Brown",
    email: "mike@example.com",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    role: "Viewer",
    department: "Sales",
    location: "Boston",
    joinDate: "2021-08-15",
    isActive: false,
  },
];

const UserDashboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { formData, setFormData, saveForm, resetForm } = useFormContext();
  const { user, logout } = useAuth();
  const router = useRouter();


  const [users, setUsers] = useState<User[]>([...initialUsers]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const storedUsers:any = localStorage.getItem('users');
    const userData = JSON.parse(storedUsers)
    if (storedUsers) setUsers((prev) => [...prev, userData ? userData : [] ]);
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleAddUser = (user: User) => {
    setUsers((prev) => [...prev, user]);
    setIsAdding(false);
  };

  const handleEditUser = (user: User) => {
    setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    setSelectedUser(null);
    setIsEditing(false);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    setSelectedUser(null);
  };

  const logOut = () => {
    logout();
    router.push("/");
  };

  return (
    <div className={`container mx-auto p-6 ${theme === "dark" ? "dark" : ""}`}>
      <div className="flex items-center justify-between mb-4">
        {!isAdding && !isEditing && !selectedUser && (
          <button
            onClick={() => setIsAdding(true)}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add New User
          </button>
        )}
      </div>

      {isAdding && (
        <UserForm
          initialData={formData}
          onSubmit={(user) => {
            handleAddUser(user);
            saveForm();
            resetForm();
          }}
          onCancel={() => setIsAdding(false)}
        />
      )}

      {isEditing && selectedUser && (
        <UserForm
          initialData={selectedUser}
          onSubmit={handleEditUser}
          onCancel={() => {
            setIsEditing(false);
            setSelectedUser(null);
          }}
        />
      )}

      {selectedUser && !isEditing && (
        <UserProfile
          user={selectedUser}
          onEdit={() => setIsEditing(true)}
          onBack={() => setSelectedUser(null)}
        />
      )}

      {!isAdding && !isEditing && !selectedUser && (
        <>
          <UserList users={users} onViewProfile={setSelectedUser} />
        </>
      )}
    </div>
  );
};

export default UserDashboard;
