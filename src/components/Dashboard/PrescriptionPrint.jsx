import React from "react";
import { NAME, REGISTRATION_NO } from "../../constants/constant";

export default function PrescriptionPrint({ prescription }) {
	console.log("Prescription: ", prescription);
	return (
		<div className="min-h-screen p-6 bg-gray-100 flex justify-center">
			<div
				className="w-[820px] bg-white shadow-lg print:shadow-none border"
				style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}>
				{/* Top header */}
				<div className="flex w-full border-b-2 border-orange-500">
					{/* Left Section - Logo + Clinic Name */}
					<div className="w-1/3 bg-white flex flex-col justify-center pl-6 py-2">
						<div className="flex items-center gap-3 justify-center">
							{/* Clinic Logo */}
							<div className=" items-center ">
								{" "}
								<img
									src={prescription.logoUrl || "/images/Icons/logo2.png"}
									alt="Clinic Logo"
									className="w-21 h-21 object-contain "
								/>
								{/* Clinic Name */}
								<div className="text-3xl text-center tracking-wide font-semibold text-slate-700">
									{"DENTAL CLINIC"}
								</div>
							</div>
						</div>
					</div>

					{/* Right Section - Doctor Info */}
					<div className="w-2/3 bg-slate-900 text-white p-4 flex flex-col justify-center">
						{/* Doctor Name + Title */}
						<div className="text-sm font-semibold uppercase">{NAME}</div>
						<div className="text-[11px] mt-1">
							{prescription.qualifications ||
								"B.D.S, M.D.S (Root Canal Specialist & Cosmetologist)"}
						</div>

						{/* Address */}
						<div className="text-[10px] mt-2 leading-tight">
							{prescription.addressLine1 ||
								"Shop No. 107, Sai Vision, Near Indian Bank,"}
							<br />
							{prescription.addressLine2 ||
								"Kunal Icon Road, Pimple Saudagar, Pune - 411027"}
						</div>

						<div className="text-[10px] mt-2">{REGISTRATION_NO}</div>

						{/* Contact Numbers */}
						<div className="text-[10px] mt-2">
							📞 {prescription.phone1 || "8446322666"}{" "}
							{prescription.phone2
								? ` / ${prescription.phone2}`
								: " / 7387958331"}
						</div>

						{/* Timing */}
						<div className="text-[10px] mt-2">
							TIMING:{" "}
							{prescription.timings || "10:30am - 1:00pm | 6:30pm - 9:30pm"}
						</div>
					</div>
				</div>

				{/* Main body */}
				<div className="relative">
					{/* watermark */}

					<img
						src="/images/Icons/logo2.png"
						alt="watermark"
						className="absolute right-20 top-20 opacity-10 w-1/2 pointer-events-none select-none"
					/>

					<div className="grid grid-cols-12 gap-0 p-6 pt-8">
						{/* Left column (form fields) */}
						<div className="col-span-4 border-r pr-6">
							<div className="text-sm font-semibold mb-4">NAME :</div>
							<div className="mb-4 text-base">
								{prescription?.appointmentId?.patientName || ""}
							</div>

							<div className="text-sm font-semibold mb-1">AGE :</div>
							<div className="mb-4 text-base">
								{prescription?.appointmentId?.age || "___"}
							</div>

							<div className="text-sm font-semibold mb-1">SEX :</div>
							<div className="mb-4 text-base flex items-center gap-3">
								<label className={`inline-flex items-center gap-2`}>
									<input
										type="checkbox"
										checked={prescription?.appointmentId?.gender === "male"}
										readOnly
									/>
									<span className="text-sm">M</span>
								</label>
								<label className={`inline-flex items-center gap-2`}>
									<input
										type="checkbox"
										checked={prescription?.appointmentId?.gender === "female"}
										readOnly
									/>
									<span className="text-sm">F</span>
								</label>
							</div>

							<div className="text-lg mb-1">
								<strong>Treatment Plan:</strong>
								<div className="text-base min-h-[72px] mt-1">
									{prescription.treatments.map((t, i) => {
										const formattedTreatment = t.treatment
											.replaceAll("_", " ")
											.replace(/\b\w/g, (char) => char.toUpperCase()); // capitalizes each word

										return <div key={i}>{formattedTreatment}</div>;
									})}
								</div>
							</div>
						</div>

						{/* Right column (Rx area) */}
						<div className="col-span-8 pl-6">
							{/* Rx Header */}
							<div className="flex items-start gap-2">
								<div className="text-4xl font-bold">Rx</div>
								<div className="flex-1 text-sm text-slate-700">&nbsp;</div>
							</div>

							{/* Prescription Table */}
							<div className="mt-4 bg-transparent min-h-[320px] p-2">
								<table className="w-full text-sm border-collapse">
									<thead>
										<tr className="text-left text-xs text-slate-600 border-b">
											<th className="pb-2">Medicine</th>
											<th className="pb-2">Frequency</th>
											<th className="pb-2">Dosage</th>
											<th className="pb-2">Duration</th>
										</tr>
									</thead>
									<tbody>
										{prescription.medicines?.length ? (
											prescription.medicines.map((m, i) => (
												<tr
													key={i}
													className="align-top border-b border-slate-200">
													<td className="py-3 pr-4">{m.name}</td>
													<td className="py-3 pr-4">{m.frequency}</td>
													<td className="py-3 pr-4">{m.dosage}</td>
													<td className="py-3">{m.duration}</td>
												</tr>
											))
										) : (
											<tr>
												<td
													colSpan={4}
													className="py-6 text-slate-400 text-center italic">
													(prescription will appear here)
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>

							{/* Signature Area */}
							<div className="flex justify-end mt-8">
								<div className="text-center">
									<div className="h-12 w-48 border-t border-slate-400"></div>
									<div className="text-xs mt-1">
										{prescription.doctor || "Doctor Signature"}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Footer checkboxes and orange bar */}
				<div className="px-6 pb-6">
					<div className="flex items-start gap-3 mt-4">
						<label className="inline-flex items-center gap-2 text-xs">
							<input type="checkbox" />
							<span>Before Taking Medicine Consult With Gynecologist.</span>
						</label>
						<label className="inline-flex items-center gap-2 text-xs ml-6">
							<input type="checkbox" defaultChecked />
							<span>
								In case of adverse drug reaction stop medicine and contact
								doctor.
							</span>
						</label>
					</div>
				</div>

				<div className="h-6 bg-orange-600"></div>
			</div>

			<style jsx global>{`
				@media print {
					body {
						-webkit-print-color-adjust: exact;
					}
					.min-h-screen {
						background: white !important;
					}
					.shadow-lg {
						box-shadow: none !important;
					}
					.print\:shadow-none {
						box-shadow: none;
					}
					/* Make the component fill the printed page fairly tightly */
					@page {
						size: A4;
						margin: 12mm;
					}
				}
			`}</style>
		</div>
	);
}

// Example usage (for development) - remove or adapt when integrating into your app
export const Example = () => <PrescriptionPrint />;
