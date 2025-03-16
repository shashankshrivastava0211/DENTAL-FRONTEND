import React, { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Hero({
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
  scrollText
}) {
  const heroRef = useRef(null);

  const handleScrollTo = (e) => {
    e.preventDefault();
    const yOffset = -80; // Offset for fixed header if needed
    const element = scrollToRef.current;
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative h-[100dvh] flex items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-full h-full overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `${5 + Math.random() * 10}s linear infinite`,
                  animationName: 'float-particle',
                  width: `${Math.random() * 15 + 5}px`,
                  height: `${Math.random() * 15 + 5}px`,
                  backgroundColor: 'white',
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 via-transparent to-indigo-900/80"></div>

        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="max-w-xl">
            {/* Badge */}
            {badgeText && BadgeIcon && (
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-6 sm:mb-8"
                style={{
                  animation: 'fade-in-down 0.6s ease-out forwards',
                }}
                data-aos="fade-down"
                data-aos-delay="100"
              >
                <BadgeIcon className="w-4 h-4 text-indigo-300" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                <span className="text-sm sm:text-base font-medium text-white whitespace-nowrap">
                  {badgeText}
                </span>
              </div>
            )}

            {/* Heading */}
            <h1
              data-aos="fade-right"
              data-aos-delay="200"
              className="font-['Belanosima'] text-4xl sm:text-5xl lg:text-6xl font-medium text-white mb-6 sm:mb-8 leading-tight"
              style={{
                fontFamily: "'Belanosima', sans-serif",
              }}
            >
              {heading} <span className="text-indigo-200">{headingHighlight}</span>{" "}
              {headingEnd}
            </h1>

            {/* Description */}
            <p
              data-aos="fade-right"
              data-aos-delay="300"
              className="text-lg sm:text-xl text-indigo-50 mb-8 sm:mb-10 max-w-lg leading-relaxed"
            >
              {description}
            </p>

            {/* CTA Buttons */}
            <div
              data-aos="fade-right"
              data-aos-delay="400"
              className="flex flex-wrap gap-4 sm:gap-5 mb-10 sm:mb-12"
            >
              {primaryButtonText && (
                <a
                  href="#"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-800 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all text-base sm:text-lg relative overflow-hidden"
                  onClick={primaryButtonAction}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span className="relative z-10">{primaryButtonText}</span>
                  <span
                    style={{
                      content: '',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '0',
                      height: '0',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%',
                      transform: 'translate(-50%, -50%)',
                      transition: 'width 0.6s ease, height 0.6s ease',
                    }}
                    className="absolute inset-0 opacity-0 hover:opacity-100 hover:w-[300%] hover:h-[300%]"
                  ></span>
                </a>
              )}
              
              {secondaryButtonText && (
                <button
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all text-base sm:text-lg group"
                  onClick={secondaryButtonAction}
                >
                  <span className="relative z-10 flex items-center">
                    {SecondaryButtonIcon && (
                      <SecondaryButtonIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:animate-pulse" />
                    )}
                    {secondaryButtonText}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Hero Image */}
          {imageSrc && (
            <div
              data-aos="fade-left"
              data-aos-delay="300"
              className="block"
            >
              <div className="relative">
                <div className="absolute inset-0 -m-8 bg-indigo-600/30 rounded-full blur-xl" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
                <img
                  src={imageSrc}
                  alt={imageAlt || "Hero image"}
                  className="relative z-10 rounded-2xl shadow-2xl object-cover h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] w-full transition-transform duration-700 hover:scale-[1.02]"
                  loading="eager"
                />

                {/* Floating Badge */}
                {FloatingBadgeIcon && floatingBadgeTitle && (
                  <div 
                    className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 -left-4 sm:-left-6 md:-left-8 bg-white p-3 sm:p-4 md:p-5 rounded-xl shadow-xl z-20 flex items-center gap-2 sm:gap-3 md:gap-4"
                    style={{
                      animation: 'float 6s ease-in-out infinite',
                    }}
                    data-aos="fade-up"
                    data-aos-delay="600"
                  >
                    <div className="bg-indigo-100 p-1 sm:p-2 md:p-3 rounded-lg">
                      <FloatingBadgeIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-indigo-600 fill-indigo-600" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm md:text-base font-semibold text-indigo-900">
                        {floatingBadgeTitle}
                      </div>
                      {floatingBadgeText && (
                        <div className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                          {floatingBadgeText}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Scroll Indicator - Positioned higher from bottom */}
        {scrollText && scrollToRef && (
          <div className="absolute -bottom-40  -sm:bottom-44 left-0 right-0 text-center">
            <button
              onClick={handleScrollTo}
              className="group inline-flex flex-col items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-medium text-white hover:text-indigo-200 transition-colors"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <span>{scrollText}</span>
              <ArrowDown 
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" 
                style={{ 
                  animation: 'bounce 2s infinite',
                }} 
              />
            </button>
          </div>
        )}
      </div>

      {/* Keyframe animations defined inline */}
      {/* <style jsx>{`
        @keyframes float-particle {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          25% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(-30vh) translateX(20vw) scale(1.5);
            opacity: 0.4;
          }
          75% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(30vw) scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-20px); }
          60% { transform: translateY(-10px); }
        }
      `}</style> */}
    </section>
  );
}

export default Hero;






