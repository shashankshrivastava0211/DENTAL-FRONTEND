import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Building,
  Sparkles,
  Bluetooth as Tooth,
  MessageCircle,
  Star,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
} from "lucide-react";
import Hero from "../components/Hero";

const Contact = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState(false);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  const handleCallClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleViewMap = () => {
    window.open(
      "https://www.google.com/maps/dir/?api=1&destination=107+Sai+vision+Kunal+Icon+Road+Pimple+Saudagar+Pune",
      "_blank"
    );
  };


  const handleWhatsApp = (number) => {
    window.open(`https://wa.me/${number}`, "_blank");
  };

  const socialLinks = {
    instagram: "https://www.instagram.com/32_pearls_dentalclinic",
    linkedin: "https://www.linkedin.com/",
    facebook: "https://www.facebook.com/pritesh.jagtap",
    twitter: "https://www.twitter.com/",
  };

  const contactMethods = [
    {
      id: 1,
      title: "Call Us Directly",
      subtitle: "Emergency Contact Available",
      value: "+91 844-632-2666",
      icon: <Phone className="text-white w-6 h-6 sm:w-8 sm:h-8" />,
      gradient: "from-violet-600 to-purple-700",
      hoverColor: "group-hover:text-violet-600",
      action: () => handleCallClick("+918446322666"),
    },
    {
      id: 2,
      title: "Email Us",
      subtitle: "24/7 Support Available",
      value: "drpritesh86@gmail.com",
      icon: <Mail className="text-white w-6 h-6 sm:w-8 sm:h-8" />,
      gradient: "from-violet-500 to-purple-600",
      hoverColor: "group-hover:text-violet-500",
      action: () => handleEmailClick("drpritesh86@gmail.com"),
    },
    {
      id: 3,
      title: "Visit Our Office",
      subtitle: "Meet Us In Person",
      value: "Pimple Saudagar, Pune",
      icon: <MapPin className="text-white w-6 h-6 sm:w-8 sm:h-8" />,
      gradient: "from-purple-600 to-violet-700",
      hoverColor: "group-hover:text-purple-600",
      action: () => handleViewMap(),
    },
    {
      id: 4,
      title: "WhatsApp Chat",
      subtitle: "Chat with Our Team",
      value: "+91 844-632-2666",
      icon: <MessageCircle className="text-white w-6 h-6 sm:w-8 sm:h-8" />,
      gradient: "from-purple-600 to-violet-700",
      hoverColor: "group-hover:text-purple-600",
      action: () => handleWhatsApp("918446322666"),
    },
  ];

  const socialMediaLinks = [
    {
      id: 1,
      name: "Instagram",
      icon: <Instagram className="w-6 h-6" />,
      url: socialLinks.instagram,
      color: "hover:text-pink-600",
      gradient: "from-pink-500 to-purple-500",
    },
    {
      id: 2,
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      url: socialLinks.linkedin,
      color: "hover:text-blue-600",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: 3,
      name: "Facebook",
      icon: <Facebook className="w-6 h-6" />,
      url: socialLinks.facebook,
      color: "hover:text-blue-700",
      gradient: "from-blue-600 to-blue-700",
    },
    {
      id: 4,
      name: "Twitter",
      icon: <Twitter className="w-6 h-6" />,
      url: socialLinks.twitter,
      color: "hover:text-blue-400",
      gradient: "from-blue-400 to-blue-500",
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
      const contactSection = document.getElementById("contact-section");
      contactSection?.scrollIntoView({ behavior: "smooth" });
    },
    secondaryButtonText: "Call Now",
    secondaryButtonIcon: Phone,
    secondaryButtonAction: () => handleCallClick("+918446322666"),
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

      {/* Contact Cards Section */}
      <section
        ref={servicesRef}
        id="contact-section"
        className="py-12 md:py-16 lg:py-20 relative min-h-[90vh] overflow-hidden flex items-center"
        data-aos="fade-up"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50 to-indigo-50"></div>
        <div className="absolute inset-0 bg-wave-pattern opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full opacity-50"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-200 rounded-full opacity-50"></div>
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
                CONTACT US
              </span>
              <div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
            </div>

            <h2
              className="text-indigo-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              We're Here to{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                Help You Smile
              </span>
            </h2>
            <p
              className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
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

      {/* Address Section */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50 to-indigo-50 opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left side - Image */}
            <div className="lg:w-1/2" data-aos="fade-right">
              <div className="relative">
                {/* Main image with organic shape */}
                <div className="relative">
                  <div
                    className="w-full aspect-[4/3] overflow-hidden"
                    style={{
                      borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%",
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1629909615184-74f495363b67?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                      alt="Dental clinic reception"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500 "
                    />
                  </div>

                  {/* Decorative elements */}
                  <div
                    className="absolute -top-8 -left-8 w-32 h-32 border-8 border-indigo-50  bg-violet-100 -z-10"
                    style={{
                      borderRadius: "70% 30% 50% 50% / 30% 70% 30% 70%",
                    }}
                  ></div>
                </div>

                {/* Rating badge */}
                <div className="absolute -bottom-4 right-12 bg-white py-3 px-6 rounded-[30px] shadow-xl z-20 flex items-center gap-3">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Star className="w-6 h-6 text-yellow-500 fill-current" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">4.9/5</div>
                    <div className="text-xs text-gray-500">Patient Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div
              className="lg:w-1/2 flex flex-col justify-center"
              data-aos="fade-left"
            >
              <div className="inline-flex items-center mb-4">
                <div className="bg-violet-100 p-2 rounded-full">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="h-[2px] w-8 bg-indigo-200 mx-3"></div>
                <span className="text-sm text-indigo-600 font-semibold tracking-wider">
                  OFFICE DETAILS
                </span>
              </div>

              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-indigo-900 mb-6 leading-tight"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Visit Our{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Clinic
                </span>
              </h2>

              <p className="text-gray-700 text-lg mb-10 leading-relaxed">
                Our team combines expertise and passion to deliver exceptional
                dental care in a comfortable environment. We're conveniently
                located in Pimple Saudagar, Pune.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {/* Location card */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-2xl blur-sm group-hover:blur transition-all duration-300"></div>
                  <div className="bg-white p-4 rounded-2xl shadow-lg relative flex flex-col group-hover:-translate-y-1 transition-transform duration-300 h-full backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-gradient-to-br from-indigo-100 via-violet-100 to-purple-100 p-3 rounded-xl">
                        <Building className="w-6 h-6 text-violet-600" />
                      </div>
                      <h3 className="font-semibold text-gray-800 text-sm">
                        Our Location
                      </h3>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">
                        107, Sai vision, Kunal Icon Road, Pimple Saudagar, Pune,
                        Maharashtra 411027
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hours card */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-2xl blur-sm group-hover:blur transition-all duration-300"></div>
                  <div className="bg-white p-4 rounded-2xl shadow-lg relative flex flex-col group-hover:-translate-y-1 transition-transform duration-300 h-full backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-gradient-to-br from-indigo-100 via-violet-100 to-purple-100 p-3 rounded-xl">
                        <Clock className="w-6 h-6 text-violet-600" />
                      </div>
                      <h3 className="font-semibold text-gray-800 text-sm">
                        Business Hours
                      </h3>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">
                        Monday - Saturday: 10:00 AM - 8:00 PM Sunday: By
                        Appointment Only
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 md:py-24 px-4" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-around">
            <div className="lg:max-w-xl mb-12 lg:mb-0">
              <div className="inline-flex items-center mb-4">
                <div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
                <span className="mx-4 text-sm md:text-base text-indigo-600 font-semibold uppercase tracking-wider">
                  Connect With US
                </span>
                <div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
              </div>

              <h2 className="text-indigo-900 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
                Find Us On{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Social Media
                </span>
              </h2>

              <p className="text-gray-700 text-base sm:text-lg">
                Stay connected with us on social media for the latest updates,
                dental tips, and special offers. Follow us and join our growing
                community!
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 lg:max-w-3xl">
              {socialMediaLinks.map((social, index) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="bg-white p-4 lg:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className={`w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center rounded-full bg-gradient-to-r ${social.gradient} text-white transform transition-transform duration-300 group-hover:scale-110`}
                      >
                        {social.icon}
                      </div>
                      <h3
                        className={`text-base lg:text-lg font-semibold ${social.color} transition-colors duration-300`}
                      >
                        {social.name}
                      </h3>
                      <p className="text-xs lg:text-sm text-gray-600">
                        Follow Us
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section
        className="py-12 md:py-16 lg:py-20 relative overflow-hidden flex items-center"
        data-aos="fade-up"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50 to-indigo-50"></div>
        <div className="absolute inset-0 bg-wave-pattern opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full opacity-50"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-200 rounded-full opacity-50"></div>
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
                LOCATION
              </span>
              <div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
            </div>

            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-indigo-900 mb-6 leading-tight"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Visit Our{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                Office
              </span>
            </h2>
            <p
              className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Conveniently located in Pimple Saudagar, Pune, our modern dental
              clinic is equipped with the latest technology to provide you with
              the best care.
            </p>
          </div>

          <div className="relative">
            {/* Map container with shadow and rounded corners */}
            <div className="w-full h-[300px] sm:h-[400px] overflow-hidden shadow-2xl rounded-xl relative">
              <iframe
                className="w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.1595411843257!2d73.79236937497725!3d18.60916158246275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e76c8fa205%3A0x1c504e5e0c8f65a1!2s32%20Pearls%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1710471547899!5m2!1sen!2sin"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
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
                107, Sai vision, Kunal Icon Road,
                <br />
                Pimple Saudagar, Pune 411027
              </p>
              <button
                onClick={handleViewMap}
                className="w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white py-1.5 sm:py-2 rounded-lg hover:from-indigo-600 hover:via-violet-600 hover:to-purple-600 transition-colors duration-300 text-xs sm:text-sm"
              >
                Get Directions
              </button>
            </div>
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
                Contact us today to schedule your appointment.
              </span>
            </h4>
          </div>
          <div className="mt-4 sm:mt-6 md:mt-0">
            <div className="flex gap-4 sm:gap-6">
              <a
                href="/book-appointment"
                className="rounded-xl px-5 sm:px-7 py-2 sm:py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white hover:from-violet-700 hover:to-purple-800 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out border border-white/10"
              >
                Book Appointment
              </a>
              <button
                onClick={() => handleWhatsApp("918446322666")}
                className="rounded-xl px-5 sm:px-7 py-2 sm:py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white hover:from-violet-700 hover:to-purple-800 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out border border-white/10"
              >
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
