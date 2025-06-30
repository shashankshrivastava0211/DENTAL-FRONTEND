// import React from 'react';
// import {
//   Clock,
//   AlertCircle,
//   Heart,
//   Smile,
//   Bluetooth as Tooth,
//   Search,
//   Shield,
//   Timer,
//   Calendar,
//   Crown,
//   AlertTriangle,
//   GitMerge,
//   ChevronRight
// } from 'lucide-react';

// function FAQ() {
//   const faqs = [
//     {
//       id: 1,
//       question: "How often should I visit the dentist?",
//       answer:
//         "It is recommended to visit the dentist every six months for a routine check-up and cleaning. However, those with dental issues may need more frequent visits.",
//       icon: <Clock className="w-6 h-6" />,
//     },
//     {
//       id: 2,
//       question: "What are the common signs of dental problems?",
//       answer:
//         "You may need dental treatment if you experience:\n- Tooth pain or sensitivity\n- Bleeding or swollen gums\n- Bad breath (halitosis) that won't go away\n- Tooth discoloration or decay\n- Difficulty chewing or biting\n- Mouth sores or ulcers that don't heal",
//       icon: <AlertCircle className="w-6 h-6" />,
//     },
//     {
//       id: 3,
//       question: "Does dental treatment hurt?",
//       answer:
//         "Most dental procedures are painless, thanks to modern anesthesia and technology. Some treatments may cause mild discomfort, but pain management options are available.",
//       icon: <Heart className="w-6 h-6" />,
//     },
//     {
//       id: 4,
//       question: "What is the best way to maintain good oral health?",
//       answer:
//         "- Brush twice a day with fluoride toothpaste.\n- Floss daily to remove plaque between teeth.\n- Eat a balanced diet and limit sugary foods.\n- Visit the dentist for regular check-ups and cleanings.",
//       icon: <Smile className="w-6 h-6" />,
//     },
//     {
//       id: 5,
//       question: "What is a root canal treatment?",
//       answer:
//         "A root canal is a dental procedure used to treat an infected or damaged tooth by removing the pulp (soft tissue inside the tooth), cleaning and disinfecting the root canals, and sealing the tooth to prevent further infection.",
//       icon: <Tooth className="w-6 h-6" />,
//     },
//     {
//       id: 6,
//       question: "How do I know if I need a root canal?",
//       answer:
//         "You may need a root canal if you experience:\n- Severe tooth pain, especially when chewing or applying pressure\n- Sensitivity to hot or cold that lingers\n- Swollen or tender gums around the affected tooth\n- A pimple-like bump on the gums (abscess)\n- Tooth discoloration or deep decay",
//       icon: <Search className="w-6 h-6" />,
//     },
//     {
//       id: 7,
//       question: "Is root canal treatment painful?",
//       answer:
//         "No. Modern root canal treatments are virtually painless, thanks to local anesthesia and advanced techniques. Many patients compare it to getting a routine filling.",
//       icon: <Shield className="w-6 h-6" />,
//     },
//     {
//       id: 8,
//       question: "How long does a root canal take?",
//       answer:
//         "A root canal typically takes 1 to 2 visits, each lasting 30 to 40 minutes, depending on the complexity of the case.",
//       icon: <Timer className="w-6 h-6" />,
//     },
//     {
//       id: 9,
//       question: "Can a root canal be done in one visit?",
//       answer:
//         "Yes, in many cases, a root canal can be completed in a single visit, especially with advanced technology. However, complex cases may require multiple sessions.",
//       icon: <Calendar className="w-6 h-6" />,
//     },
//     {
//       id: 10,
//       question: "Do I need a crown after a root canal?",
//       answer:
//         "In most cases, a dental crown is recommended to protect the treated tooth.",
//       icon: <Crown className="w-6 h-6" />,
//     },
//     {
//       id: 11,
//       question: "What happens if I avoid getting a root canal?",
//       answer:
//         "Delaying treatment can lead to:\n- Severe pain and tooth loss\n- The spread of infection, leading to abscess formation\n- Potential health complications affecting the jawbone and surrounding teeth",
//       icon: <AlertTriangle className="w-6 h-6" />,
//     },
//     {
//       id: 12,
//       question: "Are there alternatives to a root canal?",
//       answer:
//         "The main alternative is tooth extraction, followed by a dental implant, bridge, or denture. However, saving your natural tooth with a root canal is usually the best option.",
//       icon: <GitMerge className="w-6 h-6" />,
//     },
//   ];

//   const FAQItem = ({ faq }) => {
//     return (
//       <div className="group relative">
//         <div className="w-full p-6 rounded-xl transition-all duration-300 bg-white border border-indigo-100 shadow-sm
//           hover:shadow-lg hover:border-violet-200 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-violet-50">
//           <div className="flex items-center gap-4">
//             <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-600
//               group-hover:from-indigo-200 group-hover:to-violet-200 group-hover:text-violet-700 transition-all duration-300">
//               {faq.icon}
//             </div>
//             <h3 className="font-medium text-lg text-gray-800 group-hover:text-indigo-900 transition-colors duration-300">
//               {faq.question}
//             </h3>
//             <ChevronRight className="w-5 h-5 ml-auto text-indigo-400 transition-transform duration-300
//               group-hover:translate-x-1 group-hover:text-violet-600" />
//           </div>

