import React, { useState } from 'react';
import UserCard from './user-card';
import { User } from '../types/user';

interface UserListProps {
  users: User[];
  onViewProfile: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onViewProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
                          user.email?.toLowerCase()?.includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'All' || 
      (filter === 'Active' && user.isActive) || 
      (filter === 'Inactive' && !user.isActive);

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All Users</option>
          <option value="Active">Active Users</option>
          <option value="Inactive">Inactive Users</option>
        </select>
      </div>
      {filteredUsers.length > 0 ? (
        filteredUsers.map(user => (
          <UserCard key={user.id} user={user} onViewProfile={onViewProfile} />
        ))
      ) : (
        <p>No users match the current filters.</p>
      )}
    </div>
  );
};

export default UserList;
