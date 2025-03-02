import React, { useRef, useEffect } from "react";
import {
  Award,
  Heart,
  Users,
  Clock,
  CheckCircle,
  Calendar,
  Shield,
  TrendingUp,
  Star,
  Smile,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero2 from "../components/Hero2";

export const About = () => {
  const teamRef = useRef(null);
  const missionRef = useRef(null);

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

  const team = [
    {
      name: "Dr. Sarah Wilson",
      role: "Lead Dentist",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&h=300",
      specialization: "Cosmetic Dentistry",
      bio: "Dr. Wilson has over 15 years of experience in cosmetic dentistry and is passionate about creating beautiful smiles.",
    },
    {
      name: "Dr. Michael Chen",
      role: "Orthodontist",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&h=300",
      specialization: "Braces & Aligners",
      bio: "Dr. Chen specializes in modern orthodontic techniques and is certified in all major clear aligner systems.",
    },
    {
      name: "Dr. Emily Brown",
      role: "Periodontist",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&h=300",
      specialization: "Gum Treatment",
      bio: "Dr. Brown is dedicated to helping patients maintain healthy gums and prevent periodontal disease.",
    },
    {
      name: "Dr. James Rodriguez",
      role: "Pediatric Dentist",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&h=300",
      specialization: "Children's Dental Care",
      bio: "Dr. Rodriguez creates a fun and comfortable environment for children while providing excellent dental care.",
    },
  ];

  const timeline = [
    {
      year: "2005",
      title: "Clinic Founded",
      description:
        "Started with a vision to provide exceptional dental care with just two treatment rooms.",
    },
    {
      year: "2010",
      title: "Expansion",
      description:
        "Added new specialties and state-of-the-art equipment, expanding to six treatment rooms.",
    },
    {
      year: "2015",
      title: "Excellence Award",
      description:
        "Recognized as the leading dental clinic in the region for patient satisfaction and care quality.",
    },
    {
      year: "2020",
      title: "Digital Innovation",
      description:
        "Implemented advanced digital dentistry solutions including 3D scanning and same-day restorations.",
    },
    {
      year: "2023",
      title: "Community Milestone",
      description:
        "Celebrated serving over 10,000 patients and launched our community outreach dental program.",
    },
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6 text-indigo-600" />,
      title: "Advanced Technology",
      description:
        "State-of-the-art equipment for precise diagnostics and comfortable treatments.",
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      title: "Expert Team",
      description:
        "Highly qualified dental professionals dedicated to your oral health.",
    },
    {
      icon: <Award className="w-6 h-6 text-indigo-600" />,
      title: "Personalized Care",
      description:
        "Customized treatment plans tailored to your unique dental needs.",
    },
    {
      icon: <Clock className="w-6 h-6 text-indigo-600" />,
      title: "Convenient Hours",
      description: "Flexible scheduling to accommodate your busy lifestyle.",
    },
    {
      icon: <Smile className="w-6 h-6 text-indigo-600" />,
      title: "Comfort-Focused",
      description:
        "Relaxing environment with amenities to ease dental anxiety.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
      title: "Preventive Approach",
      description:
        "Focus on preventing issues before they require extensive treatment.",
    },
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6 text-white" />,
      title: "Compassion",
      description: "We treat every patient with kindness and understanding.",
    },
    {
      icon: <Star className="w-6 h-6 text-white" />,
      title: "Excellence",
      description: "We strive for the highest standards in everything we do.",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      title: "Integrity",
      description: "We are honest and transparent in all our interactions.",
    },
    {
      icon: <Stethoscope className="w-6 h-6 text-white" />,
      title: "Innovation",
      description:
        "We embrace new technologies and techniques to improve care.",
    },
  ];

  const heroProps = {
    badgeIcon: Heart,
    badgeText: "Patient-Centered Care",
    heading: "Meet Our",
    headingHighlight: "Experienced",
    headingEnd: "Team",
    description:
      "Our dedicated team of dental professionals combines years of experience with a genuine passion for patient care and comfort.",
    primaryButtonText: "Meet Our Team",
    primaryButtonAction: (e) => {
      e.preventDefault();
      const element = teamRef.current;
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    secondaryButtonText: "Our Mission",
    secondaryButtonIcon: Heart,
    secondaryButtonAction: () => {
      const element = missionRef.current;
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    imageSrc:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    imageAlt: "32 Pearls Dental team",
    floatingBadgeIcon: Heart,
    floatingBadgeTitle: "Patient Love",
    floatingBadgeText: "98% satisfaction rate",
    scrollToRef: teamRef,
    scrollText: "Learn About Our Team",
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <Hero2 {...heroProps} />

      {/* Introduction Section */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-0 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="lg:w-1/2 mb-10 lg:mb-0" data-aos="fade-right">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-200 rounded-full opacity-70 blur-xl"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-200 rounded-full opacity-70 blur-xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&h=600"
                  alt="Modern dental clinic interior"
                  className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                />
                <div
                  className="absolute -bottom-5 -right-5 bg-white rounded-lg shadow-lg p-4 md:p-6"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <Star className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">4.9/5</p>
                      <p className="text-sm text-gray-600">
                        Based on 500+ reviews
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2" data-aos="fade-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Welcome to 32 Pearls
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Smile Deserves{" "}
                <span className="text-indigo-600">The Best Care</span>
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

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="text-gray-700">Modern Equipment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="text-gray-700">Gentle Approach</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="text-gray-700">Family Friendly</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="text-gray-700">Affordable Plans</span>
                </div>
              </div>

              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                Schedule Your Visit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-0 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-stretch -mx-4">
            {/* Left Content */}
            <div
              className="w-full lg:w-2/3 px-4 mb-8 lg:mb-0"
              data-aos="fade-right"
            >
              <div className="bg-white h-full p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg">
                <h3 className="text-3xl sm:text-4xl font-medium  mb-6 text-purple-800">
                  <span className="border-b-4 border-indigo-600 text-indigo-600 text-5xl font-belanosima font-medium tracking-wide leading-relaxed">
                    32 Pearls Dental Clinic
                  </span>{" "}
                  - Leading Dental Care Provider
                </h3>

                <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
                  At 32 Pearls, we are committed to providing innovative and
                  customized dental services to meet the unique needs of every
                  patient. Our expert team ensures impactful solutions that
                  deliver measurable results for optimal oral health.
                </p>

                <p className="text-gray-700 text-base sm:text-lg mb-8 leading-relaxed">
                  32 Pearls Dental Clinic stands out from competitors by
                  offering highly personalized care across all dental
                  specialties. We provide comprehensive dental services to help
                  you achieve and maintain a healthy, beautiful smile that lasts
                  a lifetime.
                </p>

                <div className="border-l-4 border-indigo-600 pl-6 py-4 mt-8 bg-indigo-50 rounded-r-lg">
                  <h3 className="text-xl sm:text-2xl font-semibold text-indigo-800 mb-4">
                    <span className="border-b-4 border-indigo-600 pb-1">
                      Our Name
                    </span>
                  </h3>
                  <p className="text-gray-700 text-base sm:text-lg">
                    The name "32 Pearls" represents the complete set of adult
                    teeth, symbolizing our commitment to comprehensive dental
                    care. Each tooth is precious like a pearl, and we treat them
                    with the care and attention they deserve.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div
              className="w-full lg:w-1/3 px-4 flex flex-col gap-5"
              data-aos="fade-left"
            >
              {/* Strategy Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg group hover:bg-gradient-to-br from-indigo-600 to-purple-600 transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="bg-indigo-100 p-3 rounded-full group-hover:bg-white transition-colors duration-300">
                    <TrendingUp className="text-indigo-600 text-2xl sm:text-3xl group-hover:text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-white">
                      Our Strategy
                    </h4>
                    <p className="text-gray-700 leading-relaxed group-hover:text-white">
                      Building tailored approaches to solve complex dental
                      challenges and deliver exceptional results for every
                      patient.
                    </p>
                  </div>
                </div>
              </div>

              {/* Approach Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg group hover:bg-gradient-to-br from-indigo-600 to-purple-600 transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="bg-indigo-100 p-3 rounded-full group-hover:bg-white transition-colors duration-300">
                    <Award className="text-indigo-600 text-2xl sm:text-3xl group-hover:text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-white">
                      Our Approach
                    </h4>
                    <p className="text-gray-700 leading-relaxed group-hover:text-white">
                      Creating innovative solutions by combining advanced
                      technology with compassionate, patient-centered care.
                    </p>
                  </div>
                </div>
              </div>

              {/* Logo */}
              <div className="flex justify-center items-center bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center justify-center">
                  <div className="text-4xl font-bold text-indigo-600">32</div>
                  <div className="ml-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 bg-indigo-600 rounded-full mx-0.5"
                      ></div>
                    ))}
                  </div>
                  <div className="ml-2 text-4xl font-bold text-indigo-600">
                    Pearls
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%234f46e5' fill-opacity='0.4'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundAttachment: "fixed",
          }}
        ></div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="h-[1px] w-10 bg-indigo-500"></div>
              <span className="mx-4 text-sm text-indigo-600 font-semibold uppercase tracking-wider">
                Why Choose Us
              </span>
              <div className="h-[1px] w-10 bg-indigo-500"></div>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Experience <span className="text-indigo-600">Excellence</span> in
              Dental Care
            </h2>

            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              At 32 Pearls Dental Clinic, we combine advanced technology with
              compassionate care to provide you with the best dental experience
              possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="h-[1px] w-10 bg-indigo-500"></div>
              <span className="mx-4 text-sm text-indigo-600 font-semibold uppercase tracking-wider">
                Our Professionals
              </span>
              <div className="h-[1px] w-10 bg-indigo-500"></div>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Meet Our <span className="text-indigo-600">Expert</span> Team
            </h2>

            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Our experienced team of dental professionals is committed to
              providing you with the best possible care in a comfortable and
              friendly environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-indigo-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 mb-4">{member.specialization}</p>
                  <p className="text-gray-700 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="h-[1px] w-10 bg-violet-500"></div>
              <span className="mx-4 text-sm text-violet-600 font-semibold">
              Our History
              </span>
              <div className="h-[1px] w-10 bg-violet-500"></div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold  text-gray-900 leading-tight mb-4">
              Our <span className="text-indigo-600">Journey</span> of Excellence
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
            A timeline of our growth and achievements over the years as we
              continue to provide exceptional dental care to our community.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200"></div>

            {timeline.map((item, index) => (
              <div
                key={index}
                className={`flex items-center mb-12 last:mb-0 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                data-aos-delay={index * 100}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-12 text-right" : "pl-12"
                  }`}
                >
                  <div className="mb-2">
                    <span className="inline-block px-4 py-2 rounded-full bg-indigo-600 text-white font-bold">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 border-4 border-white shadow"></div>
                </div>

                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section
        ref={missionRef}
        className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50"
      >
        <div className="container mx-auto px-4">

          <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="h-[1px] w-10 bg-violet-500"></div>
              <span className="mx-4 text-sm text-violet-600 font-semibold">
              Our Purpose
              </span>
              <div className="h-[1px] w-10 bg-violet-500"></div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-violet-900 mb-4">
            Our Mission & {" "}
              <span className="text-violet-600"> Values</span>
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
            Guided by our core values, we strive to provide exceptional dental
            care that enhances the quality of life for our patients.
            </p>
          </div>


          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-indigo-900 border-b-4 border-indigo-600 pb-2 inline-block">
                  Our Mission
                </h3>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  To provide exceptional dental care that enhances the quality
                  of life for our patients through professional excellence,
                  patient education, and a comfortable, caring environment.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-indigo-600 mt-1" />
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Excellence in Care
                      </h4>
                      <p className="text-gray-600">
                        Delivering the highest standard of dental services using
                        the latest techniques and technologies.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Heart className="w-6 h-6 text-indigo-600 mt-1" />
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Patient-Centered Approach
                      </h4>
                      <p className="text-gray-600">
                        Focusing on individual needs and comfort to ensure a
                        positive dental experience.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Award className="w-6 h-6 text-indigo-600 mt-1" />
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Innovation
                      </h4>
                      <p className="text-gray-600">
                        Continuously improving our services through ongoing
                        education and adopting new technologies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-left">
              <div className="grid grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-2xl shadow-lg text-white"
                    data-aos="zoom-in"
                    data-aos-delay={index * 100}
                  >
                    <div className="bg-white/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {value.title}
                    </h3>
                    <p className="text-white/90">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 p-8 md:p-12 lg:p-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready for Your Best Smile?
                </h2>
                <p className="text-white/90 text-lg mb-8">
                  Schedule your appointment today and experience the 32 Pearls
                  difference. Our team is ready to provide you with exceptional
                  dental care in a comfortable environment.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-md hover:bg-indigo-50 transition-all duration-300">
                    Book Appointment
                  </button>
                  <button className="px-6 py-3 bg-transparent text-white font-medium rounded-lg border border-white hover:bg-white/10 transition-all duration-300">
                    Contact Us
                  </button>
                </div>
              </div>
              <div className="lg:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80"
                  alt="Smiling patient"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
