import React, { useEffect } from "react";
import {
  Calendar,
  ChevronLeft,
  Star,
  Sparkles,
  Stethoscope,
  CheckCircle,
  ChevronRight,
  Heart,
  Users,
  Award,
  Bluetooth as Tooth,
} from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { services } from "../Data/ServicesData";
import FAQ from "../components/FAQ";
import { useNavigate } from "react-router-dom";

export function Home() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 50,
      easing: "ease-in-out",
    });
  }, []);

  const stats = [
    {
      value: 12,
      label: "Dental Services",
      suffix: "+",
      icon: <Award className="w-8 h-8 text-indigo-600" />,
    },
    {
      value: 15,
      label: "Years Experience",
      suffix: "+",
      icon: <Users className="w-8 h-8 text-indigo-600" />,
    },
    {
      value: 98,
      label: "Patient Satisfaction",
      suffix: "%",
      icon: <Star className="w-8 h-8 text-indigo-600" />,
    },
    {
      value: 8000,
      label: "Happy Patients",
      suffix: "+",
      icon: <Stethoscope className="w-8 h-8 text-indigo-600" />,
    },
  ];

  // For CountUp animations
  const [statsRef, statsInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const navigate = useNavigate();
  const testimonials = [
    {
      name: "Nakul Chandra",
      service: "Dental Implants",
      quote:
        "After my dental implants, I can smile, eat, and talk without any worries. A life-changing experience!",
      rating: 5,
      image:
        "https://images.pexels.com/photos/30026793/pexels-photo-30026793/free-photo-of-portrait-of-a-man-in-a-white-shirt.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Priya Patel",
      service: "Cosmetic Dentistry",
      quote:
        "32 Pearls completely transformed my smile. The team was professional and caring, and the results far exceeded my expectations!",
      rating: 5,
      image:
        "https://images.pexels.com/photos/31430969/pexels-photo-31430969/free-photo-of-black-and-white-portrait-of-smiling-woman.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Kuldeep Patil",
      service: "Root Canal",
      quote:
        "I had a great experience at 32 Pearls. The staff was friendly and professional, and Dr. Pritesh Jagtap made me feel completely at ease. The care was top-notch, and I’m very happy with the results. Highly recommend!",
      rating: 5,
      image: "/images/kuldeep.jpg",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Photo Section with Fixed Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Fixed Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1629909615184-74f495363b67')] bg-cover bg-center bg-fixed"></div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Small Badge */}
            <div
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-800 mb-8 transform hover:scale-105 transition-transform duration-300 self-center lg:self-start backdrop-blur-xl shadow-sm"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              <Sparkles className="w-4 h-4 mr-2 text-indigo-600" />
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                Welcome to 32 Pearls
              </span>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <button
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                onClick={() => {
                  navigate("/book-appointment");
                }}
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <div className="relative -mt-16 z-20 mx-4 lg:mx-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-4 md:gap-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl p-6 md:p-8">
            {stats.map((stat, index) => (
              <div
                ref={statsRef}
                key={index}
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
              >
                <div className="bg-indigo-50 p-1 md:p-2 w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl text-white font-bold mb-1 md:mb-2">
                  {statsInView && (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix}
                    />
                  )}
                </h3>
                <p className="text-xs md:text-sm lg:text-base text-white">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row items-stretch gap-12 lg:gap-16">
            <div
              className="w-full lg:w-1/2"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div className="relative h-full">
                {/* Decorative elements */}
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-violet-400/30 to-fuchsia-400/30 rounded-full mix-blend-multiply blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full mix-blend-multiply blur-3xl animate-pulse delay-150"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-indigo-600/5 to-purple-600/5 rounded-[3rem] rotate-6 scale-95"></div>

                {/* Main image container */}
                <div className="relative w-full h-full group flex justify-center items-center">
                  {/* Inner container with pattern */}
                  <div className="relative w-[90%] h-[90%] bg-white rounded-[2rem] p-2 shadow-2xl">
                    {/* Image wrapper */}
                    <div className="relative w-full h-full rounded-[1.7rem] overflow-hidden">
                      <div className="absolute w-full h-full inset-0 bg-gradient-to-tr from-indigo-600/10 to-purple-600/10 mix-blend-overlay"></div>
                      <img
                        src="/images/healtySmile.png"
                        alt="Modern dental clinic interior"
                        className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Floating stats card */}
                    <div
                      className="absolute -bottom-8 -right-6 rounded-lg bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 md:p-4 transform transition-all duration-500 group-hover:translate-x-3 group-hover:-translate-y-3"
                      data-aos="fade-up"
                      data-aos-delay="300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg">
                          <Star className="w-4 h-4 lg:w-6 lg:h-6 text-white drop-shadow-sm" />
                        </div>
                        <div>
                          <p className="text-lg font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                            4.9/5
                          </p>
                          <p className="text-sm text-gray-600">
                            Based on 500+ reviews
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="w-full lg:w-1/2 text-center lg:text-left flex flex-col justify-center"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              {/* Small Badge */}
              <div
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-800 mb-8 transform hover:scale-105 transition-transform duration-300 self-center lg:self-start backdrop-blur-xl shadow-sm"
                data-aos="fade-down"
                data-aos-delay="200"
              >
                <Sparkles className="w-4 h-4 mr-2 text-indigo-600" />
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                  Patient Care
                </span>
              </div>

              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Your Smile Deserves{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                  The Best Care
                </span>
              </h2>

              <p
                className="text-gray-700 mb-6 leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                At 32 Pearls Dental Clinic, we believe that a healthy smile is
                essential to your overall well-being. Our state-of-the-art
                facility is designed to provide you with the highest quality
                dental care in a comfortable and relaxing environment.
              </p>

              <p
                className="text-gray-700 mb-10 leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                Our team of experienced dentists and friendly staff are
                dedicated to making your dental experience as pleasant as
                possible. We use the latest technology and techniques to ensure
                that you receive the best care possible.
              </p>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                {[
                  { text: "Modern Equipment", icon: CheckCircle },
                  { text: "Gentle Approach", icon: CheckCircle },
                  { text: "Family Friendly", icon: CheckCircle },
                  { text: "Affordable Plans", icon: CheckCircle },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    data-aos="fade-up"
                    data-aos-delay={700 + index * 100}
                  >
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl shadow-sm transform transition-transform duration-300 group-hover:scale-110">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-800 font-medium">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services carousel */}
      <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50 to-indigo-50 opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div
              className="inline-flex items-center justify-center mb-6"
              data-aos="fade-down"
            >
              <div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
              <span className="mx-4 text-sm md:text-base text-indigo-600 font-semibold uppercase tracking-wider">
                OUR SERVICES
              </span>
              <div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
            </div>

            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 mb-6 leading-tight"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Comprehensive{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                Dental Services
              </span>
            </h2>
            <p
              className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              We offer a comprehensive range of dental services to meet all your
              oral health needs, from routine check-ups to advanced treatments
              and cosmetic procedures.
            </p>
          </div>

          {/* Services Carousel */}
          <div className="relative" data-aos="fade-up" data-aos-delay="400">
            {/* Custom Navigation Buttons */}
            <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center -translate-x-6">
              <ChevronLeft className="w-6 h-6 text-violet-700" />
            </button>
            <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center translate-x-6">
              <ChevronRight className="w-6 h-6 text-violet-700" />
            </button>

            <div className="px-4">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={1.2}
                centeredSlides={true}
                loop={true}
                navigation={{
                  prevEl: ".custom-prev",
                  nextEl: ".custom-next",
                }}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                  waitForTransition: true,
                }}
                speed={800}
                breakpoints={{
                  480: { slidesPerView: 2.2, centeredSlides: false },
                  768: { slidesPerView: 3, centeredSlides: false },
                  1024: { slidesPerView: 4, centeredSlides: false },
                }}
                className="!pb-14"
              >
                {services.map((service, index) => (
                  <SwiperSlide key={service.id}>
                    <div
                      className="service-card bg-white shadow-lg overflow-hidden group h-full"
                      data-aos="fade-up"
                      data-aos-delay={100 * index}
                    >
                      <div className="h-2 rounded-t-md bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-700"></div>
                      <div className="p-5 md:p-6 lg:p-8">
                        <div className="mb-5 md:mb-6 flex justify-center">
                          <div className="service-icon w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center">
                            <img
                              src={service.image}
                              alt="Root Canal Icon"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                        <h3 className="service-title text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-900 text-center">
                          {service.title}
                        </h3>
                        <p className="service-description text-sm md:text-base text-gray-600 mb-5 md:mb-6 leading-relaxed text-center">
                          {service.description}
                        </p>

                        <div className="flex justify-center">
                          <Link
                            to={`/services/${service.id}`}
                            className="inline-flex items-center text-violet-600 font-medium"
                          >
                            Learn more <ChevronRight className="ml-1 w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div
            className="text-center mt-8 md:mt-12 lg:mt-16"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <a
              href="/services"
              className="inline-flex items-center justify-center px-5 py-2 md:px-6 md:py-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              View All Services <ChevronRight className="ml-1 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-16 relative overflow-hidden flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50 to-indigo-50"></div>
        <div className="absolute inset-0 bg-wave-pattern opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full opacity-50"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-200 rounded-full opacity-50"></div>
        </div>

        <div className="container py-0 my-0 mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 md:mb-16">
            <div
              className="inline-flex items-center justify-center mb-6"
              data-aos="fade-down"
            >
              <div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
              <span className="mx-4 text-sm md:text-base text-indigo-600 font-semibold uppercase tracking-wider">
                Process
              </span>
              <div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
            </div>

            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-indigo-900 mb-6 leading-tight"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Dental{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                Treatment Process
              </span>
            </h2>
            <p
              className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Our streamlined approach ensures you receive the best care from
              start to finish, with a focus on your comfort and results.
            </p>
          </div>

          {/* Process Steps with Continuous Lines */}
          <div className="relative py-10 mt-16">
            <div className="flex flex-wrap justify-between items-start relative">
              {/* Initial curved line */}
              <div className="absolute top-[35%] -left-[3%] w-[15%] h-16 z-0 hidden lg:block">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 200 80"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,40 Q100,0 200,40"
                    stroke="url(#gradient0)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="8,8"
                  />
                  <defs>
                    <linearGradient
                      id="gradient0"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Step 1 */}
              <div
                className="w-full lg:w-[28%] mb-16 lg:mb-0 z-10"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-purple-100 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
                      <Calendar className="w-7 h-7 text-purple-600" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-purple-600">
                        STEP 01
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">
                        Book Appointment
                      </h3>
                    </div>
                  </div>

                  <div className="relative overflow-hidden mb-6">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1682126154930-cd952a02581d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Dental Appointment"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <p className="text-gray-600 text-center">
                    Schedule your visit through our intuitive booking system.
                    Our team will confirm your appointment within 24 hours.
                  </p>
                </div>
              </div>

              {/* Curved line 1 */}
              <div className="absolute top-[35%] left-[28%] w-[16%] h-16 z-0 hidden lg:block">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 200 80"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,40 Q100,0 200,40"
                    stroke="url(#gradient1)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="8,8"
                  />
                  <defs>
                    <linearGradient
                      id="gradient1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Step 2 */}
              <div
                className="w-full lg:w-[28%] lg:mt-[-60px] mb-16 lg:mb-0 z-10"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-indigo-100 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
                      <Stethoscope className="w-7 h-7 text-indigo-600" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-indigo-600">
                        STEP 02
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">
                        Dental Check-up
                      </h3>
                    </div>
                  </div>

                  <div className="relative overflow-hidden mb-6">
                    <img
                      src="https://images.pexels.com/photos/6627528/pexels-photo-6627528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Dental Check-up"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <p className="text-gray-600 text-center">
                    Undergo a comprehensive examination with our experienced
                    dental professionals using advanced diagnostic tools.
                  </p>
                </div>
              </div>

              {/* Curved line 2 */}
              <div className="absolute top-[35%] left-[56%] w-[16%] h-16 z-0 hidden lg:block">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 200 80"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,40 Q100,80 200,40"
                    stroke="url(#gradient2)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="8,8"
                  />
                  <defs>
                    <linearGradient
                      id="gradient2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Step 3 */}
              <div
                className="w-full lg:w-[28%] mb-16 lg:mb-0 z-10"
                data-aos="fade-left"
                data-aos-delay="600"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
                      <Heart className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-blue-600">
                        STEP 03
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">
                        Healthy Smile
                      </h3>
                    </div>
                  </div>

                  <div className="relative overflow-hidden mb-6">
                    <img
                      src="/images/healtySmile.png"
                      alt="Healthy Smile"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <p className="text-gray-600 text-center">
                    Follow your personalized treatment plan and embrace a
                    healthier lifestyle with our ongoing support and guidance.
                  </p>
                </div>
              </div>

              {/* Final curved line */}
              <div className="absolute top-[35%] -right-[3%] w-[16%] h-16 z-0 hidden lg:block">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 200 80"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,40 Q100,80 200,40"
                    stroke="url(#gradient2)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="8,8"
                  />
                  <defs>
                    <linearGradient
                      id="gradient2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50 to-indigo-50 opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div
            className="text-center mb-12 md:mb-16 lg:mb-20"
            data-aos="fade-up"
          >
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
              <span className="mx-4 text-sm md:text-base text-indigo-600 font-semibold uppercase tracking-wider">
                Testimonials
              </span>
              <div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
            </div>

            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-indigo-900 mb-6 leading-tight"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              What Our{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                Patients Say
              </span>
            </h2>
            <p
              className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Discover why our patients love our dental services and keep coming
              back. Here are some stories from people who have transformed their
              smiles with us.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white p-8 shadow-lg hover:shadow-xl transition-all relative"
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
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-b-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      {/* CTA Section with Fixed Background */}
      <section
        className="relative bg-cover bg-center text-white min-h-[400px] sm:min-h-[400px] flex items-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2000')`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/40"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 relative z-10">
          <div
            className="max-w-2xl text-center md:text-left"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <h4 className="text-2xl sm:text-3xl md:text-[40px] font-normal leading-tight md:leading-[1.3] text-white/90">
              <span className="font-semibold text-white block">
                Schedule Your Appointment
              </span>
              <span className="font-semibold text-white block">
                Our expert team is ready to provide you with exceptional dental
                care.
              </span>
            </h4>
          </div>
          <div
            className="mt-4 sm:mt-6 md:mt-0"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <div className="flex gap-10">
              <a
                href="/book-appointment"
                className="inline-block rounded-xl px-5 sm:px-7 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white hover:from-indigo-700 hover:via-violet-700 hover:to-purple-700 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out border border-white/10"
              >
                Book Appointment
              </a>
              <a
                href="/contact"
                className="inline-block rounded-xl px-5 sm:px-7 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white hover:from-indigo-700 hover:via-violet-700 hover:to-purple-700 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out border border-white/10"
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

{
  /* Scroll Indicator */
}
//  <div
//  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
//  data-aos="fade-up"
//  data-aos-delay="600"
// >
//  <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
//    <div className="w-2 h-2 bg-white rounded-full animate-scroll"></div>
//  </div>
// </div>
