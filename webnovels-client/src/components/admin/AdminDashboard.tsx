import { Link, Outlet } from "@tanstack/react-router";
import { Users, Flag } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen w-screen bg-gray-100 dark:bg-gray-900">
      {/* Left Sidebar */}
      <nav className="w-64 bg-white dark:bg-gray-800 shadow-lg p-4 flex flex-col gap-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 pb-2 border-b">
          Admin Dashboard
        </h1>

        <Link
          from="/admin"
          to="/admin/users"
          className="flex items-center gap-2 p-2 rounded text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Users className="w-5 h-5" /> Users
        </Link>

        <Link
          from="/admin"
          to="/admin/reports"
          className="flex items-center gap-2 p-2 rounded text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Flag className="w-5 h-5" /> Reports
        </Link>
      </nav>

      {/* Page content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
