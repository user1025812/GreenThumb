import React, { useState } from 'react';
import { FiMinus, FiPlus } from "react-icons/fi";
import "../Style.css";

const TreeCard = () => {
    const [isSelected, setisSelected] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleSelect = () => setisSelected(true);
    const add = () => setQuantity(prev => prev + 1);

    const minus = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        } else {
            setisSelected(false);
        }
    };

    return (
        <div className="tree-card">
            <img src="/tree.png" alt="Narra" className="tree-image" />
            <h4 className="tree-name">Narra</h4>
            <p className="tree-price">P 210.00</p>

            <div className="action-container">
                <button 
                    className={`btn-select ${isSelected ? 'fade-out' : 'fade-in'}`} 
                    onClick={handleSelect}
                    disabled={isSelected}
                >
                    Select
                </button>

                <div className={`quantity-selector ${isSelected ? 'fade-in' : 'fade-out'}`}>
                    <button className="qty-btn" onClick={minus}><FiMinus/></button>
                    <span className="qty-number">{quantity}</span>
                    <button className="qty-btn" onClick={add}><FiPlus/></button>
                </div>
            </div>
        </div>
    );
};

export default TreeCard;