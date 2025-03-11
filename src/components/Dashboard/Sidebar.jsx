import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/admin-dashboard/dashboard', icon: HomeIcon },
  { name: 'Appointments', href: '/admin-dashboard/appointments', icon: CalendarIcon },
  { name: 'Patients', href: '/admin-dashboard/patients', icon: UserGroupIcon },
  { name: 'Settings', href: '/admin-dashboard/settings', icon: Cog6ToothIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Sidebar = ({ setSelectedTab }) => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="flex flex-col items-center pt-5 pb-4">
        <div className="text-2xl font-bold text-primary-600">DentalCare</div>
      </div>

      <nav className="mt-5">
        {navigation.map((item) => {
          const current = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setSelectedTab(item.name.toLowerCase())}
              className={classNames(
                current ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
              )}
            >
              <item.icon
                className={classNames(
                  current ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 h-6 w-6 flex-shrink-0'
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