//           <div className="overflow-hidden transition-all duration-300 max-h-0 opacity-0
//             group-hover:max-h-[500px] group-hover:opacity-100 group-hover:mt-4">
//             <div className="pl-[3.75rem] pr-4">
//               {faq.answer.split('\n').map((line, index) => (
//                 <p key={index} className="text-indigo-900/70 text-[15px] leading-relaxed mb-2">
//                   {line}
//                 </p>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden flex items-center">
//      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="text-center mb-16 relative">
//           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
//           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl" />

//           {/* <div className="relative">
//             <span className="text-indigo-600 font-medium mb-2 block">FAQ</span>
//             <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
//               Frequently Asked Questions
//             </h1>
//             <p className="text-xl text-indigo-900/70 max-w-2xl mx-auto">
//               Everything you need to know about dental care and root canal treatments
//             </p>
//           </div> */}
//             <div className="text-center mb-12 md:mb-16 lg:mb-20">
//             <div className="inline-flex items-center justify-center mb-6">
//               <div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
//               <span className="mx-4 text-sm md:text-base text-indigo-600 font-semibold uppercase tracking-wider">
//                 Testimonials
//               </span>
//               <div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
//             </div>

//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-indigo-900 mb-6 leading-tight">
//               What Our{" "}
//               <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 Patients Say
//               </span>
//             </h2>
//             <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg">
//               Discover why our patients love our dental services and keep coming
//               back. Here are some stories from people who have transformed their
//               smiles with us.
//             </p>
//           </div>
//         </div>

