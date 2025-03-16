import React, { useState } from 'react';
import { Menu, X, Home, BarChart2, Users, Settings, Bell, Search } from 'lucide-react';
import Sidebar from './Sidebar';
import Dashboard1 from './Dashbaord1';
import Patients from './Patients';
import AppointmentsList from './AppointmentsList';

function Main() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard1 />;
      case 'analytics':
        return <AppointmentsList />;
      case 'users':
        return <Patients />;
      default:
        return <Dashboard1 />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-900">
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              <Bell size={20} />
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Main;