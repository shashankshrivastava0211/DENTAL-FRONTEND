import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Calendar,
  Heart,
  Shield,
  Clock3,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Map = () => {
  const navigate = useNavigate();
  const [showSuccessMessage] = useState(true);

  const handleViewMap = () => {
    window.open(
      "https://www.google.com/maps/dir/?api=1&destination=107+Sai+vision+Kunal+Icon+Road+Pimple+Saudagar+Pune",
      "_blank"
    );
  };

  const handleViewAppointments = () => {
    navigate("/appointments");
  };

  return (
    <>
      <Helmet>
        <title>
          Visit Our Dental Clinic in Pimple Saudagar, Pune | Modern Dental Care
        </title>
        <meta
          name="description"
          content="Experience exceptional dental care at our modern clinic in Pimple Saudagar, Pune. State-of-the-art facilities, expert dental team, and convenient scheduling available."
        />
        <meta
          name="keywords"
          content="dental clinic pune, dentist pimple saudagar, dental care pune, dental treatment maharashtra"
        />
        <meta property="og:title" content="Premier Dental Clinic in Pune" />
        <meta
          property="og:description"
          content="Experience exceptional dental care at our modern clinic in Pimple Saudagar, Pune. Book your appointment today!"
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/location" />
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
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-indigo-900 mb-6 leading-tight">
                  Visit{" "}
                  <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                    Our Clinic
                  </span>
                </h1>
                <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg">
                  Experience exceptional dental care at our modern dental clinic
                </p>
              </div>

              {/* Success Message */}
              {showSuccessMessage && (
                <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-center text-green-800">
                    <p className="text-center">
                      Thank you for scheduling your appointment! We'll confirm your
                      booking via SMS shortly. 
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                {/* Quick Links - Shown first on mobile */}
                <div className="lg:hidden space-y-6 mb-8">
                  <div className="bg-white rounded-3xl shadow-xl p-6">
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <div className="space-y-3">
                      <button
                        onClick={handleViewAppointments}
                        className="w-full flex items-center justify-between px-4 py-3 bg-indigo-50 rounded-xl text-indigo-700 hover:bg-indigo-100 transition-colors"
                      >
                        <span className="flex items-center">
                          <Calendar className="w-5 h-5 mr-2" />
                          View Appointments
                        </span>
                        <span>→</span>
                      </button>
                      <button
                        onClick={handleViewMap}
                        className="w-full flex items-center justify-between px-4 py-3 bg-purple-50 rounded-xl text-purple-700 hover:bg-purple-100 transition-colors"
                      >
                        <span className="flex items-center">
                          <MapPin className="w-5 h-5 mr-2" />
                          Get Directions
                        </span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Left Column - Map and Contact */}
                <div className="lg:col-span-8">
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-full">
                    {/* Map Section */}
                    <div className="w-full h-[400px] rounded-t-3xl overflow-hidden">
                      <iframe
                        title="Clinic Location"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.802762024058!2d73.7924!3d18.5912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b6df8772c6e1!2sSai%20Vision%2C%20Kunal%20Icon%20Rd%2C%20Pimple%20Saudagar%2C%20Pune%2C%20Maharashtra%20411027!5e0!3m2!1sen!2sin!4v1"
                      ></iframe>
                    </div>

                    <div className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact Information */}
                        <div className="space-y-6">
                          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Contact Information
                          </h2>
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <MapPin className="w-6 h-6 text-indigo-600 mt-1 mr-3" />
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  Address
                                </h3>
                                <p className="text-gray-600">
                                  107, Sai vision,
                                  <br />
                                  Kunal Icon Road, Pimple Saudagar,
                                  <br />
                                  Pune, Maharashtra 411027
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <Phone className="w-6 h-6 text-indigo-600 mt-1 mr-3" />
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  Phone
                                </h3>
                                <p className="text-gray-600">
                                  +91 844-632-2666
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <Clock className="w-6 h-6 text-indigo-600 mt-1 mr-3" />
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  Hours
                                </h3>
                                <div className="text-gray-600">
                                  <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
                                  <p>Sunday: By Appointment Only</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                              onClick={handleViewMap}
                              className="flex justify-center items-center py-4 px-6 border border-transparent rounded-xl text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                              <MapPin className="w-5 h-5 mr-2" />
                              Get Directions
                            </button>
                            <button
                              onClick={handleViewAppointments}
                              className="flex justify-center items-center py-4 px-6 border border-transparent rounded-xl text-base font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                              <Calendar className="w-5 h-5 mr-2" />
                              Your Appointments
                            </button>
                          </div>
                        </div>

                        {/* Clinic Highlights */}
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Clinic Highlights
                          </h2>
                          <div className="space-y-4">
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100">
                              <h3 className="font-medium text-gray-900">
                                Location
                              </h3>
                              <p className="text-gray-600">
                                Prime location in Pimple Saudagar
                              </p>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100">
                              <h3 className="font-medium text-gray-900">
                                Parking
                              </h3>
                              <p className="text-gray-600">
                                Ample parking available
                              </p>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100">
                              <h3 className="font-medium text-gray-900">
                                Facilities
                              </h3>
                              <p className="text-gray-600">
                                Modern dental equipment and comfortable waiting
                                area
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Features */}
                <div className="lg:col-span-4 space-y-6 hidden lg:block">
                  {/* Quick Links */}
                  <div className="bg-white rounded-3xl shadow-xl p-6">
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <div className="space-y-3">
                      <button
                        onClick={handleViewAppointments}
                        className="w-full flex items-center justify-between px-4 py-3 bg-indigo-50 rounded-xl text-indigo-700 hover:bg-indigo-100 transition-colors"
                      >
                        <span className="flex items-center">
                          <Calendar className="w-5 h-5 mr-2" />
                          View Appointments
                        </span>
                        <span>→</span>
                      </button>
                      <button
                        onClick={handleViewMap}
                        className="w-full flex items-center justify-between px-4 py-3 bg-purple-50 rounded-xl text-purple-700 hover:bg-purple-100 transition-colors"
                      >
                        <span className="flex items-center">
                          <MapPin className="w-5 h-5 mr-2" />
                          Get Directions
                        </span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>

                  {/* Features */}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