//         <div className="relative">
//           <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-violet-500/10 to-transparent blur-3xl -z-10" />

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               {faqs.slice(0, 6).map((faq) => (
//                 <FAQItem key={faq.id} faq={faq} />
//               ))}
//             </div>
//             <div className="space-y-4">
//               {faqs.slice(6, 12).map((faq) => (
//                 <FAQItem key={faq.id} faq={faq} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default FAQ;

import React, { useState } from "react";
import {
	Clock,
	AlertCircle,
	Heart,
	Smile,
	Bluetooth as Tooth,
	Search,
	Shield,
	Timer,
	Calendar,
	Crown,
	AlertTriangle,
	GitMerge,
	ChevronDown,
} from "lucide-react";

function App() {
	// Track the currently open FAQ ID
	const [openFaqId, setOpenFaqId] = useState(null);

	const faqs = [
		{
			id: 2,
			question: "What are the common signs of dental problems?",
			answer:
				"You may need dental treatment if you experience:\n- Tooth pain or sensitivity\n- Bleeding or swollen gums\n- Bad breath (halitosis) that won't go away\n- Tooth discoloration or decay\n- Difficulty chewing or biting\n- Mouth sores or ulcers that don't heal",
			icon: <AlertCircle className="w-6 h-6" />,
		},
		{
			id: 6,
			question: "How do I know if I need a root canal?",
			answer:
				"You may need a root canal if you experience:\n- Severe tooth pain, especially when chewing or applying pressure\n- Sensitivity to hot or cold that lingers\n- Swollen or tender gums around the affected tooth\n- A pimple-like bump on the gums (abscess)\n- Tooth discoloration or deep decay",
			icon: <Search className="w-6 h-6" />,
		},
		{
			id: 4,
			question: "What is the best way to maintain good oral health?",
			answer:
				"- Brush twice a day with fluoride toothpaste.\n- Floss daily to remove plaque between teeth.\n- Eat a balanced diet and limit sugary foods.\n- Visit the dentist for regular check-ups and cleanings.",
			icon: <Smile className="w-6 h-6" />,
		},
		{
			id: 11,
			question: "What happens if I avoid getting a root canal?",
			answer:
				"Delaying treatment can lead to:\n- Severe pain and tooth loss\n- The spread of infection, leading to abscess formation\n- Potential health complications affecting the jawbone and surrounding teeth",
			icon: <AlertTriangle className="w-6 h-6" />,
		},
		{
			id: 5,
			question: "What is a root canal treatment?",
			answer:
				"A root canal is a dental procedure used to treat an infected or damaged tooth by removing the pulp (soft tissue inside the tooth), cleaning and disinfecting the root canals, and sealing the tooth to prevent further infection.",
			icon: <Tooth className="w-6 h-6" />,
		},
		{
			id: 12,
			question: "Are there alternatives to a root canal?",
			answer:
				"The main alternative is tooth extraction, followed by a dental implant, bridge, or denture. However, saving your natural tooth with a root canal is usually the best option.",
			icon: <GitMerge className="w-6 h-6" />,
		},
		{
			id: 1,
			question: "How often should I visit the dentist?",
			answer:
				"It is recommended to visit the dentist every six months for a routine check-up and cleaning. However, those with dental issues may need more frequent visits.",
			icon: <Clock className="w-6 h-6" />,
		},
		{
			id: 3,
			question: "Does dental treatment hurt?",
			answer:
				"Most dental procedures are painless, thanks to modern anesthesia and technology. Some treatments may cause mild discomfort, but pain management options are available.",
			icon: <Heart className="w-6 h-6" />,
		},
		{
			id: 7,
			question: "Is root canal treatment painful?",
			answer:
				"No. Modern root canal treatments are virtually painless, thanks to local anesthesia and advanced techniques. Many patients compare it to getting a routine filling.",
			icon: <Shield className="w-6 h-6" />,
		},
		{
			id: 8,
			question: "How long does a root canal take?",
			answer:
				"A root canal typically takes 1 to 2 visits, each lasting 30 to 40 minutes, depending on the complexity of the case.",
			icon: <Timer className="w-6 h-6" />,
		},
		{
			id: 9,
			question: "Can a root canal be done in one visit?",
			answer:
				"Yes, in many cases, a root canal can be completed in a single visit, especially with advanced technology. However, complex cases may require multiple sessions.",
			icon: <Calendar className="w-6 h-6" />,
		},
		{
			id: 10,
			question: "Do I need a crown after a root canal?",
			answer:
				"In most cases, a dental crown is recommended to protect the treated tooth.",
			icon: <Crown className="w-6 h-6" />,
		},
	];

	const FAQItem = ({ faq }) => {
		const isOpen = openFaqId === faq.id;

		return (
			<div
				className="group relative p-[2px] rounded-2xl bg-gradient-to-r from-indigo-500/50 via-violet-500/50 to-purple-500/50 hover:from-indigo-500/60 hover:via-violet-500/60 hover:to-purple-500/60 transition-all duration-500"
				onClick={() => setOpenFaqId(isOpen ? null : faq.id)}>
				<div
					className={`w-full p-6 rounded-2xl transition-all duration-500 relative
          ${
						isOpen
							? "bg-white/95 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl"
							: "bg-white/90 hover:bg-white/95 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-sm"
					}
        `}>
					<div className="flex items-center gap-4">
						<div
							className={`p-3.5 rounded-xl bg-gradient-to-br transition-all duration-500 transform
              ${
								isOpen
									? "from-violet-500/20 to-indigo-500/20 text-violet-700 "
									: "from-violet-500/10 to-indigo-500/10 text-indigo-600 group-hover:from-violet-500/20 group-hover:to-indigo-500/20 group-hover:text-violet-700"
							}`}>
							{faq.icon}
						</div>
						<h3
							className={`font-medium text-lg transition-all duration-300
              ${
								isOpen
									? "text-indigo-900 translate-x-2"
									: "text-gray-800 group-hover:text-indigo-900 group-hover:translate-x-2"
							}`}>
							{faq.question}
						</h3>
						<ChevronDown
							className={`w-5 h-5 ml-auto transition-all duration-500
              ${
								isOpen
									? "rotate-180 text-violet-600 scale-110"
									: "text-indigo-400 group-hover:text-violet-600 group-hover:scale-110"
							}`}
						/>
					</div>

					<div
						className={`overflow-hidden transition-all duration-500 transform
            ${
							isOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
						}`}>
						<div className="pl-[3.75rem] pr-4">
							{faq.answer.split("\n").map((line, index) => (
								<p
									key={index}
									className="text-indigo-900 text-[15px] leading-relaxed mb-2.5 transition-all duration-300">
									{line}
								</p>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<section className="py-12 md:py-16 lg:py-20 relative overflow-hidden flex items-center">
			{/* Background Elements */}
			<div className="absolute inset-0 bg-gradient-to-b from-white  via-purple-50 to-indigo-50"></div>
			<div className="absolute inset-0 bg-wave-pattern opacity-20"></div>
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden">
				<div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full opacity-50"></div>
				<div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-200 rounded-full opacity-50"></div>
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Section Header */}
				<div className="text-center mb-12 md:mb-16 lg:mb-20">
					<div className="inline-flex items-center justify-center mb-6">
						<div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
						<span className="mx-4 text-sm md:text-base text-indigo-600 font-semibold uppercase tracking-wider">
							FAQ
						</span>
						<div className="h-[1px] w-8 md:w-12 bg-indigo-500"></div>
					</div>

					<h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-indigo-900 mb-6 leading-tight">
						Frequently{" "}
						<span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
							Asked Questions
						</span>
					</h2>
					<p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg">
						Everything you need to know about dental care and root canal
						treatments
					</p>
				</div>

				<div className="relative">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<div className="space-y-4">
							{faqs.slice(0, 6).map((faq) => (
								<FAQItem key={faq.id} faq={faq} />
							))}
						</div>
						<div className="space-y-4">
							{faqs.slice(6, 12).map((faq) => (
								<FAQItem key={faq.id} faq={faq} />
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default App;
