import React from "react";
import {
	Calendar,
	Clock,
	User,
	FileText,
	Phone,
	ArrowLeft,
	Activity,
	CalendarDays,
	MapPin,
	AlertCircle,
	CheckCircle2,
	XCircle,
	Clock4,
} from "lucide-react";

function AppointmentCard({ appointment, onClose }) {
	const formatTime = (time) => {
		const hour = parseInt(time);
		return new Date(0, 0, 0, hour).toLocaleTimeString("en-US", {
			hour: "numeric",
			hour12: true,
		});
	};

	const formatDate = (dateString) => {
		const [day, month, year] = dateString.split("/");
		return new Date(year, month - 1, day).toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const formatDateTime = (dateString) => {
		return new Date(dateString).toLocaleString("en-US", {
			dateStyle: "medium",
			timeStyle: "short",
		});
	};

	const getStatusIcon = (status) => {
		switch (status.toLowerCase()) {
			case "confirmed":
				return <CheckCircle2 className="h-6 w-6 text-green-600" />;
			case "cancelled":
				return <XCircle className="h-6 w-6 text-red-600" />;
			default:
				return <Clock4 className="h-6 w-6 text-yellow-600" />;
		}
	};

	const getStatusColor = (status) => {
		switch (status.toLowerCase()) {
			case "confirmed":
				return "bg-green-100 text-green-800 border-green-200";
			case "cancelled":
				return "bg-red-100 text-red-800 border-red-200";
			default:
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
		}
	};

	const getTreatmentLabel = (treatment) => {
		const treatments = {
			oral: "Oral Treatment",
			dental: "Dental Treatment",
			orthodontic: "Orthodontic Treatment",
			orthopedic: "Orthopedic Treatment",
		};
		return treatments[treatment] || treatment;
	};

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
				<div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl">
					<button
						onClick={onClose}
						className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
						<ArrowLeft className="h-5 w-5 mr-2" />
						Back to Appointments
					</button>
					<div className="flex items-center gap-2">
						{getStatusIcon(appointment.status)}
						<span
							className={`px-4 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(
								appointment.status
							)}`}>
							{appointment.status.charAt(0).toUpperCase() +
								appointment.status.slice(1)}
						</span>
					</div>
				</div>

				<div className="p-6 space-y-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="space-y-6">
							<div className="bg-gray-50 rounded-xl p-6">
								<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
									<User className="h-6 w-6 text-indigo-600" />
									Patient Information
								</h3>
								<div className="space-y-4">
									<div className="flex items-center text-gray-700">
										<span className="font-medium w-32">Name:</span>
										<span>{appointment.patientName}</span>
									</div>
									<div className="flex items-center text-gray-700">
										<span className="font-medium w-32">Phone:</span>
										<span>{appointment.phoneNo}</span>
									</div>
									<div className="flex items-center text-gray-700">
										<span className="font-medium w-32">Treatment:</span>
										<span>{getTreatmentLabel(appointment.treatment)}</span>
									</div>
								</div>
							</div>

							<div className="bg-gray-50 rounded-xl p-6">
								<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
									<CalendarDays className="h-6 w-6 text-indigo-600" />
									Appointment Details
								</h3>
								<div className="space-y-4">
									<div className="flex items-center text-gray-700">
										<span className="font-medium w-32">Date:</span>
										<span>{formatDate(appointment.date)}</span>
									</div>
									<div className="flex items-center text-gray-700">
										<span className="font-medium w-32">Time:</span>
										<span>{formatTime(appointment.time)}</span>
									</div>
									<div className="flex items-center text-gray-700">
										<span className="font-medium w-32">Created:</span>
										<span>{formatDateTime(appointment.createdAt)}</span>
									</div>
									<div className="flex items-center text-gray-700">
										<span className="font-medium w-32">Last Updated:</span>
										<span>{formatDateTime(appointment.updatedAt)}</span>
									</div>
								</div>
							</div>
						</div>

						<div className="space-y-6">
							{appointment.description && (
								<div className="bg-gray-50 rounded-xl p-6">
									<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
										<FileText className="h-6 w-6 text-indigo-600" />
										Description
									</h3>
									<p className="text-gray-700 whitespace-pre-line">
										{appointment.description}
									</p>
								</div>
							)}

							<div className="bg-gray-50 rounded-xl p-6">
								<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
									<AlertCircle className="h-6 w-6 text-indigo-600" />
									Additional Information
								</h3>
								<div className="space-y-4">
									<div className="flex items-center text-gray-700">
										<span className="font-medium w-32">Appointment ID:</span>
										<span className="font-mono text-sm">{appointment._id}</span>
									</div>
									<div className="flex items-center text-gray-700">
										<span className="font-medium w-32">Prescription:</span>
										<span>
											{appointment.prescriptionId
												? "Available"
												: "Not Available"}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AppointmentCard;

// import React from 'react';
// import { X, Calendar, Clock, User, FileText, Phone, Stethoscope } from 'lucide-react';

// function AppointmentCard({ appointment, onClose }) {
//   const formatTime = (time) => {
//     const hour = parseInt(time);
//     return new Date(0, 0, 0, hour).toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       hour12: true,
//     });
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
//         <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-gray-900">Appointment Details</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-500 transition-colors"
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Patient Information */}
//           <div className="flex items-start gap-4">
//             <div className="flex-shrink-0 h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center">
//               <User className="h-6 w-6 text-teal-600" />
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-gray-900">{appointment.patientName}</h3>
//               <div className="mt-1 flex items-center gap-2 text-gray-500">
//                 <Phone className="h-4 w-4" />
//                 <span>{appointment.phoneNo}</span>
//               </div>
//             </div>
//           </div>

//           {/* Appointment Details */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="flex items-center gap-3">
//               <Calendar className="h-5 w-5 text-teal-600" />
//               <div>
//                 <div className="text-sm text-gray-500">Date</div>
//                 <div className="font-medium">{appointment.date}</div>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <Clock className="h-5 w-5 text-teal-600" />
//               <div>
//                 <div className="text-sm text-gray-500">Time</div>
//                 <div className="font-medium">{formatTime(appointment.time)}</div>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <Stethoscope className="h-5 w-5 text-teal-600" />
//               <div>
//                 <div className="text-sm text-gray-500">Treatment</div>
//                 <div className="font-medium">{appointment.treatment}</div>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className={`h-2.5 w-2.5 rounded-full ${
//                 appointment.status === 'confirmed' ? 'bg-green-500' :
//                 appointment.status === 'cancelled' ? 'bg-red-500' :
//                 'bg-yellow-500'
//               }`} />
//               <div>
//                 <div className="text-sm text-gray-500">Status</div>
//                 <div className="font-medium capitalize">{appointment.status}</div>
//               </div>
//             </div>
//           </div>

//           {/* Prescription Section */}
//           <div className="border-t border-gray-200 pt-6">
//             <div className="flex items-center gap-2 mb-4">
//               <FileText className="h-5 w-5 text-teal-600" />
//               <h3 className="text-lg font-medium text-gray-900">Prescription</h3>
//             </div>

//             {appointment.prescription ? (
//               <div className="space-y-4">
//                 {/* Medicines */}
//                 {appointment.prescription.medicines?.length > 0 && (
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="font-medium text-gray-900 mb-2">Medicines</h4>
//                     <ul className="space-y-2">
//                       {appointment.prescription.medicines.map((medicine, index) => (
//                         <li key={index} className="text-sm">
//                           <span className="font-medium">{medicine.name}</span> - {medicine.dosage}
//                           {medicine.frequency && `, ${medicine.frequency}`}
//                           {medicine.duration && `, for ${medicine.duration}`}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {/* Instructions */}
//                 {appointment.prescription.instructions?.length > 0 && (
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="font-medium text-gray-900 mb-2">Instructions</h4>
//                     <ul className="list-disc list-inside space-y-1">
//                       {appointment.prescription.instructions.map((instruction, index) => (
//                         <li key={index} className="text-sm text-gray-700">{instruction}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {/* Additional Notes */}
//                 {appointment.prescription.additionalNotes && (
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="font-medium text-gray-900 mb-2">Additional Notes</h4>
//                     <p className="text-sm text-gray-700">{appointment.prescription.additionalNotes}</p>
//                   </div>
//                 )}

//                 {/* Next Visit */}
//                 {appointment.prescription.followUpRequired && (
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="font-medium text-gray-900 mb-2">Follow-up</h4>
//                     <p className="text-sm text-gray-700">
//                       Next visit scheduled for: {new Date(appointment.prescription.nextVisit).toLocaleDateString()}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="text-center py-8 bg-gray-50 rounded-lg">
//                 <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//                 <p className="text-gray-500">No prescription available yet</p>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="px-6 py-4 bg-gray-50 rounded-b-2xl">
//           <button
//             onClick={onClose}
//             className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AppointmentCard;
