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

function AppointmentsList() {
  // State management

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
  const ITEMS_PER_PAGE = 10;
  const DEBOUNCE_DELAY = 500;

  // Options for filters
  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      color: "bg-amber-100 text-amber-800 ring-1 ring-amber-600/20",
    },
    {
      value: "confirmed",
      label: "Confirmed",
      color: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-600/20",
    },
    {
      value: "cancelled",
      label: "Cancelled",
      color: "bg-rose-100 text-rose-800 ring-1 ring-rose-600/20",
    },
    {
      value: "completed",
      label: "Completed",
      color: "bg-blue-100 text-blue-800 ring-1 ring-blue-600/20",
    },
  ];

  const timeOptions = Array.from({ length: 10 }, (_, i) => i + 9);

  const treatmentOptions = [
    { value: "oral", label: "Teeth Whitening", icon: "🦷" },
    { value: "dental", label: "Root Canal", icon: "🦷" },
    { value: "orthodontic", label: "Dental Crown", icon: "😁" },
    { value: "orthopedic", label: "Orthodontics", icon: "🦴" },
  ];

  // Debounced search function
  const debouncedSearch = useCallback((value) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

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

  // Handle phone input change
  const handlePhoneInputChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    const trimmedValue = inputValue.slice(0, 10);
    setPhoneInput(trimmedValue);
    debouncedSearch(trimmedValue);
  };

  // Clean up debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fetch appointments when filters or page changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (validateDateRange()) fetchAppointments();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [page, filters]);

  // Validate date range
  const validateDateRange = () => {
    const errors = { startDate: "", endDate: "" };

    if (filters.startDate && filters.endDate) {
      if (isAfter(filters.startDate, filters.endDate)) {
        errors.startDate = "Start date cannot be after end date";
        errors.endDate = "End date cannot be before start date";
      }
    }

    setDateErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  // Fetch appointments from API
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const queryParams = { page, limit: ITEMS_PER_PAGE };

      // Add filters to query params
      if (filters.search) queryParams.phoneNo = `+91${filters.search}`;
      if (filters.status) queryParams.status = filters.status;
      if (filters.treatment) queryParams.treatment = filters.treatment;
      if (filters.time) queryParams.time = filters.time;

      // Handle date filters
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

      let filteredAppointments = response.data.data || [];

      // Client-side filtering for date range if needed
      if (
        filters.startDate &&
        filters.endDate &&
        format(filters.startDate, "dd/MM/yyyy") !==
          format(filters.endDate, "dd/MM/yyyy")
      ) {
        const startDateStr = format(filters.startDate, "dd/MM/yyyy");
        const endDateStr = format(filters.endDate, "dd/MM/yyyy");

        filteredAppointments = filteredAppointments.filter((appointment) => {
          const appDateParts = appointment.date.split("/");
          const appDate = `${appDateParts[0]}/${appDateParts[1]}/${appDateParts[2]}`;
          return appDate >= startDateStr && appDate <= endDateStr;
        });
      }

      setAppointments(filteredAppointments);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("API Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch appointments"
      );
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      if (key === "startDate" || key === "endDate") {
        setTimeout(() => validateDateRange(), 0);
      }
      return newFilters;
    });
    setPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      startDate: null,
      endDate: null,
      status: "",
      time: "",
      treatment: "",
      search: "",
    });
    setDateErrors({ startDate: "", endDate: "" });
    setPhoneInput("");
    setPhoneError("");
    setPage(1);
  };

  // Handle appointment selection
  const handleSelectAppointment = (appointmentId) => {
    setSelectedAppointments((prev) =>
      prev.includes(appointmentId)
        ? prev.filter((id) => id !== appointmentId)
        : [...prev, appointmentId]
    );
  };

  // Handle select all appointments
  const handleSelectAll = () => {
    setSelectedAppointments(
      selectedAppointments.length === appointments.length
        ? []
        : appointments.map((app) => app._id)
    );
  };

  // Update appointment status
  const updateAppointmentStatus = async (status) => {
    if (selectedAppointments.length === 0) {
      toast.error("Please select at least one appointment");
      return;
    }

    setUpdatingStatus(true);
    try {
      await axios.put(`${VITE_REACT_APP_BASE_URL}/appointments`, {
        appointmentIds: selectedAppointments,
        status,
      });

      toast.success(
        `Successfully updated ${selectedAppointments.length} appointment(s)`
      );
      setSelectedAppointments([]);
      fetchAppointments();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update appointment status"
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Format time for display
  const formatTime = (time) => {
    const hour = parseInt(time);
    return new Date(0, 0, 0, hour).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get treatment label
  const getTreatmentLabel = (treatment) => {
    const found = treatmentOptions.find((t) => t.value === treatment);
    return found ? found.label : treatment;
  };

  // Get pagination numbers
  const getPaginationNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (page >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        pageNumbers.push(page - 1);
        pageNumbers.push(page);
        pageNumbers.push(page + 1);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "1rem",
            padding: "1rem 1.5rem",
            fontSize: "0.875rem",
            maxWidth: "24rem",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
          success: {
            style: {
              background: "#065f46",
              borderLeft: "4px solid #34d399",
            },
            iconTheme: {
              primary: "#34d399",
              secondary: "#065f46",
            },
          },
          error: {
            style: {
              background: "#7f1d1d",
              borderLeft: "4px solid #f87171",
            },
            iconTheme: {
              primary: "#f87171",
              secondary: "#7f1d1d",
            },
          },
        }}
      />

      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-4xl font-bold text-indigo-900 flex items-center gap-2">
                <Calendar className="h-8 w-8 text-indigo-600" />
                Appointments Dashboard
              </h2>
              <p className="mt-1 text-lg text-indigo-600">
                Manage and track patient appointments efficiently
              </p>
            </div>

            <div className="mt-6 sm:mt-0 flex flex-wrap gap-3">
              {/* Phone search input */}
              <div className="relative">
                <div className="flex items-center border rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 overflow-hidden">
                  <div className="flex items-center pl-3 pr-2 py-3 bg-gray-50 border-r border-gray-200">
                    <Phone className="h-5 w-5 text-indigo-400 mr-1" />
                    <span className="text-gray-500 font-medium">+91</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter 10-digit number..."
                    value={phoneInput}
                    onChange={handlePhoneInputChange}
                    className="pl-3 pr-4 py-3 border-0 focus:ring-0 focus:outline-none w-full"
                    inputMode="numeric"
                  />
                </div>
                {phoneError && (
                  <p className="mt-1 text-xs text-red-600">{phoneError}</p>
                )}
              </div>

              {/* Filter toggle button */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="inline-flex items-center px-5 py-3 border border-indigo-200 rounded-xl shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <Filter className="h-5 w-5 mr-2" />
                {isFilterOpen ? "Hide Filters" : "Show Filters"}
              </button>

              {/* Bulk action buttons */}
              {selectedAppointments.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => updateAppointmentStatus("confirmed")}
                    disabled={updatingStatus}
                    className="inline-flex items-center px-5 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-colors"
                  >
                    {updatingStatus ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <Check className="h-5 w-5 mr-2" />
                    )}
                    Confirm Selected
                  </button>

                  <button
                    onClick={() => updateAppointmentStatus("cancelled")}
                    disabled={updatingStatus}
                    className="inline-flex items-center px-5 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 transition-colors"
                  >
                    {updatingStatus ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <X className="h-5 w-5 mr-2" />
                    )}
                    Cancel Selected
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Filters panel */}
          {isFilterOpen && (
            <div className="mb-8 bg-white p-8 rounded-3xl shadow-xl border border-indigo-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Filter className="h-5 w-5 text-indigo-600" />
                  Filter Appointments
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                >
                  <RefreshCw className="h-4 w-4" />
                  Clear all filters
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Date range filters */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                      Date Range
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <DatePicker
                        selected={filters.startDate}
                        onChange={(date) =>
                          handleFilterChange("startDate", date)
                        }
                        selectsStart
                        startDate={filters.startDate}
                        endDate={filters.endDate}
                        dateFormat="dd/MM/yyyy"
                        className={`w-full px-4 py-3 border ${
                          dateErrors.startDate
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500`}
                        placeholderText="Start date"
                      />
                      <Calendar className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                      {dateErrors.startDate && (
                        <p className="mt-2 text-sm text-red-600">
                          {dateErrors.startDate}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <DatePicker
                        selected={filters.endDate}
                        onChange={(date) => handleFilterChange("endDate", date)}
                        selectsEnd
                        startDate={filters.startDate}
                        endDate={filters.endDate}
                        minDate={filters.startDate}
                        dateFormat="dd/MM/yyyy"
                        className={`w-full px-4 py-3 border ${
                          dateErrors.endDate
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500`}
                        placeholderText="End date"
                      />
                      <Calendar className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                      {dateErrors.endDate && (
                        <p className="mt-2 text-sm text-red-600">
                          {dateErrors.endDate}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <Info className="w-4 h-4 mr-2 text-indigo-600" />
                      Status
                    </span>
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="">All Status</option>
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-indigo-600" />
                      Time
                    </span>
                  </label>
                  <select
                    value={filters.time}
                    onChange={(e) => handleFilterChange("time", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="">All Times</option>
                    {timeOptions.map((hour) => (
                      <option key={hour} value={hour}>
                        {formatTime(hour)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Treatment filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <Stethoscope className="w-4 h-4 mr-2 text-indigo-600" />
                      Treatment
                    </span>
                  </label>
                  <select
                    value={filters.treatment}
                    onChange={(e) =>
                      handleFilterChange("treatment", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="">All Treatments</option>
                    {treatmentOptions.map((treatment) => (
                      <option key={treatment.value} value={treatment.value}>
                        {treatment.icon} {treatment.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Loading state */}
          {loading ? (
            <div className="flex items-center justify-center h-64 bg-white rounded-3xl shadow-xl">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-sm text-gray-500">
                  Loading appointments...
                </p>
              </div>
            </div>
          ) : appointments.length === 0 ? (
            // Empty state
            <div className="text-center bg-white rounded-3xl shadow-xl p-12 border border-indigo-100">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No appointments found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn't find any appointments matching your search criteria.
                Try adjusting your filters or search terms.
              </p>
            </div>
          ) : (
            // Appointments table
            <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-indigo-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider"
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors"
                            checked={
                              selectedAppointments.length ===
                                appointments.length && appointments.length > 0
                            }
                            onChange={handleSelectAll}
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider"
                      >
                        Patient Details
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider"
                      >
                        Treatment
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map((appointment) => {
                      const statusOption = statusOptions.find(
                        (s) => s.value === appointment.status
                      );
                      const treatmentOption = treatmentOptions.find(
                        (t) => t.value === appointment.treatment
                      );
                      return (
                        <tr
                          key={appointment._id}
                          className="hover:bg-indigo-50/50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors"
                              checked={selectedAppointments.includes(
                                appointment._id
                              )}
                              onChange={() =>
                                handleSelectAppointment(appointment._id)
                              }
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-indigo-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {appointment.patientName}
                                </div>
                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {appointment.phoneNo}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-indigo-600" />
                              {appointment.date}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 flex items-center gap-1">
                              <Clock className="h-4 w-4 text-indigo-600" />
                              {formatTime(appointment.time)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 flex items-center gap-2">
                              <span>{treatmentOption?.icon}</span>
                              {getTreatmentLabel(appointment.treatment)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusOption?.color}`}
                            >
                              {statusOption?.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 py-6">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2.5 rounded-xl bg-white hover:bg-indigo-50 disabled:opacity-50 transition-colors border border-indigo-100 shadow-sm"
                  >
                    <ChevronLeft className="h-5 w-5 text-indigo-600" />
                  </button>

                  <div className="flex space-x-2">
                    {getPaginationNumbers().map((pageNum, index) =>
                      pageNum === "..." ? (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-4 py-2 text-gray-500"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`px-4 py-2 rounded-xl border ${
                            page === pageNum
                              ? "bg-indigo-50 border-indigo-300 text-indigo-700 font-medium"
                              : "border-indigo-100 text-gray-700 hover:bg-indigo-50/50"
                          } text-sm transition-colors`}
                        >
                          {pageNum}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-2.5 rounded-xl bg-white hover:bg-indigo-50 disabled:opacity-50 transition-colors border border-indigo-100 shadow-sm"
                  >
                    <ChevronRight className="h-5 w-5 text-indigo-600" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppointmentsList;
