import React from 'react';
import { X, Home, BarChart2, Users, Settings } from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ isOpen, onClose, currentPage, setCurrentPage }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white border-r transform transition-transform duration-200 ease-in-out z-50 
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={onClose}
          className="lg:hidden text-gray-600 hover:text-gray-900"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="mt-6">
        <div className="px-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  onClose();
                }}
                className={`flex items-center w-full px-4 py-2 text-sm rounded-lg transition-colors
                  ${
                    currentPage === item.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <Icon size={20} className="mr-3" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default Sidebar