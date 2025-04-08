'use client';

import { User } from '@/app/users/types/user';
import useLocalStorage from '@/hooks/use-localstorage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface FormContextType {
  formData: User;
  setFormData: (data: User) => void;
  saveForm: () => void;
  resetForm: () => void;
}

const defaultFormData: User = {
  id: 0,
  name: '',
  email: '',
  role: 'Viewer',
  avatar: '',
  isActive: false,
};

const FormContext = createContext<FormContextType | null>(null);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useLocalStorage<User>('userForm', defaultFormData);

  const saveForm = () => {
    localStorage.setItem('userForm', JSON.stringify(formData));
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    localStorage.removeItem('userForm');
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, saveForm, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
