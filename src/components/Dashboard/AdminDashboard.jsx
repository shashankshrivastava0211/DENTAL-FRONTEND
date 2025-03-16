import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Home,
  Calendar,
  Users,
  BarChart2,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/admin-dashboard", icon: Home },
  {
    name: "Appointments",
    href: "/admin-dashboard/AppointmentsList",
    icon: Calendar,
  },
  { name: "Patients", href: "/admin-dashboard/patients", icon: Users },
  { name: "Settings", href: "/admin-dashboard/settings", icon: Settings },
];

export const AdminDashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden z-40 transition-opacity duration-300 ease-out"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative left-0 top-0 h-full bg-white shadow-xl transition-all duration-300 ease-out
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          ${isSidebarCollapsed ? "lg:w-20" : "lg:w-64"} flex flex-col z-50`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-100">
          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              isSidebarCollapsed
                ? "max-w-0 opacity-0"
                : "max-w-[160px] opacity-100"
            }`}
          >
            <span className="text-base md:text-xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent tracking-tight whitespace-nowrap">
              32 Pearls
              <span className="block text-xs font-normal text-purple-500 mt-[-2px]">
                Dental Clinic
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden lg:flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5 text-indigo-500" />
            </button>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6 text-indigo-500" />
            </button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="px-4 py-5 border-b border-gray-100">
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <span className="text-white font-medium text-lg">Dr.</span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                isSidebarCollapsed
                  ? "max-h-0 opacity-0"
                  : "max-h-40 opacity-100"
              }`}
            >
              <div className="flex flex-col truncate min-w-[140px] text-center">
                <h3 className="font-semibold text-gray-800 truncate">
                  Dr. Pritesh Jagtap
                </h3>
                <p className="text-sm text-purple-500 truncate">
                  Welcome back, Doctor
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation - Fixed Icons */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ease-out
                  ${
                    isSidebarCollapsed
                      ? "justify-center mx-auto w-12"
                      : "justify-start mx-2"
                  }
                  ${
                    isActive
                      ? "bg-indigo-500/10 border-l-4 border-indigo-500 lg:border-l-4 lg:border-indigo-500"
                      : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
              >
                <item.icon
                  className={`h-6 w-6 flex-shrink-0 ${
                    isActive ? "text-indigo-500" : "text-indigo-400"
                  } transition-colors duration-300`}
                />
                <span
                  className={`text-sm truncate transition-all duration-300 ease-out ${
                    isSidebarCollapsed
                      ? "opacity-0 ml-0 translate-x-2 absolute"
                      : "opacity-100 ml-3 translate-x-0 static"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg
              text-purple-500 hover:bg-purple-50 transition-all duration-300 ease-out ${
                isSidebarCollapsed ? "justify-center" : "justify-start"
              }`}
          >
            <X className="h-6 w-6 shrink-0 text-purple-500" />
            <span
              className={`text-sm transition-all duration-300 ease-out ${
                isSidebarCollapsed
                  ? "opacity-0 w-0 translate-x-2"
                  : "opacity-100 w-auto translate-x-0"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6 text-indigo-500" />
            </button>
            <div className="flex items-center gap-3">
            <div className="flex flex-col truncate min-w-[140px] text-center">
                <h3 className="font-semibold text-gray-800 truncate">
                  Dr. Pritesh Jagtap
                </h3>
                <p className="text-sm text-purple-500 truncate">
                  Welcome back, Doctor
                </p>
              </div>
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                <span className="text-white font-medium">Dr.</span>
              </div>
            </div>
          </div>
        </header>
        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto w-full">
            <div className="p-4 transition-all duration-300 ease-out">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
