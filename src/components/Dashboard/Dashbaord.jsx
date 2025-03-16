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

//  export const Dashboard = () => {
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







// import React, { useState, useEffect } from 'react';
// import { Calendar, CheckCircle, Clock, Users, Stethoscope, Activity } from 'lucide-react';
// import { Bar, Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import DatePicker from 'react-datepicker';
// import { format, parse } from 'date-fns';
// import axios from 'axios';
// import 'react-datepicker/dist/react-datepicker.css';
// import { VITE_REACT_APP_BASE_URL } from '../utils/constants';
// import { Loader2 } from 'lucide-react';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// export const Dashboard = () => {
//   const [stats, setStats] = useState({
//     total: 0,
//     completed: 0,
//     pending: 0,
//     confirmed: 0
//   });
  
//   const [dateRange, setDateRange] = useState({
//     start: null,
//     end: null
//   });
  
//   const [servicesData, setServicesData] = useState({ 
//     labels: [], 
//     datasets: [{ data: [], backgroundColor: [] }] 
//   });
  
//   const [appointmentsChartData, setAppointmentsChartData] = useState({ 
//     labels: [], 
//     datasets: [] 
//   });
  
//   const [recentAppointments, setRecentAppointments] = useState({
//     pending: [],
//     confirmed: [],
//     completed: []
//   });

//   const [loading, setLoading] = useState(true);

