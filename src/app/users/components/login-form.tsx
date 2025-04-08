'use client';

import { useAuth } from '@/components/auth.context';
import { useTheme } from '@/components/theme.context';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const { theme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter()
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isAuthenticated = login({ username, password });

    if (!isAuthenticated) {
      setError('Invalid username or password. Please try again.');
    } else {
        router.push('/users');
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen bg-[var(--bg-color)]`}>
      <form 
        onSubmit={handleSubmit} 
        className="p-8 rounded-lg shadow-md w-96"
        style={{
          backgroundColor: theme === 'dark' ? '#2D2D2D' : '#FFFFFF',
          color: theme === 'dark' ? '#F3F4F6' : '#1F2937'
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            value={username}
            placeholder='admin'
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full p-2 rounded border focus:outline-none ${theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : 'border-gray-300'}`}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            placeholder='12345'
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 rounded border focus:outline-none ${theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : 'border-gray-300'}`}
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded text-white transition-colors ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
