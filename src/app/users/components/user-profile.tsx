
import React from 'react';
import { User } from '../types/user';

interface UserProfileProps {
  user: User;
  onEdit: () => void;
  onBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onEdit, onBack }) => {
  return (
    <div className="p-6 bg-[var(--card-bg)] text-[var(--text-color)] rounded-lg shadow space-y-6">
      <div className="flex items-center gap-4">
        <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full" />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-sm">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Location:</strong> {user.location}</p>
        </div>
        <div>
          <p><strong>Join Date:</strong> {user.joinDate}</p>
          <p><strong>Status:</strong> {user.isActive ? 'Active' : 'Inactive'}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
