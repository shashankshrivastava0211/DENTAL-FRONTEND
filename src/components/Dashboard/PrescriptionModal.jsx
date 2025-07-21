import React, { useState, useEffect } from "react";
import {
	X,
	Plus,
	Minus,
	FileText,
	Calendar,
	AlertCircle,
	Printer,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { treatments } from "../../Data/Treatments";

function PrescriptionModal({
	isOpen,
	onClose,
	appointmentId,
	existingPrescription,
	onSave,
}) {
	const [prescription, setPrescription] = useState({
		medicines: [
			{ type: "", name: "", dosage: "", frequency: "", duration: "" },
		],
		instructions: [""],
		proceduresPerformed: [{ procedureName: "", notes: "" }],
		allergies: [""],
		followUpRequired: false,
		nextVisit: (() => {
			const date = new Date();
			date.setDate(date.getDate() + 2); // +2 days
			date.setHours(10, 0, 0, 0); // Set to 10:00 AM
			return date;
		})(),
		additionalNotes: "",
		treatments: [],
	});

	const [errors, setErrors] = useState({
		medicines: false,
	});

	useEffect(() => {
		if (existingPrescription) {
			setPrescription({
				...existingPrescription,
				medicines:
					existingPrescription.medicines?.length > 0
						? existingPrescription.medicines
						: [{ name: "", dosage: "", frequency: "", duration: "" }],
				instructions:
					existingPrescription.instructions?.length > 0
						? existingPrescription.instructions
						: [""],
				proceduresPerformed:
					existingPrescription.proceduresPerformed?.length > 0
						? existingPrescription.proceduresPerformed
						: [{ procedureName: "", notes: "" }],
				allergies:
					existingPrescription.allergies?.length > 0
						? existingPrescription.allergies
						: [""],
				followUpRequired: existingPrescription.followUpRequired || false,
				nextVisit: existingPrescription.nextVisit
					? new Date(existingPrescription.nextVisit)
					: new Date(),
				additionalNotes: existingPrescription.additionalNotes || "",
				treatments:
					existingPrescription.treatments?.length > 0
						? existingPrescription.treatments
						: [],
			});
		} else {
			// Reset to default state for new prescription
			setPrescription({
				medicines: [{ name: "", dosage: "", frequency: "", duration: "" }],
				instructions: [""],
				proceduresPerformed: [{ procedureName: "", notes: "" }],
				allergies: [""],
				followUpRequired: false,
				nextVisit: (() => {
					const date = new Date();
					date.setDate(date.getDate() + 2);
					date.setHours(10, 0, 0, 0);
					return date;
				})(),
				additionalNotes: "",
				treatments: [],
			});
		}

		// Reset errors
		setErrors({ medicines: false });
	}, [existingPrescription]);

	const handleMedicineChange = (index, field, value) => {
		const newMedicines = [...prescription.medicines];
		newMedicines[index] = { ...newMedicines[index], [field]: value };
		setPrescription({ ...prescription, medicines: newMedicines });

		// Clear error if at least one medicine has a name
		if (field === "name" && value.trim() !== "") {
			setErrors({ ...errors, medicines: false });
		}
	};

	const addMedicine = () => {
		setPrescription({
			...prescription,
			medicines: [
				...prescription.medicines,
				{ name: "", dosage: "", frequency: "", duration: "" },
			],
		});
	};

	const removeMedicine = (index) => {
		if (prescription.medicines.length > 1) {
			const newMedicines = prescription.medicines.filter((_, i) => i !== index);
			setPrescription({ ...prescription, medicines: newMedicines });

			// Check if any remaining medicines have names
			const hasNamedMedicine = newMedicines.some(
				(med) => med.name.trim() !== ""
			);
			setErrors({ ...errors, medicines: !hasNamedMedicine });
		}
	};

	const handleInstructionChange = (index, value) => {
		const newInstructions = [...prescription.instructions];
		newInstructions[index] = value;
		setPrescription({ ...prescription, instructions: newInstructions });
	};

	const addInstruction = () => {
		setPrescription({
			...prescription,
			instructions: [...prescription.instructions, ""],
		});
	};

	const removeInstruction = (index) => {
		if (prescription.instructions.length > 1) {
			const newInstructions = prescription.instructions.filter(
				(_, i) => i !== index
			);
			setPrescription({ ...prescription, instructions: newInstructions });
		}
	};

	const handleProcedureChange = (index, field, value) => {
		const newProcedures = [...prescription.proceduresPerformed];
		newProcedures[index] = { ...newProcedures[index], [field]: value };
		setPrescription({ ...prescription, proceduresPerformed: newProcedures });
	};

	const addProcedure = () => {
		setPrescription({
			...prescription,
			proceduresPerformed: [
				...prescription.proceduresPerformed,
				{ procedureName: "", notes: "" },
			],
		});
	};

	const removeProcedure = (index) => {
		if (prescription.proceduresPerformed.length > 1) {
			const newProcedures = prescription.proceduresPerformed.filter(
				(_, i) => i !== index
			);
			setPrescription({ ...prescription, proceduresPerformed: newProcedures });
		}
	};

	const handleAllergyChange = (index, value) => {
		const newAllergies = [...prescription.allergies];
		newAllergies[index] = value;
		setPrescription({ ...prescription, allergies: newAllergies });
	};

	const addAllergy = () => {
		setPrescription({
			...prescription,
			allergies: [...prescription.allergies, ""],
		});
	};

	const removeAllergy = (index) => {
		if (prescription.allergies.length > 1) {
			const newAllergies = prescription.allergies.filter((_, i) => i !== index);
			setPrescription({ ...prescription, allergies: newAllergies });
		}
	};

	const validateForm = () => {
		const newErrors = { medicines: false };

		// Check if at least one medicine has a name
		const hasNamedMedicine = prescription.medicines.some(
			(med) => med.name.trim() !== ""
		);
		if (!hasNamedMedicine) {
			newErrors.medicines = true;
		}

		setErrors(newErrors);
		return !Object.values(newErrors).some((error) => error);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validate form
		if (!validateForm()) {
			return;
		}

		// Filter out empty entries
		const filteredPrescription = {
			...prescription,
			appointmentId,
			medicines: prescription.medicines.filter((med) => med.name.trim() !== ""),
			instructions: prescription.instructions.filter(
				(instruction) => instruction.trim() !== ""
			),
			proceduresPerformed: prescription.proceduresPerformed.filter(
				(proc) => proc.procedureName.trim() !== ""
			),
			allergies: prescription.allergies.filter(
				(allergy) => allergy.trim() !== ""
			),
		};

		onSave(filteredPrescription);
	};

	if (!isOpen) return null;
	const handlePrint = () => {
		window.print();
	};

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
				<div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
					<h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
						<FileText className="h-6 w-6 text-indigo-600" />
						{existingPrescription
							? "View/Edit Prescription"
							: "Add New Prescription"}
					</h2>
					<div className="flex items-center space-x-3">
						<Printer className="h-6 w-6 text-gray-500" />

						<button
							onClick={onClose}
							className="p-2 rounded-full hover:bg-gray-100 transition-colors">
							<X className="h-6 w-6 text-gray-500" />
						</button>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-8">
					{/* Medicines Section */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-medium text-gray-900">Medicines</h3>
							<button
								type="button"
								onClick={addMedicine}
								className="inline-flex items-center px-4 py-2 border border-indigo-300 rounded-lg text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
								<Plus className="h-4 w-4 mr-2" />
								Add Medicine
							</button>
						</div>

						{errors.medicines && (
							<div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center">
								<AlertCircle className="h-5 w-5 mr-2 text-red-500" />
								Please add at least one medicine with a name
							</div>
						)}

						<div className="space-y-4">
							{prescription.medicines.map((medicine, index) => (
								<div
									key={index}
									className="p-4 border border-gray-200 rounded-xl bg-gray-50">
									<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
										<div>
											<label className="text-sm text-gray-700">Type</label>
											<select
												value={medicine.type}
												onChange={(e) =>
													handleMedicineChange(index, "type", e.target.value)
												}
												className="w-full mt-1 px-3 py-2 border rounded-lg border-gray-300 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm">
												<option value="">Select</option>
												<option value="Tablet">Tab</option>
												<option value="Capsule">Cap</option>
												<option value="Syrup">Syp</option>
												<option value="Injection">Inj</option>
												<option value="Drops">Drp</option>
												<option value="Ointment">Oint</option>
												<option value="Powder">Pwd</option>
												<option value="Other">Other</option>
											</select>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Medicine Name
											</label>
											<input
												type="text"
												value={medicine.name}
												onChange={(e) =>
													handleMedicineChange(index, "name", e.target.value)
												}
												className={`w-full px-3 py-2 border ${
													errors.medicines
														? "border-red-300 ring-1 ring-red-300"
														: "border-gray-300"
												} rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500`}
												placeholder="Medicine name"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Dosage
											</label>
											<input
												type="text"
												value={medicine.dosage}
												onChange={(e) =>
													handleMedicineChange(index, "dosage", e.target.value)
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
												placeholder="e.g., 500mg"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Frequency
											</label>
											<select
												value={medicine.frequency}
												onChange={(e) =>
													handleMedicineChange(
														index,
														"frequency",
														e.target.value
													)
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
												<option value="">Select frequency</option>
												<option value="Once daily">Once daily</option>
												<option value="Twice daily">Twice daily</option>
												<option value="Three times daily">
													Three times daily
												</option>
												<option value="Four times daily">
													Four times daily
												</option>
												<option value="As needed">As needed</option>
											</select>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Duration
											</label>
											<div className="flex items-center">
												<input
													type="text"
													value={medicine.duration}
													onChange={(e) =>
														handleMedicineChange(
															index,
															"duration",
															e.target.value
														)
													}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
													placeholder="e.g., 7 days"
												/>
												{index > 0 && (
													<button
														type="button"
														onClick={() => removeMedicine(index)}
														className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
														<Minus className="h-5 w-5" />
													</button>
												)}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Instructions Section */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-medium text-gray-900">
								Instructions
							</h3>
							<button
								type="button"
								onClick={addInstruction}
								className="inline-flex items-center px-4 py-2 border border-indigo-300 rounded-lg text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
								<Plus className="h-4 w-4 mr-2" />
								Add Instruction
							</button>
						</div>

						<div className="space-y-3">
							{prescription.instructions.map((instruction, index) => (
								<div key={index} className="flex items-center gap-2">
									<input
										type="text"
										value={instruction}
										onChange={(e) =>
											handleInstructionChange(index, e.target.value)
										}
										className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
										placeholder="Enter instruction"
									/>
									{index > 0 && (
										<button
											type="button"
											onClick={() => removeInstruction(index)}
											className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
											<Minus className="h-5 w-5" />
										</button>
									)}
								</div>
							))}
						</div>
					</div>

					{/* Procedures Section */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-medium text-gray-900">
								Procedures Performed
							</h3>
							<button
								type="button"
								onClick={addProcedure}
								className="inline-flex items-center px-4 py-2 border border-indigo-300 rounded-lg text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
								<Plus className="h-4 w-4 mr-2" />
								Add Procedure
							</button>
						</div>

						<div className="space-y-4">
							{prescription.proceduresPerformed.map((procedure, index) => (
								<div
									key={index}
									className="p-4 border border-gray-200 rounded-xl bg-gray-50">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Procedure Name
											</label>
											<input
												type="text"
												value={procedure.procedureName}
												onChange={(e) =>
													handleProcedureChange(
														index,
														"procedureName",
														e.target.value
													)
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
												placeholder="Procedure name"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Notes
											</label>
											<div className="flex items-center">
												<input
													type="text"
													value={procedure.notes}
													onChange={(e) =>
														handleProcedureChange(
															index,
															"notes",
															e.target.value
														)
													}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
													placeholder="Procedure notes"
												/>
												{index > 0 && (
													<button
														type="button"
														onClick={() => removeProcedure(index)}
														className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
														<Minus className="h-5 w-5" />
													</button>
												)}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					{/* Treatments Section */}
					<div className="space-y-4">
						<h3 className="text-lg font-medium text-gray-900">Treatments</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
							{treatments.map((treatment) => {
								// Filter entries for this treatment
								const relatedEntries = prescription.treatments.filter(
									(t) => t.treatment === treatment.value
								);

								const isChecked = relatedEntries.length > 0;

								return (
									<div
										key={treatment.value}
										className="flex flex-col space-y-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
										<label className="flex items-center space-x-2 cursor-pointer">
											<input
												type="checkbox"
												checked={isChecked}
												onChange={(e) => {
													if (e.target.checked) {
														setPrescription((prev) => ({
															...prev,
															treatments: [
																...prev.treatments,
																{ treatment: treatment.value, toothNumber: "" },
															],
														}));
													} else {
														setPrescription((prev) => ({
															...prev,
															treatments: prev.treatments.filter(
																(t) => t.treatment !== treatment.value
															),
														}));
													}
												}}
												className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
											/>
											<span className="text-sm text-gray-800">
												{treatment.label}
											</span>
										</label>

										{isChecked && (
											<div className="space-y-2">
												{relatedEntries.map((entry, index) => (
													<div
														key={index}
														className="flex items-center space-x-2">
														<input
															type="text"
															value={entry.toothNumber}
															placeholder="Tooth #"
															onChange={(e) => {
																const updated = [...prescription.treatments];
																const globalIndex =
																	prescription.treatments.findIndex(
																		(t, i) =>
																			t.treatment === treatment.value &&
																			relatedEntries.indexOf(t) === index
																	);
																updated[globalIndex] = {
																	...updated[globalIndex],
																	toothNumber: e.target.value,
																};
																setPrescription({
																	...prescription,
																	treatments: updated,
																});
															}}
															className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm"
														/>
														{index > 0 && (
															<button
																type="button"
																onClick={() => {
																	const updated = [...prescription.treatments];
																	// Find the correct global index to remove
																	const globalIndex =
																		prescription.treatments.findIndex(
																			(t, i) =>
																				t.treatment === treatment.value &&
																				relatedEntries.indexOf(t) === index
																		);
																	updated.splice(globalIndex, 1);
																	setPrescription({
																		...prescription,
																		treatments: updated,
																	});
																}}
																className="text-red-500 hover:text-red-700 text-sm px-2 py-1">
																<Minus className="h-4 w-4" />
															</button>
														)}
													</div>
												))}
												<button
													type="button"
													onClick={() =>
														setPrescription((prev) => ({
															...prev,
															treatments: [
																...prev.treatments,
																{ treatment: treatment.value, toothNumber: "" },
															],
														}))
													}
													className="text-indigo-600 text-sm hover:underline">
													+ Add Tooth
												</button>
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>

					{/* Allergies Section */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-medium text-gray-900">Allergies</h3>
							<button
								type="button"
								onClick={addAllergy}
								className="inline-flex items-center px-4 py-2 border border-indigo-300 rounded-lg text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
								<Plus className="h-4 w-4 mr-2" />
								Add Allergy
							</button>
						</div>

						<div className="space-y-3">
							{prescription.allergies.map((allergy, index) => (
								<div key={index} className="flex items-center gap-2">
									<div className="flex-1 flex items-center bg-red-50 border border-red-200 rounded-lg px-3 py-2">
										<AlertCircle className="h-4 w-4 text-red-500 mr-2" />
										<input
											type="text"
											value={allergy}
											onChange={(e) =>
												handleAllergyChange(index, e.target.value)
											}
											className="flex-1 bg-transparent border-none focus:ring-0 text-red-700"
											placeholder="Enter allergy"
										/>
									</div>
									{index > 0 && (
										<button
											type="button"
											onClick={() => removeAllergy(index)}
											className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
											<Minus className="h-5 w-5" />
										</button>
									)}
								</div>
							))}
						</div>
					</div>

					{/* Follow-up and Next Visit */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-gray-200 rounded-xl bg-gray-50">
						<div>
							<label className="flex items-center space-x-2">
								<input
									type="checkbox"
									checked={prescription.followUpRequired}
									onChange={(e) =>
										setPrescription({
											...prescription,
											followUpRequired: e.target.checked,
										})
									}
									className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
								/>
								<span className="text-sm font-medium text-gray-700">
									Follow-up Required
								</span>
							</label>
						</div>
						<div>
							<label className="block text-sm font-semibold text-gray-800 mb-1">
								Next Visit (Date & Time)
							</label>
							<div className="relative">
								<DatePicker
									selected={prescription.nextVisit}
									onChange={(date) =>
										setPrescription({ ...prescription, nextVisit: date })
									}
									showTimeSelect
									timeIntervals={30}
									timeFormat="hh:mm aa"
									dateFormat="dd MMM yyyy • hh:mm aa"
									minDate={new Date()}
									className="w-full px-4 py-2 pr-10 border rounded-xl border-gray-300 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
									placeholderText="e.g., 22 Jul 2025 • 10:30 AM"
									popperPlacement="bottom-start"
								/>
								<Calendar className="absolute right-3 top-2.5 h-5 w-5 text-indigo-500 pointer-events-none" />
							</div>
						</div>
					</div>

					{/* Additional Notes */}
					<div>
						<label className="block text-lg font-medium text-gray-900 mb-2">
							Additional Notes
						</label>
						<textarea
							value={prescription.additionalNotes}
							onChange={(e) =>
								setPrescription({
									...prescription,
									additionalNotes: e.target.value,
								})
							}
							rows={4}
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
							placeholder="Add any additional notes here..."></textarea>
					</div>

					<div className="flex justify-end space-x-3">
						<button
							type="button"
							onClick={onClose}
							className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
							Cancel
						</button>
						<button
							type="button"
							onClick={handlePrint}
							className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors flex items-center">
							<Printer className="h-4 w-4 mr-2" />
							Print
						</button>
						<button
							type="submit"
							className="px-6 py-3 border border-transparent rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
							{existingPrescription
								? "Update Prescription"
								: "Save Prescription"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default PrescriptionModal;
