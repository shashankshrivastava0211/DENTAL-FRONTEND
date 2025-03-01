import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  Phone,
  Search,
  X,
  RefreshCw,
  Filter,
  ChevronLeft,
  ChevronRight,
  Info,
  AlertCircle,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { format, isAfter, isBefore, addDays } from "date-fns";
import Hero from "./Hero";
import AOS from "aos";
import "aos/dist/aos.css";

function Appointments() {
  const navigate = useNavigate();
  const historyRef = useRef(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPhone, setSearchPhone] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    fromDate: null,
    toDate: null,
    status: "",
    time: "",
    treatment: "",
  });
  const [dateErrors, setDateErrors] = useState({
    fromDate: "",
    toDate: "",
  });

  const ITEMS_PER_PAGE = 10;

  const statusOptions = ["pending", "confirmed", "cancelled"];
  const timeOptions = Array.from({ length: 10 }, (_, i) => i + 9);
  const treatmentOptions = [
    { value: "oral", label: "Teeth Whitening" },
    { value: "dental", label: "Root Canal" },
    { value: "orthodontic", label: "Dental Crown" },
    { value: "orthopedic", label: "Orthodontics" },
  ];


    // Initialize AOS
    useEffect(() => {
      AOS.init({
        duration: 800,
        once: false,
        mirror: true,
      });
    }, []);

  const validateDateRange = () => {
    const errors = {
      fromDate: "",
      toDate: "",
    };

    if (filters.fromDate && filters.toDate) {
      if (isAfter(filters.fromDate, filters.toDate)) {
        errors.fromDate = "From date cannot be after To date";
        errors.toDate = "To date cannot be before From date";
      }
    }

    if (filters.fromDate && isAfter(filters.fromDate, new Date())) {
      errors.fromDate = "From date cannot be in the future";
    }

    if (filters.toDate && isAfter(filters.toDate, addDays(new Date(), 90))) {
      errors.toDate = "To date cannot be more than 90 days in the future";
    }

    setDateErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const fetchAppointments = async (phoneNumber, pageNum = 1) => {
    if (filters.fromDate && filters.toDate && !validateDateRange()) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        page: pageNum,
        limit: ITEMS_PER_PAGE,
        phoneNo: `+91${phoneNumber}`,
      });

      if (filters.fromDate) {
        queryParams.append("fromDate", format(filters.fromDate, "dd/MM/yyyy"));
      }
      if (filters.toDate) {
        queryParams.append("toDate", format(filters.toDate, "dd/MM/yyyy"));
      }
      if (filters.status) {
        queryParams.append("status", filters.status);
      }
      if (filters.time) {
        queryParams.append("time", filters.time);
      }
      if (filters.treatment) {
        queryParams.append("treatment", filters.treatment);
      }

      const response = await axios.get(
        `http://localhost:3000/api/v1/appointments?${queryParams.toString()}`
      );

      setAppointments(response.data.data || []);
      setTotalPages(
        Math.ceil(response.data.totalAppointments / ITEMS_PER_PAGE)
      );
      setHasSearched(true);

      if (response.data.data.length === 0 && pageNum === 1) {
        toast.error("No appointments found for this phone number");
      }
    } catch (error) {
      setError("Failed to fetch appointments");
      toast.error(
        error.response?.data?.message || "Failed to fetch appointments"
      );
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasSearched && searchPhone) {
      fetchAppointments(searchPhone, page);
    }
  }, [page, filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchPhone.trim()) {
      toast.error("Please enter a phone number");
      return;
    }
    if (!/^\d{10}$/.test(searchPhone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    setPage(1);
    fetchAppointments(searchPhone, 1);
  };

  const clearSearch = () => {
    setSearchPhone("");
    setAppointments([]);
    setHasSearched(false);
    setError(null);
    setPage(1);
    setFilters({
      fromDate: null,
      toDate: null,
      status: "",
      time: "",
      treatment: "",
    });
    setDateErrors({
      fromDate: "",
      toDate: "",
    });
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      if (key === "fromDate" || key === "toDate") {
        setTimeout(() => validateDateRange(), 0);
      }
      return newFilters;
    });
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({
      fromDate: null,
      toDate: null,
      status: "",
      time: "",
      treatment: "",
    });
    setDateErrors({
      fromDate: "",
      toDate: "",
    });
    setPage(1);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-600/20";
      case "cancelled":
        return "bg-rose-100 text-rose-800 ring-1 ring-rose-600/20";
      case "completed":
        return "bg-blue-100 text-blue-800 ring-1 ring-blue-600/20";
      default:
        return "bg-amber-100 text-amber-800 ring-1 ring-amber-600/20";
    }
  };

  const formatTime = (time) => {
    const hour = parseInt(time);
    return new Date(0, 0, 0, hour).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  };

  const getTreatmentLabel = (treatment) => {
    const found = treatmentOptions.find((t) => t.value === treatment);
    return found ? found.label : treatment;
  };

  const handleAppointmentClick = (appointmentId) => {
    navigate(`/appointment/${appointmentId}`);
  };


  const heroProps = {
    // badgeIcon: History,
    badgeText: 'Treatment Records',
    heading: 'Your Dental',
    headingHighlight: 'Treatment',
    headingEnd: 'History',
    description: 'Access your complete dental treatment history, including past appointments, procedures, and upcoming visits. Keep track of your oral health journey in one convenient place.',
    primaryButtonText: 'View History',
    primaryButtonAction: (e) => {
      e.preventDefault();
      const element = historyRef.current;
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    },
    secondaryButtonText: 'Download Records',
    // secondaryButtonIcon: Download,
    secondaryButtonAction: () => {
      alert('This would download your complete dental records as a PDF file.');
    },
    imageSrc: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    imageAlt: "Dental records",
    // floatingBadgeIcon: FileText,
    floatingBadgeTitle: "Digital Records",
    floatingBadgeText: "Secure & accessible anytime",
    scrollToRef: historyRef,
    scrollText: "View Your History"
  };


  return (
    <>
      <Helmet>
        <title>Your Dental Appointments | SmileCare Dental Clinic</title>
        <meta
          name="description"
          content="View and manage your dental appointments. Track your upcoming visits, treatment details, and appointment status."
        />
      </Helmet>

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

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">

<Hero {...heroProps} />

        <div
ref={historyRef} className="relative min-h-screen">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

          <div className="relative z-10 container mx-auto px-4 py-12">
            <div className="max-w-9xl mx-auto">
              {/* Header Section */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
                  Your Dental Appointments
                </h1>
                <p className="text-lg text-indigo-600 max-w-2xl mx-auto">
                  Track and manage your dental care visits in one convenient
                  place
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column - Filters */}
                <div className="lg:col-span-4">
                  <div className="bg-white rounded-3xl shadow-xl p-8 border border-indigo-50">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Filter className="h-5 w-5 text-indigo-600" />
                        Filters
                      </h2>
                      <button
                        onClick={clearFilters}
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Clear all
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                            From Date
                          </span>
                        </label>
                        <DatePicker
                          selected={filters.fromDate}
                          onChange={(date) =>
                            handleFilterChange("fromDate", date)
                          }
                          dateFormat="dd/MM/yyyy"
                          maxDate={new Date()}
                          className={`w-full px-4 py-3 border ${
                            dateErrors.fromDate
                              ? "border-red-300"
                              : "border-gray-300"
                          } rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500`}
                          placeholderText="Select from date"
                        />
                        {dateErrors.fromDate && (
                          <p className="mt-2 text-sm text-red-600">
                            {dateErrors.fromDate}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                            To Date
                          </span>
                        </label>
                        <DatePicker
                          selected={filters.toDate}
                          onChange={(date) =>
                            handleFilterChange("toDate", date)
                          }
                          dateFormat="dd/MM/yyyy"
                          maxDate={addDays(new Date(), 90)}
                          minDate={filters.fromDate}
                          className={`w-full px-4 py-3 border ${
                            dateErrors.toDate
                              ? "border-red-300"
                              : "border-gray-300"
                          } rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500`}
                          placeholderText="Select to date"
                        />
                        {dateErrors.toDate && (
                          <p className="mt-2 text-sm text-red-600">
                            {dateErrors.toDate}
                          </p>
                        )}
                      </div>

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
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-indigo-600" />
                            Time
                          </span>
                        </label>
                        <select
                          value={filters.time}
                          onChange={(e) =>
                            handleFilterChange("time", e.target.value)
                          }
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
                            <option
                              key={treatment.value}
                              value={treatment.value}
                            >
                              {treatment.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Info Cards */}
                  <div className="mt-6 space-y-6">
                    {/* Emergency Contact */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-xl p-6 text-white">
                      <h3 className="text-xl font-bold mb-4">Emergency Care</h3>
                      <p className="mb-4">
                        Available 24/7 for urgent dental needs
                      </p>
                      <a
                        href="tel:+15551234567"
                        className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Column - Search & Results */}
                <div className="lg:col-span-8">
                  <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                    <form onSubmit={handleSearch} className="flex gap-4">
                      <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-2">🇮🇳</span>
                            <span className="text-gray-500">+91</span>
                          </div>
                        </div>
                        <input
                          type="tel"
                          value={searchPhone}
                          onChange={(e) =>
                            setSearchPhone(
                              e.target.value.replace(/\D/g, "").slice(0, 10)
                            )
                          }
                          placeholder="Enter 10-digit phone number"
                          className="block w-full pl-24 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                        />
                        {searchPhone && (
                          <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center"
                          >
                            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          </button>
                        )}
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-500/25"
                      >
                        {loading ? (
                          <RefreshCw className="h-5 w-5 animate-spin" />
                        ) : (
                          <Search className="h-5 w-5" />
                        )}
                        Search
                      </button>
                    </form>
                  </div>

                  {loading ? (
                    <div className="flex items-center justify-center py-12 bg-white rounded-3xl shadow-xl">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                  ) : error ? (
                    <div className="text-center py-12 bg-white rounded-3xl shadow-xl">
                      <AlertCircle className="h-16 w-16 text-rose-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">
                        Error
                      </h3>
                      <p className="mt-1 text-gray-500">{error}</p>
                    </div>
                  ) : !hasSearched ? (
                    <div className="text-center py-12 bg-white rounded-3xl shadow-xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Stethoscope className="h-8 w-8 text-indigo-600" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">
                        Search Your Appointments
                      </h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        Enter your phone number to view your dental appointments
                        and treatment history
                      </p>
                    </div>
                  ) : appointments.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-3xl shadow-xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Calendar className="h-8 w-8 text-indigo-600" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">
                        No Appointments Found
                      </h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        We couldn't find any appointments matching your search
                        criteria. Try adjusting your filters or book a new
                        appointment.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                      {/* Table Header */}
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider"
                              >
                                S.No
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider"
                              >
                                Patient
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
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider"
                              >
                                Details
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {appointments.map((appointment, index) => (
                              <tr
                                key={appointment._id}
                                className="hover:bg-indigo-50/50 transition-colors cursor-pointer"
                                onClick={() =>
                                  handleAppointmentClick(appointment._id)
                                }
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {(page - 1) * ITEMS_PER_PAGE + index + 1}
                                  </div>
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
                                      <div className="text-sm text-gray-500 flex items-center">
                                        <Phone className="h-3 w-3 mr-1" />
                                        {appointment.phoneNo}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900 flex items-center">
                                    <Calendar className="h-4 w-4 mr-1 text-indigo-600" />
                                    {appointment.date}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900 flex items-center">
                                    <Clock className="h-4 w-4 mr-1 text-indigo-600" />
                                    {formatTime(appointment.time)}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900 flex items-center">
                                    <Stethoscope className="h-4 w-4 mr-1 text-indigo-600" />
                                    {getTreatmentLabel(appointment.treatment)}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                      appointment.status
                                    )}`}
                                  >
                                    {appointment.status
                                      .charAt(0)
                                      .toUpperCase() +
                                      appointment.status.slice(1)}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button className="text-indigo-600 hover:text-indigo-900 font-medium">
                                    View
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-8">
                          <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="p-2.5 rounded-xl bg-white hover:bg-indigo-50 disabled:opacity-50 transition-colors border border-indigo-100 shadow-sm"
                          >
                            <ChevronLeft className="h-5 w-5 text-indigo-600" />
                          </button>
                          <span className="text-sm text-gray-700 bg-white px-4 py-2 rounded-xl border border-indigo-100 shadow-sm">
                            Page {page} of {totalPages}
                          </span>
                          <button
                            onClick={() =>
                              setPage((p) => Math.min(totalPages, p + 1))
                            }
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointments;
