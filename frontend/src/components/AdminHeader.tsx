"use client";

import { useRouter } from "next/navigation";
import { LogOut, UserCog } from "lucide-react";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = () => {
    console.log("Logging out...");
    router.push("/"); // Redirect to login/home
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#1e1e2f] via-[#14141f] to-[#0f0f1a] text-gray-200 shadow-md border-b border-gray-700/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Brand Logo / Title */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => router.push("/admin")}
        >
          <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
            🔧 Tinkerers ECS
          </span>
        </div>

        {/* Right: Admin Info & Logout */}
        <div className="flex items-center gap-6">
          {/* Admin Info */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 backdrop-blur-sm border border-gray-700/30 hover:border-purple-500/40 transition">
            <UserCog className="w-5 h-5 text-purple-400" />
            <span className="font-medium tracking-wide">Admin</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-red-500/30 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
