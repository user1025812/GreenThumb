import { NavLink } from "react-router-dom";
import '../App.css';
function  Navbar() {
  return (
    <nav className="absolute top-0 w-full z-50 flex items-center justify-between px-10 py-6 text-white text-sm font-medium">
      <div className="flex items-center gap-2">
        {/* for logo  */}
        <span className="text-lg font-bold tracking-tight">Green Thumb</span>
      </div>
      <div className="hidden md:flex items-center gap-8 uppercase text-[10px] tracking-widest">
        <NavLink to="/" className="hover:text-green-300">HOME</NavLink>
          <NavLink to="/aboutus" className="hover:text-green-300">ABOUT US</NavLink>
          <NavLink to="/plant" className="hover:text-green-300">PLANT A TREE</NavLink>
          <NavLink to="/library" className="hover:text-green-300">GREEN LIBRARY</NavLink>
          <NavLink to="/progress" className="hover:text-green-300">PROGRESS</NavLink>
          <NavLink to="/faqs" className="hover:text-green-300">FAQs</NavLink>
        <button className="join-nav-btn px-3 py-1 rounded-full font-bold">JOIN</button>
      </div>
    </nav>
  );
};

export default Navbar;