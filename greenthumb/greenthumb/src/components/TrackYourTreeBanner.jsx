import { MdOutlineEmail } from "react-icons/md";
import { LuKeyRound } from "react-icons/lu";
import { Link } from 'react-router-dom';

import { FaSeedling } from "react-icons/fa";

import "../Style.css";
import TreePieChart from "./TreePieChart";
import TreePieCount from "./TreePieCount";
import TreeMap from "./TreeMap";
import TrackProgressImg from "./TreeProgressImg";

const TrackYourTreeBanner = () => {
    return (
     <>
        <section
            className="relative w-full h-screen bg-cover bg-center flex items-center"
            style={{ backgroundImage: "url('/trackbannerimg.png')" }}
        >
            {/* utilized ai to create the blur */}
            <div className="absolute inset-0 backdrop-blur-[20px] bg-white/10" style={{width:"50%"}} />

            <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 pt-[72px] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">

                <div className="max-w-md text-white text-center md:text-left">
                    <h1 className="trackbanner-title">
                        Witness Your Impact Grow
                    </h1>
                    <p className="banner-description">
                        From a tiny seed to a flourishing forest.</p>
                    <p className="banner-description">
                        Here, you can track the real-time progress of your donated trees and see
                        how our partner farmers in the Philippines are turning your generosity
                        into a greener reality.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-xs sm:max-w-sm">
                    <h2 className="text-lg font-bold mb-6" style={{color:"#084C32", marginBottom:"1rem"}}>Track Your Tree</h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center border border-gray-200 rounded-lg px-4 py-2 gap-2">
                            <MdOutlineEmail size={20} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="outline-none text-sm w-full text-gray-600"
                            />
                        </div>
                        <div className="flex items-center border border-gray-200 rounded-lg px-4 py-2 gap-2">
                            <LuKeyRound size={20} />
                            <input
                                type="text"
                                placeholder="Unique Tree ID"
                                className="outline-none text-sm w-full text-gray-600"
                            />
                        </div>
                        <Link to="/track" className="btn-primary w-1/2 bg-[#ee9b00] hover:bg-[#d4890a] text-white font-bold py-2 rounded-full transition centered mx-auto" style={{ maxWidth: "200px", width: "100%" }}>
                    Track
                </Link>
                        
                    </div>
                </div>
            </div>
        </section>

        <section>
    <h1 className="trackbanner-title" style={{textAlign:"center", marginTop:"4rem", marginBottom:"4rem"}}>
        See the Change You're Making
    </h1>

    <div className="flex flex-row items-center justify-center gap-40 px-8" style={{marginBottom:"4rem"}}>
        <TreePieChart />
        <TreePieCount />
    </div>

    <div style={{marginBottom:"4rem"}}>
        <TreeMap />
    </div>

    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", marginBottom:"4rem" }}>
        <h1 className="trackbanner-title" style={{ textAlign: "center", marginBottom: "3rem" }}>
            From the Field: Our Community in Action
        </h1>
        <p className="trackbanner-description" style={{ textAlign: "center", maxWidth: "1000px", width: "100%" }}>
            We don't just plant trees; we empower communities. Meet the local Filipino farmers who are the primary caretakers of your donations. Through their expertise in native biodiversity, we ensure a high survival rate for every sapling.
        </p>
    </div>

    <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom:"4rem" }}>
        <TrackProgressImg />
    </div>

    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", marginBottom:"4rem" }}>
        <p className="trackbanner-description" style={{ textAlign: "center", maxWidth: "1000px", width: "100%", color: "#084C32" }}>
            Ready to grow the forest? Start your own planting journey today.
        </p>
           <Link to="/join" className="btn-primary" style={{ maxWidth: "300px", width: "100%" }}>
                    Plant a Tree Now <FaSeedling />
                </Link>
    </div>

</section>
        </>
    
        
       
    );
};

export default TrackYourTreeBanner;