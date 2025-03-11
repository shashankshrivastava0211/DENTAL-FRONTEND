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
  SlidersHorizontal,
  Download,
  History,
  FileText,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { format, isAfter, addDays } from "date-fns";
import Hero from "../components/Hero";
import AOS from "aos";
import "aos/dist/aos.css";
import { VITE_REACT_APP_BASE_URL } from "../components/utils/constants";
import SelectField from "../components/SelectField";

function Appointments() {
  const [searchPhone, setSearchPhone] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const historyRef = useRef(null);
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const statusOptions = ["pending", "confirmed", "completed", "cancelled"];
  const timeOptions = Array.from({ length: 9 }, (_, i) => (i + 10).toString());
  const treatmentOptions = [
    { value: "root_canal", label: "Root Canal" },
    { value: "crown", label: "Dental Crown" },
    { value: "cosmetic_procedure", label: "Cosmetic Procedure" },
    { value: "filling", label: "Dental Filling" },
    { value: "dental_implant", label: "Dental Implant" },
    { value: "teeth_replacement", label: "Teeth Replacement" },
    { value: "extraction", label: "Tooth Extraction" },
    { value: "mouth_guard", label: "Mouth Guard" },
    { value: "child_procedure", label: "Child Procedure" },
    { value: "gum_care", label: "Gum Care" },
    { value: "orthodontic", label: "Orthodontic Treatment" },
    { value: "x_ray", label: "Dental X-Ray" }
  ];

  const heroProps = {
    badgeIcon: History,
    badgeText: "Treatment Records",
    heading: "Your Dental",
    headingHighlight: "Treatment",
    headingEnd: "History",
    description:
      "Access your complete dental treatment history, including past appointments, procedures, and upcoming visits. Keep track of your oral health journey in one convenient place.",
    primaryButtonText: "View History",
    primaryButtonAction: (e) => {
      e.preventDefault();
      const element = historyRef.current;
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    secondaryButtonText: "Download Records",
    secondaryButtonIcon: Download,
    secondaryButtonAction: () => {
      alert("This would download your complete dental records as a PDF file.");
    },
    imageSrc:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    imageAlt: "Dental records",
    floatingBadgeIcon: FileText,
    floatingBadgeTitle: "Digital Records",
    floatingBadgeText: "Secure & accessible anytime",
    scrollToRef: historyRef,
    scrollText: "View Your History",
  };

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
    if (!validateDateRange()) return;

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
        `${VITE_REACT_APP_BASE_URL}/appointments?${queryParams.toString()}`
      );

      setAppointments(response.data.data || []);
      setTotalPages(
        Math.ceil(response.data.totalAppointments / ITEMS_PER_PAGE)
      );
      setHasSearched(true);

      if (response.data.data.length === 0 && pageNum === 1) {
        toast.error("No appointments found for this phone number");
      } else if (response.data.data.length > 0) {
        toast.success("Appointments loaded successfully!", {
          style: {
            background: "#ffffff",
            color: "#10B981",
            padding: "16px",
            borderRadius: "4px",
          },
          iconTheme: {
            primary: "#10B981",
            secondary: "#ffffff",
          },
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch appointments");
      setAppointments([]);
      toast.error(
        err.response?.data?.message || "Failed to fetch appointments",
        {
          style: {
            background: "#ffffff",
            color: "#EF4444",
            padding: "16px",
            borderRadius: "4px",
          },
          iconTheme: {
            primary: "#EF4444",
            secondary: "#ffffff",
          },
        }
      );
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
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleAppointmentClick = (appointmentId) => {
    navigate(`/appointment/${appointmentId}`);
  };

  const formatTime = (hour) => {
    const hourNum = parseInt(hour);
    return `${hourNum}:00 ${hourNum >= 12 ? "PM" : "AM"}`;
  };

  const getTreatmentLabel = (value) => {
    const treatment = treatmentOptions.find((t) => t.value === value);
    return treatment ? treatment.label : value;
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const AppointmentCard = ({ appointment, index }) => (
    <div
      className="bg-white rounded-xl shadow-sm p-6 border border-indigo-50 hover:border-indigo-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => handleAppointmentClick(appointment._id)}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
            <User className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {appointment.patientName}
            </h3>
            <p className="text-sm text-gray-500 flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              {appointment.phoneNo}
            </p>
          </div>
        </div>
        <span
          className={`px-4 py-1.5 text-sm font-medium rounded-lg ${getStatusColor(
            appointment.status
          )}`}
        >
          {appointment.status.charAt(0).toUpperCase() +
            appointment.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-lg p-3">
          <div className="flex items-center text-gray-700">
            <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
            <span>{appointment.date}</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-lg p-3">
          <div className="flex items-center text-gray-700">
            <Clock className="h-5 w-5 mr-2 text-indigo-600" />
            <span>{formatTime(appointment.time)}</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-lg p-3">
        <div className="flex items-center text-gray-700">
          <Stethoscope className="h-5 w-5 mr-2 text-indigo-600" />
          <span>{getTreatmentLabel(appointment.treatment)}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full text-center text-indigo-600 hover:text-indigo-700 font-medium text-sm">
          View Details →
        </button>
      </div>
    </div>
  );


  
  const FilterPanel = ({ className = "", isMobile = false }) => (
    <div
      className={`${className} bg-white rounded-3xl shadow-xl p-4  border border-indigo-50 ${
        isMobile
          ? "fixed inset-x-4 top-10 z-50 max-h-[85vh] overflow-y-auto"
          : ""
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="h-5 w-5 text-indigo-600" />
          Filters
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={clearFilters}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            Clear all
          </button>
          {isMobile && (
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
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
            onChange={(date) => handleFilterChange("fromDate", date)}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            className={`w-full px-4 py-3 border ${
              dateErrors.fromDate ? "border-red-300" : "border-gray-300"
            } rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-gradient-to-r from-indigo-50/30 via-purple-50/30 to-violet-50/30`}
            placeholderText="Select from date"
          />
          {dateErrors.fromDate && (
            <p className="mt-2 text-sm text-red-600">{dateErrors.fromDate}</p>
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
            onChange={(date) => handleFilterChange("toDate", date)}
            dateFormat="dd/MM/yyyy"
            maxDate={addDays(new Date(), 90)}
            minDate={filters.fromDate}
            className={`w-full px-4 py-3 border ${
              dateErrors.toDate ? "border-red-300" : "border-gray-300"
            } rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-gradient-to-r from-indigo-50/30 via-purple-50/30 to-violet-50/30`}
            placeholderText="Select to date"
          />
          {dateErrors.toDate && (
            <p className="mt-2 text-sm text-red-600">{dateErrors.toDate}</p>
          )}
        </div>

        <SelectField
          label="Status"
          icon={Info}
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          options={statusOptions}
          placeholder="All Status"
        />

        <SelectField
          label="Time"
          icon={Clock}
          value={filters.time}
          onChange={(e) => handleFilterChange("time", e.target.value)}
          options={timeOptions.map((hour) => ({
            value: hour,
            label: formatTime(hour),
          }))}
          placeholder="All Times"
        />

        <SelectField
          label="Treatment"
          icon={Stethoscope}
          value={filters.treatment}
          onChange={(e) => handleFilterChange("treatment", e.target.value)}
          options={treatmentOptions}
          placeholder="All Treatments"
        />
      </div>
    </div>
  );

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
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#ffffff",
            color: "#363636",
            padding: "16px",
            borderRadius: "4px",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          },
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        <Hero {...heroProps} />

        <div className="py-12 md:py-16 lg:py-20 relative overflow-hidden flex items-center">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50 to-indigo-50 opacity-70"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.1),transparent_50%)]"></div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl"></div>
          </div>
          <div
            ref={historyRef}
            className="relative z-10 container mx-auto px-4 py-12"
          >
            <div className="text-center mb-12 md:mb-16">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 mb-6 leading-tight"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Your Dental{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Appointments and History
                </span>
              </h2>
              <p
                className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Track and manage your dental care visits in one convenient place
              </p>
            </div>

            <div className="lg:hidden mb-6">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-xl border border-indigo-100 shadow-sm text-indigo-600 font-medium hover:bg-indigo-50 transition-colors"
              >
                <SlidersHorizontal className="h-5 w-5" />
                {isFilterOpen ? "Hide Filters" : "Show Filters"}
              </button>
            </div>

            {isFilterOpen && (
              <div className="lg:hidden">
                <div
                  className="fixed inset-0 bg-black/50 z-40"
                  onClick={() => setIsFilterOpen(false)}
                />
                <FilterPanel isMobile={true} />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="hidden lg:block lg:col-span-3">
                <FilterPanel />

                <div className="mt-6">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-xl p-6 text-white">
                    <h3 className="text-xl font-bold mb-4">Emergency Care</h3>
                    <p className="mb-4">
                      Available 24/7 for urgent dental needs
                    </p>
                    <a
                      href="tel:+918446322666"
                      className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      +91 &nbsp; 844-632-2666
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-9">
                <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8">
                  <form
                    ref={historyRef}
                    onSubmit={handleSearch}
                    className="flex flex-col md:flex-row gap-4"
                  >
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
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-500/25"
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
                    <h3 className="text-lg font-medium text-gray-900">Error</h3>
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
                    <div className="hidden md:block overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-3 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider"
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
                              <td className="pl-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {(page - 1) * ITEMS_PER_PAGE + index + 1}
                                </div>
                              </td>

                              <td className="px-3 py-4 whitespace-nowrap">
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
                                  {appointment.status.charAt(0).toUpperCase() +
                                    appointment.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-indigo-600 hover:text-indigo-900 font-medium">
                                  View
                                  <br /> Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="md:hidden space-y-4 p-4">
                      {appointments.map((appointment, index) => (
                        <AppointmentCard
                          key={appointment._id}
                          appointment={appointment}
                          index={index}
                        />
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50">
                        <button
                          onClick={() => setPage(page - 1)}
                          disabled={page === 1}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 disabled:text-gray-400"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </button>
                        <span className="text-sm text-gray-700">
                          Page {page} of {totalPages}
                        </span>
                        <button
                          onClick={() => setPage(page + 1)}
                          disabled={page === totalPages}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 disabled:text-gray-400"
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointments;
