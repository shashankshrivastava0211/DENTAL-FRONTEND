import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {
  ArrowLeft,
  User,
  Calendar,
  Clock,
  FileText,
  Phone,
  Stethoscope,
  MapPin,
  Clipboard,
  AlertCircle,
  Clock4,
  FileCheck,
  HeartPulse,
  Edit3,
  Users,
  Calendar as Calendar2,
  Info,
  X,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { VITE_REACT_APP_BASE_URL } from "../utils/constants";

function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await axios.get(
          `${VITE_REACT_APP_BASE_URL}/appointments?id=${id}`
        );
        console.log("Response: ", response);

        if (response.data && Array.isArray(response.data)) {
          setAppointment(response.data[0]);
        } else if (response.data && response.data.data) {
          setAppointment(
            Array.isArray(response.data.data)
              ? response.data.data[0]
              : response.data.data
          );
        } else {
          throw new Error("Invalid data format received from server");
        }
      } catch (error) {
        console.error("API Error:", error);
        setError(
          error.response?.data?.message || "Failed to fetch appointment details"
        );
        toast.error("Failed to fetch appointment details");
      } finally {
        setLoading(false);
        console.log("Appointment Details: ", appointment);
      }
    };

    if (id) {
      fetchAppointmentDetails();
    }
  }, [id]);

  const formatTime = (time) => {
    if (!time) return "N/A";
    const hour = parseInt(time);
    return new Date(0, 0, 0, hour).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const [day, month, year] = dateString.split("/");
      return new Date(year, month - 1, day).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Date formatting error:", error);
      return dateString;
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch (error) {
      console.error("DateTime formatting error:", error);
      return dateString;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-600/20";
      case "cancelled":
        return "bg-rose-100 text-rose-800 ring-1 ring-rose-600/20";
      case "completed":
        return "bg-blue-100 text-blue-800 ring-1 ring-blue-600/20";
      case "pending":
        return "bg-amber-100 text-amber-800 ring-1 ring-amber-600/20";
      default:
        return "bg-gray-100 text-gray-800 ring-1 ring-gray-600/20";
    }
  };

  const getTreatmentLabel = (treatment) => {
    const treatments = {
      oral: "Teeth Whitening",
      dental: "Root Canal",
      orthodontic: "Dental Crown",
      orthopedic: "Orthodontics",
    };
    return treatments[treatment] || treatment;
  };

  const getGenderLabel = (gender) => {
    const genders = {
      male: "Male",
      female: "Female",
      others: "Others",
    };
    return genders[gender] || gender;
  };

  const handleViewPrescription = () => {
    if (appointment?.prescriptionId) {
      console.log("Prescription ID: ", appointment.prescriptionId);
      navigate(`/prescriptions/${appointment._id}`);
    }
  };

  const handleEdit = () => {
    if (appointment?.status?.toLowerCase() === "pending") {
      navigate(`/appointment/${id}/edit`);
    } else {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
          <div className="text-rose-600 mb-4">
            <AlertCircle className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Return to Appointments
          </button>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Appointment not found
          </h3>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Return to Appointments
          </button>
        </div>
      </div>
    );
  }

  const isPending = appointment.status?.toLowerCase() === "pending";

  return (
    <>
      <Helmet>
        <title>Appointment Details | Modern Dental Care Pune</title>
        <meta
          name="description"
          content="View and manage your dental appointment details at our modern clinic in Pimple Saudagar, Pune. Track appointment status, prescriptions, and more."
        />
        <meta name="keywords" content="dental appointment, dental clinic pune, appointment details, dental care pune" />
        <meta property="og:title" content="Appointment Details | Modern Dental Care Pune" />
        <meta property="og:description" content="View and manage your dental appointment details at our modern clinic in Pimple Saudagar, Pune." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://yourdomain.com/appointments" />
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
        <div className="relative min-h-screen">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

          <div className="relative z-10 container mx-auto px-4 pt-20 pb-8 md:pt-28">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div className="flex items-center">
                  <button
                    onClick={() => navigate(-1)}
                    className="mr-4 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:bg-indigo-50 transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5 text-indigo-600" />
                  </button>
                  <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900">
                    Appointment Details
                  </h1>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <button
                      onClick={handleEdit}
                      className={`inline-flex items-center px-5 py-2.5 rounded-xl text-white font-medium ${
                        isPending
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                          : "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                      } transition-colors`}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Appointment
                    </button>

                    {showTooltip && !isPending && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-xl shadow-lg z-10">
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex items-center">
                            <Info className="h-4 w-4 mr-1 text-amber-400" />
                            <span className="font-medium">Cannot Edit</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowTooltip(false);
                            }}
                            className="text-gray-400 hover:text-white"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p>
                          Only appointments with 'Pending' status can be edited.
                        </p>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45 bg-gray-900"></div>
                      </div>
                    )}
                  </div>

                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column - Patient Details */}
                <div className="lg:col-span-8">
                  <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                    <div className="flex items-start gap-6 mb-8">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                          <User className="w-10 h-10 text-indigo-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 truncate">
                          {appointment.patientName}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              appointment.status
                            )}`}
                          >
                            {appointment.status}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            ID: {appointment._id.substring(0, 8)}...
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Patient Information
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                            <Phone className="w-5 h-5 mr-3 text-indigo-600" />
                            <div>
                              <p className="text-sm text-gray-500">
                                Phone Number
                              </p>
                              <p className="font-medium text-gray-900">
                                {appointment.phoneNo}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                            <Users className="w-5 h-5 mr-3 text-indigo-600" />
                            <div>
                              <p className="text-sm text-gray-500">Gender</p>
                              <p className="font-medium text-gray-900">
                                {getGenderLabel(appointment.gender)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                            <Calendar2 className="w-5 h-5 mr-3 text-indigo-600" />
                            <div>
                              <p className="text-sm text-gray-500">Age</p>
                              <p className="font-medium text-gray-900">
                                {appointment.age} years
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Appointment Details
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                            <Calendar className="w-5 h-5 mr-3 text-indigo-600" />
                            <div>
                              <p className="text-sm text-gray-500">Date</p>
                              <p className="font-medium text-gray-900">
                                {formatDate(appointment.date)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                            <Clock className="w-5 h-5 mr-3 text-indigo-600" />
                            <div>
                              <p className="text-sm text-gray-500">Time</p>
                              <p className="font-medium text-gray-900">
                                {formatTime(appointment.time)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                            <Stethoscope className="w-5 h-5 mr-3 text-indigo-600" />
                            <div>
                              <p className="text-sm text-gray-500">Treatment</p>
                              <p className="font-medium text-gray-900">
                                {getTreatmentLabel(appointment.treatment)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Clinical Notes */}
                    {appointment.description && (
                      <div className="my-6 rounded-xl">
                        <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-2">
                          Description
                        </h3>
                        <div className="p-5 rounded-xl text-gray-780">
                          {appointment.description}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Appointment History */}
                  <div className="bg-white rounded-3xl shadow-xl p-8">
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                      <Clipboard className="w-5 h-5 mr-2 text-indigo-600" />
                      Appointment History
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-500">Created</p>
                          <p className="font-medium text-gray-900">
                            {formatDateTime(appointment.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-500">Last Updated</p>
                          <p className="font-medium text-gray-900">
                            {formatDateTime(appointment.updatedAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Prescription & Info */}
                <div className="lg:col-span-4 space-y-8">
                  {/* Prescription Card */}
                  <div className="bg-white rounded-3xl shadow-xl p-8">
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-6">
                      <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                      Prescription
                    </h3>

                    {appointment.prescriptionId ? (
                      <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                        <FileCheck className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                        <p className="text-gray-700 mb-6">
                          Your prescription is ready and available for viewing
                        </p>
                        <button
                          onClick={handleViewPrescription}
                          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl transition-colors font-medium"
                        >
                          View Prescription
                        </button>
                      </div>
                    ) : (
                      <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl">
                        <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2 font-medium">
                          Prescription Not Available
                        </p>
                        <p className="text-gray-500 text-sm">
                          {appointment.status?.toLowerCase() === "completed"
                            ? "Your prescription is being prepared by the doctor."
                            : "Prescription will be available after your appointment is completed."}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Emergency Contact */}
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
                      +91 <span className="ml-2">844-632-2666</span>
                    </a>
                  </div>

                  {/* Location */}
                  <div className="bg-white rounded-3xl shadow-xl p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-indigo-600" />
                      </div>
                      <h3 className="font-semibold">Our Location</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      107, Sai vision,<br />
                      Kunal Icon Road, Pimple Saudagar,<br />
                      Pune, Maharashtra 411027
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentDetails;