import { Shield, Smile, Sparkles, Bone, HeartPulse, Brain, Baby, Stethoscope, Telescope, Brush, AlarmClock, X, LayoutGrid, Thermometer, Anchor, Package, Activity, Armchair, Backpack, Bell, Bluetooth as Tooth, Droplet } from "lucide-react";

export const services = [
  {
    id: "root-canals",
    icon: <Thermometer className="w-10 h-10 text-white" />,
    title: "Root Canals",
    description: "Advanced endodontic treatments to save infected teeth and relieve pain effectively.",
    features: ["Single visit RCT", "Multiple visits RCT", "Re-root canal treatment", "Microscopic endodontics"],
    longDescription: "Our root canal treatments use state-of-the-art technology to preserve your natural teeth. From single-visit procedures to complex retreatments, we ensure pain-free experiences and long-term dental health preservation.",
    benefits: ["Pain relief and infection control", "Preservation of natural teeth", "Advanced rotary instrumentation", "Digital working length determination"],
    color: "from-amber-600 to-amber-800",
    bgColor: "bg-amber-50",
    accentColor: "text-amber-600",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "crowns",
    icon: <Sparkles className="w-10 h-10 text-white" />,
    title: "Dental Crowns",
    description: "Restore damaged teeth with durable, natural-looking crowns for perfect form and function.",
    features: ["Metal crowns", "Metal ceramic crowns", "Full ceramic crowns", "Zirconia crowns"],
    longDescription: "We offer comprehensive crown solutions using advanced materials that blend seamlessly with your natural teeth. Our CAD/CAM technology ensures perfect fit and aesthetic matching for long-lasting restorations.",
    benefits: ["Protection for weakened teeth", "Natural appearance", "Custom shade matching", "10+ years durability"],
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-50",
    accentColor: "text-teal-600",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "cosmetic-dentistry",
    icon: <Smile className="w-10 h-10 text-white" />,
    title: "Cosmetic Dentistry",
    description: "Transform your smile with our aesthetic dental solutions for a confident, radiant appearance.",
    features: ["Teeth whitening", "Tooth-colored fillings", "Porcelain veneers", "Dental laminates"],
    longDescription: "From subtle enhancements to complete smile makeovers, our cosmetic treatments combine art and science to create beautiful, natural-looking results that boost your confidence and facial aesthetics.",
    benefits: ["Instant smile transformation", "Stain removal", "Chip and crack repair", "Personalized smile design"],
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-50",
    accentColor: "text-pink-600",
    image: "https://images.unsplash.com/photo-1588774069410-84ae30757c8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "fillings",
    icon: <Droplet className="w-10 h-10 text-white" />, 
    title: "Dental Fillings",
    description: "Effective solutions for cavities using modern materials that match your natural tooth color.",
    features: ["Composite tooth-colored fillings", "Silver amalgam fillings", "Ceramic inlays & onlays", "Minimally invasive techniques"],
    longDescription: "We provide durable, aesthetic filling solutions that restore both function and appearance. Using tooth-colored composite resins and ceramic materials, we ensure your fillings are virtually invisible while providing strong protection against further decay.",
    benefits: ["Natural-looking results", "Preservation of tooth structure", "Quick single-visit solutions", "Mercury-free options"],
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-50",
    accentColor: "text-emerald-600",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "dental-implants",
    icon: <Anchor className="w-10 h-10 text-white" />,
    title: "Dental Implants",
    description: "Permanent tooth replacement solutions that mimic natural teeth in look, feel, and function.",
    features: ["Single tooth implants", "Implant-supported bridges", "Full arch rehabilitation", "Bone grafting solutions"],
    longDescription: "Our implantology services provide lifelong solutions for missing teeth. Using premium titanium implants and digital planning technology, we create stable foundations for artificial teeth that prevent bone loss and restore complete chewing function.",
    benefits: ["Prevents bone resorption", "Natural chewing ability", "Permanent solution", "Easy maintenance"],
    color: "from-slate-600 to-gray-700",
    bgColor: "bg-slate-50",
    accentColor: "text-slate-600",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "teeth-replacement",
    icon: <Package className="w-10 h-10 text-white" />,
    title: "Teeth Replacement",
    description: "Comprehensive solutions for missing teeth ranging from removable to fixed prosthetics.",
    features: ["Complete dentures", "Partial dentures", "Fixed bridges", "Flexible denture options"],
    longDescription: "We offer customized tooth replacement options to suit every need and budget. From traditional dentures to advanced bridgework, our solutions restore your smile's functionality while maintaining natural facial contours.",
    benefits: ["Restored chewing efficiency", "Improved speech clarity", "Facial support maintenance", "Customized fit"],
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50",
    accentColor: "text-violet-600",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "extractions",
    icon: <Bone className="w-10 h-10 text-white" />,
    title: "Tooth Extractions",
    description: "Safe and painless removal of damaged or problematic teeth using advanced techniques.",
    features: ["Wisdom teeth removal", "Surgical extractions", "Simple extractions", "Post-extraction care"],
    longDescription: "Our gentle extraction procedures ensure minimal discomfort and quick recovery. Whether removing impacted wisdom teeth or severely decayed teeth, we use precise techniques to preserve surrounding tissues and bone structure.",
    benefits: ["Pain management expertise", "Prevention of dental crowding", "Infection control", "Socket preservation"],
    color: "from-orange-500 to-amber-600",
    bgColor: "bg-orange-50",
    accentColor: "text-orange-600",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "mouth-guards",
    icon: <Shield className="w-10 h-10 text-white" />,
    title: "Mouth Guards",
    description: "Custom-fitted oral appliances for protection during sports and nighttime grinding.",
    features: ["Sports guards", "Night guards", "Bruxism splints", "Custom-fit solutions"],
    longDescription: "We create personalized mouth protection devices using digital impressions for perfect fit and comfort. Whether for athletic protection or bruxism management, our guards help prevent dental injuries and enamel wear.",
    benefits: ["Prevents tooth fractures", "Reduces jaw pain", "Customized comfort", "Durable materials"],
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    accentColor: "text-blue-600",
    image: "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "pediatric-dentistry",
    icon: <Baby className="w-10 h-10 text-white" />,
    title: "Pediatric Care",
    description: "Specialized dental care for children focusing on prevention and positive experiences.",
    features: ["Child-friendly fillings", "Dental sealants", "Pulp therapy", "Fluoride treatments"],
    longDescription: "Our pediatric specialists create a welcoming environment for young patients, using behavior management techniques and preventive care to establish lifelong healthy dental habits. We focus on early intervention and education.",
    benefits: ["Cavity prevention", "Growth monitoring", "Pain-free treatments", "Positive dental experiences"],
    color: "from-cyan-500 to-sky-600",
    bgColor: "bg-cyan-50",
    accentColor: "text-cyan-600",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "gum-care",
    icon: <HeartPulse className="w-10 h-10 text-white" />,
    title: "Periodontal Care",
    description: "Comprehensive treatments for healthy gums and prevention of periodontal disease.",
    features: ["Deep cleaning (SRP)", "Gum surgery", "Crown lengthening", "Laser therapy"],
    longDescription: "Our periodontal specialists focus on preserving gum health through scaling, root planing, and advanced surgical techniques. We offer laser treatments for minimally invasive gum disease management and cosmetic gum reshaping.",
    benefits: ["Halts gum recession", "Reduces pocket depth", "Improves smile aesthetics", "Prevents bone loss"],
    color: "from-red-500 to-rose-600",
    bgColor: "bg-red-50",
    accentColor: "text-red-600",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "orthodontics",
    icon: <LayoutGrid className="w-10 h-10 text-white" />,
    title: "Orthodontics",
    description: "Advanced alignment solutions for perfectly aligned teeth and improved bite function.",
    features: ["Invisible aligners", "Metal braces", "Ceramic braces", "Retention systems"],
    longDescription: "We offer modern orthodontic solutions for patients of all ages, using cutting-edge technology like 3D smile planning and clear aligner therapy. Our treatments improve both aesthetics and oral function through precise tooth movement.",
    benefits: ["Straightened smile", "Improved bite function", "Customized treatment plans", "Discreet options"],
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    accentColor: "text-purple-600",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "dental-imaging",
    icon: <X className="w-10 h-10 text-white" />,
    title: "Dental Imaging",
    description: "Advanced diagnostic imaging for accurate treatment planning and monitoring.",
    features: ["Digital X-rays", "OPG", "CBCT scans", "Intraoral cameras"],
    longDescription: "Our state-of-the-art imaging technology provides detailed views of oral structures while minimizing radiation exposure. From routine bitewing X-rays to 3D CBCT scans, we ensure precise diagnostics for optimal treatment outcomes.",
    benefits: ["Low radiation exposure", "Instant digital results", "3D treatment planning", "Early problem detection"],
    color: "from-gray-500 to-slate-600",
    bgColor: "bg-gray-50",
    accentColor: "text-gray-600",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"


  }
];


export const specialties = [
  {
    title: "Endodontics",
    icon: <Shield className="w-8 h-8 text-indigo-600" />,
    description: "Root canal treatments and dental pulp preservation"
  },
  {
    title: "Periodontology",
    icon: <Stethoscope className="w-8 h-8 text-indigo-600" />,
    description: "Gum disease treatment and implantology"
  },
  {
    title: "Orthodontics",
    icon: <LayoutGrid className="w-8 h-8 text-indigo-600" />,
    description: "Teeth alignment with braces and clear aligners"
  },
  {
    title: "Pedodontics",
    icon: <Baby className="w-8 h-8 text-indigo-600" />,
    description: "Specialized dental care for children"
  },
  {
    title: "Oral Surgery",
    icon: <Bone className="w-8 h-8 text-indigo-600" />,
    description: "Complex extractions and surgical procedures"
  },
  {
    title: "Prosthodontics",
    icon: <Smile className="w-8 h-8 text-indigo-600" />,
    description: "Restoration and replacement of missing teeth"
  }
];
