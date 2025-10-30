import React from "react";

const PrescriptionCard = ({ prescription }) => {
	// fallback values
	const defaultPrescription = {
		doctorName: "Dr. John Doe",
		specialization: "General Physician",
		clinicName: "City Health Clinic",
		clinicPhone: "+91 9876543210",
		clinicAddress: "123 Main Street, Mumbai, India",
		patientName: "Jane Smith",
		patientAge: 28,
		patientGender: "Female",
		date: new Date().toLocaleDateString(),
		medicines: [
			{
				name: "Paracetamol 500mg",
				dosage: "1 tablet",
				duration: "3 times a day",
			},
			{
				name: "Amoxicillin 250mg",
				dosage: "1 capsule",
				duration: "2 times a day",
			},
		],
	};

	// merge actual + fallback
	const data = { ...defaultPrescription, ...prescription };

	return (
		<div className="max-w-lg mx-auto bg-white border shadow-lg rounded-lg p-6">
			{/* Header */}
			<div className="flex justify-between border-b pb-3 mb-4">
				<div>
					<h1 className="text-xl font-bold">{data.doctorName}</h1>
					<p className="text-sm text-gray-600">{data.specialization}</p>
					<p className="text-sm text-gray-600">{data.clinicName}</p>
				</div>
				<div className="text-right">
					<p className="text-sm">📞 {data.clinicPhone}</p>
					<p className="text-sm">{data.clinicAddress}</p>
				</div>
			</div>

			{/* Patient Info */}
			<div className="mb-4">
				<p>
					<strong>Patient:</strong> {data.patientName}
				</p>
				<p>
					<strong>Age:</strong> {data.patientAge} | <strong>Gender:</strong>{" "}
					{data.patientGender}
				</p>
				<p>
					<strong>Date:</strong> {data.date}
				</p>
			</div>

			{/* Medicines */}
			<div>
				<h2 className="text-lg font-semibold border-b pb-2 mb-3">
					Prescription
				</h2>
				<ul className="list-disc pl-6 space-y-2">
					{data.medicines.map((med, index) => (
						<li key={index}>
							<strong>{med.name}</strong> — {med.dosage} ({med.duration})
						</li>
					))}
				</ul>
			</div>

			{/* Footer */}
			<div className="mt-8 border-t pt-4 text-right">
				<p className="italic">Doctor’s Signature</p>
			</div>
		</div>
	);
};

export default PrescriptionCard;
