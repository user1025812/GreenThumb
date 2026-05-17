import React, { useState } from 'react';

const Sidebar = () => {
  const images = ["/step1.jpg", "/step2.png", "/step3.jpg", "/step4.png", "/step5.png"];
  const [activeImg, setActiveImg] = useState(0);

  // Handler to navigate to the next image
  const handleNext = () => {
    setActiveImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handler to navigate to the previous image
  const handlePrev = () => {
    setActiveImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="w-[35%] flex flex-col gap-4">
      {/* Profile Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200">
        <h2 className="profile-name">
          Mickaela Lasala
        </h2>
      </div>

      {/* Gallery Card */}
      <div className="flex-1 flex flex-col bg-white p-6 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-[#1e1e1e] mb-4">
          Growth Progress Gallery
        </h3>
        
        {/* Carousel Window */}
        <div className="relative flex-1 rounded-3xl overflow-hidden aspect-[4/5] group">
          {/* Images Wrapper */}
          <div 
            className="flex h-full w-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeImg * 100}%)` }}
          >
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Growth Progress ${index + 1}`}
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))}
          </div>

          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 focus:outline-none"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 focus:outline-none"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                activeImg === i ? 'w-6 bg-[#14532d]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;