//   // Fetch initial dashboard data
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         const [dashboardRes, appointmentsRes] = await Promise.all([
//           axios.get(`${VITE_REACT_APP_BASE_URL}/dashboard`),
//           axios.get(`${VITE_REACT_APP_BASE_URL}/appointments`, {
//             params: { 
//               limit: 1500000,
//               status: 'pending,confirmed,completed',
//               sort: 'date:desc'
//             }
//           })
//         ]);

//         const dashboardData = dashboardRes.data || {};
//         setStats({
//           total: dashboardData.totalAppointments || 0,
//           completed: dashboardData.completedAppointments || 0,
//           pending: dashboardData.pendingAppointments || 0,
//           confirmed: (dashboardData.totalAppointments || 0) - 
//                     ((dashboardData.completedAppointments || 0) + 
//                      (dashboardData.pendingAppointments || 0))
//         });

//         processAppointmentData(appointmentsRes.data?.data || []);
//       } catch (error) {
//         console.error('Error fetching initial data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, []);

//   // Process appointment data
//   const processAppointmentData = (appointments = []) => {
//     const newStats = appointments.reduce((acc, appt) => {
//       acc.total++;
//       if (appt.status === 'completed') acc.completed++;
//       if (appt.status === 'pending') acc.pending++;
//       if (appt.status === 'confirmed') acc.confirmed++;
//       return acc;
//     }, { total: 0, completed: 0, pending: 0, confirmed: 0 });

//     setStats(newStats);

//     const serviceCounts = appointments.reduce((acc, appt) => {
//       const treatment = appt.treatment || 'unknown';
//       acc[treatment] = (acc[treatment] || 0) + 1;
//       return acc;
//     }, {});

//     setServicesData({
//       labels: Object.keys(serviceCounts),
//       datasets: [{
//         data: Object.values(serviceCounts),
//         backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
//       }]
//     });

//     const dateCounts = appointments.reduce((acc, appt) => {
//       try {
//         const parsedDate = parse(appt.date, 'dd/MM/yyyy', new Date());
//         const formattedDate = format(parsedDate, 'dd/MM/yyyy');
//         acc[formattedDate] = (acc[formattedDate] || 0) + 1;
//       } catch (error) {
//         console.error('Invalid date format:', appt.date);
//       }
//       return acc;
//     }, {});

//     setAppointmentsChartData({
//       labels: Object.keys(dateCounts).sort(),
//       datasets: [{
//         label: 'Appointments',
//         data: Object.values(dateCounts),
//         backgroundColor: '#6366f1'
//       }]
//     });

//     setRecentAppointments({
//       pending: appointments.filter(a => a.status === 'pending').slice(0, 5),
//       confirmed: appointments.filter(a => a.status === 'confirmed').slice(0, 5),
//       completed: appointments.filter(a => a.status === 'completed').slice(0, 5)
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen p-8 bg-gray-50 flex items-center justify-center">
//         <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-8 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-3 mb-4 sm:mb-0">
//             <Activity className="h-8 w-8 text-indigo-600" />
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">Practice Dashboard</h1>
//               <p className="text-sm text-gray-600">Practice performance overview</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <DatePicker
//               selected={dateRange.start}
//               onChange={date => setDateRange(prev => ({ ...prev, start: date }))}
//               selectsStart
//               startDate={dateRange.start}
//               endDate={dateRange.end}
//               placeholderText="Start Date"
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//               dateFormat="dd/MM/yyyy"
//             />
//             <DatePicker
//               selected={dateRange.end}
//               onChange={date => setDateRange(prev => ({ ...prev, end: date }))}
//               selectsEnd
//               startDate={dateRange.start}
//               endDate={dateRange.end}
//               minDate={dateRange.start}
//               placeholderText="End Date"
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//               dateFormat="dd/MM/yyyy"
//               disabled={!dateRange.start}
//             />
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard 
//             icon={Calendar}
//             label="Total Appointments"
//             value={stats.total}
//             color="indigo"
//           />
//           <StatCard 
//             icon={CheckCircle}
//             label="Completed"
//             value={stats.completed}
//             color="emerald"
//           />
//           <StatCard 
//             icon={Clock}
//             label="Pending"
//             value={stats.pending}
//             color="amber"
//           />
//           <StatCard 
//             icon={Users}
//             label="Confirmed"
//             value={stats.confirmed}
//             color="indigo"
//           />
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           <ChartSection 
//             title="Services Distribution" 
//             icon={Stethoscope}
//           >
//             <Pie data={servicesData} />
//           </ChartSection>
          
//           <ChartSection 
//             title="Appointments Timeline"
//             icon={Calendar}
//           >
//             <Bar 
//               data={appointmentsChartData}
//               options={{ 
//                 responsive: true,
//                 scales: { y: { beginAtZero: true } }
//               }}
//             />
//           </ChartSection>
//         </div>

//         {/* Recent Appointments */}
//         <div className="bg-white rounded-xl shadow-sm border">
//           <div className="p-6 border-b border-gray-200">
//             <h2 className="text-xl font-semibold flex items-center gap-2">
//               <Users className="h-6 w-6 text-indigo-600" />
//               Recent Appointments
//             </h2>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
//             <AppointmentGroup
//               title="Pending"
//               appointments={recentAppointments.pending}
//               color="amber"
//             />
//             <AppointmentGroup
//               title="Confirmed"
//               appointments={recentAppointments.confirmed}
//               color="indigo"
//             />
//             <AppointmentGroup
//               title="Completed"
//               appointments={recentAppointments.completed}
//               color="emerald"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ icon: Icon, label, value, color }) => (
//   <div className="bg-white rounded-xl shadow-sm border p-6">
//     <div className="flex items-center gap-4">
//       <div className={`p-3 rounded-lg bg-${color}-100`}>
//         <Icon className={`h-6 w-6 text-${color}-600`} />
//       </div>
//       <div>
//         <p className="text-sm text-gray-600">{label}</p>
//         <p className="text-2xl font-semibold text-gray-900">
//           {isNaN(value) ? 0 : value}
//         </p>
//       </div>
//     </div>
//   </div>
// );

// const ChartSection = ({ title, icon: Icon, children }) => (
//   <div className="bg-white rounded-xl shadow-sm border p-6">
//     <div className="mb-4 flex items-center gap-2">
//       <Icon className="h-5 w-5 text-indigo-600" />
//       <h3 className="text-lg font-semibold">{title}</h3>
//     </div>
//     <div className="h-96">{children}</div>
//   </div>
// );

// const AppointmentGroup = ({ title, appointments, color }) => (
//   <div>
//     <div className="mb-4 flex items-center gap-2">
//       <span className={`h-2 w-2 rounded-full bg-${color}-500`} />
//       <h4 className="font-medium text-gray-700">{title}</h4>
//     </div>
    
//     <div className="space-y-3">
//       {appointments.map((appt, index) => (
//         <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="font-medium">{appt.patientName}</p>
//               <p className="text-sm text-gray-500">{appt.phoneNo}</p>
//             </div>
//             <span className={`text-xs px-2 py-1 rounded-full bg-${color}-100 text-${color}-800`}>
//               {appt.status}
//             </span>
//           </div>
//           <div className="mt-2 text-sm text-gray-600">
//             <p>{appt.date} • {appt.time}:00</p>
//             <p className="capitalize">{appt.treatment?.replace(/_/g, ' ')}</p>
//           </div>
//         </div>
//       ))}
      
//       {appointments.length === 0 && (
//         <p className="text-sm text-gray-500 text-center">No appointments found</p>
//       )}
//     </div>
//   </div>
// );



import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Clock, Users, Stethoscope, Activity, X, List, PieChart } from 'lucide-react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import DatePicker from 'react-datepicker';
import { format, parse, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { VITE_REACT_APP_BASE_URL } from '../utils/constants';
import { Loader2 } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    confirmed: 0
  });
  
  const [dateRange, setDateRange] = useState({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date())
  });
  
  const [servicesData, setServicesData] = useState({ 
    labels: [], 
    datasets: [{ data: [], backgroundColor: [] }] 
  });
  
  const [appointmentsChartData, setAppointmentsChartData] = useState({ 
    labels: [], 
    datasets: [] 
  });
  
  const [recentAppointments, setRecentAppointments] = useState({
    pending: [],
    confirmed: [],
    completed: []
  });

  const [allAppointments, setAllAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const colorPalette = {
    indigo: '#6366f1',
    emerald: '#10b981',
    amber: '#f59e0b',
    red: '#ef4444',
    purple: '#8b5cf6'
  };

  const CustomDateInput = ({ value, onClick }) => (
    <div className="flex items-center gap-2 w-full cursor-pointer" onClick={onClick}>
      <span className="text-gray-500 text-sm truncate">{value || 'Select date'}</span>
      <Calendar className="h-4 w-4 text-gray-400 shrink-0" />
    </div>
  );

  const handleClearFilters = () => {
    setDateRange({
      start: startOfMonth(new Date()),
      end: endOfMonth(new Date())
    });
  };

  const processAppointmentData = (appointments = []) => {
    const filtered = appointments.filter(appt => {
      try {
        const apptDate = parse(appt.date, 'dd/MM/yyyy', new Date());
        return isWithinInterval(apptDate, {
          start: dateRange.start,
          end: dateRange.end
        });
      } catch {
        return false;
      }
    });

    const newStats = filtered.reduce((acc, appt) => {
      acc.total++;
      if (appt.status === 'completed') acc.completed++;
      if (appt.status === 'pending') acc.pending++;
      if (appt.status === 'confirmed') acc.confirmed++;
      return acc;
    }, { total: 0, completed: 0, pending: 0, confirmed: 0 });

    setStats(newStats);

    const serviceCounts = filtered.reduce((acc, appt) => {
      const treatment = appt.treatment || 'Unknown Service';
      acc[treatment] = (acc[treatment] || 0) + 1;
      return acc;
    }, {});

    setServicesData({
      labels: Object.keys(serviceCounts),
      datasets: [{
        data: Object.values(serviceCounts),
        backgroundColor: Object.values(colorPalette)
      }]
    });

    const dateCounts = filtered.reduce((acc, appt) => {
      try {
        const parsedDate = parse(appt.date, 'dd/MM/yyyy', new Date());
        const formattedDate = format(parsedDate, 'dd/MM/yyyy');
        acc[formattedDate] = (acc[formattedDate] || 0) + 1;
      } catch (error) {
        console.error('Invalid date format:', appt.date);
      }
      return acc;
    }, {});

    setAppointmentsChartData({
      labels: Object.keys(dateCounts).sort(),
      datasets: [{
        label: 'Appointments',
        data: Object.values(dateCounts),
        backgroundColor: colorPalette.indigo
      }]
    });

    setRecentAppointments({
      pending: filtered.filter(a => a.status === 'pending').slice(0, 5),
      confirmed: filtered.filter(a => a.status === 'confirmed').slice(0, 5),
      completed: filtered.filter(a => a.status === 'completed').slice(0, 5)
    });
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [dashboardRes, appointmentsRes] = await Promise.all([
          axios.get(`${VITE_REACT_APP_BASE_URL}/dashboard`),
          axios.get(`${VITE_REACT_APP_BASE_URL}/appointments`, {
            params: { 
              limit: 1500000,
              status: 'pending,confirmed,completed',
              sort: 'date:desc'
            }
          })
        ]);

        setAllAppointments(appointmentsRes.data?.data || []);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    processAppointmentData(allAppointments);
  }, [dateRange, allAppointments]);

  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-7 w-7 text-indigo-600 shrink-0" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Practice Dashboard</h1>
              <p className="text-xs sm:text-sm text-gray-600">Practice performance overview</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-white p-2 rounded-lg border shadow-sm w-full sm:w-auto">
              <div className="flex items-center gap-2 flex-grow">
                <DatePicker
                  selected={dateRange.start}
                  onChange={date => setDateRange(prev => ({ ...prev, start: date }))}
                  selectsStart
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                  dateFormat="dd/MM/yyyy"
                  customInput={<CustomDateInput />}
                  className="min-w-[140px]"
                />
                <span className="text-gray-400 hidden sm:inline">–</span>
                <DatePicker
                  selected={dateRange.end}
                  onChange={date => setDateRange(prev => ({ ...prev, end: date }))}
                  selectsEnd
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                  minDate={dateRange.start}
                  dateFormat="dd/MM/yyyy"
                  customInput={<CustomDateInput />}
                  className="min-w-[140px]"
                />
              </div>
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-1 p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
              >
                <X className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:text-sm">Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard 
            icon={Calendar}
            label="Total Appointments"
            value={stats.total}
            color="indigo"
          />
          <StatCard 
            icon={CheckCircle}
            label="Completed"
            value={stats.completed}
            color="emerald"
          />
          <StatCard 
            icon={Clock}
            label="Pending"
            value={stats.pending}
            color="amber"
          />
          <StatCard 
            icon={Users}
            label="Confirmed"
            value={stats.confirmed}
            color="indigo"
          />
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-indigo-600" />
              Services Overview
            </h2>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <List className="h-5 w-5" />
                <h3 className="font-medium">Service List</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {servicesData.labels.map((label, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{label}</span>
                    <span className="text-sm font-medium text-indigo-600">
                      {servicesData.datasets[0].data[index]}
                    </span>
                  </div>
                ))}
                {servicesData.labels.length === 0 && (
                  <p className="col-span-2 text-center text-gray-500 py-4">No services data available</p>
                )}
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <PieChart className="h-5 w-5" />
                <h3 className="font-medium">Service Distribution</h3>
              </div>
              <div className="h-64 sm:h-80">
                <Pie data={servicesData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Chart */}
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-gray-600">
            <Calendar className="h-5 w-5 text-indigo-600" />
            <h3 className="font-medium">Appointments Timeline</h3>
          </div>
          <div className="h-64 sm:h-80">
            <Bar 
              data={appointmentsChartData}
              options={{ 
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } }
              }}
            />
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" />
              Recent Appointments
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 sm:p-6">
            <AppointmentGroup
              title="Pending"
              appointments={recentAppointments.pending}
              color="amber"
            />
            <AppointmentGroup
              title="Confirmed"
              appointments={recentAppointments.confirmed}
              color="indigo"
            />
            <AppointmentGroup
              title="Completed"
              appointments={recentAppointments.completed}
              color="emerald"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg bg-${color}-100`}>
        <Icon className={`h-5 w-5 text-${color}-600`} />
      </div>
      <div>
        <p className="text-xs sm:text-sm text-gray-600">{label}</p>
        <p className="text-lg sm:text-xl font-semibold text-gray-900">
          {isNaN(value) ? 0 : value.toLocaleString()}
        </p>
      </div>
    </div>
  </div>
);

const AppointmentGroup = ({ title, appointments, color }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 mb-3">
      <span className={`h-2 w-2 rounded-full bg-${color}-500`} />
      <h4 className="font-medium text-gray-700 text-sm sm:text-base">{title}</h4>
    </div>
    
    <div className="space-y-2">
      {appointments.map((appt, index) => (
        <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-800">{appt.patientName}</p>
              <p className="text-xs text-gray-500">{appt.phoneNo}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full bg-${color}-100 text-${color}-800`}>
              {appt.status}
            </span>
          </div>
          <div className="mt-2 text-xs text-gray-600">
            <p>{appt.date} • {appt.time}:00</p>
            <p className="capitalize mt-1">{appt.treatment?.replace(/_/g, ' ')}</p>
          </div>
        </div>
      ))}
      
      {appointments.length === 0 && (
        <p className="text-center text-gray-500 text-sm py-3">No appointments found</p>
      )}
    </div>
  </div>
);




