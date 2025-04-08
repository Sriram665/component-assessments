// app/layout.tsx

import React from "react";

import "./globals.css";
import { ThemeProvider } from "@/components/theme.context";

import "./globals.css";
import { AuthProvider } from "@/components/auth.context";
import { FormProvider } from "@/components/form.context";

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
      <body>
        <AuthProvider>
          <FormProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </FormProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
