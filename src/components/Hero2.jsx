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
//     <section className="relative  bg-gradient-to-b from-white to-violet-50 overflow-hidden  pb-0 md:pt-24">
      
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
//             <h1 className="font-['Belanosima'] text-4xl sm:text-5xl lg:text-6xl  font-medium text-gray-900 mb-4 sm:mb-6 leading-tight"
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
//           <div className="lg:w-[50%] mt-6 lg:mt-12" data-aos="fade-left">
//             <div className="relative">
//               {/* Image with decorative elements */}
//               <div className="absolute -inset-4 bg-violet-100 rounded-xl transform rotate-3"></div>
//               <div className="absolute -inset-4 bg-violet-200 rounded-xl transform -rotate-3 opacity-70"></div>
              
//               <img
//                 src={imageSrc}
//                 alt={imageAlt}
//                 className="relative z-10 w-[91%] h-[91%] object-cover rounded-lg shadow-xl"
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
    <section className="relative bg-gradient-to-b from-white to-violet-50 min-h-screen flex items-center py-8 sm:py-12 md:py-24">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-violet-200 rounded-full opacity-40" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-200 rounded-full opacity-40" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10 xl:gap-16">
          {/* Content Section */}
          <div className="lg:w-1/2 text-center lg:text-left">
            {/* Badge */}
            {badgeText && (
              <div className="inline-flex items-center bg-violet-100 rounded-full px-3 py-1 mb-4 text-sm md:text-base font-medium">
                {BadgeIcon && <BadgeIcon className="w-4 h-4 mr-2" />}
                {badgeText}
              </div>
            )}

            {/* Heading */}
            <h1 className="text-3xl xs:text-4xl sm:text-[40px] md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
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
            <div className="flex flex-col xs:flex-row gap-3 justify-center lg:justify-start">
              {primaryButtonText && (
                <button
                  onClick={primaryButtonAction}
                  className="px-5 py-3 bg-violet-600 text-white rounded-lg font-medium text-base hover:bg-violet-700 transition-colors w-full xs:w-auto"
                >
                  {primaryButtonText}
                </button>
              )}

              {secondaryButtonText && (
                <button
                  onClick={secondaryButtonAction}
                  className="px-5 py-3 bg-white text-violet-700 border border-violet-200 rounded-lg font-medium text-base hover:bg-violet-50 transition-colors w-full xs:w-auto flex items-center justify-center gap-2"
                >
                  {SecondaryButtonIcon && <SecondaryButtonIcon className="w-5 h-5" />}
                  {secondaryButtonText}
                </button>
              )}
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 mt-8 md:mt-10 lg:mt-0 w-full">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute -inset-2 sm:-inset-3 bg-violet-100 rounded-xl transform rotate-3" />
              <div className="absolute -inset-2 sm:-inset-3 bg-violet-200 rounded-xl transform -rotate-3 opacity-70" />
              
              <img
                src={imageSrc}
                alt={imageAlt}
                className="relative z-10 w-full h-auto object-contain rounded-lg"
              />

              {/* Floating Badge */}
              {floatingBadgeTitle && (
                <div className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-3 bg-white p-2 sm:p-3 rounded-lg shadow-md flex items-center gap-2 max-w-[140px] sm:max-w-[160px]">
                  {FloatingBadgeIcon && (
                    <FloatingBadgeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                  )}
                  <div className="flex flex-col truncate">
                    <span className="font-semibold text-xs sm:text-sm text-gray-800 truncate">
                      {floatingBadgeTitle}
                    </span>
                    {floatingBadgeText && (
                      <span className="text-[10px] sm:text-xs text-gray-500 truncate">
                        {floatingBadgeText}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        {scrollText && (
          <div className="hidden md:flex flex-col items-center mt-10 lg:mt-12 cursor-pointer" onClick={handleScroll}>
            <span className="text-sm text-gray-500 mb-2">{scrollText}</span>
            <ArrowDown className="w-6 h-6 text-violet-600 animate-bounce" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero2;