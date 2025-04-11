// app/layout.tsx

import React from "react";
import "./globals.css";

import { AuthProvider } from "@/components/auth.context";
import { FormProvider } from "@/components/form.context";
import { ThemeProvider } from "@/components/theme.context";

import LogoutButton from "@/components/logout-button";
import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import Header from "@/components/header";

export const metadata = {
  title: "User Management Dashboard",
  description: "A user management system with theme and auth context",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <AuthProvider>
          <FormProvider>
            <ThemeProvider>
              <Header />
              <main className="p-6">{children}</main>
            </ThemeProvider>
          </FormProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
