'use client';


import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './login-form';
import { useTheme } from '@/components/theme.context';
import { useAuth } from '@/components/auth.context';

const UserDashboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();

  // Redirect to /users if the user is already authenticated
  useEffect(() => {
    if (user) {
      router.push('/users');
    }
  }, [user, router]);

  return (
    <div className={`container mx-auto p-6 ${theme === "dark" ? "dark" : ""}`}>
      {user ? (
        <div>Redirecting to Users Page...</div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default UserDashboard;
