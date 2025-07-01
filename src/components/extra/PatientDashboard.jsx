import React from "react";
import {
	Calendar,
	Clock,
	FileText,
	Bell,
	User,
	Heart,
	Activity,
	Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PatientDashboard = () => {
  	const navigate = useNavigate();

	const appointments = [
		{
			id: 1,
			doctor: "Dr. Sarah Wilson",
			date: "2024-03-15",
			time: "09:00 AM",
			type: "Check-up",
			status: "Upcoming",
		},
		{
			id: 2,
			doctor: "Dr. Michael Chen",
			date: "2024-02-28",
			time: "02:30 PM",
			type: "Cleaning",
			status: "Completed",
		},
	];

	const medicalRecords = [
		{
			id: 1,
			date: "2024-02-28",
			type: "Dental Cleaning",
			doctor: "Dr. Michael Chen",
			notes: "Regular cleaning completed. Next visit in 6 months.",
		},
		{
			id: 2,
			date: "2024-01-15",
			type: "Check-up",
			doctor: "Dr. Sarah Wilson",
			notes: "No cavities found. Continue regular brushing and flossing.",
		},
	];

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white shadow">
				<div className="container mx-auto px-4 py-6">
					<div className="flex justify-between items-center">
						<h1 className="text-3xl font-bold text-gray-900">
							Patient Dashboard
						</h1>
						<div className="flex items-center space-x-4">
							<button className="p-2 text-gray-400 hover:text-gray-500">
								<Bell className="w-6 h-6" />
							</button>
							<div className="flex items-center">
								<img
									src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=40&h=40"
									alt="Patient"
									className="w-10 h-10 rounded-full"
								/>
								<span className="ml-3 font-medium">John Doe</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="container mx-auto px-4 py-8">
				{/* Patient Profile Card */}
				<div className="bg-white rounded-lg shadow mb-8">
					<div className="p-6">
						<div className="flex items-center">
							<img
								src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80"
								alt="Patient"
								className="w-20 h-20 rounded-full"
							/>
							<div className="ml-6">
								<h2 className="text-2xl font-semibold">John Doe</h2>
								<div className="mt-2 space-y-1">
									<p className="text-gray-600">
										<span className="font-medium">Patient ID:</span> P12345
									</p>
									<p className="text-gray-600">
										<span className="font-medium">Age:</span> 35
									</p>
									<p className="text-gray-600">
										<span className="font-medium">Blood Type:</span> O+
									</p>
								</div>
							</div>
							<div className="ml-auto">
								<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300" onClick={()=>{
                    navigate("/book-appointment")
                  }} >
									Book Appointment
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Quick Stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<div className="p-3 rounded-full bg-blue-100 mr-4">
								<Calendar className="w-6 h-6 text-blue-600" />
							</div>
							<div>
								<p className="text-sm text-gray-600">Next Appointment</p>
								<p className="text-lg font-semibold">March 15, 2024</p>
							</div>
						</div>
					</div>
					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<div className="p-3 rounded-full bg-green-100 mr-4">
								<Activity className="w-6 h-6 text-green-600" />
							</div>
							<div>
								<p className="text-sm text-gray-600">Treatment Status</p>
								<p className="text-lg font-semibold">In Progress</p>
							</div>
						</div>
					</div>
					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<div className="p-3 rounded-full bg-purple-100 mr-4">
								<Heart className="w-6 h-6 text-purple-600" />
							</div>
							<div>
								<p className="text-sm text-gray-600">Overall Health</p>
								<p className="text-lg font-semibold">Good</p>
							</div>
						</div>
					</div>
				</div>

				{/* Appointments and Medical Records */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Appointments */}
					<div className="bg-white rounded-lg shadow">
						<div className="p-6 border-b border-gray-200 flex justify-between items-center">
							<h2 className="text-xl font-semibold">Appointments</h2>
							<button className="flex items-center text-blue-600 hover:text-blue-700">
								<Plus className="w-5 h-5 mr-1" />
								New Appointment
							</button>
						</div>
						<div className="p-6">
							<div className="space-y-6">
								{appointments.map((appointment) => (
									<div
										key={appointment.id}
										className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
										<div>
											<h3 className="font-medium">{appointment.doctor}</h3>
											<p className="text-sm text-gray-500">
												{appointment.date} at {appointment.time}
											</p>
											<p className="text-sm text-gray-500">
												{appointment.type}
											</p>
										</div>
										<div className="flex items-center">
											<span
												className={`px-3 py-1 rounded-full text-sm font-medium ${
													appointment.status === "Upcoming"
														? "bg-blue-100 text-blue-800"
														: "bg-green-100 text-green-800"
												}`}>
												{appointment.status}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Medical Records */}
					<div className="bg-white rounded-lg shadow">
						<div className="p-6 border-b border-gray-200">
							<h2 className="text-xl font-semibold">Medical Records</h2>
						</div>
						<div className="p-6">
							<div className="space-y-6">
								{medicalRecords.map((record) => (
									<div key={record.id} className="p-4 bg-gray-50 rounded-lg">
										<div className="flex justify-between items-start mb-2">
											<div>
												<h3 className="font-medium">{record.type}</h3>
												<p className="text-sm text-gray-500">
													{record.date} - {record.doctor}
												</p>
											</div>
											<button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
												<FileText className="w-5 h-5" />
											</button>
										</div>
										<p className="text-sm text-gray-600">{record.notes}</p>
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
