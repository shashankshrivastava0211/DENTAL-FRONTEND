import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Clock,
  Phone,
  User,
  FileText,
  Stethoscope,
  Heart,
  Shield,
  Clock3,
  MapPin,
  Users,
  Calendar as Calendar2,
  ChevronDown,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {
  format,
  isSameDay,
  addDays,
  isWithinInterval,
  addMonths,
  getMonth,
} from "date-fns";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Hero from "../components/Hero";
import AOS from "aos";
import "aos/dist/aos.css";
import { VITE_REACT_APP_BASE_URL } from "../components/utils/constants";
import SelectField from "../components/SelectField";
import { treatments } from "../Data/Treatments";

function BookAppointment() {
  const navigate = useNavigate();
  const appointmentRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [minDate] = useState(new Date());
  const [maxDate] = useState(addMonths(new Date(), 3));
  const [currentMonth, setCurrentMonth] = useState(getMonth(new Date()));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    patientName: "",
    countryCode: "+91",
    phoneNo: "",
    date: "",
    time: "",
    treatment: "",
    description: "",
    gender: "",
    age: "",
  });

  const [lunchTime, setLunchTime] = useState({
    start: 14,
    end: 16,
  });

  const phoneFormats = [
    { regex: /^[1-9]\d{2}-\d{3}-\d{4}$/, example: "XXX-XXX-XXXX" },
    { regex: /^\(\d{3}\)\s\d{3}-\d{4}$/, example: "(XXX) XXX-XXXX" },
    { regex: /^[1-9]\d{2}\s\d{3}\s\d{4}$/, example: "XXX XXX XXXX" },
    { regex: /^[1-9]\d{2}\.\d{3}\.\d{4}$/, example: "XXX.XXX.XXXX" },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  useEffect(() => {
    const fetchLunchTime = async () => {
      try {
        setLunchTime({
          start: 14,
          end: 16,
        });
      } catch (error) {
        console.error("Failed to fetch lunch time:", error);
        setLunchTime({
          start: 14,
          end: 16,
        });
      }
    };

    fetchLunchTime();
  }, []);

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    let defaultDate = currentHour >= 18 ? addDays(now, 1) : now;

    if (isWithinInterval(defaultDate, { start: minDate, end: maxDate })) {
      setSelectedDate(defaultDate);
      setFormData((prev) => ({
        ...prev,
        date: format(defaultDate, "yyyy-MM-dd"),
      }));
    }
  }, [minDate, maxDate]);

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

  const formatTimeLabel = (hour) => {
    const period = hour < 12 ? "AM" : "PM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:00 ${period}`;
  };

  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const currentHour = now.getHours();
    const isToday = selectedDate ? isSameDay(selectedDate, now) : false;

    for (let hour = 10; hour <= 20; hour++) {
      if (isToday && hour <= currentHour) continue;

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData((prev) => ({
      ...prev,
      date: format(date, "yyyy-MM-dd"),
      time: "",
    }));
    setErrors((prev) => ({ ...prev, date: "" }));
    setCurrentMonth(getMonth(date));
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

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(formData.age) || formData.age < 1 || formData.age > 120) {
      newErrors.age = "Age must be between 1 and 120";
    }

    if (formData.description && formData.description.length > 200) {
      newErrors.description = "Description must not exceed 200 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || isSubmitting) {
      toast.error("Please fix the errors in the form", {
        duration: 4000,
        position: "top-center",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const dateObj = new Date(formData.date);
      const formattedDate = format(dateObj, "dd/MM/yyyy");
      const fullPhoneNumber = `${
        formData.countryCode
      }${formData.phoneNo.replace(/\D/g, "")}`;

      await axios.post(`${VITE_REACT_APP_BASE_URL}/appointments`, {
        ...formData,
        phoneNo: fullPhoneNumber,
        date: formattedDate,
        age: parseInt(formData.age, 10),
      });

      toast.success(
        "Appointment scheduled successfully! We'll confirm your booking via SMS shortly.",
        {
          duration: 5000,
          position: "top-right",
          icon: "👨‍⚕️",
        }
      );

      setTimeout(() => {
        setIsSubmitting(false);
        navigate("/Map");
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Unable to schedule appointment. Please try again.", {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  const handleChange = (e) => {
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

  const heroProps = {
    badgeIcon: Calendar,
    badgeText: "Online Scheduling",
    heading: "Book Your",
    headingHighlight: "Dental",
    headingEnd: "Appointment",
    description:
      "Schedule your next dental visit with ease. Our online booking system allows you to choose the perfect time that fits your busy schedule.",
    primaryButtonText: "Book Now",
    primaryButtonAction: (e) => {
      e.preventDefault();
      const element = appointmentRef.current;
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    secondaryButtonText: "Call Us",
    secondaryButtonIcon: Phone,
    secondaryButtonAction: () => {
      window.location.href = "tel:+918446322666";
    },
    imageSrc:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80",
    imageAlt: "Modern dental clinic interior with state-of-the-art equipment",
    floatingBadgeIcon: Clock,
    floatingBadgeTitle: "Quick & Easy",
    floatingBadgeText: "Book in under 2 minutes",
    scrollToRef: appointmentRef,
    scrollText: "Schedule Your Visit",
  };

  return (
    <>
      <Helmet>
        <title>
          Book Dental Appointment | Premier Dental Clinic in Pimple Saudagar,
          Pune
        </title>
        <meta
          name="description"
          content="Schedule your dental appointment at our modern clinic in Pimple Saudagar, Pune. Expert dental care, flexible scheduling, and state-of-the-art facilities available."
        />
        <meta
          name="keywords"
          content="dental appointment pune, book dentist pimple saudagar, dental clinic booking, dental care appointment pune, emergency dentist pune"
        />
        <meta
          property="og:title"
          content="Book Your Dental Appointment | Premier Dental Clinic in Pune"
        />
        <meta
          property="og:description"
          content="Schedule your dental appointment at our modern clinic in Pimple Saudagar, Pune. Expert dental care and convenient booking available."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1629909613654-28e377c37b09"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/book-appointment" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Book Your Dental Appointment | Premier Dental Clinic in Pune"
        />
        <meta
          name="twitter:description"
          content="Schedule your dental appointment at our modern clinic in Pimple Saudagar, Pune. Expert dental care and convenient booking available."
        />
      </Helmet>

      <Toaster
        position="top-right"
        reverseOrder={false}
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

        <div className="relative min-h-screen">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50 to-indigo-50"></div>
          <div className="absolute inset-0 bg-wave-pattern opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-200 rounded-full opacity-50"></div>
          </div>

          <div className="container mx-auto px-4 py-12" ref={appointmentRef}>
            <div className="max-w-7xl mx-auto">
              <div
                className="text-center mb-12"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-indigo-900 mb-6 leading-tight">
                  Book Your{" "}
                  <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                    Appointment
                  </span>
                </h1>
                <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg">
                  Experience exceptional dental care with our team of expert
                  professionals
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div
                  className="lg:col-span-8"
                  data-aos="fade-right"
                  data-aos-delay="200"
                >
                  <div className="bg-white rounded-3xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            onChange={handleChange}
                            className={`block w-full px-4 py-3 rounded-xl border ${
                              errors.patientName
                                ? "border-red-300"
                                : "border-gray-300"
                            } focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500`}
                            placeholder="Enter your full name"
                          />
                          {errors.patientName && (
                            <p className="mt-2 text-sm text-red-600">
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
                              onChange={handleChange}
                              className={`block flex-1 w-24 px-4 py-3 rounded-r-xl border ${
                                errors.phoneNo
                                  ? "border-red-300"
                                  : "border-gray-300"
                              } focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500`}
                              placeholder="XXX-XXX-XXXX"
                            />
                          </div>
                          {errors.phoneNo && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.phoneNo}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <span className="flex items-center">
                              <Calendar2
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
                            onChange={handleChange}
                            className={`block w-full px-4 py-3 rounded-xl border ${
                              errors.age ? "border-red-300" : "border-gray-300"
                            } focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500`}
                            placeholder="Enter age (1-120)"
                            maxLength={3}
                          />
                          {errors.age && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.age}
                            </p>
                          )}
                        </div>

                        <SelectField
                          label="Gender"
                          icon={Users}
                          value={formData.gender}
                          onChange={handleChange}
                          options={[
                            { value: "male", label: "Male" },
                            { value: "female", label: "Female" },
                            { value: "others", label: "Others" },
                          ]}
                          placeholder="Select Gender"
                          error={errors.gender}
                          name="gender"
                        />
                      </div>

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
                          <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            minDate={minDate}
                            maxDate={maxDate}
                            dateFormat="dd/MM/yyyy"
                            className={`block w-full px-4 py-3 rounded-xl border ${
                              errors.date ? "border-red-300" : "border-gray-300"
                            } focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500`}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                          />
                          {errors.date && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.date}
                            </p>
                          )}
                        </div>

                        <SelectField
                          label="Time"
                          icon={Clock}
                          value={formData.time}
                          onChange={handleChange}
                          options={generateTimeSlots()}
                          placeholder="Select Time"
                          error={errors.time}
                          name="time"
                        />
                      </div>

                      <SelectField
                        label="Treatment Type"
                        icon={Stethoscope}
                        value={formData.treatment}
                        onChange={handleChange}
                        options={treatments.map((t) => ({
                          value: t.value,
                          label: `${t.icon} ${t.label}`,
                        }))}
                        placeholder="Select Treatment"
                        error={errors.treatment}
                        name="treatment"
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="flex items-center">
                            <FileText
                              size={18}
                              className="mr-2 text-indigo-600"
                            />
                            Additional Notes (Optional)
                          </span>
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={3}
                          className={`block w-full px-4 py-3 rounded-xl border ${
                            errors.description
                              ? "border-red-300"
                              : "border-gray-300"
                          } focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500`}
                          placeholder="Any specific concerns or requirements..."
                        />
                        {errors.description && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors.description}
                          </p>
                        )}
                        <p className="mt-2 text-sm text-gray-500">
                          {200 - (formData.description?.length || 0)} characters
                          remaining
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-xl text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                          isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                        }`}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Scheduling Appointment...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Schedule Appointment
                            <Calendar className="ml-2 h-5 w-5" />
                          </span>
                        )}
                      </button>
                    </form>
                  </div>
                </div>

                <div
                  className="lg:col-span-4 space-y-6"
                  data-aos="fade-left"
                  data-aos-delay="200"
                >
                  <div className="bg-white rounded-3xl shadow-xl p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Clock className="w-6 h-6 text-indigo-600" />
                      <h3 className="font-semibold">Working Hours</h3>
                    </div>{" "}
                    <p className="text-gray-600 text-sm mb-4">
                      09:00Am - 06:00Pm
                    </p>
                    <div className="flex items-center space-x-4 mb-4">
                      <MapPin className="w-6 h-6 text-indigo-600" />
                      <h3 className="font-semibold">Our Location</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      107, Sai vision,
                      <br />
                      Kunal Icon Road, Pimple Saudagar,
                      <br />
                      Pune, Maharashtra 411027
                    </p>
                  </div>

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
                      +91 844-632-2666
                    </a>
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

export default BookAppointment;
