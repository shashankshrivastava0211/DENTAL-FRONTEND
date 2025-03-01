import React from 'react';
import { MapPin, Phone, Clock, Calendar, Heart, Shield, Clock3 } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const Map = () => {
  const navigate = useNavigate();

  const handleViewMap = () => {
    window.open('https://www.google.com/maps/dir/?api=1&destination=Dr+Anil+Yadav+Brass+Market+Rewari', '_blank');
  };

  const handleViewAppointments = () => {
    navigate('/appointments');
  };

  return (
    <>
      <Helmet>
        <title>Find Us | Dr. Anil Yadav Dental Clinic</title>
        <meta
          name="description"
          content="Visit Dr. Anil Yadav's Dental Clinic. Get directions and contact information for our dental practice in Brass Market, Rewari."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        <div className="relative min-h-screen flex flex-col">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

          <div className="relative z-10 flex-grow py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto h-full">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
                  Visit Our Clinic
                </h1>
                <p className="text-lg text-indigo-600 max-w-2xl mx-auto">
                  Experience exceptional dental care at Dr. Anil Yadav's Dental Clinic
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                {/* Left Column - Map and Contact */}
                <div className="lg:col-span-8">
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-full">
                    {/* Map Section */}
                    <div className="w-full h-[400px] rounded-t-3xl overflow-hidden">
                      <iframe
                        title="Hospital Location"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3521.0075307543657!2d76.61745!3d28.19755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3f6a18!2sBrass+Market+Rewari!5e0!3m2!1sen!2sin!4v1"
                      ></iframe>
                    </div>

                    <div className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact Information */}
                        <div className="space-y-6">
                          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <MapPin className="w-6 h-6 text-indigo-600 mt-1 mr-3" />
                              <div>
                                <h3 className="font-medium text-gray-900">Address</h3>
                                <p className="text-gray-600">
                                  Dr. Anil Yadav Dental Clinic<br />
                                  Brass Market<br />
                                  Rewari, Haryana
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <Phone className="w-6 h-6 text-indigo-600 mt-1 mr-3" />
                              <div>
                                <h3 className="font-medium text-gray-900">Phone</h3>
                                <p className="text-gray-600">+91 98XXX XXXXX</p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <Clock className="w-6 h-6 text-indigo-600 mt-1 mr-3" />
                              <div>
                                <h3 className="font-medium text-gray-900">Hours</h3>
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
                          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Clinic Highlights</h2>
                          <div className="space-y-4">
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100">
                              <h3 className="font-medium text-gray-900">Location</h3>
                              <p className="text-gray-600">Conveniently located in Brass Market area</p>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100">
                              <h3 className="font-medium text-gray-900">Parking</h3>
                              <p className="text-gray-600">Parking available nearby</p>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100">
                              <h3 className="font-medium text-gray-900">Facilities</h3>
                              <p className="text-gray-600">Modern dental equipment and comfortable waiting area</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Features */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Emergency Contact */}
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-xl p-6 text-white">
                    <h3 className="text-xl font-bold mb-4">Emergency Care</h3>
                    <p className="mb-4">Available 24/7 for urgent dental needs</p>
                    <a
                      href="tel:+919XXXXXXXX"
                      className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </a>
                  </div>

                  {/* Features */}
                  <div className="bg-white rounded-3xl shadow-xl p-6 space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Heart className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Expert Care</h3>
                        <p className="text-sm text-gray-600">Professional dental team</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Safe & Clean</h3>
                        <p className="text-sm text-gray-600">Modern sterilization</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <Clock3 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Flexible Hours</h3>
                        <p className="text-sm text-gray-600">Convenient scheduling</p>
                      </div>
                    </div>
                  </div>

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