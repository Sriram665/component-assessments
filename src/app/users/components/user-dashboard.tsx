'use client';

import React, { useState } from 'react';
import { useTheme } from '../../../components/theme.context';
import UserList from './user-list';
import UserForm from './user-form';
import UserProfile from './user-profile';
import { User } from '../types/user';

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
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddUser = (user: User) => {
    setUsers(prev => [...prev, user]);
    setIsAdding(false);
  };

  const handleEditUser = (user: User) => {
    setUsers(prev => prev.map(u => (u.id === user.id ? user : u)));
    setSelectedUser(null);
    setIsEditing(false);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    setSelectedUser(null);
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={toggleTheme}
        className="mb-4 mr-5 px-4 py-2 bg-[var(--btn-bg)] text-[var(--btn-text)] rounded"
      >
        Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      {isAdding && (
        <UserForm onSubmit={handleAddUser} onCancel={() => setIsAdding(false)} />
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
          <button
            onClick={() => setIsAdding(true)}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add New User
          </button>
          <UserList users={users} onViewProfile={setSelectedUser} />
        </>
      )}
    </div>
  );
};

export default UserDashboard;
