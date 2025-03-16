import axios from "axios";
import { format, isAfter } from "date-fns";
import {
  Calendar,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  Phone,
  RefreshCw,
  Search,
  User,
  CheckCircle,
  Loader2,
  FilePlus,
  FileCheck,
  Stethoscope,
  Info,
} from "lucide-react";
import React, { useEffect, useState, useCallback, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster, toast } from "react-hot-toast";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PrescriptionModal from "./PrescriptionModal";
import { VITE_REACT_APP_BASE_URL } from "../utils/constants";
import SelectField from "../SelectField";
import { treatments } from "../../Data/Treatments";

function ConfirmedPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    treatment: "",
    time: "",
    search: "",
  });
  const [phoneInput, setPhoneInput] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [existingPrescription, setExistingPrescription] = useState(null);
  const [dateErrors, setDateErrors] = useState({
    startDate: "",
    endDate: "",
  });

  const debounceTimerRef = useRef(null);
  const ITEMS_PER_PAGE = 10;
  const DEBOUNCE_DELAY = 500;

  const formatTime = (time) => {
    const hour = parseInt(time);
    return new Date(0, 0, 0, hour).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const statusOptions = [
    { value: "", label: "All Status" },
    {
      value: "confirmed",
      label: "Confirmed",
      color: "bg-indigo-100 text-indigo-800",
    },
    {
      value: "completed",
      label: "Completed",
      color: "bg-emerald-100 text-emerald-800",
    },
  ];

  // Options for filters
  const timeOptions = [
    { value: "", label: "All Times" },
    ...Array.from({ length: 11 }, (_, i) => ({
      value: i + 10,
      label: formatTime(i + 10),
    })),
  ];

  const treatmentOptions = [
    { value: "", label: "All Treatments" },
    ...treatments,
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

  // Fetch appointments when filters or page changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (validateDateRange()) fetchConfirmedPatients();
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

  const fetchConfirmedPatients = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: ITEMS_PER_PAGE.toString(),
        status: ["confirmed", "completed"],
      });

      // Add filters to query params
      if (filters.search) queryParams.append("phoneNo", `+91${filters.search}`);
      if (filters.treatment) queryParams.append("treatment", filters.treatment);
      if (filters.time) queryParams.append("time", filters.time);

      // Handle date filters
      if (filters.startDate && filters.endDate) {
        if (
          format(filters.startDate, "dd/MM/yyyy") ===
          format(filters.endDate, "dd/MM/yyyy")
        ) {
          queryParams.append("date", format(filters.startDate, "dd/MM/yyyy"));
        } else {
          queryParams.append(
            "startDate",
            format(filters.startDate, "dd/MM/yyyy")
          );
          queryParams.append("endDate", format(filters.endDate, "dd/MM/yyyy"));
        }
      } else if (filters.startDate) {
        queryParams.append("date", format(filters.startDate, "dd/MM/yyyy"));
      }

      const response = await axios.get(
        `${VITE_REACT_APP_BASE_URL}/appointments?${queryParams.toString()}`
      );

      let filteredPatients = response.data.data || [];

      // Client-side filtering for date range if needed
      if (
        filters.startDate &&
        filters.endDate &&
        format(filters.startDate, "dd/MM/yyyy") !==
          format(filters.endDate, "dd/MM/yyyy")
      ) {
        const startDateStr = format(filters.startDate, "dd/MM/yyyy");
        const endDateStr = format(filters.endDate, "dd/MM/yyyy");

        filteredPatients = filteredPatients.filter((patient) => {
          const appDateParts = patient.date.split("/");
          const appDate = `${appDateParts[0]}/${appDateParts[1]}/${appDateParts[2]}`;
          return appDate >= startDateStr && appDate <= endDateStr;
        });
      }

      setPatients(filteredPatients);
      setTotalPages(
        Math.ceil((response.data.totalAppointments || 0) / ITEMS_PER_PAGE)
      );
    } catch (error) {
      console.error("Error fetching patients:", error);
      toast.error("Failed to fetch confirmed patients");
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePrescriptionClick = async (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    try {
      // Show loading toast
      const loadingToast = toast.loading("Fetching prescription data...");

      // Fetch prescription data for the selected appointment
      const response = await axios.get(
        `${VITE_REACT_APP_BASE_URL}/prescription?appointmentId=${appointmentId}`
      );

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (response.data && response.data.length > 0) {
        // If prescription exists, set it in state
        setExistingPrescription(response.data[0]);
        toast.success("Prescription loaded successfully");
      } else {
        // If no prescription exists, set to null
        setExistingPrescription(null);
      }

      // Open the prescription modal
      setIsPrescriptionModalOpen(true);
    } catch (error) {
      console.error("Error fetching prescription:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch prescription details"
      );
    }
  };

  const updateAppointmentStatus = async (appointmentId) => {
    try {
      const loadingToast = toast.loading("Updating appointment status...");

      await axios.put(`${VITE_REACT_APP_BASE_URL}/appointments`, {
        status: "completed",
        appointmentIds: [appointmentId],
      });

      toast.dismiss(loadingToast);
      toast.success("Appointment marked as completed");

      // Refresh the patient list to remove the completed appointment
      fetchConfirmedPatients();
    } catch (error) {
      console.error("Error updating appointment status:", error);
      toast.error("Failed to update appointment status");
    }
  };

  const handleSavePrescription = async (prescriptionData) => {
    try {
      // Show loading toast
      const loadingToast = toast.loading(
        existingPrescription
          ? "Updating prescription..."
          : "Creating prescription..."
      );

      if (existingPrescription) {
        // Update existing prescription
        await axios.patch(
          `${VITE_REACT_APP_BASE_URL}/prescription/${existingPrescription._id}`,
          {
            ...prescriptionData,
            appointmentId: selectedAppointmentId,
          }
        );
        toast.dismiss(loadingToast);
        toast.success("Prescription updated successfully");
      } else {
        // Create new prescription
        await axios.post(`${VITE_REACT_APP_BASE_URL}/prescription`, {
          ...prescriptionData,
          appointmentId: selectedAppointmentId,
        });
        toast.dismiss(loadingToast);
        toast.success("Prescription added successfully");
        await updateAppointmentStatus(selectedAppointmentId);
      }
      setIsPrescriptionModalOpen(false);
      fetchConfirmedPatients();
    } catch (error) {
      console.error("Error saving prescription:", error);
      toast.error(
        error.response?.data?.message || "Failed to save prescription"
      );
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

  const getPaginationNumbers = () => {
    const pageNumbers = [];
    return pageNumbers;
  };

  const getTreatmentLabel = (treatment) => {
    const found = treatmentOptions.find((t) => t.value === treatment);
    return found ? found.label : treatment;
  };

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
              <h1 className="text-2xl font-bold text-gray-800">
                Confirmed Patients
              </h1>
              <p className="text-sm text-gray-600">
                Manage Patients and prescriptions
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
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <Filter className="h-5 w-5" />
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
        </div>

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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Patients Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-50">
                <tr>
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
                  <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">
                    Actions
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
                ) : patients.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No confirmed patients found
                    </td>
                  </tr>
                ) : (
                  patients.map((patient) => {
                    const status = statusOptions.find(
                      (s) => s.value === patient.status
                    );
                    const treatment = treatmentOptions.find(
                      (t) => t.value === patient.treatment
                    );

                    return (
                      <tr key={patient._id} className="hover:bg-gray-50">
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-indigo-100 p-2 rounded-full">
                              <User className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {patient.patientName}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                {patient.phoneNo}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-indigo-600" />
                            <span className="text-sm">{patient.date}</span>
                          </div>
                        </td>
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="h-5 w-5 text-indigo-600" />
                            <span className="text-sm">
                              {formatTime(patient.time)}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{treatment?.icon}</span>
                            <span className="text-sm">{treatment?.label}</span>
                          </div>
                        </td>
                        <td className="px-3 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${status?.color}`}
                          >
                            {status?.label}
                          </span>
                        </td>
                        <td className="px-3 py-4">
                          <button
                            onClick={() => handlePrescriptionClick(patient._id)}
                            className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${
                              patient.prescriptionId
                                ? "text-white bg-green-600 hover:bg-green-700"
                                : "text-white bg-indigo-600 hover:bg-indigo-700"
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
                          >
                            {patient.prescriptionId ? (
                              <>View Prescription</>
                            ) : (
                              <>Add Prescription</>
                            )}
                          </button>
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
                className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50"
              >
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
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>

      {/* Prescription Modal */}
      {isPrescriptionModalOpen && (
        <PrescriptionModal
          isOpen={isPrescriptionModalOpen}
          onClose={() => {
            setIsPrescriptionModalOpen(false);
            setSelectedAppointmentId(null);
            setExistingPrescription(null);
          }}
          appointmentId={selectedAppointmentId}
          existingPrescription={existingPrescription}
          onSave={handleSavePrescription}
        />
      )}
    </div>
  );
}

export default ConfirmedPatients;
