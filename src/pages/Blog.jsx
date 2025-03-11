import React, { useState, useEffect, useRef } from "react";
import {
  Bluetooth as Tooth,
  ChevronRight,
  MessageCircle,
  Calendar,
  Heart,
  BookOpen,
  TrendingUp,
  Users,
  Leaf,
  GraduationCap,
  Mail,
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

  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState("idle");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    setSubscriptionStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubscriptionStatus("success");
      setEmail("");
    } catch (error) {
      setSubscriptionStatus("error");
    } finally {
      setIsSubscribing(false);
    }
  };

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
    badgeText: "Dental Health Insights",
    heading: "Our Dental",
    headingHighlight: "Health",
    headingEnd: "Blog",
    description:
      "Stay informed with the latest dental health tips, treatment innovations, and expert advice from our experienced team of dental professionals.",
    primaryButtonText: "Explore Articles",
    primaryButtonAction: (e) => {
      e.preventDefault();
      const element = blogRef.current;
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    secondaryButtonText: "Subscribe",
    secondaryButtonIcon: BookOpen,
    secondaryButtonAction: () => {
      alert("Subscribe functionality would go here");
    },
    imageSrc:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    imageAlt: "Dental blog",
    floatingBadgeIcon: BookOpen,
    floatingBadgeTitle: "Weekly Updates",
    floatingBadgeText: "New articles every week",
    scrollToRef: blogRef,
    scrollText: "Browse Our Articles",
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <Hero {...heroProps} />

      {/* Blog Content */}
      <div
        ref={blogRef}
        id="blog-content"
        className="py-12 md:py-16 lg:py-20 relative overflow-hidden flex items-center"
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%234f46e5' fill-opacity='0.05'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundAttachment: "fixed",
          }}
        ></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div id="featured-post" className="mb-16 md:mb-24" data-aos="fade-up">
            {/* Section Header */}
            <div
              className="text-center mb-12 md:mb-16 lg:mb-20"
              data-aos="fade-up"
            >
              <div className="inline-flex items-center justify-center mb-6">
                <div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
                <span className="mx-4 text-sm md:text-base text-indigo-600 font-semibold uppercase tracking-wider">
                  FEATURED ARTICLE
                </span>
                <div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
              </div>

              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-indigo-900 mb-6 leading-tight"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Discover Our{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Latest Insights
                </span>
              </h2>
              <p
                className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Discover why our patients love our dental services and keep
                coming back. Here are some stories from people who have
                transformed their smiles with us.
              </p>
            </div>

            <div
              className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl group"
              data-aos="fade-up"
              data-aos-delay="400"
            >
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
          <div
            className="mb-12 md:mb-16"
            data-aos="fade-up"
            data-aos-delay="100"
          >
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {currentPosts.map((post, index) => (
                <div
                  key={post.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <BlogCard post={post} index={index} />
                </div>
              ))}
            </div>
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
            <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Join Our Community
            </h4>
            <p className="text-lg md:text-xl text-white/90 mb-6">
              Get the latest dental insights and exclusive content delivered to
              your inbox.
            </p>
            <div className="flex gap-4 items-center text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Weekly Updates</span>
              </div>
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>Curated Content</span>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-delay="400">
            <form
              onSubmit={handleSubscribe}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <div className="space-y-4">
                <label htmlFor="email" className="text-lg font-medium block">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                    disabled={isSubscribing}
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribing || !email}
                  className={`w-full rounded-xl px-6 py-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out ${
                    isSubscribing
                      ? "opacity-75 cursor-not-allowed"
                      : "hover:from-indigo-700 hover:via-violet-700 hover:to-purple-700"
                  }`}
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe Now"}
                </button>

                {subscriptionStatus === "success" && (
                  <p className="text-green-400 text-center mt-2">
                    Successfully subscribed! Check your email for confirmation.
                  </p>
                )}

                {subscriptionStatus === "error" && (
                  <p className="text-red-400 text-center mt-2">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
