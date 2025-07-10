import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Stethoscope,
  Phone,
  MapPin,
  Mail,
  MessageCircle,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

function Footer() {
  // Define the services and quick links

  const services = [
    { text: "General Dentistry", href: "/services/general-dentistry" },
    { text: "Cosmetic Dentistry", href: "/services/cosmetic-dentistry" },
    { text: "Orthodontics", href: "/services/orthodontics" },
    { text: "Pediatric Dentistry", href: "/services/pediatric-dentistry" },
    { text: "Dental Implants", href: "/services/dental-implants" },
  ];

  const quickLinks = [
    { text: "Home", href: "/" },
    { text: "About Us", href: "/about" },
    { text: "Services", href: "/services" },
    { text: "Appointments", href: "/appointments" },
    { text: "Blog", href: "/blog" },
    { text: "Contact", href: "/contact" },
    { text: "Login", href: "/login" },
  ];

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  const handleWhatsApp = (number) => {
    const cleanNumber = number.replace(/\D/g, "");
    window.open(`https://wa.me/${cleanNumber}`, "_blank");
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleViewMap = () => {
    window.open(
      "https://www.google.com/maps/dir/?api=1&destination=107+Sai+vision+Kunal+Icon+Road+Pimple+Saudagar+Pune",
      "_blank"
    );
  };

  const contactInfo = [
    {
      icon: Phone,
      text: "+91 844-632-2666",
      action: () => handleCall("918446322666"),
      hoverColor: "group-hover:text-indigo-300",
    },
    {
      icon: MessageCircle,
      text: "+91 844-632-2666",
      action: () => handleWhatsApp("918446322666"),
      hoverColor: "group-hover:text-indigo-300",
    },
    {
      icon: Mail,
      text: "drpritesh86@gmail.com",
      action: () => handleEmail("drpritesh86@gmail.com"),
      hoverColor: "group-hover:text-indigo-300",
    },
    {
      icon: MapPin,
      text: "107, Sai vision, Kunal Icon Road, Pimple Saudagar, Pune, Maharashtra 411027",
      action: handleViewMap,
      hoverColor: "group-hover:text-indigo-300",
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: "Instagram",
      href: "https://www.instagram.com/32_pearls_dentalclinic",
      hoverColor: "hover:text-pink-500",
      bgColor: "from-purple-500 to-pink-600",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/32-pearls-dental",
      hoverColor: "hover:text-blue-600",
      bgColor: "from-indigo-600 to-indigo-700",
    },

    {
      icon: Facebook,
      name: "Facebook",
      href: "https://www.facebook.com/32pearlsdental",
      hoverColor: "hover:text-blue-700",
      bgColor: "from-blue-600 to-blue-700",
    },
  ];

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="32 Pearls Dental Clinic provides exceptional dental care with a team of experienced professionals using the latest technology."
        />
        <meta
          name="keywords"
          content="dental clinic, dentist, dental care, teeth cleaning, dental services"
        />
      </Helmet>
      <footer className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Company Info */}
            <div className="lg:col-span-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="mr-2 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 sm:p-2 shadow-md">
                  <Stethoscope
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight">
                    <span className="text-white">32</span>
                    <span className="text-indigo-300">•</span>
                    <span className="text-white">Pearls</span>
                  </span>
                  <span className="text-[10px] sm:text-xs tracking-widest uppercase text-purple-200">
                    Dental Clinic
                  </span>
                </div>
              </div>
              <p className="text-indigo-200 text-sm leading-relaxed mb-8 mx-auto lg:mx-0 max-w-sm">
                At 32 Pearls Dental Clinic, we're committed to providing
                exceptional dental care in a comfortable environment. Our team
                of experienced professionals uses the latest technology to
                ensure your smile stays healthy and beautiful.
              </p>
            </div>

            {/* Quick Links & Services - Combined on medium screens */}
            <div className="lg:col-span-3 text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 inline-block relative">
                Quick Links
                <span className="absolute bottom-0 left-0 right-0 mx-auto md:mx-0 w-12 h-0.5 bg-indigo-400 mt-1"></span>
              </h3>
              <ul className="space-y-2 sm:space-y-3 mb-8">
                {quickLinks.map((link, index) => (
                  <li key={index} className="group">
                    <Link
                      to={link.href}
                      className="flex items-center justify-center md:justify-start text-indigo-200 hover:text-white transition-all duration-300"
                    >
                      <ArrowRight
                        className="h-3.5 w-3.5 mr-2 text-indigo-400 transform transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                      <span>{link.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden md:block lg:col-span-3 text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 inline-block relative">
                Our Services
                <span className="absolute bottom-0 left-0 right-0 mx-auto md:mx-0 w-12 h-0.5 bg-indigo-400 mt-1"></span>
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="group">
                    <Link
                      to={service.href}
                      className="flex items-center justify-center md:justify-start text-indigo-200 hover:text-white transition-all duration-300"
                    >
                      <ArrowRight
                        className="h-3.5 w-3.5 mr-2 text-indigo-400 transform transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                      <span>{service.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 inline-block relative">
                Contact Us
                <span className="absolute bottom-0 left-0 right-0 mx-auto md:mx-0 w-12 h-0.5 bg-indigo-400 mt-1"></span>
              </h3>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={index}
                      className="group flex items-start space-x-3 cursor-pointer justify-center md:justify-start"
                      onClick={item.action}
                    >
                      <Icon
                        className={`h-4 w-4 sm:h-5 sm:w-5 mt-0.5 text-indigo-400 transition-all duration-300 ${item.hoverColor} group-hover:scale-110 flex-shrink-0`}
                        aria-hidden="true"
                      />
                      <span
                        className={`text-indigo-200 group-hover:text-white transition-colors duration-300 text-sm sm:text-base`}
                      >
                        {item.text}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-2 sm:space-x-3 justify-center md:justify-start">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className={`p-2 sm:p-2.5 rounded-full bg-gradient-to-r ${social.bgColor} bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 hover:scale-110 shadow-sm`}
                      >
                        <Icon
                          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 text-white transition-all duration-300`}
                          aria-hidden="true"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-center md:text-left text-indigo-300 text-xs sm:text-sm">
              &copy; {new Date().getFullYear()} 32 Pearls Dental Clinic. All
              rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-4 sm:gap-x-6 gap-y-2 text-xs text-indigo-300">
              <Link
                to="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/sitemap"
                className="hover:text-white transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
