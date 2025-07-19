import React from "react";
import { Dialog } from "@headlessui/react";

function TreatmentPlanModal({ isOpen, onClose, treatmentData }) {
	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			className="fixed z-50 inset-0 overflow-y-auto">
			<div className="flex items-center justify-center min-h-screen px-4">
				{/* Overlay */}
				<div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />

				{/* Panel */}
				<div className="bg-white rounded-lg p-6 z-50 shadow-lg w-full max-w-md relative">
					{/* X button */}
					<button
						onClick={onClose}
						className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
						aria-label="Close">
						×
					</button>

					<Dialog.Title className="text-lg font-bold mb-4">
						Treatment Plan
					</Dialog.Title>

					{treatmentData?.treatments?.length > 0 ? (
						<ul className="space-y-2">
							{treatmentData.treatments.map((t) => (
								<li key={t._id} className="border p-2 rounded bg-gray-100">
									<strong>{t.treatment}</strong> — Tooth #{t.toothNumber}
								</li>
							))}
						</ul>
					) : (
						<p>No treatment details available.</p>
					)}
				</div>
			</div>
		</Dialog>
	);
}

export default TreatmentPlanModal;
