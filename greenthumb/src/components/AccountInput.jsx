import { FaSeedling } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Dashboard from "../pages/Dashboard"; 
import "../Style.css";


const AccountInput = ({onJoin}) => {

  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e) => {
    if (formData.name && formData.email) {
      onJoin(formData);
    } else {
      alert("Please enter your details first!");
    }
  };

  return (
    <div className="hero-container">
      <h1 className="hero-title">Ready to Plant a Tree?</h1>
      <p className="hero-subtitle">Start planting now with just an instant click.</p>
      
      <form className="hero-form">
        <div className="input-wrapper">
          <span className="input-icon">
            <MdOutlineEmail size={20} />
          </span>
          <input 
            type="email" 
            placeholder="Email Address" 
            className="input-field-with-icon"
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div className="input-wrapper">
          <span className="input-icon">
            <FaRegUser size={18} />
          </span>
          <input 
            type="text" 
            placeholder="Name" 
            className="input-field-with-icon" 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <button type="button" className="btn-primary" onClick={handleSubmit}>
            Plant a Tree Now <FaSeedling />
        </button>
        
      </form>

      <div className="payment-icons">
        <img src="/visa.png" alt="Visa" />
        <img src="/mastercard.png" alt="Mastercard" />
        <img src="/gcash.png" alt="GCash" />
        <img src="/maya.png" alt="Maya" />
      </div>

        <NavLink to="/dashboard" className="btn-primary">Admin</NavLink>

    </div>
  );
};

export default AccountInput;