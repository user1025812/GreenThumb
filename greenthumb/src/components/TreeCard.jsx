import React from 'react';
import { useState } from 'react';
import { FiMinus, FiPlus } from "react-icons/fi";
import "../Style.css";

const TreeCard = ({ tree, quantity, onUpdateQuantity, onConfirm, isAdded }) => {
  if (!tree) return null;

  const isSelecting = !isAdded && quantity > 0;

  return (
    <div 
      className={`tree-card ${isSelecting ? 'selecting' : ''} ${isAdded ? 'selected-card' : ''}`}
    >
      <img 
        src={tree.image} 
        alt={tree.name} 
        className={`tree-image w-20 h-20 transition-transform duration-500 ${isSelecting ? 'rotate-3' : ''}`} 
      />
      
      <h4 className="tree-name font-bold text-lg mt-2 text-gray-900">{tree.name}</h4>
      <p className="tree-price text-amber-500 font-semibold">P {tree.price.toFixed(2)}</p>

      <div className="action-container">
        {/* State: Select */}
        {!isAdded && quantity === 0 && (
          <button 
            className="btn-select bg-[#084C32] text-white rounded-full text-sm hover:bg-[#0a5d3d]"
            onClick={() => onUpdateQuantity(1)}
          >
            Select
          </button>
        )}

        {/* State: Quantity Selector + Add Button */}
        {isSelecting && (
          <div className="quantity-controls-wrapper fade-in">
            <div className="quantity-selector">
              <button 
                className="qty-btn" 
                onClick={() => onUpdateQuantity(quantity - 1)}
              >
                <FiMinus />
              </button>
              
              <span className="qty-number">{quantity}</span>
              
              <button 
                className="qty-btn" 
                onClick={() => onUpdateQuantity(quantity + 1)}
              >
                <FiPlus />
              </button>
            </div>

            <button 
              className="btn-add-confirm"
              onClick={onConfirm}
            >
              Add
            </button>
          </div>
        )}

        {/* State: Added */}
        {isAdded && (
          <div 
            className="added-badge flex items-center justify-center fade-in"
            onClick={() => onUpdateQuantity(0)}
          >
            Added ✓
          </div>
        )}
      </div>
      
    </div>
    
  );
};

export default TreeCard;