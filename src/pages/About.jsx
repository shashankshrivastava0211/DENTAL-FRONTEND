import React, { useRef, useEffect } from "react";
import {
	Award,
	Heart,
	Users,
	Clock,
	CheckCircle,
	Shield,
	Star,
	Smile,
	Sparkles,
	Stethoscope,
	CalendarCheck,
} from "lucide-react";
import { Bluetooth as Tooth, UserPlus } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero2 from "../components/Hero2";
import { useNavigate } from "react-router-dom";

export const About = () => {
	const teamRef = useRef(null);
	const missionRef = useRef(null);
	const navigate = useNavigate();

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
			name: "Dr. Pritesh Jagtap",
			role: "Root Canal Specialist",
			image: "/images/endodentist.jpeg",

			specialization: "BDS, MDS Conservative Dentistry & Endodontics",
			bio: "Specialized in advanced root canal treatments with a focus on preserving natural teeth.",
		},
		{
			name: "Dr. Santosh Martande",
			role: "Gum Specialist & Implantologist",
			image: "/images/Periodontist.jpg",
			specialization: "BDS, MDS Periodontology",
			bio: "Expert in gum treatments and dental implant procedures with years of experience.",
		},
		{
			name: "Dr. Swathi Pissay",
			role: "Braces Specialist",
			image: "/images/Orthodontist.jpg",
			specialization: "BDS, MDS Orthodontics",
			bio: "Specialized in orthodontic treatments and creating beautiful, aligned smiles.",
		},
		{
			name: "Dr. Priyadarshani Thakur",
			role: "Children's Specialist",
			image:
				"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&h=300",
			specialization: "BDS, MDS Pedodontics",
			bio: "Dedicated to providing specialized dental care for children in a comfortable environment.",
		},
		// {
		//   name: "Dr. Prathamesh Bhujbal",
		//   role: "Oral Surgeon",
		//   image:
		//     "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&h=300",
		//   specialization: "BDS, MDS Oral Surgery",
		//   bio: "Expert in oral surgical procedures with a focus on patient comfort and recovery.",
		// },
	];

	const timeline = [
		{
			year: "2014",
			title: "Clinic Founded",
			description:
				"Established with a mission to preserve natural teeth through advanced, pain-free root canal treatments.",
		},
		{
			year: "2016",
			title: "Expansion & Recognition",
			description:
				"Expanded services with new specialties and recognized as a center of excellence for endodontic care.",
		},
		{
			year: "2018",
			title: "98%+ Patient Satisfaction",
			description:
				"Maintained a high patient satisfaction rating, focusing on pain-free procedures and quality treatment.",
		},
		{
			year: "2020",
			title: "Digital Innovation & Sedation Dentistry",
			description:
				"Integrated advanced digital dentistry solutions and introduced sedation dentistry for anxious patients.",
		},
		{
			year: "2024",
			title: "Community Milestone & Natural Teeth Preservation",
			description:
				"Achieved an excellent track record in saving natural teeth and launched a community outreach program.",
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
			title: "Pain-Free Treatment",
			description:
				"Focus on comfortable, pain-free procedures with sedation options available.",
		},
		{
			icon: <Clock className="w-6 h-6 text-indigo-600" />,
			title: "Convenient Hours",
			description: "Flexible scheduling to accommodate your busy lifestyle.",
		},
		{
			icon: <Smile className="w-6 h-6 text-indigo-600" />,
			title: "Patient Satisfaction",
			description:
				"98%+ patient satisfaction rate with focus on comfortable care.",
		},
		{
			icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
			title: "Natural Preservation",
			description:
				"Committed to preserving natural teeth through advanced treatments.",
		},
	];

	const values = [
		{
			icon: <Heart className="w-6 h-6 text-white" />,
			title: "Honesty",
			description: "We believe in transparent and honest patient care.",
		},
		{
			icon: <Star className="w-6 h-6 text-white" />,
			title: "Excellence",
			description: "We strive for excellence in all our procedures.",
		},
		{
			icon: <CheckCircle className="w-6 h-6 text-white" />,
			title: "Integrity",
			description: "We maintain the highest standards of integrity.",
		},
		{
			icon: <Stethoscope className="w-6 h-6 text-white" />,
			title: "Compassion",
			description: "We provide care with genuine compassion.",
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
const handleClick =(click)=>{
  if(click==="appoinment"){
    navigate("/")
  }
}
	return (
		<div className="min-h-screen overflow-hidden">
			{/* Hero Section */}
			<Hero2 {...heroProps} />

			{/* Who We Are Section */}
			<section className="py-12 md:py-16 lg:max-h-[90%] relative overflow-hidden flex items-center">
				{/* Background Elements */}
				<div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50 to-indigo-50 opacity-70"></div>
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.1),transparent_50%)]"></div>
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden">
					<div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
					<div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl"></div>
				</div>

				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<div className="flex flex-wrap justify-between">
						{/* Left Content */}
						<div
							className="w-full lg:w-[60%] mb-8 lg:mb-0  flex flex-col gap-5"
							data-aos="fade-right">
							<h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent tracking-wide leading-relaxed">
								<span className="border-b-4 border-indigo-900 text-indigo-900 ">
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
								32 Pearls Dental Clinic stands out from competitors by offering
								highly personalized care across all dental specialties. We
								provide comprehensive dental services to help you achieve and
								maintain a healthy, beautiful smile that lasts a lifetime.
							</p>

							<div className="border-l-4 border-indigo-600 pl-6 py-4 mt-8 bg-indigo-50 rounded-r-lg">
								<h3 className="text-xl sm:text-2xl font-semibold text-indigo-900 mb-4">
									<span className="border-b-4 border-indigo-900 pb-1">
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

						{/* Right Content */}
						<div
							className="w-full lg:w-[35%] flex flex-col gap-5"
							data-aos="fade-left">
							{/* Strategy Card */}
							<div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg group hover:bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 transition-all duration-500">
								<div className="flex items-start gap-6">
									<div className="bg-indigo-100 p-3 rounded-full group-hover:bg-white transition-colors duration-300">
										<Tooth className="text-indigo-600 text-2xl sm:text-3xl group-hover:text-indigo-600" />
									</div>
									<div>
										<h4 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-white">
											Comprehensive Care
										</h4>
										<p className="text-gray-700 leading-relaxed group-hover:text-white">
											From preventive care to advanced treatments, we offer a
											full spectrum of dental services including cleanings,
											fillings, crowns, implants, and cosmetic dentistry.
										</p>
									</div>
								</div>
							</div>

							{/* Approach Card */}
							<div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg group hover:bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 transition-all duration-500">
								<div className="flex items-start gap-6">
									<div className="bg-indigo-100 p-3 rounded-full group-hover:bg-white transition-colors duration-300">
										<UserPlus className="text-indigo-600 text-2xl sm:text-3xl group-hover:text-indigo-600" />
									</div>
									<div>
										<h4 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-white">
											Patient-First Approach
										</h4>
										<p className="text-gray-700 leading-relaxed group-hover:text-white">
											We prioritize your comfort and understanding, taking time
											to explain procedures and create personalized treatment
											plans that fit your needs and schedule.
										</p>
									</div>
								</div>
							</div>

							{/* Logo */}
							<div className="flex justify-center items-center bg-white p-4 rounded-2xl shadow-lg">
								<div className="mr-1.5 sm:mr-2 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1 sm:p-1.5 shadow-md">
									<Stethoscope
										className={`h-28 w-28 md:h-28 md:w-28 text-white`}
										aria-hidden="true"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Why choose us */}
			<section className="py-12 md:py-16 relative overflow-hidden flex items-center">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="text-4xl text-center font-bold text-indigo-900 mb-6">
								Why Patients &nbsp;
								<span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
									Choose Us
								</span>
							</h2>
							<p className="text-gray-600 text-center mb-8">
								Experience the perfect blend of modern dentistry and
								personalized care. Our commitment to excellence makes us the
								preferred choice for dental health.
							</p>
							<div className="grid sm:grid-cols-2 gap-6">
								{features.map((feature, index) => (
									<div
										key={index}
										className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-sm">
										<div className="bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 p-2 rounded-lg">
											{feature.icon}
										</div>
										<div>
											<h3 className="font-semibold text-gray-900 mb-1">
												{feature.title}
											</h3>
											<p className="text-sm text-gray-600">
												{feature.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="relative">
							<img
								src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800"
								alt="Dental Treatment"
								className="rounded-2xl shadow-2xl"
							/>
							<div
								className="absolute -bottom-6 right-4 sm:right-10 bg-white p-6 rounded-xl shadow-lg max-w-xs"
								data-aos="fade-up"
								data-aos-delay="300">
								<div className="flex items-center gap-4 mb-4">
									<div className="bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 p-3 rounded-lg">
										<CalendarCheck className="w-6 h-6 text-indigo-600" />
									</div>
									<a
										href="/book-appointment"
										className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-300">
										Book Your Visit
									</a>
								</div>
								<p className="text-sm text-gray-600">
									Schedule your appointment online and get started on your
									journey to a healthier smile.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section
				ref={teamRef}
				className="py-12 md:py-16 lg:py-20 relative overflow-hidden flex items-center">
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
						data-aos="fade-up">
						<div className="inline-flex items-center justify-center mb-6">
							<div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
							<span className="mx-4 text-sm md:text-base text-indigo-600 font-semibold uppercase tracking-wider">
								Our Professionals
							</span>
							<div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
						</div>

						<h2
							className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-indigo-900 mb-6 leading-tight"
							data-aos="fade-up"
							data-aos-delay="200">
							Meet Our{" "}
							<span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
								Expert Team
							</span>
						</h2>
						<p
							className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg"
							data-aos="fade-up"
							data-aos-delay="300">
							Our experienced team of dental professionals is committed to
							providing you with exceptional dental care and beautiful, healthy
							smiles.
						</p>
					</div>

					{/* Team Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
						{team.map((member, index) => (
							<div
								key={index}
								className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
								data-aos="fade-up"
								data-aos-delay={index * 100}>
								{/* Image with Hover Translate */}
								<div className="overflow-hidden rounded-t-2xl relative">
									<img
										src={member.image}
										alt={member.name}
										className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
									/>

									{/* Hover Overlay (Specialization and Bio) */}
									<div className="absolute inset-0   bg-gradient-to-t from-indigo-900/80 via-indigo-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										<div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
											<p className="text-white/80 text-base md:text-sm mb-3">
												{member.specialization}
											</p>
											<p className="text-white/90 text-base md:text-sm line-clamp-4">
												{member.bio}
											</p>
										</div>
									</div>
								</div>

								{/* Name and Department (Always Visible) */}
								<div className="p-4 bg-white">
									<h3 className="text-lg font-semibold text-black mb-1">
										{member.name}
									</h3>
									<p className="text-sm text-indigo-600 font-medium">
										{member.role}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Timeline Section */}
			<section className="py-12 md:py-16 lg:py-20 relative overflow-hidden flex items-center">
				{/* Background pattern */}
				<div
					className="absolute inset-0 opacity-10"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%234f46e5' fill-opacity='0.4'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/svg%3E")`,
						backgroundAttachment: "fixed",
					}}></div>

				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					{/* Section Header */}
					<div
						className="text-center mb-12 md:mb-16 lg:mb-20"
						data-aos="fade-up">
						<div className="inline-flex items-center justify-center mb-6">
							<div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
							<span className="mx-4 text-sm md:text-base text-indigo-600 font-semibold uppercase tracking-wider">
								Our History
							</span>
							<div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
						</div>

						<h2
							className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-indigo-900 mb-6 leading-tight"
							data-aos="fade-up"
							data-aos-delay="200">
							Our Journey{" "}
							<span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
								of Excellence
							</span>
						</h2>
						<p
							className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg"
							data-aos="fade-up"
							data-aos-delay="300">
							A timeline of our growth and achievements over the years as we
							continue to provide exceptional dental care to our community..
						</p>
					</div>

					<div className="max-w-6xl mx-auto relative">
						{/* Timeline Line */}
						<div className="absolute left-8 md:left-1/2 top-0 h-full w-0.5 bg-indigo-200"></div>

						{timeline.map((item, index) => (
							<div
								key={index}
								className={`flex items-start mb-12 last:mb-0 ${
									index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
								}`}
								data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
								data-aos-delay={index * 100}>
								<div
									className={`pl-16 md:pl-0 md:w-1/2 ${
										index % 2 === 0 ? "md:pr-14 md:text-right" : "md:pl-14"
									}`}>
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

								<div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white shadow-md"></div>

								<div className="w-1/2"></div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Mission & Vision */}
			<section ref={missionRef} className="py-12 md:py-16 lg:py-20 relative overflow-hidden flex items-center">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					{/* Section Header */}
					<div className="text-center mb-12" data-aos="fade-up">
						<div className="inline-flex items-center justify-center mb-6">
							<div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
							<span className="mx-4 text-sm md:text-base text-indigo-600 font-semibold uppercase tracking-wider">
								Our Purpose
							</span>
							<div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
						</div>

						<h2
							className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-indigo-900 mb-6 leading-tight"
							data-aos="fade-up"
							data-aos-delay="200">
							Our Mission &{" "}
							<span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
								Vision
							</span>
						</h2>
						<p
							className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg"
							data-aos="fade-up"
							data-aos-delay="300">
							We are committed to delivering outstanding dental care that
							transforms lives through honesty, compassion, quality, and
							integrity.
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
										<Heart className="w-6  h-6 text-indigo-600 mt-1" />
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
							<div className="bg-white p-8 rounded-2xl shadow-lg">
								<h3 className="text-2xl font-bold mb-6 text-indigo-900 border-b-4 border-indigo-600 pb-2 inline-block">
									Our Vision
								</h3>
								<p className="text-gray-700 leading-relaxed mb-8">
									Our vision is to deliver outstanding, patient-focused dental
									care in a warm and welcoming environment. By leveraging
									advanced technology and evidence-based practices, we strive to
									promote lifelong oral health, build lasting relationships, and
									enhance smiles with excellence, integrity, and compassion.
								</p>

								<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
									{values.map((value, index) => (
										<div
											key={index}
											className=" p-2 rounded-2xl shadow-lg text-indigo-600  text-center"
											data-aos="zoom-in"
											data-aos-delay={index * 100}>
											<div className="bg-indigo-600 mx-auto text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center mb-4">
												{value.icon}
											</div>
											<h3 className="text-base text-indigo-600 font-semibold mb-3">
												{value.title}
											</h3>
											<p className="text-sm text-indigo-600">
												{value.description}
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-12 md:py-16 lg:py-20 relative overflow-hidden flex items-center">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-3xl overflow-hidden shadow-2xl">
						<div className="flex flex-col lg:flex-row items-center">
							<div className="lg:w-1/2 p-8 md:p-12 md:space-y-14">
								<h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
									Ready for Your Best Smile?
								</h2>
								<p className="text-white/90 text-lg mb-8">
									Schedule your appointment today and experience the 32 Pearls
									difference. Our team is ready to provide you with exceptional
									dental care in a comfortable environment.
								</p>
								<div className="flex flex-wrap gap-4">
									<button className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-md hover:bg-indigo-50 transition-all duration-300" onClick={()=>{
                    navigate("/book-appointment")
                  }}>
										Book Appointment
									</button>
									<button className="px-6 py-3 bg-transparent text-white font-medium rounded-lg border border-white hover:bg-white/10 transition-all duration-300" onClick={()=>{navigate('/contact')}}>
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
