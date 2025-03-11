// import React from 'react';
// import {
//   Users,
//   Calendar,
//   CheckCircle,
//   Clock,
// } from 'lucide-react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from 'chart.js';
// import { Line, Bar, Pie } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// export const Dashboard = () => {
//   // Sample data for charts
//   const revenueData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     datasets: [
//       {
//         label: 'Revenue',
//         data: [12000, 19000, 15000, 25000, 22000, 30000],
//         borderColor: 'rgb(59, 130, 246)',
//         backgroundColor: 'rgba(59, 130, 246, 0.5)',
//       },
//     ],
//   };

//   const appointmentsData = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
//     datasets: [
//       {
//         label: 'Appointments',
//         data: [25, 30, 28, 32, 35, 20],
//         backgroundColor: 'rgba(59, 130, 246, 0.5)',
//       },
//     ],
//   };

//   const servicesData = {
//     labels: ['Cleaning', 'Filling', 'Root Canal', 'Extraction', 'Braces'],
//     datasets: [
//       {
//         data: [30, 25, 15, 20, 10],
//         backgroundColor: [
//           'rgba(59, 130, 246, 0.5)',
//           'rgba(16, 185, 129, 0.5)',
//           'rgba(245, 158, 11, 0.5)',
//           'rgba(239, 68, 68, 0.5)',
//           'rgba(139, 92, 246, 0.5)',
//         ],
//       },
//     ],
//   };

//   const stats = [
//     { label: 'Appointments Today', value: '48', icon: Calendar, color: 'green' },
//     { label: 'Completed', value: '8', icon: CheckCircle, color: 'yellow' },
//     { label: 'Pending', value: '40', icon: Clock, color: 'purple' },
//     { label: 'Total Patients', value: '2,54', icon: Users, color: 'blue' },
//   ];

//   return (
//     <div className="">
 
//       {/* Main Content */}
//       <div className="container px-4 py-8">
//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {stats.map((stat, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-lg shadow p-6 flex items-center"
//             >
//               <div className={`p-3 rounded-full bg-${stat.color}-100 mr-4`}>
//                 <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">{stat.label}</p>
//                 <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Charts Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           {/* Revenue Chart */}
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
//             <Line
//               data={revenueData}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   legend: {
//                     position: 'top',
//                   },
//                 },
//               }}
//             />
//           </div>

//           {/* Appointments Chart */}
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-xl font-semibold mb-4">Weekly Appointments</h2>
//             <Bar
//               data={appointmentsData}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   legend: {
//                     position: 'top',
//                   },
//                 },
//               }}
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Services Distribution */}
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-xl font-semibold mb-4">Services Distribution</h2>
//             <Pie
//               data={servicesData}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   legend: {
//                     position: 'bottom',
//                   },
//                 },
//               }}
//             />
//           </div>

