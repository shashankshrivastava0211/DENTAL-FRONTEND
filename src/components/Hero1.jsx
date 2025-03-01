import React from 'react';

const Hero1 = ({
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
  return (
    <div className="relative bg-gradient-to-b from-purple-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 lg:pr-12 mb-10 lg:mb-0" data-aos="fade-right">
            {/* Badge */}
            {BadgeIcon && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mb-6">
                <BadgeIcon className="w-4 h-4 mr-2" />
                {badgeText}
              </div>
            )}

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {heading}{' '}
              <span className="text-indigo-600">{headingHighlight}</span>{' '}
              {headingEnd}
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">{description}</p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              {primaryButtonText && (
                <button
                  onClick={primaryButtonAction}
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300"
                >
                  {primaryButtonText}
                </button>
              )}

              {secondaryButtonText && (
                <button
                  onClick={secondaryButtonAction}
                  className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-md border border-indigo-200 hover:bg-indigo-50 transition-all duration-300 flex items-center"
                >
                  {SecondaryButtonIcon && <SecondaryButtonIcon className="w-5 h-5 mr-2" />}
                  {secondaryButtonText}
                </button>
              )}
            </div>

            {/* Scroll Indicator */}
            {scrollToRef && (
              <div className="hidden md:flex items-center mt-12 cursor-pointer" onClick={() => {
                const element = scrollToRef.current;
                if (element) {
                  const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}>
                <div className="w-10 h-10 rounded-full border-2 border-indigo-300 flex items-center justify-center mr-4">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                </div>
                <span className="text-indigo-600 font-medium">{scrollText}</span>
              </div>
            )}
          </div>

          {/* Right Content - Image */}
          <div className="w-full lg:w-1/2 relative" data-aos="fade-left">
            {/* Background Decorations */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-200 rounded-full opacity-70 blur-xl"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-200 rounded-full opacity-70 blur-xl"></div>
            
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-auto object-cover rounded-2xl"
              />
              
              {/* Floating Badge */}
              {FloatingBadgeIcon && (
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 flex items-start" data-aos="fade-up" data-aos-delay="300">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3">
                    <FloatingBadgeIcon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{floatingBadgeTitle}</p>
                    <p className="text-xs text-gray-600">{floatingBadgeText}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero1;