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
  Search,
  BookOpen,
  TrendingUp,
  Users,
  Leaf,
  GraduationCap,
} from "lucide-react";
import Hero from "../components/Hero";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [currentPage, setCurrentPage] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState(false);
  const heroRef = useRef(null);
  const blogRef = useRef(null);
  const postsPerPage = 9;

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

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Dental Care",
      description:
        "Explore the latest trends and innovations in dentistry. From AI-driven diagnostics to teledentistry, discover how modern practices are enhancing patient care and operational efficiency.",
      image:
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "April 15, 2024",
      author: "Dr. Sarah Johnson",
      category: "Dental Trends",
      icon: <TrendingUp className="w-5 h-5 text-indigo-500" />,
    },
    {
      id: 2,
      title: "Maximizing Practice Revenue Through Efficient Operations",
      description:
        "Learn effective strategies for optimizing your dental practice's operations. From appointment scheduling to insurance processing, discover ways to enhance efficiency and profitability.",
      image:
        "https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "April 12, 2024",
      author: "Dr. Michael Chen",
      category: "Practice Management",
      icon: <BookOpen className="w-5 h-5 text-indigo-500" />,
    },
    {
      id: 3,
      title: "Creating Exceptional Patient Experiences in Dental Care",
      description:
        "Discover the secrets to delivering outstanding patient experiences. From personalized treatment plans to effective communication, learn how to build trust and satisfaction in your dental practice.",
      image:
        "https://images.unsplash.com/photo-1629909615184-74f495363b67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "April 10, 2024",
      author: "Dr. Emma Williams",
      category: "Patient Experience",
      icon: <Users className="w-5 h-5 text-indigo-500" />,
    },
    {
      id: 4,
      title: "Sustainable Practices in Modern Dental Clinics",
      description:
        "Implement eco-friendly initiatives that benefit both the environment and your dental practice. Learn about waste reduction, energy-efficient equipment, and green materials for a sustainable future.",
      image:
        "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      date: "April 8, 2024",
      author: "Dr. David Miller",
      category: "Sustainability",
      icon: <Leaf className="w-5 h-5 text-indigo-500" />,
    },
    {
      id: 5,
      title: "Digital Marketing Strategies for Dental Practices",
      description:
        "Master the art of digital marketing in dentistry. Learn about SEO, social media, and online reputation management to attract more patients to your dental practice.",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "April 5, 2024",
      author: "Lisa Anderson",
      category: "Dental Marketing",
      icon: <MessageCircle className="w-5 h-5 text-indigo-500" />,
    },
    {
      id: 6,
      title: "Dental Staff Training and Development",
      description:
        "Build a high-performing dental team through effective training programs. Learn best practices for hygienists, assistants, and front desk staff to enhance patient care and practice efficiency.",
      image:
        "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "April 3, 2024",
      author: "Dr. James Wilson",
      category: "Staff Training",
      icon: <GraduationCap className="w-5 h-5 text-indigo-500" />,
    },
    {
      id: 7,
      title: "Modern Dental Clinic Design Trends 2024",
      description:
        "Explore the latest design trends in dental clinics. From ergonomic layouts to patient-friendly spaces, create a welcoming and efficient environment that enhances the patient experience.",
      image:
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "April 1, 2024",
      author: "Alexandra Peters",
      category: "Dental Trends",
      icon: <TrendingUp className="w-5 h-5 text-indigo-500" />,
    },
    {
      id: 8,
      title: "Dental Supply Management Excellence",
      description:
        "Create and manage an efficient dental supply chain. Learn about inventory control, supplier relations, and cost-effective purchasing strategies for your dental practice.",
      image:
        "https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "March 30, 2024",
      author: "Robert Parker",
      category: "Practice Management",
      icon: <BookOpen className="w-5 h-5 text-indigo-500" />,
    },
    {
      id: 9,
      title: "Preventive Dentistry: Building Long-Term Patient Health",
      description:
        "Emphasize preventive care to enhance patient outcomes. Learn about education initiatives, regular checkups, and early intervention strategies for optimal dental health.",
      image:
        "https://images.unsplash.com/photo-1606265752439-1f18756aa8ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "March 28, 2024",
      author: "Dr. Maria Santos",
      category: "Patient Experience",
      icon: <Users className="w-5 h-5 text-indigo-500" />,
    },
    {
      id: 10,
      title: "Green Certification Guide for Dental Practices",
      description:
        "A comprehensive guide to obtaining green certifications for your dental clinic. Understand requirements and implement sustainable practices effectively for an eco-friendly practice.",
      image:
        "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "March 26, 2024",
      author: "Thomas Green",
      category: "Sustainability",
      icon: <Leaf className="w-5 h-5 text-indigo-500" />,
    },
    {
      id: 11,
      title: "Social Media Strategy for Dental Practices",
      description:
        "Develop a winning social media strategy to engage patients. Learn about educational content, patient testimonials, and promotional campaigns to grow your dental practice online.",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "March 24, 2024",
      author: "Rachel Kim",
      category: "Dental Marketing",
      icon: <MessageCircle className="w-5 h-5 text-indigo-500" />,
    },
    {
      id: 12,
      title: "Leadership Development in Dental Practices",
      description:
        "Nurture the next generation of dental leaders. Explore mentorship, team motivation, and practice management skills to build a successful dental practice with strong leadership.",
      image:
        "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "March 22, 2024",
      author: "Dr. Marcus Johnson",
      category: "Staff Training",
      icon: <GraduationCap className="w-5 h-5 text-indigo-500" />,
    },
    {
      id: 13,
      title: "Technology Integration in Modern Dentistry",
      description:
        "Stay ahead with the latest dental technologies. Explore digital imaging, CAD/CAM systems, and practice management software to enhance patient care and operational efficiency.",
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "March 20, 2024",
      author: "Dr. Tech Smith",
      category: "Dental Trends",
      icon: <TrendingUp className="w-5 h-5 text-indigo-500" />,
    },
    {
      id: 14,
      title: "Dental Practice Cost Control Strategies",
      description:
        "Master cost control in your dental practice. Learn about overhead reduction, equipment maintenance, and efficient staffing to maximize profitability while maintaining quality care.",
      image:
        "https://images.unsplash.com/photo-1629909615184-74f495363b67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "March 18, 2024",
      author: "Gordon Chef",
      category: "Practice Management",
      icon: <BookOpen className="w-5 h-5 text-indigo-500" />,
    },
    {
      id: 15,
      title: "Personalized Dental Care Strategies",
      description:
        "Implement personalized care to enhance patient satisfaction. Tailor treatments and communication to individual needs for better outcomes and increased patient loyalty.",
      image:
        "https://images.unsplash.com/photo-1606265752439-1f18756aa8ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "March 16, 2024",
      author: "Dr. Sophie Turner",
      category: "Patient Experience",
      icon: <Users className="w-5 h-5 text-indigo-500" />,
    },
    {
      id: 16,
      title: "Zero-Waste Dental Practices",
      description:
        "Transform your clinic into a zero-waste operation. Discover recycling, digital records, and biodegradable products to reduce environmental impact while maintaining excellent dental care.",
      image:
        "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "March 14, 2024",
      author: "Eco Warrior",
      category: "Sustainability",
      icon: <Leaf className="w-5 h-5 text-indigo-500" />,
    },
  ];

  const categories = [
    "All Posts",
    "Dental Trends",
    "Practice Management",
    "Patient Experience",
    "Sustainability",
    "Dental Marketing",
    "Staff Training",
  ];

  // Filter posts based on search term and category
  const filteredPosts = blogPosts.filter((post) =>
    selectedCategory === "All Posts" ? true : post.category === selectedCategory
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: document.getElementById("blog-content").offsetTop - 100,
      behavior: "smooth",
    });
  };

  // Featured post (using the first post as featured)
  const featuredPost = blogPosts[0];

  // Component to render each blog card
  function BlogCard({ post, index }) {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group">
        {/* Blog Image */}
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white px-4 py-1 rounded-full text-xs sm:text-sm flex items-center gap-1.5">
              {post.icon}
              {post.category}
            </span>
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Blog Details */}
        <div className="p-5 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-indigo-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
            {post.description}
          </p>
          <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500">
            <div className="flex items-center">
              <div className="mr-1 sm:mr-2 text-indigo-400">
                <Users className="w-4 h-4" />
              </div>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <div className="mr-1 sm:mr-2 text-indigo-400">
                <Calendar className="w-4 h-4" />
              </div>
              <span>{post.date}</span>
            </div>
          </div>

          {/* Read More Link - Appears on hover */}
          <div className="mt-4 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
            <a
              href="#"
              className="inline-flex items-center text-indigo-600 font-medium text-sm"
            >
              Read Article
              <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  const heroProps = {
    badgeIcon: BookOpen,
    badgeText: 'Dental Health Insights',
    heading: 'Our Dental',
    headingHighlight: 'Health',
    headingEnd: 'Blog',
    description: 'Stay informed with the latest dental health tips, treatment innovations, and expert advice from our experienced team of dental professionals.',
    primaryButtonText: 'Explore Articles',
    primaryButtonAction: (e) => {
      e.preventDefault();
      const element = blogRef.current;
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    },
    secondaryButtonText: 'Subscribe',
    secondaryButtonIcon: BookOpen,
    secondaryButtonAction: () => {
      alert('Subscribe functionality would go here');
    },
    imageSrc: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    imageAlt: "Dental blog",
    floatingBadgeIcon: BookOpen,
    floatingBadgeTitle: "Weekly Updates",
    floatingBadgeText: "New articles every week",
    scrollToRef: blogRef,
    scrollText: "Browse Our Articles"
  };

    
  return (
    <div className="min-h-screen overflow-hidden">


<Hero {...heroProps} />


      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] md:h-[90vh] overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Main gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800" />

          {/* Animated particles */}
          <div className="absolute inset-0 opacity-20">
            <div className="particles-container">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${5 + Math.random() * 10}s`,
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Overlay image */}
          <div
            className="absolute inset-0 opacity-30 transform scale-105 animate-slow-pulse"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1629909615184-74f495363b67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "overlay",
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 via-transparent to-indigo-900/80" />

          {/* Decorative pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Animated wave */}
          <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
            <svg
              className="absolute bottom-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fill="#fff"
                fillOpacity="0.1"
                d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                className="animate-wave"
              ></path>
              <path
                fill="#fff"
                fillOpacity="0.2"
                d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                className="animate-wave-slow"
              ></path>
            </svg>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center text-center px-4 py-16 md:py-0">
          <div className="max-w-5xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-6 md:mb-8 animate-fade-in-down">
              <Sparkles className="w-4 h-4 text-indigo-300 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-white">
                Insights and Inspiration
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 text-white text-shadow-lg animate-text-gradient bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
              Dental Knowledge <span className="text-indigo-300">for Your</span>{" "}
              Practice
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-indigo-100 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed">
              Stay updated with the latest trends, tips, and strategies to grow
              your dental practice and provide exceptional care to your
              patients.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
              <button
                onClick={() => {
                  const blogSection = document.getElementById("blog-content");
                  blogSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 bg-white rounded-full text-indigo-700 font-bold text-sm sm:text-base md:text-lg shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="relative z-10">Explore Articles</span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>

              <button
                onClick={() => {
                  const featuredSection =
                    document.getElementById("featured-post");
                  featuredSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white/70 rounded-full text-white font-bold text-sm sm:text-base md:text-lg shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Featured Post
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>

            {/* Scroll Indicator */}
            <button
              onClick={() => {
                const blogSection = document.getElementById("blog-content");
                blogSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex flex-col items-center gap-2 text-base sm:text-lg font-medium text-white hover:text-indigo-200 transition-colors"
            >
              <span>Scroll to Explore</span>
              <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
            </button>

            {/* Floating Elements */}
            <div className="absolute -left-20 top-1/4 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute -right-20 top-1/3 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <div ref={blogRef} id="blog-content" className="relative py-16 md:py-24 px-4">
        {/* Background pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%234f46e5' fill-opacity='0.03'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundAttachment: "fixed",
          }}
        ></div>

        <div className="container mx-auto relative z-10">
          {/* Featured Post Section */}
          <div id="featured-post" className="mb-16 md:mb-24">
            <div className="text-center mb-10 md:mb-16">
              <div className="inline-flex items-center justify-center mb-4">
                <div className="h-[1px] w-8 sm:w-10 bg-indigo-500"></div>
                <span className="mx-3 sm:mx-4 text-sm sm:text-base text-indigo-600 font-semibold">
                  FEATURED ARTICLE
                </span>
                <div className="h-[1px] w-8 sm:w-10 bg-indigo-500"></div>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 leading-tight">
                Discover Our Latest{" "}
                <span className="text-indigo-600">Insights</span>
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl group">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-full overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 to-transparent opacity-0 md:opacity-70"></div>
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white px-4 py-1.5 rounded-full text-sm flex items-center gap-2">
                      {featuredPost.icon}
                      {featuredPost.category}
                    </span>
                  </div>

                  {/* Mobile overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:hidden"></div>

                  {/* Mobile title - visible only on small screens */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:hidden">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {featuredPost.title}
                    </h3>
                    <div className="flex items-center text-white/80 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{featuredPost.date}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                  {/* Desktop title - hidden on small screens */}
                  <h3 className="hidden md:block text-2xl sm:text-3xl font-bold text-indigo-900 mb-4 group-hover:text-indigo-600 transition-colors">
                    {featuredPost.title}
                  </h3>

                  <p className="text-gray-600 mb-6 text-sm sm:text-base">
                    {featuredPost.description}
                  </p>

                  <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-indigo-500" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center hidden md:flex">
                      <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                      <span>{featuredPost.date}</span>
                    </div>
                  </div>

                  <a
                    href="#"
                    className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700 transition-colors group/link"
                  >
                    Read Full Article
                    <ChevronRight className="ml-1 w-5 h-5 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-12 md:mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center mb-4">
                <div className="h-[1px] w-8 sm:w-10 bg-indigo-500"></div>
                <span className="mx-3 sm:mx-4 text-sm sm:text-base text-indigo-600 font-semibold">
                  BROWSE BY CATEGORY
                </span>
                <div className="h-[1px] w-8 sm:w-10 bg-indigo-500"></div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-md"
                      : "border border-indigo-900 text-indigo-900 hover:bg-gradient-to-br hover:from-indigo-600/10 hover:to-purple-700/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="mb-12 md:mb-16">
            {currentPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {currentPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex justify-center items-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Articles Found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  We couldn't find any articles matching your search criteria.
                  Try adjusting your search terms or browse by category.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      page === currentPage
                        ? "bg-gradient-to-br from-indigo-700 to-purple-700 text-white shadow-md transform scale-110"
                        : "bg-white border border-indigo-300 text-indigo-700 hover:border-indigo-700 hover:shadow-sm"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-indigo-900 to-purple-800 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2 -.895-2-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}
          ></div>

          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float-y ${
                    Math.random() * 5 + 3
                  }s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div>
            <div className="inline-flex items-center justify-center mb-4 sm:mb-6">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400 animate-pulse" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Stay Updated with Our Newsletter
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-8 sm:mb-10">
              Subscribe to receive the latest dental articles, tips, and
              insights directly in your inbox.
            </p>

            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-800"
                />
                <button className="bg-white text-indigo-900 hover:bg-indigo-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-indigo-200 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
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

export default Blog;
