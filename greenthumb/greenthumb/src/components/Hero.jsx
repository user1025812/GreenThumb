import { NavLink } from "react-router-dom";

import banner1 from '../assets/banner1.png';
function Hero() {
  return (
    <div className="relative h-[47vw] w-full flex items-center justify-end pr-20 overflow-hidden rounded-b-[50px]">
      <img 
        src={banner1}
        className="absolute inset-0 w-full h-full object-cover banner1-img mt-10"
        alt="banner1"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 text-right max-w-2xl text-white">
        <h1 className="text-3xl font-bold leading-tight mb-0 mt-8 pt-8  m:text-sm title-name tracking-wide">
          Every donation plants a tree,<br/>building a better tomorrow.
        </h1>
        <p className="text-xl font-light opacity-90 subtitle-home italic ">
          Join <span className="subtitle-span-home">Green Thumb</span> in restoring Philippine forests. We make reforestation easy, trustworthy, and accessible for everyone.
        </p>
        <NavLink to="/plant" >        
          <button className=" mt-3 text-white px-5 py-1.5 rounded-lg font-bold text-sm transition-all shadow-lg plant-home-btn">
            Plant a Tree Now
          </button>
        </NavLink>


      </div>
    </div>
  );
};

export default Hero;