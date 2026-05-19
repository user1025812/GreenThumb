import earthLogo from "../assets/earth-ust.png";
import trillionLogo from "../assets/trilliontrees.png"
import denrLogo from "../assets/denrr.png";
import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

const partners = [
  { name: "Earth-UST", logo: earthLogo },
  { name: "Trillion Trees", logo: trillionLogo },
  { name: "DENR", logo: denrLogo }
];

function PartnersSection(){
  return (
    <div className="py-12 md:py-20 text-center bg-white">
      
      <p className="font-bold partners-title leading-wide text-3xl md:text-4xl pb-8 md:pb-12">
        Partners in Growth
      </p>
      
      <div className="flex flex-wrap justify-center items-end gap-8 md:gap-24 px-4 mb-12 md:mb-20">
        {partners.map((partner) => (
          <div key={partner.name} className="flex flex-col items-center group max-w-[200px] md:max-w-none">
            <img 
              src={partner.logo} 
              alt={partner.name} 
              className="h-28 sm:h-44 md:h-60 object-contain mb-4 md:mb-6 transition-transform group-hover:scale-110" 
            />
            
            <p className="font-extrabold text-xl md:text-3xl partners-name text-black">
              {partner.name}
            </p>
          </div>
        ))}
      </div>
      
      <p className="text-base md:text-lg px-4 partners-btn">
        <span className="text-[#ee9b00] italic block sm:inline pr-5">
          Inspired to join us?
        </span>
        <NavLink 
          to="/plant" 
          className="group font-bold text-[#ee9b00] border-b-2 border-[#ee9b00] inline-flex items-center pb-0.5 px-2 transition-all duration-300 ease-in-out hover:bg-[#ee9b00] hover:text-white hover:border-transparent hover:rounded-full hover:px-5 hover:py-2"
        >
          Plant Your First Tree
          <ArrowRight 
            size={18} 
            className="inline-block ml-1 transition-transform duration-200 ease-in-out group-hover:translate-x-1.5" 
          />
        </NavLink>
      </p>
    </div>
  );
};

export default PartnersSection;