// import React, { useState, useEffect } from 'react';
// import { Calendar, CheckCircle, Clock, Users, Stethoscope } from 'lucide-react';
// import { Bar, Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import DatePicker from 'react-datepicker';
// import { format, parse, startOfMonth, endOfMonth, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval } from 'date-fns';
// import axios from 'axios';
// import 'react-datepicker/dist/react-datepicker.css';
// import { VITE_REACT_APP_BASE_URL } from '../utils/constants';
// import { Loader2 } from 'lucide-react';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// export const Dashboard = () => {
//   const [stats, setStats] = useState({
//     total: 0,
//     completed: 0,
//     pending: 0,
//     confirmed: 0
//   });
  
//   const [dateRange, setDateRange] = useState({
//     start: startOfMonth(new Date()),
//     end: endOfMonth(new Date())
//   });
  
//   const [servicesData, setServicesData] = useState({ 
//     labels: [], 
//     datasets: [{ data: [], backgroundColor: [] }] 
//   });
  
//   const [timelineData, setTimelineData] = useState({ 
//     labels: [], 
//     datasets: [] 
//   });
  
//   const [recentAppointments, setRecentAppointments] = useState({
//     pending: [],
//     confirmed: [],
//     completed: []
//   });

//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('daily');

//   // Fetch data when date range or view mode changes
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Convert dates to DD/MM/YYYY format for API
//         const params = {
//           startDate: format(dateRange.start, 'dd/MM/yyyy'),
//           endDate: format(dateRange.end, 'dd/MM/yyyy'),
//           limit: 1000 // Get all appointments in range
//         };