//           {/* Recent Appointments */}
//           <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
//             <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead>
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Patient
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Doctor
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {[
//                     {
//                       patient: 'John Doe',
//                       doctor: 'Dr. Sarah Wilson',
//                       date: '2024-03-15',
//                       status: 'Confirmed',
//                     },
//                     {
//                       patient: 'Jane Smith',
//                       doctor: 'Dr. Michael Chen',
//                       date: '2024-03-15',
//                       status: 'Pending',
//                     },
//                     {
//                       patient: 'Robert Johnson',
//                       doctor: 'Dr. Emily Brown',
//                       date: '2024-03-16',
//                       status: 'Completed',
//                     },
//                   ].map((appointment, index) => (
//                     <tr key={index}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {appointment.patient}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {appointment.doctor}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {appointment.date}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                             appointment.status === 'Confirmed'
//                               ? 'bg-green-100 text-green-800'
//                               : appointment.status === 'Pending'
//                               ? 'bg-yellow-100 text-yellow-800'
//                               : 'bg-blue-100 text-blue-800'
//                           }`}
//                         >
//                           {appointment.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Users,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  UserCheck,
  CalendarClock,
  Activity,
  Filter,
} from 'lucide-react';
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
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { format, parseISO, startOfWeek, endOfWeek, eachDayOfInterval, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { VITE_REACT_APP_BASE_URL } from "../utils/constants";


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


const TREATMENT_COLORS = {
  root_canal: 'rgba(59, 130, 246, 0.5)',
  crown: 'rgba(16, 185, 129, 0.5)',
  cosmetic_procedure: 'rgba(245, 158, 11, 0.5)',
  filling: 'rgba(239, 68, 68, 0.5)',
  dental_implant: 'rgba(139, 92, 246, 0.5)',
  teeth_replacement: 'rgba(236, 72, 153, 0.5)',
  extraction: 'rgba(99, 102, 241, 0.5)',
  mouth_guard: 'rgba(34, 197, 94, 0.5)',
  child_procedure: 'rgba(249, 115, 22, 0.5)',
  gum_care: 'rgba(168, 85, 247, 0.5)',
  orthodontic: 'rgba(234, 179, 8, 0.5)',
  x_ray: 'rgba(75, 85, 99, 0.5)',
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalAppointments: 0,
    completedAppointments: 0,
    pendingAppointments: 0,
    dailyPatients: 0,
    weeklyPatients: 0,
    monthlyPatients: 0,
  });

  const [weeklyAppointments, setWeeklyAppointments] = useState([]);
  const [monthlyAppointments, setMonthlyAppointments] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [treatmentDistribution, setTreatmentDistribution] = useState({});
  const [genderDistribution, setGenderDistribution] = useState({});
  const [ageGroups, setAgeGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState('week');
  const [selectedTreatment, setSelectedTreatment] = useState('all');

  useEffect(() => {
    fetchAllData();
  }, [selectedDateRange, selectedTreatment]);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashboardResponse, appointmentsResponse, recentResponse] = await Promise.all([
        axios.get(`${VITE_REACT_APP_BASE_URL}/dashboard`),
        fetchAppointmentsData(),
        axios.get(`${VITE_REACT_APP_BASE_URL}/appointments`, {
          params: {
            limit: 5,
            page: 1,
            sort: '-createdAt',
          },
        }),
      ]);

      setDashboardData(dashboardResponse.data);
      processAppointmentsData(appointmentsResponse.data.data);
      setRecentAppointments(recentResponse.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again later.');
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointmentsData = async () => {
    const startDate = selectedDateRange === 'week' 
      ? startOfWeek(new Date()) 
      : startOfMonth(new Date());
    const endDate = selectedDateRange === 'week'
      ? endOfWeek(new Date())
      : endOfMonth(new Date());

    const queryParams = new URLSearchParams({
      startDate: format(startDate, 'dd/MM/yyyy'),
      endDate: format(endDate, 'dd/MM/yyyy'),
      ...(selectedTreatment !== 'all' && { treatment: selectedTreatment }),
    });

    return axios.get(`${VITE_REACT_APP_BASE_URL}/appointments?${queryParams.toString()}`);
  };

  const processAppointmentsData = (appointments) => {
    if (!Array.isArray(appointments)) {
      console.error('Invalid appointments data:', appointments);
      return;
    }

    // Treatment distribution
    const treatmentDist = appointments.reduce((acc, apt) => {
      if (apt.treatment) {
        acc[apt.treatment] = (acc[apt.treatment] || 0) + 1;
      }
      return acc;
    }, {});
    setTreatmentDistribution(treatmentDist);

    // Gender distribution
    const genderDist = appointments.reduce((acc, apt) => {
      if (apt.gender) {
        acc[apt.gender] = (acc[apt.gender] || 0) + 1;
      }
      return acc;
    }, {});
    setGenderDistribution(genderDist);

    // Age groups
    const ageGroupDist = appointments.reduce((acc, apt) => {
      if (apt.age) {
        const ageGroup = getAgeGroup(apt.age);
        acc[ageGroup] = (acc[ageGroup] || 0) + 1;
      }
      return acc;
    }, {});
    setAgeGroups(ageGroupDist);

    // Daily appointments
    const startDate = selectedDateRange === 'week' 
      ? startOfWeek(new Date()) 
      : startOfMonth(new Date());
    const endDate = selectedDateRange === 'week'
      ? endOfWeek(new Date())
      : endOfMonth(new Date());

    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const appointmentsByDay = days.map(day => {
      const dayStr = format(day, 'dd/MM/yyyy');
      return appointments.filter(apt => apt.date === dayStr).length;
    });

    if (selectedDateRange === 'week') {
      setWeeklyAppointments(appointmentsByDay);
    } else {
      setMonthlyAppointments(appointmentsByDay);
    }
  };

  const getAgeGroup = (age) => {
    if (age <= 12) return 'Children (0-12)';
    if (age <= 19) return 'Teens (13-19)';
    if (age <= 35) return 'Young Adults (20-35)';
    if (age <= 50) return 'Adults (36-50)';
    return 'Seniors (50+)';
  };

  const stats = [
    { 
      label: 'Total Appointments', 
      value: dashboardData.totalAppointments, 
      icon: Calendar, 
      color: 'blue',
      description: 'All time appointments'
    },
    { 
      label: 'Completed', 
      value: dashboardData.completedAppointments, 
      icon: CheckCircle, 
      color: 'green',
      description: 'Successfully completed'
    },
    { 
      label: 'Pending', 
      value: dashboardData.pendingAppointments, 
      icon: Clock, 
      color: 'yellow',
      description: 'Awaiting completion'
    },
    { 
      label: 'Daily Patients', 
      value: dashboardData.dailyPatients, 
      icon: Users, 
      color: 'purple',
      description: 'Patients today'
    },
    { 
      label: 'Weekly Patients', 
      value: dashboardData.weeklyPatients, 
      icon: UserCheck, 
      color: 'indigo',
      description: 'This week\'s total'
    },
    { 
      label: 'Monthly Patients', 
      value: dashboardData.monthlyPatients, 
      icon: CalendarClock, 
      color: 'pink',
      description: 'This month\'s total'
    },
  ];

  const appointmentsData = {
    labels: selectedDateRange === 'week' 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : Array.from({ length: monthlyAppointments.length }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Appointments',
        data: selectedDateRange === 'week' ? weeklyAppointments : monthlyAppointments,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const treatmentData = {
    labels: Object.keys(treatmentDistribution).map(key => 
      key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    ),
    datasets: [
      {
        data: Object.values(treatmentDistribution),
        backgroundColor: Object.keys(treatmentDistribution).map(key => TREATMENT_COLORS[key]),
      },
    ],
  };

  const genderData = {
    labels: Object.keys(genderDistribution).map(key => 
      key.charAt(0).toUpperCase() + key.slice(1)
    ),
    datasets: [
      {
        data: Object.values(genderDistribution),
        backgroundColor: ['rgba(236, 72, 153, 0.5)', 'rgba(59, 130, 246, 0.5)', 'rgba(168, 85, 247, 0.5)'],
      },
    ],
  };

  const ageGroupData = {
    labels: Object.keys(ageGroups),
    datasets: [{
      label: 'Patients',
      data: Object.values(ageGroups),
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
      borderColor: 'rgba(99, 102, 241, 1)',
      borderWidth: 1,
    }],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchAllData}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-8 mx-auto">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <Filter className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            <select
              className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm"
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <select
              className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm"
              value={selectedTreatment}
              onChange={(e) => setSelectedTreatment(e.target.value)}
            >
              <option value="all">All Treatments</option>
              {Object.keys(TREATMENT_COLORS).map(treatment => (
                <option key={treatment} value={treatment}>
                  {treatment.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 flex items-center"
            >
              <div className={`p-3 rounded-full bg-${stat.color}-100 mr-4`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Appointments Trend */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              {selectedDateRange === 'week' ? 'Weekly' : 'Monthly'} Appointments Trend
            </h2>
            <Bar
              data={appointmentsData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `Appointments: ${context.raw}`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
            />
          </div>

          {/* Treatment Distribution */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Treatment Distribution</h2>
            <Pie
              data={treatmentData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      boxWidth: 12,
                      font: {
                        size: 11,
                      },
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw} patients`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Demographics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gender Distribution */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Gender Distribution</h2>
            <Pie
              data={genderData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw} patients`,
                    },
                  },
                },
              }}
            />
          </div>

          {/* Age Groups */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Age Groups</h2>
            <Bar
              data={ageGroupData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `Patients: ${context.raw}`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Appointments</h2>
            <span className="text-sm text-gray-500">Last 5 appointments</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Treatment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age/Gender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentAppointments.map((appointment, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.patientName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.phoneNo}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.treatment.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.date}</div>
                      <div className="text-sm text-gray-500">{`${appointment.time}:00`}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{`${appointment.age} years`}</div>
                      <div className="text-sm text-gray-500">
                        {appointment.gender.charAt(0).toUpperCase() + appointment.gender.slice(1)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : appointment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : appointment.status === 'confirmed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
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
  );
};

export default Dashboard;