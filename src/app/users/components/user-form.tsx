'use client';

import React, { useEffect } from 'react';

import { User } from '../types/user';
import { useFormContext } from '@/components/form.context';
import { useTheme } from '@/components/theme.context';

interface UserFormProps {
  initialData?: User;
  onSubmit: (user: User) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const { formData, setFormData, saveForm, resetForm } = useFormContext();
  const { theme } = useTheme();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData, setFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as any;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveForm();
    onSubmit(formData);
    resetForm();
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`space-y-4 p-6 rounded shadow ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
    >
      <input 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        placeholder="Name" 
        className={`border rounded p-2 w-full ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`} 
      />

      <input 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        placeholder="Email" 
        className={`border rounded p-2 w-full ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`} 
      />

      <select 
        name="role" 
        value={formData.role} 
        onChange={handleChange} 
        className={`border rounded p-2 w-full ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
      >
        <option value="Admin">Admin</option>
        <option value="Editor">Editor</option>
        <option value="Viewer">Viewer</option>
      </select>

      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          name="isActive" 
          checked={formData.isActive} 
          onChange={handleChange} 
        />
        <label>Active User</label>
      </div>

      <div className="flex gap-4">
        <button 
          type="submit" 
          className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        >
          Save
        </button>
        <button 
          type="button" 
          onClick={onCancel} 
          className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-800' : 'bg-gray-500 hover:bg-gray-600'} text-white`}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;
