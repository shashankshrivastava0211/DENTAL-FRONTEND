import {
  Shield,  Smile,
  Sparkles,
  Brush as Toothbrush,
  HeartPulse,
  Brain,
  Baby,
  Stethoscope,
} from "lucide-react";

export const services = [
  {
    id: "general-dentistry",
    icon: <Toothbrush className="w-10 h-10 text-white" />,
    title: "General Dentistry",
    description:
      "Comprehensive dental care including cleanings, fillings, and preventive treatments to maintain your oral health and prevent future problems.",
    features: [
      "Regular Check-ups & Examinations",
      "Professional Dental Cleaning",
      "Cavity Fillings & Restorations",
      "Preventive Care & Education",
    ],
    longDescription:
      "Our general dentistry services form the foundation of good oral health. We focus on preventive care to help you maintain a healthy smile for life. Regular check-ups allow us to detect and address issues early, while professional cleanings remove plaque and tartar that regular brushing can't reach. We use the latest techniques and materials for fillings and restorations to ensure durability and natural appearance.",
    benefits: [
      "Early detection of dental issues",
      "Prevention of tooth decay and gum disease",
      "Maintenance of overall oral health",
      "Professional advice on home care techniques",
    ],
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    accentColor: "text-blue-600",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "cosmetic-dentistry",
    icon: <Sparkles className="w-10 h-10 text-white" />,
    title: "Cosmetic Dentistry",
    description:
      "Transform your smile with our advanced cosmetic dental procedures designed to enhance the appearance of your teeth and give you the confidence to smile brightly.",
    features: [
      "Professional Teeth Whitening",
      "Porcelain Veneers & Laminates",
      "Dental Bonding & Contouring",
      "Complete Smile Makeover",
    ],
    longDescription:
      "Our cosmetic dentistry services are designed to enhance the appearance of your smile while maintaining optimal oral health. From professional whitening that removes years of stains to custom porcelain veneers that transform your entire smile, we offer solutions tailored to your aesthetic goals. Our dentists combine artistic vision with technical expertise to create natural-looking results that complement your facial features.",
    benefits: [
      "Enhanced smile aesthetics",
      "Increased self-confidence",
      "Correction of discoloration and stains",
      "Repair of chipped or misshapen teeth",
    ],
    color: "from-purple-500 to-indigo-600",
    bgColor: "bg-purple-50",
    accentColor: "text-purple-600",
    image:
      "https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "dental-implants",
    icon: <Shield className="w-10 h-10 text-white" />,
    title: "Dental Implants",
    description:
      "Permanent, natural-looking solutions for missing teeth that restore both function and appearance, providing a long-lasting alternative to dentures or bridges.",
    features: [
      "Single Tooth Implant Restorations",
      "Multiple Teeth Replacement",
      "Full Arch Reconstruction",
      "Implant Maintenance & Care",
    ],
    longDescription:
      "Dental implants are the gold standard for replacing missing teeth. These titanium posts are surgically placed in the jawbone to serve as artificial tooth roots, providing a strong foundation for fixed replacement teeth. Unlike traditional dentures, implants look, feel, and function like natural teeth. They also help preserve bone structure and prevent the facial sagging that often occurs with tooth loss.",
    benefits: [
      "Preservation of jawbone structure",
      "Natural look and feel",
      "Improved chewing and speaking ability",
      "Long-lasting solution for missing teeth",
    ],
    color: "from-indigo-500 to-blue-600",
    bgColor: "bg-indigo-50",
    accentColor: "text-indigo-600",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: "emergency-care",
    icon: <HeartPulse className="w-10 h-10 text-white" />,
    title: "Emergency Care",
    description:
      "24/7 emergency dental services for immediate care when you need it most, addressing severe pain, trauma, or other urgent dental situations promptly.",
    features: [
      "Immediate Pain Relief Treatment",
      "Trauma & Injury Management",
      "Emergency Surgical Procedures",
      "After-hours Support & Care",
    ],
    longDescription:
      "Dental emergencies can happen at any time, and prompt treatment is essential to relieve pain and prevent further damage. Our emergency dental care services are available 24/7 to address urgent situations such as severe toothaches, knocked-out teeth, broken dental work, or injuries to the mouth. Our experienced team is equipped to handle all types of dental emergencies with compassion and efficiency.",
    benefits: [
      "Rapid response to dental emergencies",
      "Immediate relief from severe pain",
      "Prevention of further complications",
      "24/7 availability for urgent situations",
    ],
    color: "from-red-500 to-pink-600",
    bgColor: "bg-red-50",
    accentColor: "text-red-600",
    image:
      "https://images.unsplash.com/photo-1629909615184-74f495363b67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "orthodontics",
    icon: <Smile className="w-10 h-10 text-white" />,
    title: "Orthodontics",
    description:
      "Straighten your teeth and achieve the perfect smile with our comprehensive orthodontic treatments, including traditional braces and modern clear aligners.",
    features: [
      "Traditional Metal & Ceramic Braces",
      "Clear Aligners & Invisible Options",
      "Retainers & Maintenance Devices",
      "Bite Correction & Alignment",
    ],
    longDescription:
      "Our orthodontic services help patients of all ages achieve straighter teeth and improved bite alignment. We offer a range of options from traditional metal braces to nearly invisible clear aligners, allowing you to choose the solution that best fits your lifestyle. Our orthodontic treatments not only enhance the appearance of your smile but also improve oral function and make teeth easier to clean, reducing the risk of decay and gum disease.",
    benefits: [
      "Improved dental alignment and function",
      "Enhanced facial aesthetics",
      "Correction of bite issues",
      "Easier cleaning and maintenance of teeth",
    ],
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-50",
    accentColor: "text-cyan-600",
    image:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "oral-surgery",
    icon: <Brain className="w-10 h-10 text-white" />,
    title: "Oral Surgery",
    description:
      "Expert surgical procedures for complex dental issues performed by our skilled specialists in a comfortable, state-of-the-art environment.",
    features: [
      "Wisdom Teeth Extraction",
      "Complex Dental Extractions",
      "Corrective Jaw Surgery",
      "Bone Grafting & Regeneration",
    ],
    longDescription:
      "Our oral surgery services address complex dental issues that require surgical intervention. From wisdom teeth extraction to corrective jaw surgery, our specialists use advanced techniques and technology to ensure precise, effective treatment with minimal discomfort. We provide comprehensive pre-operative counseling and post-operative care to ensure a smooth recovery and optimal results.",
    benefits: [
      "Resolution of complex dental issues",
      "Relief from impacted teeth problems",
      "Correction of jaw abnormalities",
      "Preparation for dental implants",
    ],
    color: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-50",
    accentColor: "text-indigo-600",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
];

export const specialties = [
  {
    title: "Pediatric Dentistry",
    icon: <Baby className="w-8 h-8 text-indigo-600" />,
    description:
      "Specialized dental care for children in a friendly environment",
  },
  {
    title: "Periodontics",
    icon: <Stethoscope className="w-8 h-8 text-indigo-600" />,
    description: "Treatment for gum disease and oral inflammation",
  },
  {
    title: "Endodontics",
    icon: <Shield className="w-8 h-8 text-indigo-600" />,
    description: "Root canal therapy and treatments for dental pulp",
  },
  {
    title: "Prosthodontics",
    icon: <Sparkles className="w-8 h-8 text-indigo-600" />,
    description: "Replacement of missing teeth with artificial devices",
  },
];
