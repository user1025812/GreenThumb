import facebookIcon from "../assets/facebook.png"; 
import xIcon from "../assets/twitter.png"; 
import instagramIcon from "../assets/instagram.png"; 
import { NavLink } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-zinc-900 text-white py-12 text-center">
            {/* Navigation Links */}
            <div className="flex justify-center gap-5 text-sm uppercase tracking-tight mb-4 font-medium">
                <NavLink to="/" className="hover:text-gray-400 transition-colors">Home</NavLink>
                <NavLink to="/aboutus" className="hover:text-gray-400 transition-colors">About Us</NavLink>
                <NavLink to="/plant" className="hover:text-gray-400 transition-colors">Plant a Tree</NavLink>
                <NavLink to="/library" className="hover:text-gray-400 transition-colors">Green Library</NavLink>
                <NavLink to="/progress" className="hover:text-gray-400 transition-colors">Progress</NavLink>
                <NavLink to="/faqs" className="hover:text-gray-400 transition-colors">FAQs</NavLink>
            </div>

            <div className="flex justify-center gap-6 mb-4 items-center">
                <a href="#" className="transition-opacity">
                    <img src={facebookIcon} alt="Facebook" className="w-5 h-5 " />
                </a>
                <a href="#" className=" transition-opacity">
                    <img src={xIcon} alt="X" className="w-5 h-5 " />
                </a>
                <a href="#" className=" transition-opacity">
                    <img src={instagramIcon} alt="Instagram" className="w-5 h-5 " />
                </a>
            </div>

            <p className="text-[13px] text-gray-400 font-medium">
                © 2026 Green Thumb, Inc. All rights reserved.
            </p>
      </footer>
    )
}

export default Footer;