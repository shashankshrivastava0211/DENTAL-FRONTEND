import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Star,
  Sparkles,
  Shield,
  Users,
  HeartPulse,
  Smile,
  ArrowRight,
  Stethoscope,
  Linkedin,
  Instagram,
  Twitter,
  CheckCircle,
  ChevronRight,
  Bluetooth as Tooth,
} from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import AOS from "aos";
import "aos/dist/aos.css";

export function Home() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  // For CountUp animations
  const [statsRef, statsInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const testimonials = [
    {
      name: "Sarah Johnson",
      service: "Cosmetic Dentistry",
      quote:
        "The cosmetic dental work I received has completely transformed my smile. The team was professional, caring, and the results exceeded my expectations!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Michael Rodriguez",
      service: "Dental Implants",
      quote:
        "After years of struggling with dentures, my dental implants have given me back the confidence to smile, eat, and speak without worry. Life-changing experience!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Emily Chen",
      service: "Orthodontics",
      quote:
        "The orthodontic treatment was smooth from start to finish. The staff was always friendly and accommodating, and my teeth look amazing now!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/32-pearls-dental",
      hoverColor: "hover:text-purple-600",
    },
    {
      icon: Instagram,
      name: "Instagram",
      href: "https://www.instagram.com/32pearlsdental",
      hoverColor: "hover:text-purple-500",
    },
    {
      icon: Twitter,
      name: "Twitter",
      href: "https://twitter.com/32pearlsdental",
      hoverColor: "hover:text-purple-500",
    },
  ];

  const services = [
    {
      icon: <Tooth className="w-10 h-10 text-purple-600" />,
      title: "General Dentistry",
      description:
        "Comprehensive dental care including check-ups, cleanings, fillings, and preventive treatments.",
    },
    {
      icon: <Smile className="w-10 h-10 text-purple-600" />,
      title: "Cosmetic Dentistry",
      description:
        "Enhance your smile with teeth whitening, veneers, bonding, and other aesthetic procedures.",
    },
    {
      icon: <HeartPulse className="w-10 h-10 text-purple-600" />,
      title: "Orthodontics",
      description:
        "Straighten your teeth with braces, clear aligners, and other orthodontic treatments.",
    },
    {
      icon: <Stethoscope className="w-10 h-10 text-purple-600" />,
      title: "Pediatric Dentistry",
      description:
        "Specialized dental care for children in a comfortable and friendly environment.",
    },
  ];

  const stats = [
    { value: 15, label: "Years Experience", suffix: "+" },
    { value: 10000, label: "Happy Patients", suffix: "+" },
    { value: 25, label: "Expert Doctors", suffix: "+" },
    { value: 15, label: "Services", suffix: "+" },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Photo Section with Fixed Background */}
      <section className="min-h-screen text-white relative overflow-hidden flex items-center justify-center">
        {/* Fixed Background Image */}
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=2000')] bg-cover bg-center bg-fixed opacity-90"
          style={{ backgroundAttachment: "fixed" }}
        ></div>

        {/* Centered Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4 sm:px-6 mt-96">
          <h1 className="text-9xl  text-white  md:text-5xl font-bold mb-6 leading-tight">
            Your Perfect Smile Begins Here
          </h1>

          <p className="text-xl text-purple-600 mb-8">
            Our state-of-the-art facilities and compassionate team ensure a
            comfortable experience for patients of all ages.
          </p>

          <button className="bg-white text-purple-800 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Schedule a Visit
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <div
        className="bg-gradient-to-r from-indigo-900 to-purple-800 py-8 md:py-12 "
        ref={statsRef}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div className="text-center" key={index}>
                <div className="text-3xl text-purple-50 md:text-5xl font-bold">
                  {statsInView ? (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      suffix={stat.suffix}
                    />
                  ) : (
                    <span>
                      {stat.value}
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div className="text-xs md:text-sm mt-2 text-purple-50 font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section with Background Pattern */}
      <section className="py-16 md:py-24 px-4 relative">
        <div className="absolute inset-0 bg-wave-pattern opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="lg:w-1/2" data-aos="fade-right">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-100 rounded-full opacity-70"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-violet-100 rounded-full opacity-70"></div>
                <img
                  src="https://images.unsplash.com/photo-1629909615184-74f495363b67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Modern dental clinic interior"
                  className="relative z-10 rounded-xl shadow-xl object-cover w-full h-[400px] sm:h-[500px]"
                />
              </div>
            </div>
            <div className="lg:w-1/2" data-aos="fade-left">
              <div className="inline-flex items-center mb-4">
                <div className="h-[1px] w-8 sm:w-10 bg-purple-500"></div>
                <span className="mx-3 sm:mx-4 text-sm sm:text-base text-purple-600 font-semibold uppercase tracking-wider">
                  About Us
                </span>
              </div>

              <h2 className="text-3xl font-display font-bold mb-6 text-purple-900 leading-tight">
                Dedicated to Your Dental Health Since 2005
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                At 32 Pearls Dental Clinic, we believe that a healthy smile is
                essential to your overall well-being. Our state-of-the-art
                facility is designed to provide you with the highest quality
                dental care in a comfortable and relaxing environment.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Our team of experienced dentists and friendly staff are
                dedicated to making your dental experience as pleasant as
                possible. We use the latest technology and techniques to ensure
                that you receive the best care possible.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      State-of-the-art dental equipment and technology
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      Comfortable and relaxing environment for all ages
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      Experienced team of dental professionals
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  Learn More About Us <ChevronRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section  */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-violet-50 relative">
        <div className="absolute inset-0 bg-dotted-pattern opacity-50"></div>
        {/* Background pattern */}
        <div className="absolute inset-0 bg-dotted-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-wave-pattern opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Main Treatment Process Section */}
          <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="h-[1px] w-10 bg-violet-500"></div>
              <span className="mx-4 text-sm text-violet-600 font-semibold">
                Our Process
              </span>
              <div className="h-[1px] w-10 bg-violet-500"></div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-violet-900 mb-4">
              Medical <span className="text-purple-600">Treatment Process</span>
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Our streamlined approach ensures you receive the best care from
              start to finish, with a focus on your comfort and results.
            </p>
          </div>

          {/* Process Steps with Continuous Line - Redesigned */}
          <div className="relative py-10 mt-24">
            <div className="flex flex-wrap justify-between items-start relative">
              {/* Step 1 */}
              <div className="relative w-full md:w-[30%] flex flex-col items-center group mb-20 md:mb-0">
                {/* Card */}
                <div className="flex flex-col md:flex-row items-start gap-6 bg-white rounded-3xl overflow-hidden shadow-xl w-full relative z-10 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-purple-200 p-6">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-violet-600"></div>

                  {/* Left side - Label */}
                  <div className="md:w-1/3">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 md:mb-0">
                      <span className="text-3xl font-bold text-purple-700">
                        01
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-purple-900 mt-3">
                      Get Appointment
                    </h3>
                  </div>

                  {/* Right side - Image and description */}
                  <div className="md:w-2/3">
                    <div className="relative w-full h-48 overflow-hidden rounded-xl mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Get Appointment"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-0 right-0 bg-purple-700 text-white text-xs font-bold px-3 py-1.5 rounded-bl-lg">
                        STEP 1
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 m-0">
                      Schedule your visit with our easy online booking system.
                      Our staff will confirm your appointment and help with any
                      questions.
                    </p>
                  </div>

                  {/* Purple accent line */}
                  <div className="absolute left-0 bottom-5 w-2.5 h-14 bg-gradient-to-b from-purple-600 to-violet-600 rounded-r-md"></div>
                </div>
              </div>

              {/* Curved dotted line 1 with arrow - going UP */}
              <div className="absolute top-[40%] left-[30%] w-[15%] h-20 z-0 hidden md:block">
                {/* SVG for curved dotted line */}
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 200 80"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,50 Q100,-10 200,40"
                    stroke="url(#gradient1)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="10,10"
                    className="animate-pulse"
                  />
                  {/* Arrow at the end */}
                  <path
                    d="M185,35 L200,40 L190,50"
                    stroke="#8b5cf6"
                    strokeWidth="4"
                    fill="#8b5cf6"
                  />
                  {/* Define gradient */}
                  <defs>
                    <linearGradient
                      id="gradient1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#9333ea" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Step 2 */}
              <div className="relative w-full md:w-[30%] flex flex-col items-center md:mt-[-40px] group z-5 mb-20 md:mb-0">
                {/* Card */}
                <div className="flex flex-col md:flex-row items-start gap-6 bg-white rounded-3xl overflow-hidden shadow-xl w-full relative z-10 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-purple-200 p-6">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-violet-600"></div>

                  {/* Left side - Label */}
                  <div className="md:w-1/3">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 md:mb-0">
                      <span className="text-3xl font-bold text-purple-700">
                        02
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-purple-900 mt-3">
                      Start Check-Up
                    </h3>
                  </div>

                  {/* Right side - Image and description */}
                  <div className="md:w-2/3">
                    <div className="relative w-full h-48 overflow-hidden rounded-xl mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Start Check-Up"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-0 right-0 bg-purple-700 text-white text-xs font-bold px-3 py-1.5 rounded-bl-lg">
                        STEP 2
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 m-0">
                      Our medical professionals will conduct a thorough
                      examination using state-of-the-art equipment to assess
                      your condition.
                    </p>
                  </div>

                  {/* Purple accent line */}
                  <div className="absolute left-0 bottom-5 w-2.5 h-14 bg-gradient-to-b from-purple-600 to-violet-600 rounded-r-md"></div>
                </div>
              </div>

              {/* Curved dotted line 2 with arrow - going DOWN */}
              <div className="absolute top-[30%] left-[65%] w-[15%] h-20 z-0 hidden md:block">
                {/* SVG for curved dotted line */}
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 200 80"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,30 Q100,90 200,40"
                    stroke="url(#gradient2)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="10,10"
                    className="animate-pulse"
                  />
                  {/* Arrow at the end */}
                  <path
                    d="M185,35 L200,40 L190,50"
                    stroke="#8b5cf6"
                    strokeWidth="4"
                    fill="#8b5cf6"
                  />
                  {/* Define gradient */}
                  <defs>
                    <linearGradient
                      id="gradient2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#9333ea" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Step 3 */}
              <div className="relative w-full md:w-[30%] flex flex-col items-center md:mt-[40px] group z-5">
                {/* Card */}
                <div className="flex flex-col md:flex-row items-start gap-6 bg-white rounded-3xl overflow-hidden shadow-xl w-full relative z-10 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-purple-200 p-6">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-violet-600"></div>

                  {/* Left side - Label */}
                  <div className="md:w-1/3">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 md:mb-0">
                      <span className="text-3xl font-bold text-purple-700">
                        03
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-purple-900 mt-3">
                      Enjoy Healthy Life
                    </h3>
                  </div>

                  {/* Right side - Image and description */}
                  <div className="md:w-2/3">
                    <div className="relative w-full h-48 overflow-hidden rounded-xl mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Enjoy Healthy Life"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-0 right-0 bg-purple-700 text-white text-xs font-bold px-3 py-1.5 rounded-bl-lg">
                        STEP 3
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 m-0">
                      Follow your personalized treatment plan and enjoy improved
                      health and wellbeing with ongoing support from our team.
                    </p>
                  </div>

                  {/* Purple accent line */}
                  <div className="absolute left-0 bottom-5 w-2.5 h-14 bg-gradient-to-b from-purple-600 to-violet-600 rounded-r-md"></div>
                </div>
              </div>

              {/* Mobile view instructions - hidden on desktop */}
              <div className="md:hidden absolute -bottom-10 w-full text-center text-sm text-gray-600 font-medium">
                Scroll to see all steps
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section  */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-violet-50 relative">
        <div className="absolute inset-0 bg-dotted-pattern opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="h-[1px] w-10 bg-violet-500"></div>
              <span className="mx-4 text-sm text-violet-600 font-semibold">
                OUR SERVICES
              </span>
              <div className="h-[1px] w-10 bg-violet-500"></div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-violet-900 mb-4">
              Comprehensive Dental{" "}
              <span className="text-violet-600"> Services</span>
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a comprehensive range of dental services to meet all your
              oral health needs, from routine check-ups to advanced treatments
              and cosmetic procedures.
            </p>
          </div>

          {/* Services Cards - New Design */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="h-3 bg-gradient-to-r from-purple-500 to-violet-600"></div>
                <div className="p-6 sm:p-8">
                  <div className="mb-6 flex justify-center">
                    <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-purple-900 group-hover:text-purple-600 transition-colors duration-300 text-center">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-center">
                    {service.description}
                  </p>
                  <div className="flex justify-center">
                    <a
                      href="#"
                      className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors"
                    >
                      Learn more{" "}
                      <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 md:mt-16" data-aos="fade-up">
            <a
              href="#"
              className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              View All Services <ChevronRight className="ml-1 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials  */}
      <section className="py-20 relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50"></div>
        <div className="absolute inset-0 bg-wave-pattern opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full opacity-50"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-200 rounded-full opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="h-[1px] w-10 bg-purple-500"></div>
              <span className="mx-4 text-sm text-purple-600 font-semibold uppercase tracking-wider">
                Testimonials
              </span>
              <div className="h-[1px] w-10 bg-purple-500"></div>
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-purple-900 mb-6">
              What Our <span className="text-purple-600">Patients Say</span>
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Discover why our patients love our dental services and keep coming
              back. Here are some stories from people who have transformed their
              smiles with us.
            </p>
          </div>

          {/* Testimonials Grid - New Design */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all relative"
              >
                {/* Quote mark */}
                <div className="absolute -top-5 -left-2 text-8xl text-purple-200 font-serif leading-none">
                  "
                </div>

                {/* Rating */}
                <div className="flex mb-4 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-600 mb-8 italic leading-relaxed relative z-10">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-200 mr-4 shadow-md">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-900 text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-purple-600">
                      {testimonial.service}
                    </p>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-violet-600 rounded-b-2xl"></div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center mt-12">
            <a
              href="#"
              className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors"
            >
              Read more patient stories{" "}
              <ChevronRight className="ml-1 w-4 h-4" />
            </a>
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
}
