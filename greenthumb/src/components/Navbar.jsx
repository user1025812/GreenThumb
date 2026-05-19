import { NavLink } from "react-router-dom";
import '../App.css';
// import logo from "../assets/logo.png";
import longlogo from "../assets/longlogo.png";
function Navbar() {
  return (
    <nav className="sticky top-0 left-0 right-0 bg-[#084c32] box-border z-50 flex items-center justify-between px-10 py-6 text-white text-sm font-medium">
        <div className="flex items-center">
        
        <NavLink to="/home">
                <img 
                    src={longlogo} 
                    alt="GreenThumbs" 
                    className="h-14 w-auto object-contain -my-8 max-w-[150px]" 
                />
            </NavLink>
      </div>
      <div className="hidden md:flex items-center gap-8 uppercase text-sm tracking-wide">
        <NavLink to="/home" className="hover:text-green-300">HOME</NavLink>
        <NavLink to="/aboutus" className="hover:text-green-300">ABOUT US</NavLink>
        <NavLink to="/plantatree" className="hover:text-green-300">PLANT A TREE</NavLink>
        <NavLink to="/library" className="hover:text-green-300">GREEN LIBRARY</NavLink>
        <NavLink to="/progresspage" className="hover:text-green-300">PROGRESS</NavLink>
        <NavLink to="/faqs" className="hover:text-green-300">FAQs</NavLink>
        <NavLink to="/join" className="join-nav-btn px-3 py-1 rounded-full font-bold">JOIN</NavLink>
      </div>
      <div className="md:hidden flex items-center">
        <button 
          type="button" 
          command="--toggle" 
          commandfor="mobile-menu" 
          className="text-white focus:outline-none"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-6 in-aria-expanded:hidden">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-6 not-in-aria-expanded:hidden">
            <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

    
      <el-disclosure id="mobile-menu" hidden className="absolute top-full left-0 right-0 bg-[#084c32] flex md:hidden flex-col items-center gap-4 py-6 uppercase text-sm tracking-wide divide-y divide-white/20">
        <NavLink to="/" className="hover:text-green-300">HOME</NavLink>
        <NavLink to="/aboutus" className="hover:text-green-300">ABOUT US</NavLink>
        <NavLink to="/plant" className="hover:text-green-300">PLANT A TREE</NavLink>
        <NavLink to="/library" className="hover:text-green-300">GREEN LIBRARY</NavLink>
        <NavLink to="/progresspage" className="hover:text-green-300">PROGRESS</NavLink>
        <NavLink to="/faqs" className="hover:text-green-300">FAQs</NavLink>
      </el-disclosure>
    </nav>
  );
}

export default Navbar;