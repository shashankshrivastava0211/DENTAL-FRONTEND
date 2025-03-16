// import React from 'react';
// import { TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react';

// const Dashboard1 = () => {
//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {[
//           { title: 'Total Revenue', value: '$54,239', icon: DollarSign, color: 'bg-green-500' },
//           { title: 'Total Users', value: '2,543', icon: Users, color: 'bg-blue-500' },
//           { title: 'Sales', value: '+12.5%', icon: TrendingUp, color: 'bg-purple-500' },
//           { title: 'Orders', value: '432', icon: ShoppingCart, color: 'bg-yellow-500' },
//         ].map((stat, index) => (
//           <div key={index} className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center">
//               <div className={`${stat.color} p-3 rounded-lg`}>
//                 <stat.icon className="h-6 w-6 text-white" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//                 <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
//           <div className="space-y-4">
//             {[1, 2, 3].map((item) => (
//               <div key={item} className="flex items-center space-x-4">
//                 <div className="h-10 w-10 rounded-full bg-gray-200"></div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-900">User completed action</p>
//                   <p className="text-sm text-gray-500">2 hours ago</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
//           <div className="space-y-4">
//             {[
//               { label: 'Active Users', value: '1,234' },
//               { label: 'Total Sales', value: '$12,345' },
//               { label: 'Conversion Rate', value: '2.5%' },
//             ].map((stat, index) => (
//               <div key={index} className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">{stat.label}</span>
//                 <span className="text-sm font-semibold text-gray-900">{stat.value}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard1;

import React from "react";
import { Users, Calendar, CheckCircle, Clock } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard1 = () => {
  // Sample data for charts
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  const appointmentsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Appointments",
        data: [25, 30, 28, 32, 35, 20],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  const servicesData = {
    labels: ["Cleaning", "Filling", "Root Canal", "Extraction", "Braces"],
    datasets: [
      {
        data: [30, 25, 15, 20, 10],
        backgroundColor: [
          "rgba(59, 130, 246, 0.5)",
          "rgba(16, 185, 129, 0.5)",
          "rgba(245, 158, 11, 0.5)",
          "rgba(239, 68, 68, 0.5)",
          "rgba(139, 92, 246, 0.5)",
        ],
      },
    ],
  };

  const stats = [
    {
      label: "Appointments Today",
      value: "48",
      icon: Calendar,
      color: "green",
    },
    { label: "Completed", value: "8", icon: CheckCircle, color: "yellow" },
    { label: "Pending", value: "40", icon: Clock, color: "purple" },
    { label: "Total Patients", value: "2,54", icon: Users, color: "blue" },
  ];

  return (
    <div className="">
      {/* Main Content */}
      <div className="container px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 flex items-center"
            >
              <div className={`p-3 rounded-full bg-${stat.color}-100 mr-4`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
            <Line
              data={revenueData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
            />
          </div>

          {/* Appointments Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Weekly Appointments</h2>
            <Bar
              data={appointmentsData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Services Distribution
            </h2>
            <Pie
              data={servicesData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          </div>

          {/* Recent Appointments */}
          <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    {
                      patient: "John Doe",
                      doctor: "Dr. Sarah Wilson",
                      date: "2024-03-15",
                      status: "Confirmed",
                    },
                    {
                      patient: "Jane Smith",
                      doctor: "Dr. Michael Chen",
                      date: "2024-03-15",
                      status: "Pending",
                    },
                    {
                      patient: "Robert Johnson",
                      doctor: "Dr. Emily Brown",
                      date: "2024-03-16",
                      status: "Completed",
                    },
                  ].map((appointment, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.patient}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.doctor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appointment.status === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : appointment.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard1;
