import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowDown,
  Building,
  Sparkles,
  Bluetooth as Tooth,
  Smile,
  HeartPulse,
  Stethoscope,
  CheckCircle,
  ChevronRight,
  MessageCircle,
  Calendar,
  Star,
  Heart,
} from "lucide-react";
import Hero from "../components/Hero";


const Contact = () => {
  const [faqOpen, setFaqOpen] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState(false);
  const heroRef = useRef(null);

  const servicesRef = useRef(null);
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

  const toggleFaq = (id) => {
    setFaqOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCallClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleLocation = () => {
    window.open(
      "https://maps.google.com/?q=123+Dental+Ave+New+York+NY",
      "_blank"
    );
  };

  const scrollToContact = () => {
    // change to whatsapp link 
    const contactSection = document.getElementById("contact-section");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const faqs = [
    {
      id: 1,
      question: "What dental services do you offer?",
      answer:
        "We offer a comprehensive range of dental services including general dentistry, cosmetic procedures, orthodontics, pediatric dentistry, and dental implants. Each service is tailored to meet your specific oral health needs and aesthetic goals.",
      icon: <Tooth className="w-6 h-6 text-violet-600" />,
    },
    {
      id: 2,
      question: "How can I schedule a dental appointment?",
      answer:
        "You can schedule an appointment by calling our office directly, using our online booking system, or sending us an email. Our team will respond promptly to set up a time that works best for you and your family.",
      icon: <Calendar className="w-6 h-6 text-violet-600" />,
    },
    {
      id: 3,
      question: "Do you accept dental insurance?",
      answer:
        "Yes, we accept most major dental insurance plans. Our administrative team will help verify your coverage and explain your benefits before treatment. We also offer flexible payment options for those without insurance.",
      icon: <CheckCircle className="w-6 h-6 text-violet-600" />,
    },
    {
      id: 4,
      question: "What should I expect during my first visit?",
      answer:
        "Your first visit will include a comprehensive oral examination, professional cleaning, and x-rays if necessary. We'll discuss your dental history, current concerns, and develop a personalized treatment plan to address your specific needs.",
      icon: <Stethoscope className="w-6 h-6 text-violet-600" />,
    },
    {
      id: 5,
      question: "How often should I visit the dentist?",
      answer:
        "We recommend visiting our dental clinic every six months for routine check-ups and professional cleanings. However, some patients may require more frequent visits based on their oral health condition and specific treatment needs.",
      icon: <Clock className="w-6 h-6 text-violet-600" />,
    },
  ];

  const services = [
    {
      id: 1,
      name: "General Dentistry",
      icon: <Tooth className="w-10 h-10 text-violet-600" />,
      description:
        "Comprehensive dental care including check-ups, cleanings, fillings, and preventive treatments.",
      image:
        "https://images.unsplash.com/photo-1606265752439-1f18756aa8ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      name: "Cosmetic Dentistry",
      icon: <Smile className="w-10 h-10 text-violet-600" />,
      description:
        "Enhance your smile with teeth whitening, veneers, bonding, and other aesthetic procedures.",
      image:
        "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      name: "Orthodontics",
      icon: <HeartPulse className="w-10 h-10 text-violet-600" />,
      description:
        "Straighten your teeth with braces, clear aligners, and other orthodontic treatments.",
      image:
        "https://images.unsplash.com/photo-1601055903647-ddf1ee9701b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      name: "Pediatric Dentistry",
      icon: <Stethoscope className="w-10 h-10 text-violet-600" />,
      description:
        "Specialized dental care for children in a comfortable and friendly environment.",
      image:
        "https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
  ];

  const contactMethods = [
    {
      id: 1,
      title: "Call Us Directly",
      subtitle: "We're just a call away",
      value: "+1 (555) 123-4567",
      icon: <Phone className="text-white w-6 h-6 sm:w-8 sm:h-8" />,
      gradient: "from-violet-600 to-purple-700",
      hoverColor: "group-hover:text-violet-600",
      action: () => handleCallClick("+1 (555) 123-4567"),
    },
    {
      id: 2,
      title: "Email Us",
      subtitle: "24/7 Support Available",
      value: "info@32pearlsdental.com",
      icon: <Mail className="text-white w-6 h-6 sm:w-8 sm:h-8" />,
      gradient: "from-violet-500 to-purple-600",
      hoverColor: "group-hover:text-violet-500",
      action: () => handleEmailClick("info@32pearlsdental.com"),
    },
    {
      id: 3,
      title: "Visit Our Office",
      subtitle: "Meet Us In Person",
      value: "123 Dental Ave, New York, NY",
      icon: <MapPin className="text-white w-6 h-6 sm:w-8 sm:h-8" />,
      gradient: "from-purple-600 to-violet-700",
      hoverColor: "group-hover:text-purple-600",
      action: () => handleLocation(),
    },
    {
      id: 4,
      title: "Live Chat",
      subtitle: "Chat with Our Team",
      value: "Available 9AM-6PM EST",
      icon: <MessageCircle className="text-white w-6 h-6 sm:w-8 sm:h-8" />,
      gradient: "from-purple-600 to-violet-700",
      hoverColor: "group-hover:text-purple-600",
      action: () => scrollToContact(), // change to whatsapp
    },
  ];

  const heroProps = {
    badgeIcon: Sparkles,
    badgeText: "Your Smile Is Our Priority",
    heading: "Let's Connect",
    headingHighlight: "For Your",
    headingEnd: "Perfect Smile",
    description:
      "Our team of expert dentists is ready to provide you with exceptional care. Reach out today and take the first step toward your healthiest smile.",
    primaryButtonText: "Contact Us Now",
    primaryButtonAction: (e) => {
      e.preventDefault();
      // Navigate to contact page or scroll to contact section
      console.log("Navigate to contact");
    },
    secondaryButtonText: "Call Now",
    secondaryButtonIcon: Phone,
    secondaryButtonAction: () => handleCallClick("+1 (555) 123-4567"),
    imageSrc:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    imageAlt: "Dental care",
    floatingBadgeIcon: Star,
    floatingBadgeTitle: "Highly Rated",
    floatingBadgeText: "4.9/5 from 2000+ reviews",
    scrollToRef: servicesRef,
    scrollText: "Scroll to Learn More",
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <Hero {...heroProps} />

      {/* Contact Cards Section - Enhanced */}
      <section
        ref={servicesRef}
        id="contact-section"
        className="relative py-16 md:py-20 lg:py-28 px-4"
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%234f46e5' fill-opacity='0.03'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundAttachment: "fixed",
          }}
        ></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="h-[1px] w-8 sm:w-10 bg-violet-500"></div>
              <span className="mx-3 sm:mx-4 text-sm sm:text-base text-violet-600 font-semibold">
                CONTACT US
              </span>
              <div className="h-[1px] w-8 sm:w-10 bg-violet-500"></div>
            </div>

            <h2 className="text-violet-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6">
              We're Here to Help You{" "}
              <span className="text-violet-600">Smile</span>
            </h2>

            <p className="text-gray-700 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-6 sm:mb-8">
              Choose your preferred way to connect with us. We're ready to
              assist you with all your dental care needs.
            </p>

            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
              Our team is committed to providing exceptional dental service and
              support. Whether you prefer a direct call, a detailed email, or an
              in-person visit, we are always here to help.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={method.id}
                className="group bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-lg transform transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl cursor-pointer border border-gray-200 overflow-hidden relative"
                onClick={method.action}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="flex flex-col items-center gap-4 sm:gap-6 relative z-10">
                  {/* Icon */}
                  <div
                    className={`bg-gradient-to-r ${method.gradient} rounded-full p-3 sm:p-4 shadow-lg transform transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-3`}
                  >
                    {method.icon}
                  </div>

                  {/* Text */}
                  <div className="text-center">
                    <h3
                      className={`text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2 transition-colors duration-300 ${method.hoverColor}`}
                    >
                      {method.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-4">
                      {method.subtitle}
                    </p>
                    <p
                      className={`text-sm sm:text-base font-medium transition-colors duration-500 ease-in-out ${method.hoverColor}`}
                    >
                      {method.value}
                    </p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-violet-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-purple-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Address Section - Enhanced */}
      <section className="py-16 sm:py-20 md:py-24 px-4">
        <div
          className="container mx-auto px-4 sm:px-6 lg:px-8"
          data-aos="fade-up"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div className="lg:w-1/2 order-1 lg:order-2" data-aos="fade-left">
              <div className="inline-flex items-center mb-4">
                <div className="h-[1px] w-8 sm:w-10 bg-violet-500"></div>
                <span className="mx-3 sm:mx-4 text-sm sm:text-base text-violet-600 font-semibold">
                  OFFICE DETAILS
                </span>
              </div>

              <h2 className="text-violet-900 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4 sm:mb-6">
                Visit Our Dental Clinic
              </h2>

              <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
                Our team combines expertise and passion to deliver exceptional
                dental care in a comfortable environment. We're conveniently
                located in the heart of New York City.
              </p>

              <div
                className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="flex flex-col space-y-4 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <Building
                      className="w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0 text-violet-600"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-800 text-sm sm:text-base">
                        Our Office
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        123 Dental Ave, Suite 100
                        <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <Clock
                      className="w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0 text-violet-600"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-800 text-sm sm:text-base">
                        Business Hours
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 2:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <Phone
                      className="w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0 text-violet-600"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-800 text-sm sm:text-base">
                        Contact Information
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Phone: +1 (555) 123-4567
                        <br />
                        Email: info@32pearlsdental.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image side */}
            <div className="lg:w-1/2 order-2 lg:order-1" data-aos="fade-right">
              <div className="relative">
                <div className="absolute -inset-4 bg-violet-100 rounded-xl transform rotate-3"></div>
                <div className="absolute -inset-4 bg-violet-200 rounded-xl transform -rotate-3 opacity-70"></div>
                <img
                  src="https://images.unsplash.com/photo-1629909615184-74f495363b67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Dental clinic reception"
                  className="relative z-10 w-full h-full object-cover rounded-lg shadow-xl"
                />

                {/* Floating badge */}
                <div className="absolute -bottom-3 sm:-bottom-4 md:-bottom-5 -right-3 sm:-right-4 md:-right-5 bg-white py-2 sm:py-3 px-3 sm:px-5 rounded-lg shadow-lg z-20 flex items-center gap-1 sm:gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                  <span className="font-bold text-xs sm:text-sm md:text-base text-gray-800">
                    4.9/5 Patient Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Enhanced */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-violet-50">
        <div
          className="container mx-auto px-4 sm:px-6 lg:px-8"
          data-aos="fade-up"
        >
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="h-[1px] w-8 sm:w-10 bg-violet-500"></div>
              <span className="mx-3 sm:mx-4 text-sm sm:text-base text-violet-600 font-semibold">
                LOCATION
              </span>
              <div className="h-[1px] w-8 sm:w-10 bg-violet-500"></div>
            </div>

            <h2 className="text-purple-900 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-3 sm:mb-4">
              Visit Our Office
            </h2>

            <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
              Conveniently located in the heart of New York City, our modern
              dental clinic is equipped with the latest technology to provide
              you with the best care.
            </p>
          </div>

          <div className="relative">
            {/* Map container with shadow and rounded corners */}
            <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden shadow-2xl rounded-xl relative">
              <iframe
                className="w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215175847067!2d-73.98784492404045!3d40.75790623440235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1698764432747!5m2!1sen!2sus"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 to-transparent"></div>
              </div>
            </div>

            {/* Floating info card */}
            <div
              className="absolute -bottom-6 sm:-bottom-8 md:-bottom-10 right-4 sm:right-8 md:right-10 bg-white p-4 sm:p-6 rounded-lg shadow-xl max-w-[250px] sm:max-w-sm transform transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="bg-violet-100 p-2 sm:p-3 rounded-full">
                  <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-gray-900">
                    32 Pearls Dental Clinic
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Premier Dental Care
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                123 Dental Ave, Suite 100
                <br />
                New York, NY 10001
              </p>
              <button
                onClick={handleLocation}
                className="w-full bg-violet-600 text-white py-1.5 sm:py-2 rounded-lg hover:bg-violet-700 transition-colors duration-300 text-xs sm:text-sm"
              >
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-white to-violet-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-200 rounded-full opacity-40"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200 rounded-full opacity-40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="h-[1px] w-8 sm:w-10 bg-violet-500"></div>
              <span className="mx-3 sm:mx-4 text-sm sm:text-base text-violet-600 font-semibold">
                FAQ
              </span>
              <div className="h-[1px] w-8 sm:w-10 bg-violet-500"></div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-violet-900">
              Frequently Asked Questions
            </h2>

            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Find answers to common questions about our dental services and
              processes. If you don't see your question here, feel free to
              contact us.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="mb-4 sm:mb-6"
                data-aos="fade-up"
                data-aos-delay={faq.id * 50}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className={`w-full text-left p-4 sm:p-5 md:p-6 rounded-lg flex justify-between items-center ${
                    faqOpen[faq.id]
                      ? "bg-gradient-to-r from-violet-700 to-purple-700 text-white shadow-lg"
                      : "bg-white text-gray-800 border border-gray-200 hover:border-violet-200"
                  } shadow-md hover:shadow-lg transition duration-300`}
                  aria-expanded={faqOpen[faq.id]}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex items-center">
                    {faqOpen[faq.id] ? (
                      <div className="mr-3 sm:mr-4 bg-white/20 p-1.5 sm:p-2 rounded-full">
                        {faq.icon}
                      </div>
                    ) : (
                      <div className="mr-3 sm:mr-4 text-violet-600">
                        {faq.icon}
                      </div>
                    )}
                    <span className="font-semibold text-sm sm:text-base">
                      {faq.question}
                    </span>
                  </div>
                  <span
                    className={`transform transition-transform duration-300 ${
                      faqOpen[faq.id] ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {faqOpen[faq.id] && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="bg-white p-4 sm:p-5 md:p-6 rounded-b-lg shadow-md mt-1 border border-gray-200 border-t-0 animate-fade-in"
                  >
                    <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                      <div className="md:w-full">
                        <p className="text-gray-600 text-sm sm:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
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
                Ready for a Healthier Smile?
              </span>
              <span className="font-semibold text-white block">
                Contact us today to schedule your appointment and discover how
                we can help you achieve optimal dental health.
              </span>
            </h4>
          </div>
          <div className="mt-4 sm:mt-6 md:mt-0">
            <div className="flex gap-10">
              <a
                href="/book-appointment"
                className="block rounded-xl px-5 sm:px-7 py-2 sm:py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white hover:from-violet-700 hover:to-purple-800 font-semibold text-base sm:text-lg shadow-lghover:shadow-xl transform transition-all duration-300 ease-in-out border border-white/10"
              >
                Book Appointment
              </a>
              <a
                href="/contact"
                className="block rounded-xl px-5 sm:px-7 py-2 sm:py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white hover:from-violet-700 hover:to-purple-800 font-semibold text-base sm:text-lg shadow-lghover:shadow-xl transform transition-all duration-300 ease-in-out border border-white/10"
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
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out forwards;
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.7s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        .animate-wiggle {
          animation: wiggle 1s ease-in-out infinite;
        }

        .animate-slow-pulse {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-wave {
          animation: wave 15s linear infinite;
        }

        .animate-wave-slow {
          animation: wave 20s linear infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-text-gradient {
          background-size: 200% 200%;
          animation: textGradient 4s ease infinite;
        }

        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.12),
            0 2px 4px rgba(0, 0, 0, 0.08);
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

        /* Keyframes */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }

        @keyframes wave {
          0% {
            transform: translateX(0) translateZ(0) scaleY(1);
          }
          50% {
            transform: translateX(-25%) translateZ(0) scaleY(0.8);
          }
          100% {
            transform: translateX(-50%) translateZ(0) scaleY(1);
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
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

        @keyframes float-y {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes textGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
