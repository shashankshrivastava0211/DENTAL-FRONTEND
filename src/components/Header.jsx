import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	Menu,
	X,
	ChevronDown,
	ChevronUp,
	Stethoscope,
	Instagram,
	Twitter,
	Linkedin,
	Facebook,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const navigation = [
	{ name: "Home", path: "/" },
	{ name: "About", path: "/about" },
	{ name: "Services", path: "/services" },
	{ name: "Appointments", path: "/appointments" },
	{ name: "Blog", path: "/blog" },
	{ name: "Contact", path: "/contact" },
];

const socialLinks = [
	{
		icon: Instagram,
		name: "Instagram",
		href: "https://www.instagram.com/32_pearls_dentalclinic",
		hoverColor: "hover:text-pink-500",
	},
	{
		icon: Linkedin,
		name: "LinkedIn",
		href: "https://www.instagram.com/32_pearls_dentalclinic",
		hoverColor: "hover:text-blue-600",
	},
	{
		icon: Facebook,
		name: "Facebook",
		href: "https://www.facebook.com/pritesh.jagtap",
		hoverColor: "hover:text-sky-500",
	},
	{
		icon: Twitter,
		name: "Twitter",
		href: "https://www.twitter.com/32pearlsdental",
		hoverColor: "hover:text-sky-500",
	},
];

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [scrollDirection, setScrollDirection] = useState("up");
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	useEffect(() => {
		let lastScrollPosition = window.pageYOffset;
		let ticking = false;

		const handleScroll = () => {
			const currentScrollPosition = window.pageYOffset;

			if (!ticking) {
				window.requestAnimationFrame(() => {
					// Only update scroll direction if the change is more than 5px
					if (Math.abs(currentScrollPosition - lastScrollPosition) > 5) {
						setScrollDirection(
							currentScrollPosition > lastScrollPosition ? "down" : "up"
						);
					}

					setScrolled(currentScrollPosition > 20);
					lastScrollPosition = currentScrollPosition;
					ticking = false;
				});

				ticking = true;
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Close mobile menu when route changes
	useEffect(() => {
		setIsOpen(false);
	}, [location]);

	// Close mobile menu when scrolling down
	useEffect(() => {
		if (scrollDirection === "down" && isOpen) {
			setIsOpen(false);
		}
	}, [scrollDirection, isOpen]);

	return (
		<>
			<Helmet>
				<title>32 Pearls Dental Clinic | Professional Dental Care</title>
				<meta
					name="description"
					content="32 Pearls Dental Clinic provides exceptional dental care with a team of experienced professionals using the latest technology."
				/>
				<meta
					name="keywords"
					content="dental clinic, dentist, dental care, teeth cleaning, dental services"
				/>
				<link rel="canonical" href="https://32pearlsdental.com" />
				<meta
					property="og:title"
					content="32 Pearls Dental Clinic | Professional Dental Care"
				/>
				<meta
					property="og:description"
					content="32 Pearls Dental Clinic provides exceptional dental care with a team of experienced professionals using the latest technology."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://32pearlsdental.com" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content="32 Pearls Dental Clinic | Professional Dental Care"
				/>
				<meta
					name="twitter:description"
					content="32 Pearls Dental Clinic provides exceptional dental care with a team of experienced professionals using the latest technology."
				/>
			</Helmet>
			<nav
				className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
					scrolled
						? "bg-white/95 backdrop-blur-md shadow-md py-1 sm:py-2 border-b border-indigo-100"
						: "bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 py-1.5 sm:py-3"
				} ${
					scrollDirection === "down" && scrolled && !isOpen
						? "-translate-y-full"
						: "translate-y-0"
				}`}
				style={{ height: isOpen ? "auto" : "" }}>
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-12 sm:h-14 md:h-16">
						{/* Logo */}
						<div className="flex-shrink-0">
							<Link
								to="/"
								className="flex items-center transition-all duration-300 hover:scale-105"
								aria-label="32 Pearls Dental Clinic Home">
								<div className="flex items-center">
									<div className="mr-1.5 sm:mr-2 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1 sm:p-1.5 shadow-md">
										<Stethoscope
											className={`h-4 w-4 md:h-5 md:w-5 text-white`}
											aria-hidden="true"
										/>
									</div>
									<div className="flex flex-col">
										<span className="text-xl md:text-2xl font-bold tracking-tight">
											<span
												className={`${
													scrolled ? "text-indigo-700" : "text-white"
												}`}>
												32
											</span>
											<span
												className={`${
													scrolled ? "text-indigo-400" : "text-indigo-300"
												}`}>
												•
											</span>
											<span
												className={`${
													scrolled ? "text-purple-600" : "text-white"
												}`}>
												Pearls
											</span>
										</span>
										<span
											className={`text-[10px] md:text-xs tracking-widest uppercase ${
												scrolled ? "text-purple-600" : "text-purple-200"
											}`}>
											Dental Clinic
										</span>
									</div>
								</div>
							</Link>
						</div>

						{/* Desktop Navigation */}
						<div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
							{navigation.map((item) => (
								<div key={item.name} className="relative group px-1 xl:px-2">
									<Link
										to={item.path}
										className={`inline-flex items-center text-sm font-medium transition-all duration-300 ${
											scrolled
												? `${
														location.pathname === item.path
															? "text-indigo-900"
															: "text-gray-700 hover:text-indigo-900"
												  }`
												: `${
														location.pathname === item.path
															? "text-indigo-200"
															: "text-white hover:text-indigo-200"
												  }`
										} animate-fadeIn`}
										style={{
											animationDuration: "0.3s",
											animationFillMode: "forwards",
										}}>
										<span className="relative py-1.5 px-1">
											{item.name}
											{/* Sliding Underline */}
											<span
												className={`absolute left-0 bottom-0 w-0 h-0.5 transition-all duration-300 ease-out group-hover:w-full
                        ${location.pathname === item.path ? "w-full" : ""}
                         ${scrolled ? "bg-indigo-900" : "bg-indigo-200"}
                        `}
											/>
										</span>
									</Link>
								</div>
							))}
						</div>

						{/* Tablet Navigation */}
						<div className="hidden md:flex lg:hidden items-center">
							<div className="relative group">
								<button
									onClick={() => setIsOpen(!isOpen)}
									className={`inline-flex items-center text-sm font-medium transition-all duration-300 ${
										scrolled ? "text-gray-700" : "text-white"
									}`}
									aria-expanded={isOpen}
									aria-controls="mobile-menu">
									<span className="mr-1">Menu</span>
									{isOpen ? (
										<ChevronUp className="h-4 w-4" aria-hidden="true" />
									) : (
										<ChevronDown className="h-4 w-4" aria-hidden="true" />
									)}
								</button>
							</div>
						</div>

						<div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
							{/* Book Appointment Button - All screen sizes */}
							<Link
								to="/book-appointment"
								className={`px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
									scrolled
										? "bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white hover:from-indigo-700 hover:via-violet-700 hover:to-purple-800"
										: "bg-white text-indigo-700 hover:bg-indigo-50"
								}`}
								aria-label="Book a dental appointment">
								{/* Use consistent text across all breakpoints */}
								<span className="hidden sm:inline">Book Appointment</span>
								<span className="sm:hidden">Book Now</span>
							</Link>

							{/* Social Links - Tablet & Desktop */}
							<div className="hidden md:flex items-center space-x-2 xl:space-x-3">
								{socialLinks.map((social) => {
									const Icon = social.icon;
									return (
										<a
											key={social.name}
											href={social.href}
											target="_blank"
											rel="noopener noreferrer"
											className={`p-1 transition-all duration-300 hover:scale-110 ${
												scrolled
													? `text-gray-500 ${social.hoverColor}`
													: `text-indigo-200 ${social.hoverColor}`
											}`}
											aria-label={social.name}>
											<Icon className="h-5 w-5" aria-hidden="true" />
										</a>
									);
								})}
							</div>

							{/* Mobile menu button and Book Now button */}
							<div className="md:hidden flex items-center space-x-1.5">
								<button
									onClick={() => setIsOpen(!isOpen)}
									className="p-1.5 rounded-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
									aria-expanded={isOpen}
									aria-controls="mobile-menu">
									<span className="sr-only">Open main menu</span>
									{isOpen ? (
										<X
											className={`h-4 w-4 sm:h-5 sm:w-5 ${
												scrolled ? "text-gray-700" : "text-white"
											}`}
											aria-hidden="true"
										/>
									) : (
										<Menu
											className={`h-4 w-4 sm:h-5 sm:w-5 ${
												scrolled ? "text-gray-700" : "text-white"
											}`}
											aria-hidden="true"
										/>
									)}
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Mobile & Tablet menu, show/hide based on menu state */}
				<div
					id="mobile-menu"
					className={`absolute top-full left-0 right-0 transition-all duration-300 ease-in-out ${
						isOpen
							? "opacity-100 translate-y-0"
							: "opacity-0 -translate-y-4 pointer-events-none"
					}`}>
					<div className="px-3 pt-3 pb-4 space-y-2 bg-white/95 backdrop-blur-md shadow-xl rounded-b-xl mx-2 md:mx-4 lg:mx-6 border border-indigo-100">
						{navigation.map((item, index) => (
							<Link
								key={item.name}
								to={item.path}
								className={`block px-3 py-2 rounded-xl text-base font-medium text-center md:text-left transition-all duration-300 ${
									location.pathname === item.path
										? "bg-indigo-50 text-indigo-700"
										: "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
								} ${isOpen ? `animate-fadeIn opacity-0` : ""}`}
								style={{
									animationDelay: `${0.1 + index * 0.05}s`,
									animationDuration: "0.3s",
									animationFillMode: "forwards",
								}}
								onClick={() => setIsOpen(false)}>
								{item.name}
							</Link>
						))}

						{/* Mobile Social Links */}
						<div className="pt-3 pb-1 border-t border-gray-200">
							<div className="flex justify-center space-x-6">
								{socialLinks.map((social, index) => {
									const Icon = social.icon;
									return (
										<a
											key={social.name}
											href={social.href}
											target="_blank"
											rel="noopener noreferrer"
											className={`text-gray-500 ${
												social.hoverColor
											} transition-all duration-300 hover:scale-110 ${
												isOpen ? `animate-fadeIn opacity-0` : ""
											}`}
											style={{
												animationDelay: `${0.3 + index * 0.05}s`,
												animationDuration: "0.3s",
												animationFillMode: "forwards",
											}}
											aria-label={social.name}>
											<Icon className="h-5 w-5" aria-hidden="true" />
										</a>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;
