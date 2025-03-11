import { ArrowDown } from 'lucide-react';

const Hero2 = ({
  badgeIcon: BadgeIcon,
  badgeText,
  heading,
  headingHighlight,
  headingEnd,
  description,
  primaryButtonText,
  primaryButtonAction,
  secondaryButtonText,
  secondaryButtonIcon: SecondaryButtonIcon,
  secondaryButtonAction,
  imageSrc,
  imageAlt,
  floatingBadgeIcon: FloatingBadgeIcon,
  floatingBadgeTitle,
  floatingBadgeText,
  scrollToRef,
  scrollText,
}) => {
  const handleScroll = () => {
    if (scrollToRef && scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative  bg-gradient-to-b from-white to-violet-50 overflow-hidden  pb-0 md:pt-24">
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-200 rounded-full opacity-40"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200 rounded-full opacity-40"></div>
      </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          {/* Content Side */}
          <div className="lg:w-1/2 text-center lg:text-left" data-aos="fade-right">
            {/* Badge */}
            {badgeText && (
              <div className="inline-flex items-center bg-violet-100 rounded-full px-3 py-1 mb-6 text-violet-800 text-sm font-medium" 
              style={{
                animation: 'fade-in-down 0.6s ease-out forwards',
              }}
              data-aos="fade-down"
              data-aos-delay="100">
                {BadgeIcon && <BadgeIcon className="w-4 h-4 mr-2 text-violet-600" />}
                {badgeText}
              </div>
            )}

            {/* Heading */}
            <h1 className="font-['Belanosima'] text-4xl sm:text-5xl lg:text-6xl  font-medium text-gray-900 mb-4 sm:mb-6 leading-tight"
              data-aos="fade-right"
              data-aos-delay="200"
              style={{
                fontFamily: "'Belanosima', sans-serif",
              }}>
              {heading}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-700">
                {headingHighlight}
              </span>{' '}
              {headingEnd}
            </h1>


            {/* Description */}
            <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {primaryButtonText && (
                <button
                  onClick={primaryButtonAction}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-lg hover:from-violet-700 hover:to-purple-800 transition-all duration-300 font-medium text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {primaryButtonText}
                </button>
              )}

              {secondaryButtonText && (
                <button
                  onClick={secondaryButtonAction}
                  className="px-6 py-3 bg-white text-violet-700 border border-violet-200 rounded-lg hover:bg-violet-50 transition-all duration-300 font-medium text-base sm:text-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {SecondaryButtonIcon && <SecondaryButtonIcon className="w-5 h-5" />}
                  {secondaryButtonText}
                </button>
              )}
            </div>
          </div>

          {/* Image Side */}
          <div className="lg:w-[50%] mt-6 lg:mt-12" data-aos="fade-left">
            <div className="relative">
              {/* Image with decorative elements */}
              <div className="absolute -inset-4 bg-violet-100 rounded-xl transform rotate-3"></div>
              <div className="absolute -inset-4 bg-violet-200 rounded-xl transform -rotate-3 opacity-70"></div>
              
              <img
                src={imageSrc}
                alt={imageAlt}
                className="relative z-10 w-[91%] h-[91%] object-cover rounded-lg shadow-xl"
              />

              {/* Floating badge */}
              {floatingBadgeTitle && (
                <div className="absolute -bottom-3 sm:-bottom-4 md:-bottom-5 -right-3 sm:-right-4 md:-right-5 bg-white py-2 sm:py-3 px-3 sm:px-5 rounded-lg shadow-lg z-20 flex items-center gap-1 sm:gap-2">
                  {FloatingBadgeIcon && (
                    <FloatingBadgeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                  )}
                  <div className="flex flex-col">
                    <span className="font-bold text-xs sm:text-sm text-gray-800">
                      {floatingBadgeTitle}
                    </span>
                    {floatingBadgeText && (
                      <span className="text-xs text-gray-500">{floatingBadgeText}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        {scrollText && (
          <div
            className="flex flex-col items-center mt-12 sm:mt-16 cursor-pointer animate-bounce"
            onClick={handleScroll}
          >
            <span className="text-sm text-gray-500 mb-2">{scrollText}</span>
            <ArrowDown className="w-5 h-5 text-violet-600" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero2;


// import { ArrowDown } from 'lucide-react';

// const Hero2 = ({
//   badgeIcon: BadgeIcon,
//   badgeText,
//   heading,
//   headingHighlight,
//   headingEnd,
//   description,
//   primaryButtonText,
//   primaryButtonAction,
//   secondaryButtonText,
//   secondaryButtonIcon: SecondaryButtonIcon,
//   secondaryButtonAction,
//   imageSrc,
//   imageAlt,
//   floatingBadgeIcon: FloatingBadgeIcon,
//   floatingBadgeTitle,
//   floatingBadgeText,
//   scrollToRef,
//   scrollText,
// }) => {
//   const handleScroll = () => {
//     if (scrollToRef && scrollToRef.current) {
//       scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <section className="relative bg-gradient-to-b from-white to-violet-50 overflow-hidden mt-28 pb-0 md:mt-32 md:pb-24">
      
//       {/* Background decorative elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-200 rounded-full opacity-40"></div>
//         <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200 rounded-full opacity-40"></div>
//       </div>

//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
//         <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
//           {/* Content Side */}
//           <div className="lg:w-1/2 text-center lg:text-left" data-aos="fade-right">
//             {/* Badge */}
//             {badgeText && (
//               <div className="inline-flex items-center bg-violet-100 rounded-full px-3 py-1 mb-6 text-violet-800 text-sm font-medium" 
//               style={{
//                 animation: 'fade-in-down 0.6s ease-out forwards',
//               }}
//               data-aos="fade-down"
//               data-aos-delay="100">
//                 {BadgeIcon && <BadgeIcon className="w-4 h-4 mr-2 text-violet-600" />}
//                 {badgeText}
//               </div>
//             )}

//             {/* Heading */}
//             <h1 className="font-['Belanosima'] text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 mb-4 sm:mb-6 leading-tight"
//               data-aos="fade-right"
//               data-aos-delay="200"
//               style={{
//                 fontFamily: "'Belanosima', sans-serif",
//               }}>
//               {heading}{' '}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-700">
//                 {headingHighlight}
//               </span>{' '}
//               {headingEnd}
//             </h1>

//             {/* Description */}
//             <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
//               {description}
//             </p>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               {primaryButtonText && (
//                 <button
//                   onClick={primaryButtonAction}
//                   className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-lg hover:from-violet-700 hover:to-purple-800 transition-all duration-300 font-medium text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//                 >
//                   {primaryButtonText}
//                 </button>
//               )}

//               {secondaryButtonText && (
//                 <button
//                   onClick={secondaryButtonAction}
//                   className="px-6 py-3 bg-white text-violet-700 border border-violet-200 rounded-lg hover:bg-violet-50 transition-all duration-300 font-medium text-base sm:text-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2"
//                 >
//                   {SecondaryButtonIcon && <SecondaryButtonIcon className="w-5 h-5" />}
//                   {secondaryButtonText}
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Image Side */}
//           <div className="lg:w-1/2 mt-8 lg:mt-0" data-aos="fade-left">
//             <div className="relative">
//               {/* Image with decorative elements */}
//               <div className="absolute -inset-4 bg-violet-100 rounded-xl transform rotate-3"></div>
//               <div className="absolute -inset-4 bg-violet-200 rounded-xl transform -rotate-3 opacity-70"></div>
              
//               <img
//                 src={imageSrc}
//                 alt={imageAlt}
//                 className="relative z-10 w-full h-full object-cover rounded-lg shadow-xl"
//               />

//               {/* Floating badge */}
//               {floatingBadgeTitle && (
//                 <div className="absolute -bottom-3 sm:-bottom-4 md:-bottom-5 -right-3 sm:-right-4 md:-right-5 bg-white py-2 sm:py-3 px-3 sm:px-5 rounded-lg shadow-lg z-20 flex items-center gap-1 sm:gap-2">
//                   {FloatingBadgeIcon && (
//                     <FloatingBadgeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
//                   )}
//                   <div className="flex flex-col">
//                     <span className="font-bold text-xs sm:text-sm text-gray-800">
//                       {floatingBadgeTitle}
//                     </span>
//                     {floatingBadgeText && (
//                       <span className="text-xs text-gray-500">{floatingBadgeText}</span>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         {scrollText && (
//           <div
//             className="flex flex-col items-center mt-12 sm:mt-16 cursor-pointer animate-bounce"
//             onClick={handleScroll}
//           >
//             <span className="text-sm text-gray-500 mb-2">{scrollText}</span>
//             <ArrowDown className="w-5 h-5 text-violet-600" />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Hero2;



// import React from 'react';
// import { ArrowDown } from 'lucide-react';

// const Hero2 = ({
//   badgeIcon: BadgeIcon,
//   badgeText,
//   heading,
//   headingHighlight,
//   headingEnd,
//   description,
//   primaryButtonText,
//   primaryButtonAction,
//   secondaryButtonText,
//   secondaryButtonIcon: SecondaryButtonIcon,
//   secondaryButtonAction,
//   imageSrc,
//   imageAlt,
//   floatingBadgeIcon: FloatingBadgeIcon,
//   floatingBadgeTitle,
//   floatingBadgeText,
//   scrollToRef,
//   scrollText,
// }) => {
//   const handleScroll = () => {
//     if (scrollToRef?.current) {
//       scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <section className="relative min-h-[100vh] bg-gradient-to-b from-white to-violet-50 overflow-hidden flex items-center">
//       {/* Background decorative elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-200 rounded-full opacity-40 blur-3xl"></div>
//         <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200 rounded-full opacity-40 blur-3xl"></div>
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 py-20 md:py-28">
//         <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
//           {/* Content Side */}
//           <div className="lg:w-1/2 text-center lg:text-left" data-aos="fade-right">
//             {/* Badge */}
//             {badgeText && (
//               <div 
//                 className="inline-flex items-center bg-violet-100 rounded-full px-4 py-2 mb-8 text-violet-800 text-sm font-medium"
//                 data-aos="fade-down"
//                 data-aos-delay="100"
//               >
//                 {BadgeIcon && <BadgeIcon className="w-4 h-4 mr-2 text-violet-600" />}
//                 {badgeText}
//               </div>
//             )}

//             {/* Heading */}
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium text-gray-900 mb-6 sm:mb-8 leading-tight">
//               {heading}{' '}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-700">
//                 {headingHighlight}
//               </span>{' '}
//               {headingEnd}
//             </h1>

//             {/* Description */}
//             <p className="text-gray-600 text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
//               {description}
//             </p>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               {primaryButtonText && (
//                 <button
//                   onClick={primaryButtonAction}
//                   className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-lg text-lg font-medium hover:from-violet-700 hover:to-purple-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
//                 >
//                   {primaryButtonText}
//                 </button>
//               )}

//               {secondaryButtonText && (
//                 <button
//                   onClick={secondaryButtonAction}
//                   className="px-8 py-4 bg-white text-violet-700 border-2 border-violet-200 rounded-lg text-lg font-medium hover:bg-violet-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2"
//                 >
//                   {SecondaryButtonIcon && <SecondaryButtonIcon className="w-5 h-5" />}
//                   {secondaryButtonText}
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Image Side */}
//           <div className="lg:w-1/2 mt-12 lg:mt-0" data-aos="fade-left">
//             <div className="relative">
//               {/* Image with decorative elements */}
//               <div className="absolute -inset-4 bg-violet-100 rounded-2xl transform rotate-3"></div>
//               <div className="absolute -inset-4 bg-violet-200 rounded-2xl transform -rotate-3 opacity-70"></div>
              
//               <img
//                 src={imageSrc}
//                 alt={imageAlt}
//                 className="relative z-10 w-full h-[500px] md:h-[600px] lg:h-[700px] object-cover rounded-2xl shadow-2xl"
//               />

//               {/* Floating badge */}
//               {floatingBadgeTitle && (
//                 <div className="absolute -bottom-6 -right-6 bg-white py-3 px-6 rounded-xl shadow-xl z-20 flex items-center gap-3">
//                   {FloatingBadgeIcon && (
//                     <FloatingBadgeIcon className="w-6 h-6 text-yellow-500" />
//                   )}
//                   <div className="flex flex-col">
//                     <span className="font-bold text-base text-gray-800">
//                       {floatingBadgeTitle}
//                     </span>
//                     {floatingBadgeText && (
//                       <span className="text-sm text-gray-500">{floatingBadgeText}</span>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         {scrollText && (
//           <div
//             className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer animate-bounce"
//             onClick={handleScroll}
//           >
//             <span className="text-sm text-gray-500 mb-2">{scrollText}</span>
//             <ArrowDown className="w-5 h-5 text-violet-600" />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Hero2;