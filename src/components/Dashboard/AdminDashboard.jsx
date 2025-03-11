import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  Home,
  Calendar,
  Users,
  FileText,
  BarChart2,
  Settings,
  Menu,
  Bell,
  Search,
  ChevronDown,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin-dashboard', icon: Home },
  { name: 'Appointments', href: '/admin-dashboard/AppointmentsList', icon: Calendar },
  { name: 'Patients', href: '/admin-dashboard/patients', icon: Users },
  // { name: 'Reports', href: '/admin-dashboard/reports', icon: FileText },
  // { name: 'Analytics', href: '/admin-dashboard/analytics', icon: BarChart2 },
  { name: 'Settings', href: '/admin-dashboard/settings', icon: Settings },
];

export const AdminDashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100 my-24">
      {/* Sidebar */}
      <aside className={`bg-white shadow-md transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'} flex flex-col`}>
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          {!isSidebarCollapsed && (
            <span className="text-xl font-bold text-blue-600">Admin </span>
          )}
          <button
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100"
          >
            <Menu size={22} className="text-gray-600" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center ${
                  isSidebarCollapsed ? 'justify-center' : 'justify-start'
                } px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-500'} />
                {!isSidebarCollapsed && (
                  <span className="ml-3 font-medium">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer - Branding */}
        {!isSidebarCollapsed && (
          <div className="p-3 border-t text-sm text-gray-500 text-center">
            &copy; 2024 MedAdmin
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white h-16 flex items-center justify-between px-6 shadow-md border-b">
          {/* Search Bar */}
          <div className="relative w-1/3">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-300 bg-gray-50"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3 border-l pl-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-gray-700">Dr. Smith</span>
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
                <span className="text-xs text-gray-500">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {/* Page Heading */}
          <div className="mb-6 flex justify-between">
            <p className="mt-2 text-sm text-gray-600">Welcome back, Dr. Smith</p>
            <h1 className="text-3xl font-bold text-gray-900">
              {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
            </h1>
            
          </div>

          {/* Dynamic Content */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};
