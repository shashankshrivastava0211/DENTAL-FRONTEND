import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Smile,
  ArrowRight,
  CheckCircle,
  Users,
  Star,
  Calendar,
  ArrowDown,
  Brush as Toothbrush,
} from "lucide-react";

import { Award, Phone } from "lucide-react";
import { specialties, services } from "../Data/ServicesData";
import Hero from "../components/Hero";

const ServicesPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const servicesDetailsRef = useRef(null);

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Activate animations when scrolled past 100px
      if (window.scrollY > 100 && !activeAnimation) {
        setActiveAnimation(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initialize animations
    const animatedElements = document.querySelectorAll("[data-aos]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const animation = el.getAttribute("data-aos");
            const delay = parseInt(el.getAttribute("data-aos-delay") || 0);

            setTimeout(() => {
              el.classList.add(animation);
              el.classList.add("aos-animate");
            }, delay);

            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    animatedElements.forEach((el) => {
      observer.observe(el);
    });

    // Trigger hero animations on load
    setTimeout(() => {
      if (heroRef.current) {
        const heroElements = heroRef.current.querySelectorAll("[data-aos]");
        heroElements.forEach((el) => {
          const animation = el.getAttribute("data-aos");
          const delay = parseInt(el.getAttribute("data-aos-delay") || 0);

          setTimeout(() => {
            el.classList.add(animation);
            el.classList.add("aos-animate");
          }, delay);
        });
      }
    }, 300);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animatedElements.length > 0) {
        animatedElements.forEach((el) => {
          observer.unobserve(el);
        });
      }
    };
  }, [activeAnimation]);

  const heroProps = {
    badgeIcon: Award,
    badgeText: "Premium Dental Services",
    heading: "Advanced Care",
    headingHighlight: "For All",
    headingEnd: "Your Needs",
    description:
      "Experience exceptional dental care with our comprehensive range of services designed to maintain, restore, and enhance your smile with the latest technology and techniques.",
    primaryButtonText: "View Services",
    primaryButtonAction: (e) => {
      e.preventDefault();
      const element = servicesDetailsRef.current;
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    secondaryButtonText: "Book Appointment",
    secondaryButtonIcon: Phone,
    secondaryButtonAction: () => {},
    imageSrc:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    imageAlt: "Dental services",
    floatingBadgeIcon: Award,
    floatingBadgeTitle: "Certified Experts",
    floatingBadgeText: "Board-certified specialists",
    scrollToRef: servicesDetailsRef,
    scrollText: "Discover Our Services",
  };

  return (
    <div className="min-h-screen  overflow-hidden">
      <Hero {...heroProps} />

      {/* Specialties Section */}
      <section className="py-20 bg-gray-50 min-h-[90vh] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center mb-4">
                <div className="h-[1px] w-10 bg-violet-500"></div>
                <span className="ml-4 text-sm text-violet-600 font-semibold">
                  SPECIALTIES
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-violet-900 mb-6">
                Specialized Dental{" "}
                <span className="text-violet-600">Expertise</span>
              </h2>

              <p className="text-gray-600 mb-8">
                Our team of specialists provides expert care in various dental
                fields, ensuring that you receive the most appropriate and
                effective treatment for your specific needs.
              </p>

              {/* Specialties Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {specialties.map((specialty, index) => (
                  <div
                    key={index}
                    data-aos="fade-right"
                    data-aos-delay={index * 100}
                    className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="bg-violet-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                      {specialty.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-violet-900 mb-2">
                      {specialty.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {specialty.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div data-aos="fade-left" className="relative hidden md:block">
              <div className="absolute inset-0 -m-6 bg-violet-600/10 rounded-3xl blur-md"></div>
              <img
                src="https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Dental specialists"
                className="relative z-10 rounded-3xl shadow-xl object-cover h-[600px] w-full"
              />

              {/* Floating Elements */}
              <div className="absolute top-10 -right-10 bg-white p-5 rounded-xl shadow-xl z-20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-violet-100 p-2 rounded-lg">
                    <Users className="w-6 h-6 text-violet-600" />
                  </div>
                  <div className="text-lg font-semibold text-violet-900">
                    25+ Specialists
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Board-certified dental experts in multiple specialties
                </p>
              </div>

              <div className="absolute -bottom-10 left-10 bg-white p-5 rounded-xl shadow-xl z-20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-violet-100 p-2 rounded-lg">
                    <Shield className="w-6 h-6 text-violet-600" />
                  </div>
                  <div className="text-lg font-semibold text-violet-900">
                    Advanced Care
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Using the latest dental technology and techniques
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section
        ref={servicesDetailsRef}
        id="services-grid"
        className="py-20 bg-white min-h-[90vh] flex items-center"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="h-[1px] w-10 bg-violet-500"></div>
              <span className="mx-4 text-sm text-violet-600 font-semibold">
                OUR SERVICES
              </span>
              <div className="h-[1px] w-10 bg-violet-500"></div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-violet-900 mb-4">
              Exceptional Dental{" "}
              <span className="text-violet-600">Services</span>
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a comprehensive range of dental services to meet all your
              oral health needs, from routine check-ups to advanced treatments
              and cosmetic procedures.
            </p>
          </div>

          {/* Services Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4">
                    <div
                      className={`bg-gradient-to-br ${service.color} p-3 rounded-xl flex items-center justify-center`}
                    >
                      {service.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-violet-900 mb-3 group-hover:text-violet-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-5 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 2).map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-violet-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <Link
                    to={`/services/${service.id}`}
                    className="w-full py-3 bg-violet-50 text-violet-600 font-medium rounded-lg flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-all"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative bg-cover bg-center text-white min-h-[400px] sm:min-h-[400px] flex items-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2000')`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/50"></div>
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

      {/* CSS for animations */}
      <style jsx="true">{`
        /* Base AOS animations */
        [data-aos] {
          opacity: 0;
          transition-property: opacity, transform;
          transition-duration: 0.8s;
        }

        [data-aos].aos-animate {
          opacity: 1;
        }

        [data-aos="fade-up"] {
          transform: translateY(50px);
        }

        [data-aos="fade-up"].aos-animate {
          transform: translateY(0);
        }

        [data-aos="fade-down"] {
          transform: translateY(-50px);
        }

        [data-aos="fade-down"].aos-animate {
          transform: translateY(0);
        }

        [data-aos="fade-right"] {
          transform: translateX(-50px);
        }

        [data-aos="fade-right"].aos-animate {
          transform: translateX(0);
        }

        [data-aos="fade-left"] {
          transform: translateX(50px);
        }

        [data-aos="fade-left"].aos-animate {
          transform: translateX(0);
        }

        /* Enhanced animations */
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        .animate-slow-pulse {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Particle animations */
        .particles-container {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: float 10s ease-in-out infinite;
        }

        /* Line clamp for text truncation */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Path animation for sine wave */
        .path-animation {
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          animation: dash 3s linear forwards;
        }

        .dot-animation {
          animation: moveDot 3s linear forwards;
        }

        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes moveDot {
          0% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(300px) translateY(30px);
          }
          50% {
            transform: translateX(600px) translateY(0);
          }
          75% {
            transform: translateX(900px) translateY(30px);
          }
          100% {
            transform: translateX(1200px) translateY(0);
          }
        }

        /* Keyframes */
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(15px);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;
