"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  FolderKanban,
  Trophy,
  FileText,
  Wrench,
  Info,
  Menu,
  X,
} from "lucide-react";

export default function AdminSidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Workshops", icon: Wrench, path: "/admin/workshops" },
    { name: "Resources", icon: FolderKanban, path: "/admin/resources" },
    { name: "Competition", icon: Trophy, path: "/admin/competition" },
    { name: "Study Material", icon: BookOpen, path: "/admin/study-material" },
    { name: "Projects", icon: FileText, path: "/admin/projects" },
    { name: "About Us", icon: Info, path: "/admin/about" },
  ];

  return (
    <>
      {/* Toggle button for mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-purple-500 to-indigo-500 p-2 rounded-lg text-white shadow-lg hover:scale-105 transition-transform"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-[#1e1e2f] via-[#14141f] to-[#0e0e14] text-gray-200 shadow-xl backdrop-blur-md transition-all duration-300 ${
          isOpen ? "w-64" : "w-0 md:w-64"
        }`}
      >
        {/* Brand Section */}
        <div className="flex flex-col items-center gap-3 py-6 border-b border-gray-700/40">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <Image
              src="/icons/tinku.jpg"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full border-2 border-purple-500/50 shadow-md hover:scale-105 transition"
            />
          </Link>
          <h1 className="text-lg font-semibold text-white tracking-wide">
            Admin Panel
          </h1>
        </div>

        {/* Menu Items */}
        <nav className="mt-6">
          <ul className="flex flex-col gap-1">
            {menuItems.map(({ name, icon: Icon, path }) => (
              <li key={name}>
                <button
                  onClick={() => router.push(path)}
                  className="group w-full flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-purple-600/20 hover:text-white transition-all duration-200 relative"
                >
                  {/* Active Glow Effect */}
                  <span className="absolute left-0 top-0 h-full w-1 bg-purple-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></span>
                  <Icon
                    size={20}
                    className="text-purple-400 group-hover:text-purple-300 transition"
                  />
                  <span className="font-medium">{name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 w-full text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Tinkerers
        </div>
      </aside>
    </>
  );
}