//         const [dashboardRes, appointmentsRes] = await Promise.all([
//           axios.get(`${VITE_REACT_APP_BASE_URL}/dashboard`),
//           axios.get(`${VITE_REACT_APP_BASE_URL}/appointments`, { params })
//         ]);

//         // Process initial stats from dashboard endpoint
//         const dashboardData = dashboardRes.data || {};
//         setStats({
//           total: dashboardData.totalAppointments || 0,
//           completed: dashboardData.completedAppointments || 0,
//           pending: dashboardData.pendingAppointments || 0,
//           confirmed: (dashboardData.totalAppointments || 0) - 
//                     ((dashboardData.completedAppointments || 0) + 
//                      (dashboardData.pendingAppointments || 0))
//         });

//         // Process appointments data
//         const appointments = appointmentsRes.data?.data || [];
//         processAppointmentData(appointments);
//         processTimelineData(appointments);
        
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [dateRange, viewMode]);

//   // Process appointments for services chart and recent appointments
//   const processAppointmentData = (appointments) => {
//     // Services distribution
//     const serviceCounts = appointments.reduce((acc, appt) => {
//       const treatment = appt.treatment?.replace(/_/g, ' ') || 'Unknown';
//       acc[treatment] = (acc[treatment] || 0) + 1;
//       return acc;
//     }, {});

