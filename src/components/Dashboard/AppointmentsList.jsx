import axios from "axios";
import { format, isAfter } from "date-fns";
import {
	Calendar,
	Check,
	ChevronLeft,
	ChevronRight,
	Clock,
	Filter,
	Loader2,
	Phone,
	RefreshCw,
	User,
	X,
	Info,
	Stethoscope,
} from "lucide-react";
import React, { useEffect, useState, useCallback, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster, toast } from "react-hot-toast";
import { VITE_REACT_APP_BASE_URL } from "../utils/constants";
import { treatments } from "../../Data/Treatments";
import SelectField from "../SelectField";

function AppointmentsList() {
	const [appointments, setAppointments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedAppointments, setSelectedAppointments] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [filters, setFilters] = useState({
		startDate: null,
		endDate: null,
		status: "",
		time: "",
		treatment: "",
		search: "",
	});
	const [phoneInput, setPhoneInput] = useState("");
	const [phoneError, setPhoneError] = useState("");
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [updatingStatus, setUpdatingStatus] = useState(false);
	const [dateErrors, setDateErrors] = useState({
		startDate: "",
		endDate: "",
	});

	const debounceTimerRef = useRef(null);
	const tableContainerRef = useRef(null);
	const ITEMS_PER_PAGE = 10;
	const DEBOUNCE_DELAY = 500;

	const statusOptions = [
		{ value: "", label: "All Status" }, // "Select All" option
		{
			value: "pending",
			label: "Pending",
			color: "bg-amber-100 text-amber-800",
		},
		{
			value: "confirmed",
			label: "Confirmed",
			color: "bg-indigo-100 text-indigo-800",
		},
		{
			value: "cancelled",
			label: "Cancelled",
			color: "bg-rose-100 text-rose-800",
		},
		{
			value: "completed",
			label: "Completed",
			color: "bg-emerald-100 text-emerald-800",
		},
	];
	const formatTime = (time) => {
		const hour = parseInt(time);
		return new Date(0, 0, 0, hour).toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		});
	};

	const timeOptions = [
		{ value: "", label: "All Times" }, // "Select All" option
		...Array.from({ length: 11 }, (_, i) => ({
			value: i + 10,
			label: formatTime(i + 10),
		})), // 10 AM to 8 PM
	];

	const treatmentOptions = [
		{ value: "", label: "All Treatments" },
		...treatments,
	];

	// Debounced search function
	const debouncedSearch = useCallback((value) => {
		clearTimeout(debounceTimerRef.current);
		debounceTimerRef.current = setTimeout(() => {
			if (value && !/^\d{10}$/.test(value)) {
				setPhoneError("Please enter a valid 10-digit number");
			} else {
				setPhoneError("");
				setFilters((prev) => ({ ...prev, search: value }));
				setPage(1);
			}
		}, DEBOUNCE_DELAY);
	}, []);

	const fetchAppointments = async () => {
		setLoading(true);
		try {
			const queryParams = { page, limit: ITEMS_PER_PAGE };
			if (filters.search) queryParams.phoneNo = `+91${filters.search}`;
			if (filters.status) queryParams.status = filters.status;
			if (filters.treatment) queryParams.treatment = filters.treatment;
			if (filters.time) queryParams.time = filters.time;

			if (filters.startDate && filters.endDate) {
				if (
					format(filters.startDate, "dd/MM/yyyy") ===
					format(filters.endDate, "dd/MM/yyyy")
				) {
					queryParams.date = format(filters.startDate, "dd/MM/yyyy");
				} else {
					queryParams.startDate = format(filters.startDate, "dd/MM/yyyy");
					queryParams.endDate = format(filters.endDate, "dd/MM/yyyy");
				}
			} else if (filters.startDate) {
				queryParams.date = format(filters.startDate, "dd/MM/yyyy");
			}

			const response = await axios.get(
				`${VITE_REACT_APP_BASE_URL}/appointments`,
				{ params: queryParams }
			);
			setAppointments(response.data.data || []);
			setTotalPages(response.data.totalPages || 1);
		} catch (error) {
			toast.error(
				error.response?.data?.message || "Failed to fetch appointments"
			);
			setAppointments([]);
		} finally {
			setLoading(false);
		}
	};

	const handleFilterChange = (e) => {
		const { name, value } = e.target;

		if (name === "startDate") {
			setFilters((prev) => ({ ...prev, startDate: value, endDate: null }));
		} else if (name === "endDate") {
			if (value && filters.startDate && !isAfter(value, filters.startDate)) {
				toast.error("End date must be after start date");
				return;
			}
			setFilters((prev) => ({ ...prev, [name]: value }));
		} else {
			setFilters((prev) => ({ ...prev, [name]: value }));
		}
		setPage(1);
	};

	const clearFilters = () => {
		setFilters({
			startDate: null,
			endDate: null,
			status: "",
			time: "",
			treatment: "",
			search: "",
		});
		setPhoneInput("");
		setPhoneError("");
		setPage(1);
	};

	const handleSelectAppointment = (appointmentId) => {
		setSelectedAppointments((prev) =>
			prev.includes(appointmentId)
				? prev.filter((id) => id !== appointmentId)
				: [...prev, appointmentId]
		);
	};

	const handleSelectAll = () => {
		setSelectedAppointments((prev) =>
			prev.length === appointments.length
				? []
				: appointments.map((app) => app._id)
		);
	};

	const updateAppointmentStatus = async (status) => {
		if (!selectedAppointments.length) {
			toast.error("Please select at least one appointment");
			return;
		}

		setUpdatingStatus(true);
		try {
			await axios.put(`${VITE_REACT_APP_BASE_URL}/appointments`, {
				appointmentIds: selectedAppointments,
				status,
			});
			toast.success(`Updated ${selectedAppointments.length} appointment(s)`);
			setSelectedAppointments([]);
			fetchAppointments();
		} catch (error) {
			toast.error(error.response?.data?.message || "Update failed");
		} finally {
			setUpdatingStatus(false);
		}
	};

	const getPaginationNumbers = () => {
		const pageNumbers = [];
		return pageNumbers;
	};

	useEffect(() => {
		fetchAppointments();
	}, [page, filters]);

	useEffect(() => {
		return () => clearTimeout(debounceTimerRef.current);
	}, []);

	return (
		<div className="min-h-screen p-0 bg-gray-50">
			<Toaster
				position="top-right"
				toastOptions={{
					style: {
						background: "#1f2937",
						color: "#fff",
						borderRadius: "0.5rem",
					},
					success: {
						duration: 3000,
						iconTheme: { primary: "#10b981", secondary: "#fff" },
					},
					error: {
						duration: 5000,
						iconTheme: { primary: "#ef4444", secondary: "#fff" },
					},
				}}
			/>

			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center gap-3">
						<Calendar className="h-8 w-8 text-indigo-600" />
						<div>
							<h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
							<p className="text-sm text-gray-600">
								Manage patient appointments
							</p>
						</div>
					</div>

					<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
						<div className="relative flex-1">
							<div className="flex items-center border rounded-lg bg-white">
								<div className="pl-3 pr-2 py-2 border-r">
									<Phone className="h-5 w-5 text-indigo-500" />
								</div>
								<input
									type="text"
									placeholder="Search by phone..."
									value={phoneInput}
									onChange={(e) => {
										const val = e.target.value.replace(/\D/g, "").slice(0, 10);
										setPhoneInput(val);
										debouncedSearch(val);
									}}
									className="w-full px-3 py-2 border-0 focus:ring-0"
								/>
							</div>
							{phoneError && (
								<p className="text-xs text-red-500 mt-1">{phoneError}</p>
							)}
						</div>

						<button
							onClick={() => setIsFilterOpen(!isFilterOpen)}
							className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors">
							<Filter className="h-5 w-5" />
							{isFilterOpen ? "Hide Filters" : "Show Filters"}
						</button>
					</div>
				</div>

				{/* Bulk Actions */}
				{selectedAppointments.length > 0 && (
					<div className="mb-4 sm:flex hidden flex-col sm:flex-row gap-3 items-center justify-between p-4 bg-indigo-50 rounded-lg">
						<span className="text-sm text-indigo-700">
							{selectedAppointments.length} selected
						</span>
						<div className="flex gap-2 w-full sm:w-auto">
							<button
								onClick={() => updateAppointmentStatus("confirmed")}
								disabled={updatingStatus}
								className="flex-1 sm:flex-none flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors">
								{updatingStatus ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									<Check className="h-4 w-4" />
								)}
								Confirm
							</button>
							<button
								onClick={() => updateAppointmentStatus("cancelled")}
								disabled={updatingStatus}
								className="flex-1 sm:flex-none flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50 transition-colors">
								{updatingStatus ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									<X className="h-4 w-4" />
								)}
								Cancel
							</button>
						</div>
					</div>
				)}

				{/* Filters */}
				{isFilterOpen && (
					<div className="mb-6 p-4 sm:p-6 bg-white rounded-xl shadow-sm border">
						<div className="grid grid-cols-1 gap-4">
							<div className="space-y-2">
								<label className="text-sm font-medium text-gray-700 flex items-center gap-2">
									<Calendar className="h-4 w-4 text-indigo-600" />
									Date Range
								</label>
								<div className="flex flex-col sm:flex-row gap-3">
									<div className="relative flex-1">
										<DatePicker
											selected={filters.startDate}
											onChange={(date) =>
												handleFilterChange({
													target: { name: "startDate", value: date },
												})
											}
											selectsStart
											startDate={filters.startDate}
											endDate={filters.endDate}
											placeholderText="Start Date"
											className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
											dateFormat="dd/MM/yyyy"
											isClearable
										/>
										{dateErrors.startDate && (
											<p className="text-xs text-red-500 mt-1">
												{dateErrors.startDate}
											</p>
										)}
									</div>
									<div className="relative flex-1">
										<DatePicker
											selected={filters.endDate}
											onChange={(date) =>
												handleFilterChange({
													target: { name: "endDate", value: date },
												})
											}
											selectsEnd
											startDate={filters.startDate}
											endDate={filters.endDate}
											minDate={filters.startDate || new Date()}
											placeholderText="End Date"
											className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
											dateFormat="dd/MM/yyyy"
											isClearable
											disabled={!filters.startDate}
										/>
										{dateErrors.endDate && (
											<p className="text-xs text-red-500 mt-1">
												{dateErrors.endDate}
											</p>
										)}
									</div>
								</div>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
								<SelectField
									label="Status"
									icon={Info}
									value={filters.status}
									onChange={handleFilterChange}
									options={statusOptions}
									placeholder="All Status"
									name="status"
								/>
								<SelectField
									label="Time"
									icon={Clock}
									value={filters.time}
									onChange={handleFilterChange}
									options={timeOptions}
									placeholder="All Times"
									name="time"
								/>
								<SelectField
									label="Treatment"
									icon={Stethoscope}
									value={filters.treatment}
									onChange={handleFilterChange}
									options={treatmentOptions}
									placeholder="All Treatments"
									name="treatment"
								/>
							</div>
						</div>

						<div className="mt-4 flex justify-end">
							<button
								onClick={clearFilters}
								className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-2">
								<RefreshCw className="h-4 w-4" />
								Clear Filters
							</button>
						</div>
					</div>
				)}

				{/* Appointments Table */}
				<div className="bg-white rounded-xl shadow-sm border overflow-hidden">
					<div
						className="overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-gray-50"
						ref={tableContainerRef}>
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-indigo-50">
								<tr>
									<th className="pl-4 pr-2 py-3 w-12">
										<input
											type="checkbox"
											checked={
												selectedAppointments.length === appointments.length &&
												appointments.length > 0
											}
											onChange={handleSelectAll}
											className="h-4 w-4 text-indigo-600 rounded border-gray-300"
										/>
									</th>
									<th className="px-3 py-3 text-left text-sm font-medium text-gray-700">
										Patient
									</th>
									<th className="px-3 py-3 text-left text-sm font-medium text-gray-700">
										Date
									</th>
									<th className="px-3 py-3 text-left text-sm font-medium text-gray-700">
										Time
									</th>
									<th className="px-3 py-3 text-left text-sm font-medium text-gray-700">
										Treatment
									</th>
									<th className="px-3 py-3 text-left text-sm font-medium text-gray-700">
										Status
									</th>
								</tr>
							</thead>

							<tbody className="divide-y divide-gray-200">
								{loading ? (
									<tr>
										<td colSpan="6" className="px-4 py-6 text-center">
											<div className="flex justify-center">
												<Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
											</div>
										</td>
									</tr>
								) : appointments.length === 0 ? (
									<tr>
										<td
											colSpan="6"
											className="px-4 py-6 text-center text-gray-500">
											No appointments found
										</td>
									</tr>
								) : (
									appointments.map((appointment) => {
										const status = statusOptions.find(
											(s) => s.value === appointment.status
										);
										const treatment = treatmentOptions.find(
											(t) => t.value === appointment.treatment
										);

										return (
											<tr key={appointment._id} className="hover:bg-gray-50">
												<td className="pl-4 pr-2 py-4">
													<input
														type="checkbox"
														checked={selectedAppointments.includes(
															appointment._id
														)}
														onChange={() =>
															handleSelectAppointment(appointment._id)
														}
														className="h-4 w-4 text-indigo-600 rounded border-gray-300"
													/>
												</td>
												<td className="px-3 py-4">
													<div className="flex items-center gap-3">
														<div className="bg-indigo-100 p-2 rounded-full">
															<User className="h-5 w-5 text-indigo-600" />
														</div>
														<div>
															<div className="font-medium text-gray-900 whitespace-normal">
																{appointment.patientName}
															</div>
															<div className="text-sm text-gray-500 flex items-center gap-1">
																<Phone className="h-4 w-4" />
																{appointment.phoneNo}
															</div>
														</div>
													</div>
												</td>
												<td className="px-3 py-4">
													<div className="flex items-center gap-2">
														<Calendar className="h-5 w-5 text-indigo-600" />
														<span className="text-sm whitespace-normal">
															{appointment.date}
														</span>
													</div>
												</td>
												<td className="px-3 py-4">
													<div className="flex items-center gap-2 text-gray-500">
														<Clock className="h-5 w-5 text-indigo-600" />
														<span className="text-sm">
															{formatTime(appointment.time)}
														</span>
													</div>
												</td>
												<td className="px-3 py-4">
													<div className="flex items-center gap-2 flex-wrap">
														<span className="text-lg">{treatment?.icon}</span>
														<span className="text-sm whitespace-normal">
															{treatment?.label}
														</span>
													</div>
												</td>
												<td className="px-3 py-4">
													<span
														className={`px-2.5 py-1 rounded-full text-xs font-medium ${status?.color} truncate`}>
														{status?.label}
													</span>
												</td>
											</tr>
										);
									})
								)}
							</tbody>
						</table>
					</div>

					{/* Pagination */}
					<div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-gray-200">
						<div className="mb-2 sm:mb-0 text-sm text-gray-700">
							Page {page} of {totalPages}
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={() => setPage((p) => Math.max(1, p - 1))}
								disabled={page === 1}
								className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50">
								<ChevronLeft className="h-5 w-5 text-gray-700" />
							</button>

							{getPaginationNumbers().map((num) => (
								<button
									key={num}
									onClick={() => setPage(num)}
									className={`px-3 py-1 rounded-lg ${
										page === num
											? "bg-indigo-600 text-white"
											: "hover:bg-gray-100"
									}`}>
									{num}
								</button>
							))}

							<button
								onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
								disabled={page === totalPages}
								className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50">
								<ChevronRight className="h-5 w-5 text-gray-700" />
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Bulk Actions */}
				{selectedAppointments.length > 0 && (
					<div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-50">
						<div className="flex items-center justify-between gap-3">
							<span className="text-sm text-gray-700">
								{selectedAppointments.length} selected
							</span>
							<div className="flex gap-2">
								<button
									onClick={() => updateAppointmentStatus("confirmed")}
									className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm flex items-center gap-1"
									disabled={updatingStatus}>
									{updatingStatus ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : (
										<>
											<Check className="h-4 w-4" />
											<span>Confirm</span>
										</>
									)}
								</button>
								<button
									onClick={() => updateAppointmentStatus("cancelled")}
									className="px-3 py-2 bg-rose-600 text-white rounded-lg text-sm flex items-center gap-1"
									disabled={updatingStatus}>
									{updatingStatus ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : (
										<>
											<X className="h-4 w-4" />
											<span>Cancel</span>
										</>
									)}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default AppointmentsList;
