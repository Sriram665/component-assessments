"use client";

import { useAuth } from "@/components/auth.context";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/"); // Redirect to home page
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
      title="Logout"
    >
      <LogOut size={18} />
    </button>
  );
};

export default LogoutButton;
