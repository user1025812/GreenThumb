import { useState, useEffect } from "react";
import ArrowButton from "./ArrowButton";

function BiodiversityCarousel({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) {
    return <div className="w-full aspect-[4/3] bg-gray-100 rounded-r-[40px]" />;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full overflow-hidden rounded-r-[40px] shadow-2xl aspect-[4/3]">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? "bg-gray-800 w-4" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function BiodiversitySection() {
  const biodiversityImages = [
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    <div className="py-20 max-w-8xl mx-auto  pl-0 pr-10 grid md:grid-cols-2 gap-1 items-center">
      <BiodiversityCarousel images={biodiversityImages} />

      <div className="text-center md:text-center px-8">
        <p className="text-4xl font-bold mb-6 tracking-normal bio-title">
          Protecting Philippine Biodiversity
        </p>
        <p className="mb-8 text-xl leading-relaxed  mx-auto md:mx-0 bio-subtitle px-8 pt-20 pb-10">
          We don't just plant anywhere. We carefully select locations based on soil type and existing ecosystems. 
          By planting native species like Narra and Molave, we ensure our forests grow faster and stay resilient.
        </p>
           <ArrowButton 
            to="/aboutus" 
            text="Learn more about our Native Trees" 
            />
      </div>
    </div>
  );
}
export default BiodiversitySection;