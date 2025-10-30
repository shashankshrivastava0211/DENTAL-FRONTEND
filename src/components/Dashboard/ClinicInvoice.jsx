import React from "react";
import {
	ADDRESS,
	CLINIC_NAME,
	EMAIL,
	NAME,
	PHONE,
} from "../../constants/constant";
import moment from "moment/moment";
import numberToWords from "number-to-words";

export default function ClinicInvoice({ bill }) {
	// ✅ Helper: format date safely
	const formatDate = (date) =>
		date ? moment(date).format("DD/MM/YYYY") : "N/A";

	// ✅ Safe getters (prefer bill → appointment → prescription → fallback)
	const patientName =
		bill?.patientName || bill?.appointmentId?.patientName || "Unknown";
	const gender =
		bill?.gender ||
		bill?.appointmentId?.gender?.charAt(0).toUpperCase() +
			bill?.appointmentId?.gender?.slice(1) ||
		"N/A";
	const age = bill?.age || bill?.appointmentId?.age || "N/A";
	const phoneNo = bill?.phoneNo || bill?.appointmentId?.phoneNo || "N/A";
	const invoiceNo = bill?.invoiceNo || "N/A";
	const date =
		bill?.createdAt ||
		bill?.date ||
		bill?.appointmentId?.date ||
		new Date().toISOString();
	const nextVisit =
		bill?.nextVisit || bill?.appointmentId?.prescriptionId?.nextVisit;
	const instructions =
		bill?.instructions ||
		bill?.appointmentId?.prescriptionId?.instructions ||
		[];
	const amount = bill?.amount ?? 0;
	const discount = parseFloat(bill.discount) || 0;
	const tax = parseFloat(bill.tax) || 0;
	const total = amount - discount + tax;
	const netAmount = amount - discount;

	// ✅ Convert to words
	const amountInWords =
		netAmount > 0
			? numberToWords
					.toWords(netAmount)
					.replace(/^\w/, (c) => c.toUpperCase()) + " rupees only"
			: "Zero only";
	return (
		<div
			style={{
				width: "900px",
				margin: "0 auto",
				border: "2px solid black",
				fontFamily: "Arial, sans-serif",
			}}>
			{/* Header */}
			<div style={{ display: "flex", borderBottom: "2px solid black" }}>
				<div
					style={{
						flex: 1,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRight: "2px solid black",
					}}>
					<img
						src="/images/Icons/logo2.png"
						alt="Logo"
						style={{
							maxHeight: "200px",
							maxWidth: "100%",
							objectFit: "cover",
						}}
					/>
				</div>

				<div style={{ flex: 2 }}>
					<div
						style={{
							background: "#ddd",
							textAlign: "center",
							padding: "10px",
							borderBottom: "2px solid black",
							fontSize: "24px",
							fontWeight: "bold",
						}}>
						Invoice
					</div>
					<div style={{ padding: "10px", fontSize: "18px" }}>
						<div>
							<b>Clinic Name:</b> {CLINIC_NAME}
						</div>
						<div>
							<b>Address:</b> {ADDRESS}
						</div>
						<div>
							<b>Phone No.:</b> {PHONE}
						</div>
						<div>
							<b>Email ID:</b> {EMAIL}
						</div>
					</div>
				</div>
			</div>
			{/* Patient Details */}
			<div
				style={{
					background: "#ddd",
					padding: "5px",
					borderTop: "2px solid black",
					borderBottom: "2px solid black",
					fontWeight: "bold",
				}}>
				Patient Details:
			</div>
			<div style={{ padding: "10px", fontSize: "14px" }}>
				<div>
					<b>Name:</b> {patientName}{" "}
					<b style={{ marginLeft: "100px" }}>Gender:</b> {gender}
				</div>
				<div>
					<b>Age:</b> {age}
				</div>
				<div>
					<b>Phone No.:</b> {phoneNo}{" "}
					<b style={{ marginLeft: "15px" }}>Invoice No:</b> {invoiceNo}
				</div>
				<div>
					<b>Date:</b> {formatDate(date)}
				</div>
				<div style={{ textAlign: "right" }}>
					<b>Next Consultancy:</b> {formatDate(nextVisit)}
				</div>
			</div>
			{/* Doctor Details */}
			<div style={{ padding: "10px", fontSize: "14px" }}>
				<div>
					<b>Doctor Name:</b> {NAME}
				</div>
				<div>Under the Consult of {NAME}</div>
			</div>
			{/* Patient Observation
			<div
				style={{
					background: "#ddd",
					padding: "5px",
					borderTop: "2px solid black",
					borderBottom: "2px solid black",
					fontWeight: "bold",
				}}>
				Patient Observation:
			</div>
			<div style={{ padding: "10px", fontSize: "14px" }}>
				{instructions.length > 0 ? (
					instructions.map((instruction, index) => (
						<div key={index}>
							{index + 1}. {instruction}
						</div>
					))
				) : (
					<div>No instructions available.</div>
				)}
			</div> */}
			{/* Items Table */}
			<table
				style={{
					width: "100%",
					borderCollapse: "collapse",
					border: "2px solid black",
					marginBottom: "10px",
				}}>
				<thead>
					<tr style={{ background: "#ddd", fontSize: "14px" }}>
						<th style={{ border: "1px solid black", padding: "5px" }}>
							Treatment
						</th>
						<th style={{ border: "1px solid black", padding: "5px" }}>Price</th>
						<th style={{ border: "1px solid black", padding: "5px" }}>
							Amount
						</th>
					</tr>
				</thead>
				<tbody>
					{bill?.items?.length > 0 ? (
						bill.items.map((item, idx) => (
							<tr key={idx}>
								<td style={{ border: "1px solid black" }}>
									{item.description || "N/A"}
								</td>
								<td style={{ border: "1px solid black" }}>{item.amount}</td>
								<td style={{ border: "1px solid black" }}>{item.amount}</td>
							</tr>
						))
					) : (
						<tr>
							<td
								colSpan="4"
								style={{ border: "1px solid black", textAlign: "center" }}>
								No items available
							</td>
						</tr>
					)}
					<tr>
						<td
							colSpan="2"
							style={{
								border: "1px solid black",
								textAlign: "right",
								fontWeight: "bold",
							}}>
							Total
						</td>
						<td style={{ border: "1px solid black" }}>{total}</td>
					</tr>
				</tbody>
			</table>
			{/* Totals and Payment */}
			<div style={{ display: "flex", borderTop: "2px solid black" }}>
				<div style={{ flex: 2, borderRight: "2px solid black" }}>
					<div
						style={{
							background: "#ddd",
							padding: "5px",
							borderBottom: "1px solid black",
							fontWeight: "bold",
						}}>
						Total Amount In Words:
					</div>
					<div
						style={{
							height: "40px",
							paddingLeft: "5px",
							borderBottom: "1px solid black",
						}}>
						{amountInWords}
					</div>

					<div
						style={{
							background: "#ddd",
							padding: "5px",
							borderBottom: "1px solid black",
							fontWeight: "bold",
						}}>
						Terms and Conditions:
					</div>
					<div style={{ padding: "5px", fontSize: "12px", lineHeight: "1.6" }}>
						<ol style={{ paddingLeft: "10px", margin: 0 }}>
							<li>
								Treatment charges are subject to change based on clinical
								findings.
							</li>
							<li>
								All payments are non-refundable once the treatment/procedure
								begins.
							</li>
							<li>
								The clinic is not responsible for complications arising from
								patient non-compliance with instructions.
							</li>
							<li>
								Prescribed medicines must be taken as per the doctor’s advice
								only.
							</li>

							<li>
								In case of emergencies, kindly contact the clinic immediately.
							</li>
						</ol>
					</div>
				</div>

				<div style={{ flex: 1 }}>
					<div style={{ padding: "10px", fontSize: "14px" }}>
						<div>
							<b>Sub Total:</b> {amount}
						</div>
						<div>
							<b>Discount:</b> {discount}
						</div>
						<div>
							<b>Tax Rate:</b>
							{tax}
						</div>
						{/* <div>
							<b>CGST:</b> __________
						</div>
						<div>
							<b>SGST:</b> __________
						</div> */}
					</div>
					<div
						style={{
							background: "#ddd",
							padding: "10px",
							fontWeight: "bold",
							borderTop: "2px solid black",
							borderBottom: "2px solid black",
						}}>
						Total Amount: {total}
					</div>
					<div style={{ height: "60px" }}></div>
				</div>
			</div>
			{/* Footer */}
			<div
				style={{
					borderTop: "2px solid black",
					textAlign: "right",
					padding: "10px",
				}}>
				<div
					style={{
						border: "2px solid black",
						display: "inline-block",
						padding: "20px",
						fontSize: "14px",
						fontWeight: "bold",
					}}>
					Clinic Seal & Signature
				</div>
			</div>
		</div>
	);
}