//     setServicesData({
//       labels: Object.keys(serviceCounts),
//       datasets: [{
//         data: Object.values(serviceCounts),
//         backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
//       }]
//     });

//     // Recent appointments
//     const sortedApps = appointments.sort((a, b) => 
//       new Date(b.date.split('/').reverse().join('-')) - 
//       new Date(a.date.split('/').reverse().join('-'))
//     );

//     setRecentAppointments({
//       pending: sortedApps.filter(a => a.status === 'pending').slice(0, 5),
//       confirmed: sortedApps.filter(a => a.status === 'confirmed').slice(0, 5),
//       completed: sortedApps.filter(a => a.status === 'completed').slice(0, 5)
//     });
//   };

//   // Process timeline data based on view mode
//   const processTimelineData = (appointments) => {
//     const dateFormat = viewMode === 'monthly' ? 'MMM yyyy' : 
//                       viewMode === 'weekly' ? 'ww yyyy' : 'dd MMM';
    
//     const groupedData = appointments.reduce((acc, appt) => {
//       try {
//         const date = parse(appt.date, 'dd/MM/yyyy', new Date());
//         let key;
        
//         switch(viewMode) {
//           case 'monthly':
//             key = format(date, 'MMM yyyy');
//             break;
//           case 'weekly':
//             key = `${format(date, 'ww')} ${format(date, 'yyyy')}`;
//             break;
//           default: // daily
//             key = format(date, 'dd MMM');
//         }
        
