import React from 'react';
import {
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Mail,
  MessageCircle,
  Bell
} from 'lucide-react';

export const DoctorDashboard = () => {
  const appointments = [
    {
      id: 1,
      patient: 'John Doe',
      time: '09:00 AM',
      type: 'Check-up',
      status: 'Pending'
    },
    {
      id: 2,
      patient: 'Jane Smith',
      time: '10:30 AM',
      type: 'Root Canal',
      status: 'Confirmed'
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      time: '02:00 PM',
      type: 'Cleaning',
      status: 'Completed'
    }
  ];

  const patients = [
    {
      id: 1,
      name: 'John Doe',
      age: 35,
      lastVisit: '2024-02-15',
      nextVisit: '2024-03-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 28,
      lastVisit: '2024-03-01',
      nextVisit: '2024-03-15'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="w-6 h-6" />
              </button>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=40&h=40"
                  alt="Doctor"
                  className="w-10 h-10 rounded-full"
                />
                <span className="ml-3 font-medium">Dr. Sarah Wilson</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-semibold">8</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-semibold">3</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 mr-4">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-semibold">4</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Patients</p>
                <p className="text-2xl font-semibold">145</p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments and Patients */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Appointments */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Today's Appointments</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="mr-4">
                        {appointment.status === 'Pending' ? (
                          <AlertCircle className="w-8 h-8 text-yellow-500" />
                        ) : appointment.status === 'Confirmed' ? (
                          <CheckCircle className="w-8 h-8 text-green-500" />
                        ) : (
                          <Clock className="w-8 h-8 text-blue-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{appointment.patient}</h3>
                        <p className="text-sm text-gray-500">
                          {appointment.time} - {appointment.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                        <FileText className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-full">
                        <Mail className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-full">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Patients */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Recent Patients</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {patients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="mr-4">
                        <Users className="w-8 h-8 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">{patient.name}</h3>
                        <p className="text-sm text-gray-500">
                          Age: {patient.age} | Last Visit: {patient.lastVisit}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                        <FileText className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-full">
                        <Calendar className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};