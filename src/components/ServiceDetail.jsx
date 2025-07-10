import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { services } from "../Data/ServicesData";
import {
  ArrowLeft,
  CheckCircle,
  Star,
  Sparkles,
  Calendar,
  Phone,
  Clock,
  MapPin,
  Heart,
  Shield,
  Award,
  Users,
} from "lucide-react";
import { ADDRESS, PHONE } from "../constants/constant";

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    // Find the service by ID
    const foundService = services.find((s) => s.id === id);

    if (foundService) {
      setService(foundService);
      // Set page title
      document.title = `${foundService.title} | DentalCare`;
    }

    setLoading(false);

    // Handle scroll for header
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-indigo-900 mb-4">
          Service Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The service you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
        >
          Back to Services
        </Link>
      </div>
    );
  }

  // Get related services (excluding current service)
  const relatedServices = services
    .filter((s) => s.id !== service.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          {/* Main gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800"></div>

          {/* Abstract background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
              {/* Circular elements */}
              <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-violet-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
              <div className="absolute top-[40%] right-[20%] w-40 h-40 bg-purple-400/20 rounded-full blur-2xl animate-pulse-slow animation-delay-1000"></div>

              {/* Diagonal lines */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-[1px] bg-gradient-to-r from-transparent via-white to-transparent transform -rotate-45"
                    style={{
                      top: `${i * 10}%`,
                      left: "-20%",
                      width: "140%",
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 via-transparent to-indigo-900/80"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <Link
              to="/services"
              className="flex items-center font-medium text-white hover:text-white/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Services
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 md:order-1 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-300/30 bg-purple-400/10 backdrop-blur-sm mb-6">
                <Sparkles className="w-4 h-4 text-purple-200 animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-white">
                  Premier Dental Service
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white mb-6">
                {service.title}{" "}
                <span className="text-purple-200">Excellence</span>
              </h1>

              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  to="/book-appointment"
                  className="bg-white text-purple-700 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-purple-50 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-fade-in-up animation-delay-300"
                >
                  Book Appointment
                </Link>
                <a
                  href="#about-section"
                  className="border-2 border-white/70 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-white/10 transition duration-300 transform hover:-translate-y-1 animate-fade-in-up animation-delay-600"
                >
                  Learn More
                </a>
              </div>

              <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-900">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-200 text-purple-900 text-sm font-medium shadow-sm"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="order-1 md:order-2 relative z-10 flex justify-center animate-fade-in-up animation-delay-300">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-purple-300 rounded-full opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-violet-300 rounded-full opacity-70 animate-pulse animation-delay-2000"></div>

                {/* Main image with mask */}
                <div className="relative overflow-hidden rounded-full border-8 border-white/20 shadow-2xl">
                  <img
                    src={
                      service.image ||
                      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=600&h=600"
                    }
                    alt={service.title}
                    className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] object-cover"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-transparent"></div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-1/4 -right-8 bg-white p-4 rounded-xl shadow-xl transform rotate-3 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Star className="w-5 h-5 text-purple-600 fill-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-800">
                        Rated 4.9/5
                      </p>
                      <p className="text-xs text-gray-500">
                        by 2,000+ patients
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-1/4 -left-8 bg-white p-4 rounded-xl shadow-xl transform -rotate-3 animate-float animation-delay-2000">
                  <div className="flex items-center gap-2">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-800">
                        Certified Experts
                      </p>
                      <p className="text-xs text-gray-500">
                        Advanced Technology
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center">
              <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-scroll-down"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Navigation */}
      <section id="about" className="sticky top-0 z-40 bg-white shadow-md py-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar space-x-6 py-2">
            {["about", "features", "benefits"].map((tab) => (
              <a
                key={tab}
                href={`#${tab}-section`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tab);
                  document
                    .getElementById(`${tab}-section`)
                    .scrollIntoView({ behavior: "smooth" });
                }}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition-all ${
                  activeTab === tab
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="md:col-span-2">
              {/* About Section */}
              <div
                id="about-section"
                className="mb-16 scroll-mt-32 animate-fade-in-up"
              >
                <div className="flex items-center mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${service.color} shadow-lg mr-4`}
                  >
                    {service.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-indigo-900">
                    About {service.title}
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    {service.longDescription}
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Our team of experienced dental professionals uses the latest
                    technology and techniques to ensure that your{" "}
                    {service.title.toLowerCase()} experience is comfortable,
                    effective, and tailored to your specific needs. We take
                    pride in providing personalized care that addresses your
                    unique dental concerns.
                  </p>
                </div>

                <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                  <h3 className="text-xl font-semibold text-indigo-900 mb-4">
                    Why Choose Our {service.title} Service?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Experienced specialists with advanced training
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        State-of-the-art equipment and techniques
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Comfortable, patient-centered approach
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Comprehensive care with attention to detail
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Features Section */}
              <div
                id="features-section"
                className="mb-16 scroll-mt-32 animate-fade-in-up"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-6">
                  What We Offer
                </h2>

                <div className="grid sm:grid-cols-2 gap-6">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-indigo-100 group"
                    >
                      <div className="flex items-start">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${service.color} shadow-md mr-4 group-hover:scale-110 transition-transform`}
                        >
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                            Feature {idx + 1}
                          </h3>
                          <p className="text-gray-700">{feature}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                  <h3 className="text-xl font-semibold text-indigo-900 mb-4">
                    Our Approach
                  </h3>
                  <p className="text-gray-700 mb-4">
                    At DentalCare, we believe in a comprehensive approach to{" "}
                    {service.title.toLowerCase()}. Our process begins with a
                    thorough assessment of your dental health, followed by a
                    personalized treatment plan designed to address your
                    specific needs and goals.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                          <span className="font-bold text-indigo-600">1</span>
                        </div>
                        <h4 className="font-semibold text-indigo-900">
                          Assessment
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Comprehensive evaluation of your dental health
                      </p>
                    </div>
                    <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                          <span className="font-bold text-indigo-600">2</span>
                        </div>
                        <h4 className="font-semibold text-indigo-900">
                          Planning
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Customized treatment plan for your needs
                      </p>
                    </div>
                    <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                          <span className="font-bold text-indigo-600">3</span>
                        </div>
                        <h4 className="font-semibold text-indigo-900">
                          Treatment
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Expert care using advanced techniques
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits Section */}
              <div
                id="benefits-section"
                className="mb-16 scroll-mt-32 animate-fade-in-up"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-6">
                  Key Benefits
                </h2>

                <div className="grid sm:grid-cols-2 gap-6">
                  {service.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 group"
                    >
                      <div className="flex items-start">
                        <div
                          className={`w-10 h-10 rounded-full ${service.bgColor} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}
                        >
                          {idx === 0 && (
                            <Heart
                              className={`w-5 h-5 ${service.accentColor}`}
                            />
                          )}
                          {idx === 1 && (
                            <Shield
                              className={`w-5 h-5 ${service.accentColor}`}
                            />
                          )}
                          {idx === 2 && (
                            <Award
                              className={`w-5 h-5 ${service.accentColor}`}
                            />
                          )}
                          {idx === 3 && (
                            <Users
                              className={`w-5 h-5 ${service.accentColor}`}
                            />
                          )}
                          {idx > 3 && (
                            <span
                              className={`font-bold ${service.accentColor}`}
                            >
                              {idx + 1}
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                            Benefit {idx + 1}
                          </h3>
                          <p className="text-gray-700">{benefit}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl text-white">
                  <h3 className="text-xl font-semibold mb-4">
                    Long-term Benefits
                  </h3>
                  <p className="text-indigo-100 mb-6">
                    Investing in regular {service.title.toLowerCase()} services
                    provides lasting benefits for your oral health:
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Improved Health</h4>
                      <p className="text-sm text-white/80">
                        Better oral health contributes to better overall health
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Confidence Boost</h4>
                      <p className="text-sm text-white/80">
                        A healthy smile enhances your confidence in social
                        situations
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Cost Savings</h4>
                      <p className="text-sm text-white/80">
                        Preventive care helps avoid expensive treatments later
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:sticky md:top-32 self-start">
              {/* Service Image */}
              <div className="rounded-xl overflow-hidden shadow-lg mb-8 animate-fade-in-up">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Quick Info */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8 animate-fade-in-up animation-delay-300">
                <h3 className="text-lg font-semibold text-indigo-900 mb-4">
                  Service Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock className={`w-5 h-5 ${service.accentColor} mr-3`} />
                    <div>
                      <span className="text-sm text-gray-500">Duration</span>
                      <p className="text-gray-700">30-90 minutes</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Calendar
                      className={`w-5 h-5 ${service.accentColor} mr-3`}
                    />
                    <div>
                      <span className="text-sm text-gray-500">
                        Availability
                      </span>
                      <p className="text-gray-700">Monday - Saturday</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Star
                      className={`w-5 h-5 ${service.accentColor} mr-3 mt-0.5`}
                    />
                    <div>
                      <span className="text-sm text-gray-500">Rating</span>
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-gray-700">
                          5.0 (120+ reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100 animate-fade-in-up animation-delay-600">
                <h3 className="text-lg font-semibold text-indigo-900 mb-4">
                  Book Your Appointment
                </h3>

                <p className="text-gray-600 mb-6">
                  Schedule your {service.title.toLowerCase()} appointment today
                  and take the first step towards a healthier smile.
                </p>

                <Link
                  to="/book-appointment"
                  className={`block w-full py-3 text-center bg-gradient-to-r ${service.color} text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1`}
                >
                  Book Now
                </Link>

                <div className="mt-4 text-center">
                  <span className="text-sm text-gray-500">or call us at</span>
                  <p className="font-semibold text-indigo-900"></p>
                </div>
              </div>

              {/* Contact Card */}
              <div
                className={`rounded-xl p-6 text-white bg-gradient-to-br ${service.color} animate-fade-in-up animation-delay-900`}
              >
                <h3 className="text-lg font-semibold mb-4">Have Questions?</h3>

                <p className="mb-4 text-indigo-100">
                  Our team is ready to answer any questions about our{" "}
                  {service.title.toLowerCase()} services.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3" />
                    <span>{PHONE}</span>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="w-10 h-10 mr-3" />
                    <span>{ADDRESS}</span>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="block w-full py-3 text-center bg-white text-indigo-700 font-semibold rounded-lg hover:bg-indigo-50 transition-all transform hover:-translate-y-1"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-8 text-center">
            Related Services
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedServices.map((relatedService, index) => (
              <Link
                key={index}
                to={`/services/${relatedService.id}`}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden flex flex-col group animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Service Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={relatedService.image}
                    alt={relatedService.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex-grow">
                  <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                    {relatedService.title}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {relatedService.description}
                  </p>
                </div>

                <div className="px-5 pb-5">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${relatedService.bgColor} ${relatedService.accentColor}`}
                  >
                    Learn More
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all transform hover:-translate-y-1"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section with Fixed Background */}
      <section
        className="relative bg-cover bg-center text-white min-h-[400px] sm:min-h-[400px] flex items-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2000')`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/40"></div>
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 relative">
          <div className="max-w-2xl text-center md:text-left">
            <h4 className="text-2xl sm:text-3xl md:text-[40px] font-normal leading-tight md:leading-[1.3] text-white/90">
              <span className="font-semibold text-white block">
                Schedule Your Appointment?
              </span>
              <span className="font-semibold text-white block">
                Our expect team is ready to provide you with exceptional dental
                care.
              </span>
            </h4>
          </div>
          <div className="mt-4 sm:mt-6 md:mt-0">
            <div className="flex gap-10">
              <a
                href="/book-appointment"
                className="inline-block rounded-xl px-5 sm:px-7 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800 font-semibold text-base sm:text-lg shadow-lghover:shadow-xl transform transition-all duration-300 ease-in-out border border-white/10"
              >
                Book Appointment
              </a>
              <a
                href="/contact"
                className="inline-block rounded-xl px-5 sm:px-7 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800 font-semibold text-base sm:text-lg shadow-lghover:shadow-xl transform transition-all duration-300 ease-in-out border border-white/10"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
