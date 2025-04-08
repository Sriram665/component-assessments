'use client';

import React, { useState } from 'react';
import { User } from '../types/user';

interface UserFormProps {
  initialData?: User;
  onSubmit: (user: User) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<User>({
    id: initialData?.id || Date.now(),
    name: initialData?.name || '',
    email: initialData?.email || '',
    role: initialData?.role || 'Viewer',
    avatar: initialData?.avatar || '',
    isActive: initialData?.isActive || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as any; 
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={() => onSubmit(formData)} className="space-y-4 bg-[var(--card-bg)] p-6 rounded shadow">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border rounded p-2 w-full"/>
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border rounded p-2 w-full"/>
      <select name="role" value={formData.role} onChange={handleChange} className="border rounded p-2 w-full">
        <option value="Admin">Admin</option>
        <option value="Editor">Editor</option>
        <option value="Viewer">Viewer</option>
      </select>
      <div className="flex items-center gap-2">
        <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
        <label>Active User</label>
      </div>
      <div className="flex gap-4">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
      </div>
    </form>
  );
};

export default UserForm;
