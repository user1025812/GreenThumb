import React from "react";
import { Link } from 'react-router-dom';
import { FaSeedling } from "react-icons/fa";
import "../Style.css";

const PlantATreeBanner = () => {
    return (
        <section className="banner-container">

            <div className="banner-overlay"></div>

            <div className="banner-content">
                <h1 className="banner-title">A Greener Future</h1>
                <p className="banner-description ">It takes just one click to make a greener future.</p>
                <Link to="/join" className="banner-button">
                    Plant a Tree Now <FaSeedling />
                </Link>
            </div>   

        </section>
    );
};
export default PlantATreeBanner;