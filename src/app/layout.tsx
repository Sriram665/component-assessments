// app/layout.tsx

import React from 'react';

import './globals.css';
import { ThemeProvider } from '@/components/theme.context';


export const metadata = {
  title: 'User Management Dashboard',
  description: 'A user management system with theme toggle',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}