'use client';

import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/use-localstorage';

interface User {
  username: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);

  const login = (userData: User) => {
    // Example credentials (You can replace this with your own authentication logic)
    const validUser = { username: 'admin', password: '12345' };

    if (userData.username === validUser.username && userData.password === validUser.password) {
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
