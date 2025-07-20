import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import NewsManager from "./NewsManager";

export default function AdminDashboard() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex-1 ml-0 md:ml-64 min-h-screen bg-[#0D0D0D] text-gray-200">
        <AdminHeader />
        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">Welcome to Tinkerers Admin Panel</h1>
          <p className="text-gray-400">Manage news, quizzes, and more.</p>

          {/* ✅ News Manager Section */}
          <NewsManager />
        </main>
      </div>
    </div>
  );
}
