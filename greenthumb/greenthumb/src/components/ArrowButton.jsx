import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

function ArrowButton({ to, text }) {
  return (
    <div className="w-full text-center">
      <p className="text-base md:text-lg px-4 partners-btn">
        <NavLink 
          to={to} 
          className="group font-bold text-[#ee9b00] border-b-2 border-[#ee9b00] inline-flex items-center pb-0.5 px-2 transition-all duration-300 ease-in-out hover:bg-[#ee9b00] hover:text-white hover:border-transparent hover:rounded-full hover:px-5 hover:py-2"
        >
          {text}
          <ArrowRight 
            size={18} 
            className="inline-block ml-1 transition-transform duration-200 ease-in-out group-hover:translate-x-1.5" 
          />
        </NavLink>
      </p>
    </div>
  );
}

export default ArrowButton;