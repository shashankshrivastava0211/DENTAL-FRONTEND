import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	Shield,
	ArrowRight,
	CheckCircle,
	Users,
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
	const navigate = useNavigate();

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
		secondaryButtonAction: () => {
			navigate("/book-appointment");
		},
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

			<section className="py-12 lg:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 md:flex md:items-center">
					<div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
						{/* Content Side */}
						<div className="relative">
							{/* Organic shape decorations */}
							<div
								className="absolute -top-20 -left-20 w-72 h-72 opacity-10"
								style={{
									background:
										"radial-gradient(circle at 30% 107%, #7c3aed 0%, #6d28d9 45%, #5b21b6 80%)",
									borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
								}}></div>
							<div
								className="absolute -bottom-20 -right-20 w-64 h-64 opacity-10"
								style={{
									background:
										"radial-gradient(circle at 30% 107%, #6d28d9 0%, #5b21b6 45%, #4c1d95 80%)",
									borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%",
								}}></div>

							<div className="relative z-10">
								<h2 className="text-4xl text-center lg:text-left font-bold text-indigo-900 mb-6">
									Our Dental &nbsp;
									<span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
										Specialties
									</span>
								</h2>
								<p className="text-gray-600 text-center lg:text-left mb-8">
									Experience comprehensive dental care with our range of
									specialized services. Each treatment is tailored to meet your
									unique needs.
								</p>
								<div className="grid sm:grid-cols-2 gap-6">
									{specialties.map((specialty, index) => (
										<div
											key={index}
											className="group flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
											<div className="bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
												{specialty.icon}
											</div>
											<div>
												<h3 className="font-semibold text-gray-900 mb-1">
													{specialty.title}
												</h3>
												<p className="text-sm text-gray-600">
													{specialty.description}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Image Side with Organic Shape */}
						<div className="relative mt-12 lg:mt-0">
							{/* Organic shape mask */}
							<div className="relative">
								<div
									className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-purple-600/20 blur-2xl"
									style={{
										borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
									}}></div>
								<div className="relative z-10">
									<div
										className="overflow-hidden"
										style={{
											borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
											animation: "morphShape 20s ease-in-out infinite",
										}}>
										<img
											src="https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
											alt="Dental specialists"
											className="w-full h-[600px] object-cover transform scale-110"
										/>
									</div>
								</div>

								{/* Floating Cards with Organic Shape */}
								<div
									className="absolute top-6 -right-4 sm:right-6 bg-white p-5 shadow-xl z-20 max-w-[250px] backdrop-blur-sm bg-white/90"
									style={{
										borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
									}}>
									<div className="flex items-center gap-3 mb-2">
										<div className="bg-violet-50 p-2 rounded-xl">
											<Users className="w-6 h-6 text-violet-600" />
										</div>
										<div className="text-lg font-semibold text-violet-900">
											25+ Specialists
										</div>
									</div>
									<p className="text-sm text-gray-600 leading-relaxed">
										Board-certified dental experts in multiple specialties
									</p>
								</div>

								<div
									className="absolute -bottom-6 left-6 bg-white p-5 shadow-xl z-20 max-w-[250px] backdrop-blur-sm bg-white/90"
									style={{
										borderRadius: "70% 30% 30% 70% / 60% 40% 60% 40%",
									}}>
									<div className="flex items-center gap-3 mb-2">
										<div className="bg-violet-50 p-2 rounded-xl">
											<Shield className="w-6 h-6 text-violet-600" />
										</div>
										<div className="text-lg font-semibold text-violet-900">
											Advanced Care
										</div>
									</div>
									<p className="text-sm text-gray-600 leading-relaxed">
										Using the latest dental technology and techniques
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Services Showcase */}
			<section
				ref={servicesDetailsRef}
				id="services-grid"
				className="py-20 bg-white min-h-[90vh] flex items-center">
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
								className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
								{/* Service Image */}
								<div className="relative h-48 overflow-hidden">
									<img
										src={service.photo}
										alt={service.title}
										className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
									/>

									{/* Icon Badge */}
									<div
										className={`absolute top-4 left-4 p-3 rounded-xl bg-gradient-to-br bg-white flex items-center justify-center`}>
										<img
											src={service.image}
											alt={service.name}
											className="w-8 h-8 object-contain"
										/>
									</div>
								</div>

								{/* Content */}
								<div className="p-6">
									<h3 className="text-xl font-semibold text-black mb-3 transition-colors">
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
										className="w-full py-3 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-purple-600/10 text-indigo-800 font-medium rounded-lg flex items-center justify-center group-hover:from-indigo-500 group-hover:via-violet-500 group-hover:to-purple-600 group-hover:text-white transition-all">
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
				}}>
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
								className="inline-block rounded-xl px-5 sm:px-7 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800 font-semibold text-base sm:text-lg shadow-lghover:shadow-xl transform transition-all duration-300 ease-in-out border border-white/10">
								Book Appointment
							</a>
							<a
								href="/contact"
								className="inline-block rounded-xl px-5 sm:px-7 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800 font-semibold text-base sm:text-lg shadow-lghover:shadow-xl transform transition-all duration-300 ease-in-out border border-white/10">
								Contact Us
							</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ServicesPage;
