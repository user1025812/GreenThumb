import React, { useState, useRef, useEffect } from 'react';
import TreeCard from './TreeCard';
import TreeSummary from './TreeSummary';
import { HiOutlineShoppingCart } from "react-icons/hi2";
import trees from '../components/library/treesData';
import "../Style.css";

const TreeGrid = ({ selectedTrees = [], setSelectedTrees, canInteract, selectedRegion, setSelectedRegion }) => {
  const [pendingQuantities, setPendingQuantities] = useState({});
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updatePending = (treeId, qty) => {
    setPendingQuantities(prev => ({ ...prev, [treeId]: Math.max(0, qty) }));
    if (qty === 0) {
      setSelectedTrees(prev => prev.filter(item => item.id !== treeId));
    }
  };

  const confirmAdd = (tree) => {
    const qty = pendingQuantities[tree.id] || 1;
    setSelectedTrees(prev => {
      const filtered = prev.filter(item => item.id !== tree.id);
      return [...filtered, { ...tree, quantity: qty }];
    });
  };

  const totalItems = selectedTrees.reduce((sum, item) => sum + item.quantity, 0);

  const regionOptions = [
    { value: 'Luzon', label: 'Luzon — Sierra Madre' },
    { value: 'Visayas', label: 'Visayas — Negros Forest' },
    { value: 'Mindanao', label: 'Mindanao — Caraga Mining Area' }
  ];

  const currentSelectionLabel = regionOptions.find(opt => opt.value === selectedRegion)?.label || '';

  return (
    <div className="grid-wrapper"> 
      <div className="grid-header">
        <div className="header-spacer"></div>
        <h2 className="grid-title">Choose Your Tree</h2>

        <button className="cart-button" onClick={() => setIsSummaryOpen(true)}>
          <HiOutlineShoppingCart />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          <span className="cart-text">View Basket</span>
        </button>
      </div>
      
      {/* Tree Grid Layout */}
      <div className={`tree-grid ${!canInteract ? 'grid-disabled' : ''}`}> 
        {trees.map((tree) => (
          <TreeCard 
            key={tree.id}
            tree={tree}
            disabled={!canInteract} 
            quantity={pendingQuantities[tree.id] || 0}
            isAdded={selectedTrees.some(item => item.id === tree.id)}
            onUpdateQuantity={(qty) => {
                if(!canInteract) return alert("Please enter your details above first!");
                updatePending(tree.id, qty);
            }}
            onConfirm={() => confirmAdd(tree)}
          />
        ))}
      </div>

      <div className="grid-footer-dropdown">
        <div className={`dropdown-container ${!canInteract ? 'disabled-wrapper' : ''}`} ref={dropdownRef}>
          <label className="dropdown-label">
            Choose Target Reforestation Site
          </label>
          
          <div 
            className={`custom-select-trigger ${isDropdownOpen ? 'open' : ''} ${!canInteract ? 'disabled' : ''}`}
            onClick={() => {
              if(!canInteract) {
                alert("Please enter your details above first!");
                return;
              }
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <span>{currentSelectionLabel}</span>
            <span className="custom-arrow"></span>
          </div>

          {isDropdownOpen && canInteract && (
            <ul className="custom-options-menu">
              {regionOptions.map((option) => (
                <li 
                  key={option.value}
                  className={`custom-option-item ${selectedRegion === option.value ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedRegion(option.value);
                    setIsDropdownOpen(false);
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <TreeSummary 
        selectedTrees={selectedTrees} 
        isOpen={isSummaryOpen} 
        onClose={() => setIsSummaryOpen(false)} 
      />
    </div>
  );
};

export default TreeGrid;