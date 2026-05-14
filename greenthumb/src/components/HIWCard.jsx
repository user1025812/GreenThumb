import React from "react";
import "../Style.css";

const HIWCard = ({number, title, description, img}) => {
    return (
        <div className="step-card">
        <div className="step-number-badge">{number}.</div>
        <div className="step-image-container">
            <img src={img} alt={title} className="step-image" />
        </div>
        <div className="step-content">
            <h3 className="step-title">{title}</h3>
            <p className="step-description">{description}</p>
        </div>
        </div>
    );  
};

export default HIWCard;