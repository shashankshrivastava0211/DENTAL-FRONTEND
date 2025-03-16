import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { toast, Toaster } from "react-hot-toast";
import {
  Calendar,
  Clock,
  User,
  Phone,
  FileText,
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  Info,
  MapPin,
  Stethoscope,
  CalendarCheck,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Shield,
  Clock3,
  Users,
  ChevronDown,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { treatments } from "../../Data/Treatments";
import { VITE_REACT_APP_BASE_URL } from "../utils/constants";

const SelectField = ({
  label,
  icon: Icon,
  value,
  onChange,
  options,
  placeholder,
  error,
  name,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const [isMobile, setIsMobile] = useState(false);

  const handleOptionClick = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  const findSelectedLabel = () => {
    const foundOption = options.find((opt) => {
      const optValue = typeof opt === "string" ? opt : opt.value;
      return String(optValue) === String(value);
    });

    return typeof foundOption === "string"
      ? foundOption
      : foundOption?.label || placeholder;
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 640px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      setDropdownPosition(spaceBelow > 200 ? "bottom" : "top");
    }
  }, [isOpen, isMobile]);

  const selectedLabel = findSelectedLabel();

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <span className="flex items-center">
          <Icon size={18} className="mr-2 text-indigo-600" />
          {label}
        </span>
      </label>

      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full px-4 py-3 text-left border rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white cursor-pointer transition-colors flex items-center justify-between ${
            error ? "border-red-300" : "border-gray-300"
          } ${
            disabled
              ? "bg-gray-100 cursor-not-allowed"
              : "hover:border-indigo-400"
          }`}
          disabled={disabled}
        >
          <span
            className={`${!value ? "text-gray-500" : ""} ${
              disabled ? "text-gray-500" : ""
            }`}
          >
            {selectedLabel}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-indigo-600 ml-2 transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            } ${disabled ? "text-gray-400" : ""}`}
          />
        </button>

        {isOpen && (
          <div
            className={`absolute z-20 w-full ${
              dropdownPosition === "bottom" ? "mt-1" : "mb-1 bottom-full"
            }`}
          >
            <div className="bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 border border-indigo-50 overflow-hidden">
              <div className="py-2 max-h-[50vh] overflow-y-auto">
                {options.map((option) => {
                  const optionValue =
                    typeof option === "string" ? option : option.value;
                  const optionLabel =
                    typeof option === "string"
                      ? option.charAt(0).toUpperCase() + option.slice(1)
                      : option.label;
                  const isDisabled = option.disabled || disabled;
                  const isLunch = optionValue === "lunch";

                  return (
                    <div
                      key={optionValue}
                      onClick={() =>
                        !isDisabled && handleOptionClick(optionValue)
                      }
                      className={`px-4 py-2 cursor-pointer transition-colors ${
                        String(value) === String(optionValue)
                          ? "bg-indigo-100/80 text-indigo-900"
                          : isLunch
                          ? "bg-gray-50 text-gray-500"
                          : "hover:bg-indigo-50/80 text-gray-900"
                      } ${isDisabled ? "cursor-not-allowed" : ""}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !isDisabled)
                          handleOptionClick(optionValue);
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      {optionLabel}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

function App() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [originalStatus, setOriginalStatus] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    patientName: "",
    phoneNo: "",
    treatment: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "",
    description: "",
    status: "",
    age: "",
    gender: "",
  });

  const [lunchTime] = useState({
    start: 14,
    end: 16,
  });

  const clinicInfo = {
    name: "32 Pearls Dental Clinic",
    address: "107, Sai vision, Kunal Icon Road, Pimple Saudagar,",
    city: "Pune, Maharashtra 411027",
    phone: "  +91 844-632-2666",
    email: "drpritesh86@gmail.com",
    hours: " 9:00 AM - 6:00 PM",
  };

  const phoneFormats = [
    { regex: /^[1-9]\d{2}-\d{3}-\d{4}$/, example: "XXX-XXX-XXXX" },
    { regex: /^\(\d{3}\)\s\d{3}-\d{4}$/, example: "(XXX) XXX-XXXX" },
    { regex: /^[1-9]\d{2}\s\d{3}\s\d{4}$/, example: "XXX XXX XXXX" },
    { regex: /^[1-9]\d{2}\.\d{3}\.\d{4}$/, example: "XXX.XXX.XXXX" },
  ];

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await axios.get(
          `${VITE_REACT_APP_BASE_URL}/appointments?id=${id}`
        );
        let appointmentData;
        if (response.data && Array.isArray(response.data)) {
          appointmentData = response.data[0];
        } else if (response.data && response.data.data) {
          appointmentData = Array.isArray(response.data.data)
            ? response.data.data[0]
            : response.data.data;
        }

        if (appointmentData) {
          const [day, month, year] = appointmentData.date.split("/");
          const dateObj = new Date(year, month - 1, day);
          setSelectedDate(dateObj);
          setOriginalStatus(appointmentData.status);

          // Format phone number removing country code
          const rawPhone = appointmentData.phoneNo?.replace("+91", "") || "";
          const formattedPhone = formatPhoneNumber(rawPhone);

          setFormData({
            patientName: appointmentData.patientName || "",
            phoneNo: formattedPhone,
            treatment: appointmentData.treatment || "",
            date: format(dateObj, "yyyy-MM-dd"),
            time: appointmentData.time || "",
            description: appointmentData.description || "",
            status: appointmentData.status || "",
            age: appointmentData.age || "",
            gender: appointmentData.gender || "",
          });
        } else {
          throw new Error("Appointment not found");
        }
      } catch (error) {
        console.error("API Error:", error);
        setError(
          error.response?.data?.message || "Failed to fetch appointment details"
        );
        toast.error("Failed to fetch appointment details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAppointmentDetails();
    } else {
      setLoading(false);
    }
  }, [id]);

  const formatTimeLabel = (hour) => {
    const period = hour < 12 ? "AM" : "PM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:00 ${period}`;
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour <= 20; hour++) {
      if (hour >= lunchTime.start && hour < lunchTime.end) {
        if (hour === lunchTime.start) {
          slots.push({
            value: "lunch",
            label: `${formatTimeLabel(lunchTime.start)} - ${formatTimeLabel(
              lunchTime.end
            )} (Lunch Break)`,
            disabled: true,
          });
        }
        continue;
      }

      slots.push({
        value: hour.toString(),
        label: formatTimeLabel(hour),
        disabled: false,
      });
    }
    return slots;
  };

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, "");

    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(
        6,
        10
      )}`;
    }
  };

  const validatePhoneNumber = (phoneNo) => {
    return phoneFormats.some((format) => format.regex.test(phoneNo));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = "Patient name is required";
    } else if (!/^[A-Za-z\s.]+$/.test(formData.patientName)) {
      newErrors.patientName = "Name can only contain letters, spaces, and dots";
    } else if (
      formData.patientName.length < 2 ||
      formData.patientName.length > 50
    ) {
      newErrors.patientName = "Name must be between 2 and 50 characters";
    }

    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = "Phone number is required";
    } else if (!validatePhoneNumber(formData.phoneNo)) {
      newErrors.phoneNo = `Invalid format. Use: ${phoneFormats
        .map((f) => f.example)
        .join(" or ")}`;
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.time) {
      newErrors.time = "Time is required";
    }

    if (!formData.treatment) {
      newErrors.treatment = "Treatment type is required";
    }

    if (formData.description && formData.description.length > 200) {
      newErrors.description = "Description must not exceed 200 characters";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (
      isNaN(formData.age) ||
      parseInt(formData.age) < 1 ||
      parseInt(formData.age) > 120
    ) {
      newErrors.age = "Please enter a valid age between 1 and 120";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (originalStatus.toLowerCase() === "completed") {
      newErrors.status = "Completed appointments cannot be modified";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || saving) {
      toast.error("Please fix the errors in the form", {
        duration: 4000,
        position: "top-right",
      });
      return;
    }

    if (originalStatus.toLowerCase() === "completed") {
      toast.error("Completed appointments cannot be modified", {
        duration: 4000,
        position: "top-right",
      });
      return;
    }

    setSaving(true);

    try {
      const dateObj = new Date(formData.date);
      const formattedDate = format(dateObj, "dd/MM/yyyy");
      const fullPhoneNumber = `+91${formData.phoneNo.replace(/\D/g, "")}`;

      const response = await axios.put(
        `${VITE_REACT_APP_BASE_URL}/appointments/${id}`,
        {
          _id: [id],
          patientName: formData.patientName,
          phoneNo: fullPhoneNumber,
          treatment: formData.treatment,
          date: formattedDate,
          time: formData.time,
          description: formData.description,
          status: originalStatus,
          age: formData.age,
          gender: formData.gender,
        }
      );

      toast.success("Appointment updated successfully!", {
        duration: 5000,
        position: "top-right",
      });

      navigate(`/appointment/${id}`);
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to update appointment"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "patientName") {
      const sanitizedValue = value.replace(/[^A-Za-z\s.]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: sanitizedValue,
      }));
    } else if (name === "phoneNo") {
      const formattedValue = formatPhoneNumber(value);
      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else if (name === "age") {
      const sanitizedValue = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: sanitizedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    setSelectedDate(date);
    setFormData((prev) => ({
      ...prev,
      date: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, date: "" }));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "confirmed":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5" />;
      case "confirmed":
        return <CalendarCheck className="w-5 h-5" />;
      case "pending":
        return <Clock className="w-5 h-5" />;
      case "cancelled":
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const isCompletedAppointment = originalStatus.toLowerCase() === "completed";
  const selectedTreatment = treatments.find(
    (t) => t.value === formData.treatment
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <div className="text-rose-600 mb-4">
            <AlertCircle className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Error Loading Appointment
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleGoBack}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Edit Dental Appointment | 32 Pearls Dental Clinic</title>
        <meta
          name="description"
          content="Manage and update your dental appointment details at 32 Pearls Dental Clinic. Modify appointment time, treatment details, and patient information."
        />
        <meta
          name="keywords"
          content="edit dental appointment, reschedule dental visit, update appointment details, dental clinic management, patient portal"
        />
        <meta
          property="og:title"
          content="Edit Dental Appointment | 32 Pearls Dental Clinic"
        />
        <meta
          property="og:description"
          content="Update and manage your dental appointment details with our easy-to-use interface."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1629909613654-28e377c37b09"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Edit Dental Appointment | 32 Pearls Dental Clinic"
        />
        <meta
          name="twitter:description"
          content="Update and manage your dental appointment details with our easy-to-use interface."
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
        <div className="relative min-h-screen">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50 to-indigo-50"></div>
          <div className="absolute inset-0 bg-wave-pattern opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-200 rounded-full opacity-50"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 pt-20 pb-8 md:pt-28">

            <header className="">
              <div className="max-w-7xl rounded-3xl bg-white border-b border-gray-200 shadow-sm  mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <button
                      onClick={handleGoBack}
                      className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors group"
                    >
                      <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                      <span className="font-medium">Back</span>
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Edit Appointment
                    </h1>
                  </div>

                  <div className="flex items-center space-x-4">
                    {isCompletedAppointment && (
                      <div className="bg-green-50 px-4 py-2 rounded-full flex items-center">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                        <p className="text-sm font-medium text-green-700">
                          Completed
                        </p>
                      </div>
                    )}
                    <button
                      onClick={() => setShowInfoModal(true)}
                      className="p-2 text-indigo-500 hover:text-indigo-700 transition-colors rounded-full hover:bg-indigo-50"
                      title="Clinic Information"
                    >
                      <Info className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </header>

            <div className="relative z-10 container mx-auto px-4 py-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8">
                    <div className="bg-white rounded-3xl shadow-xl p-8">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="mb-6">
                          <h2 className="text-xl font-bold text-indigo-900 mb-4">
                            Patient Information
                          </h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="flex items-center">
                                  <User
                                    size={18}
                                    className="mr-2 text-indigo-600"
                                  />
                                  Patient Name
                                </span>
                              </label>
                              <input
                                type="text"
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleInputChange}
                                disabled={isCompletedAppointment}
                                className={`block w-full px-4 py-3 rounded-xl border ${
                                  errors.patientName
                                    ? "border-red-300 ring-1 ring-red-300"
                                    : "border-gray-300"
                                } focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500 transition-all duration-200`}
                                placeholder="Enter patient name"
                              />
                              {errors.patientName && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  {errors.patientName}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="flex items-center">
                                  <Phone
                                    size={18}
                                    className="mr-2 text-indigo-600"
                                  />
                                  Phone Number
                                </span>
                              </label>
                              <div className="flex">
                                <div className="relative">
                                  <div className="flex items-center justify-between w-24 px-4 py-3 border border-gray-300 rounded-l-xl bg-gray-50">
                                    <span className="flex items-center">
                                      <span className="mr-2">🇮🇳</span>
                                      <span>+91</span>
                                    </span>
                                  </div>
                                </div>
                                <input
                                  type="tel"
                                  name="phoneNo"
                                  value={formData.phoneNo}
                                  onChange={handleInputChange}
                                  disabled={isCompletedAppointment}
                                  placeholder="XXX-XXX-XXXX"
                                  className={`block flex-1 px-4 w-24 py-3 rounded-r-xl border ${
                                    errors.phoneNo
                                      ? "border-red-300 ring-1 ring-red-300"
                                      : "border-gray-300"
                                  } focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500 transition-all duration-200`}
                                />
                              </div>
                              {errors.phoneNo && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  {errors.phoneNo}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="flex items-center">
                                  <Calendar
                                    size={18}
                                    className="mr-2 text-indigo-600"
                                  />
                                  Age
                                </span>
                              </label>
                              <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                disabled={isCompletedAppointment}
                                min="1"
                                max="120"
                                className={`block w-full px-4 py-3 rounded-xl border ${
                                  errors.age
                                    ? "border-red-300 ring-1 ring-red-300"
                                    : "border-gray-300"
                                } focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500 transition-all duration-200`}
                                placeholder="Enter age"
                              />
                              {errors.age && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  {errors.age}
                                </p>
                              )}
                            </div>

                            <SelectField
                              label="Gender"
                              icon={Users}
                              name="gender"
                              value={formData.gender}
                              onChange={handleInputChange}
                              options={[
                                { value: "male", label: "Male" },
                                { value: "female", label: "Female" },
                                { value: "other", label: "Other" },
                              ]}
                              placeholder="Select Gender"
                              error={errors.gender}
                              disabled={isCompletedAppointment}
                            />
                          </div>
                        </div>

                        <div className="mb-6">
                          <h2 className="text-xl font-bold text-indigo-900 mb-4">
                            Appointment Details
                          </h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="flex items-center">
                                  <Calendar
                                    size={18}
                                    className="mr-2 text-indigo-600"
                                  />
                                  Appointment Date
                                </span>
                              </label>
                              <div className="relative">
                                <input
                                  type="date"
                                  name="date"
                                  value={formData.date}
                                  onChange={handleDateChange}
                                  disabled={isCompletedAppointment}
                                  className={`block w-full px-4 py-3 rounded-xl border ${
                                    errors.date
                                      ? "border-red-300 ring-1 ring-red-300"
                                      : "border-gray-300"
                                  } focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500 transition-all duration-200`}
                                />
                              </div>
                              {errors.date && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  {errors.date}
                                </p>
                              )}
                            </div>

                            <SelectField
                              label="Appointment Time"
                              icon={Clock}
                              name="time"
                              value={formData.time}
                              onChange={handleInputChange}
                              options={generateTimeSlots()}
                              placeholder="Select Time"
                              error={errors.time}
                              disabled={isCompletedAppointment}
                            />
                          </div>
                        </div>

                        <div className="mb-6">
                          <h2 className="text-xl font-bold text-indigo-900 mb-4">
                            Treatment Information
                          </h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SelectField
                              label="Treatment Type"
                              icon={Stethoscope}
                              name="treatment"
                              value={formData.treatment}
                              onChange={handleInputChange}
                              options={treatments}
                              placeholder="Select Treatment"
                              error={errors.treatment}
                              disabled={isCompletedAppointment}
                            />

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Appointment Status
                              </label>
                              <div
                                className={`flex items-center px-4 py-3 rounded-xl border ${getStatusColor(
                                  formData.status
                                )}`}
                              >
                                {getStatusIcon(formData.status)}
                                <span className="ml-2 font-medium">
                                  {formData.status.charAt(0).toUpperCase() +
                                    formData.status.slice(1)}
                                </span>
                              </div>
                              {errors.status && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  {errors.status}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h2 className="text-xl font-bold text-indigo-900 mb-4">
                            Clinical Notes
                          </h2>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <span className="flex items-center">
                                <FileText
                                  size={18}
                                  className="mr-2 text-indigo-600"
                                />
                                Notes & Observations
                              </span>
                            </label>
                            <textarea
                              name="description"
                              value={formData.description}
                              onChange={handleInputChange}
                              disabled={isCompletedAppointment}
                              rows={4}
                              placeholder="Enter any relevant clinical notes or observations..."
                              className={`block w-full px-4 py-3 rounded-xl border ${
                                errors.description
                                  ? "border-red-300 ring-1 ring-red-300"
                                  : "border-gray-300"
                              } focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500 transition-all duration-200`}
                            />
                            {errors.description && (
                              <p className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.description}
                              </p>
                            )}
                            <div className="mt-2 flex justify-between items-center">
                              <p className="text-sm text-gray-500">
                                {200 - (formData.description?.length || 0)}{" "}
                                characters remaining
                              </p>
                              <div className="h-1 w-24 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${
                                    (formData.description?.length || 0) > 150
                                      ? "bg-amber-500"
                                      : "bg-green-500"
                                  }`}
                                  style={{
                                    width: `${Math.min(
                                      100,
                                      ((formData.description?.length || 0) /
                                        200) *
                                        100
                                    )}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-4">
                          <button
                            type="button"
                            onClick={handleGoBack}
                            className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={saving || isCompletedAppointment}
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {saving ? (
                              <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Saving Changes...
                              </>
                            ) : (
                              <>
                                <Save className="w-5 h-5 mr-2" />
                                Save Changes
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-6">
                    {selectedTreatment && (
                      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                          <h3 className="text-lg font-semibold text-white">
                            Treatment Details
                          </h3>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center text-2xl mb-4">
                            <span className="mr-3 bg-indigo-100 text-indigo-800 p-3 rounded-full">
                              {selectedTreatment.icon}
                            </span>
                            <span className="font-bold text-gray-900">
                              {selectedTreatment.label.split(" - ")[0]}
                            </span>
                          </div>
                          <div className="space-y-4 text-gray-600">
                            <p className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                              {selectedTreatment.details}
                            </p>
                            <div className="flex items-center text-indigo-600">
                              <Stethoscope className="w-5 h-5 mr-2" />
                              <span className="font-medium">
                                {selectedTreatment.description}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-white rounded-3xl shadow-xl p-6 space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                          <Heart className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Expert Care</h3>
                          <p className="text-sm text-gray-600">
                            Professional dental team
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                          <Shield className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Safe & Clean</h3>
                          <p className="text-sm text-gray-600">
                            Modern sterilization
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <Clock3 className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Flexible Hours</h3>
                          <p className="text-sm text-gray-600">
                            Convenient scheduling
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <Clock className="w-6 h-6 text-indigo-600" />
                        <h3 className="font-semibold">Working Hours</h3>
                      </div>{" "}
                      <p className="text-gray-600 text-sm mb-4">
                        {clinicInfo.hours}
                      </p>
                      <div className="flex items-center space-x-4 mb-4">
                        <MapPin className="w-6 h-6 text-indigo-600" />
                        <h3 className="font-semibold">Our Location</h3>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {clinicInfo.address}
                        <br />
                        {clinicInfo.city}
                        <br />
                        {clinicInfo.hours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {showInfoModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-xl p-0 max-w-lg w-full mx-4 overflow-hidden animate-fadeIn">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">
                      {clinicInfo.name}
                    </h3>
                    <button
                      onClick={() => setShowInfoModal(false)}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-indigo-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Location</p>
                        <p className="text-gray-600">{clinicInfo.address}</p>
                        <p className="text-gray-600">{clinicInfo.city}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-indigo-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Working Hours
                        </p>
                        <p className="text-gray-600">{clinicInfo.hours}</p>
                        <div className="mt-2 bg-indigo-50 rounded-lg p-2 border border-indigo-100 inline-block">
                          <p className="text-indigo-700 text-sm">
                            Lunch: {formatTimeLabel(lunchTime.start)} -{" "}
                            {formatTimeLabel(lunchTime.end)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="w-5 h-5 text-indigo-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Contact</p>
                        <p className="text-gray-600">{clinicInfo.phone}</p>
                        <p className="text-gray-600">{clinicInfo.email}</p>
                      </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => setShowInfoModal(false)}
                        className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md font-medium"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