//         acc[key] = (acc[key] || 0) + 1;
//       } catch (error) {
//         console.error('Invalid date format:', appt.date);
//       }
//       return acc;
//     }, {});

//     // Sort labels chronologically
//     const labels = Object.keys(groupedData).sort((a, b) => {
//       if (viewMode === 'monthly') return new Date(a) - new Date(b);
//       if (viewMode === 'weekly') {
//         const [weekA, yearA] = a.split(' ');
//         const [weekB, yearB] = b.split(' ');
//         return new Date(yearA, 0, 1 + (weekA * 7)) - new Date(yearB, 0, 1 + (weekB * 7));
//       }
//       return new Date(a) - new Date(b);
//     });

//     setTimelineData({
//       labels,
//       datasets: [{
//         label: 'Appointments',
//         data: labels.map(label => groupedData[label]),
//         backgroundColor: '#6366f1'
//       }]
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen p-8 bg-gray-50 flex items-center justify-center">
//         <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-8 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Header & Date Filter */}
//         <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div className="flex items-center gap-3">
//             <Calendar className="h-8 w-8 text-indigo-600" />
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">Practice Dashboard</h1>
//               <p className="text-sm text-gray-600">{format(dateRange.start, 'dd MMM yyyy')} - {format(dateRange.end, 'dd MMM yyyy')}</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 flex-wrap">
//             <div className="flex items-center gap-2 bg-white p-2 rounded-lg border">
//               <DatePicker
//                 selected={dateRange.start}
//                 onChange={start => setDateRange(prev => ({ 
//                   start, 
//                   end: prev.end && start > prev.end ? start : prev.end 
//                 }))}
//                 selectsStart
//                 startDate={dateRange.start}
//                 endDate={dateRange.end}
//                 dateFormat="dd/MM/yyyy"
//                 className="w-36 px-2 py-1 border-0 focus:ring-0"
//               />
//               <span className="text-gray-400">–</span>
//               <DatePicker
//                 selected={dateRange.end}
//                 onChange={end => setDateRange(prev => ({ 
//                   start: prev.start && end < prev.start ? prev.start : prev.start, 
//                   end 
//                 }))}
//                 selectsEnd
//                 startDate={dateRange.start}
//                 endDate={dateRange.end}
//                 minDate={dateRange.start}
//                 dateFormat="dd/MM/yyyy"
//                 className="w-36 px-2 py-1 border-0 focus:ring-0"
//                 disabled={!dateRange.start}
//               />
//             </div>

//             <select 
//               value={viewMode}
//               onChange={(e) => setViewMode(e.target.value)}
//               className="bg-white border rounded-lg px-3 py-2 text-sm"
//             >
//               <option value="daily">Daily</option>
//               <option value="weekly">Weekly</option>
//               <option value="monthly">Monthly</option>
//             </select>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <StatCard 
//             icon={Calendar}
//             label="Total Appointments"
//             value={stats.total}
//             trend="primary"
//           />
//           <StatCard 
//             icon={CheckCircle}
//             label="Completed"
//             value={stats.completed}
//             trend="success"
//           />
//           <StatCard 
//             icon={Clock}
//             label="Pending"
//             value={stats.pending}
//             trend="warning"
//           />
//           <StatCard 
//             icon={Users}
//             label="Confirmed"
//             value={stats.confirmed}
//             trend="info"
//           />
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           <ChartSection 
//             title="Services Distribution" 
//             icon={Stethoscope}
//           >
//             <Pie 
//               data={servicesData}
//               options={{ plugins: { legend: { position: 'bottom' } }}}
//             />
//           </ChartSection>
          
//           <ChartSection 
//             title={`Appointments Timeline (${viewMode})`}
//             icon={Calendar}
//           >
//             <Bar 
//               data={timelineData}
//               options={{ 
//                 responsive: true,
//                 scales: { y: { beginAtZero: true } }
//               }}
//             />
//           </ChartSection>
//         </div>

//         {/* Recent Appointments */}
//         <div className="bg-white rounded-xl shadow-sm border">
//           <div className="p-6 border-b border-gray-200 flex items-center gap-2">
//             <Users className="h-6 w-6 text-indigo-600" />
//             <h2 className="text-xl font-semibold">Recent Appointments</h2>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
//             <AppointmentGroup
//               title="Pending"
//               appointments={recentAppointments.pending}
//               icon={Clock}
//               color="amber"
//             />
//             <AppointmentGroup
//               title="Confirmed"
//               appointments={recentAppointments.confirmed}
//               icon={CheckCircle}
//               color="indigo"
//             />
//             <AppointmentGroup
//               title="Completed"
//               appointments={recentAppointments.completed}
//               icon={Users}
//               color="emerald"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ icon: Icon, label, value, trend }) => {
//   const colors = {
//     primary: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
//     success: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
//     warning: { bg: 'bg-amber-100', text: 'text-amber-600' },
//     info: { bg: 'bg-cyan-100', text: 'text-cyan-600' }
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-sm border">
//       <div className="flex items-center gap-4">
//         <div className={`p-3 rounded-lg ${colors[trend].bg}`}>
//           <Icon className={`h-6 w-6 ${colors[trend].text}`} />
//         </div>
//         <div>
//           <p className="text-sm text-gray-600 mb-1">{label}</p>
//           <p className="text-2xl font-semibold">{value}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ChartSection = ({ title, icon: Icon, children }) => (
//   <div className="bg-white p-6 rounded-xl shadow-sm border">
//     <div className="mb-4 flex items-center gap-2">
//       <Icon className="h-5 w-5 text-indigo-600" />
//       <h3 className="text-lg font-semibold">{title}</h3>
//     </div>
//     <div className="h-96">{children}</div>
//   </div>
// );

// const AppointmentGroup = ({ title, appointments, icon: Icon, color }) => (
//   <div>
//     <div className="mb-4 flex items-center gap-2">
//       <Icon className={`h-5 w-5 text-${color}-600`} />
//       <h4 className="font-semibold text-gray-700">{title}</h4>
//     </div>
    
//     <div className="space-y-3">
//       {appointments.map((appt, index) => (
//         <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
//           <div className="flex justify-between items-start mb-2">
//             <div>
//               <p className="font-medium">{appt.patientName}</p>
//               <p className="text-sm text-gray-500">{appt.phoneNo}</p>
//             </div>
//             <span className={`text-xs px-2 py-1 rounded-full bg-${color}-100 text-${color}-800`}>
//               {appt.status}
//             </span>
//           </div>
//           <div className="text-sm text-gray-600">
//             <p>{appt.date} • {appt.time}:00</p>
//             <p className="capitalize mt-1">
//               {appt.treatment?.replace(/_/g, ' ') || 'Unknown Treatment'}
//             </p>
//           </div>
//         </div>
//       ))}
      
//       {appointments.length === 0 && (
//         <div className="p-4 text-center text-gray-500">
//           No appointments found
//         </div>
//       )}
//     </div>
//   </div>
// );

{/* export default Dashboard; */}
