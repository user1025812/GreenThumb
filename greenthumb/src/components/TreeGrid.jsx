import React, { useState } from 'react';
import TreeCard from './TreeCard';
import TreeSummary from './TreeSummary';
import { HiOutlineShoppingCart } from "react-icons/hi2";
import "../Style.css";

// This matches the data structure TreeCard expects
const TREE_DATA = [
  { id: 1, name: 'Narra', price: 210, image: '/tree.png' },
  { id: 2, name: 'Mahogany', price: 180, image: '/tree.png' },
  { id: 3, name: 'Acacia', price: 150, image: '/tree.png' },
  { id: 4, name: 'Ipil', price: 250, image: '/tree.png' },
];

const TreeGrid = ({selectedTrees = [], setSelectedTrees, canInteract}) => {
  const [pendingQuantities, setPendingQuantities] = useState({});
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  // Update temp quantity before user hits "Add"
  const updatePending = (treeId, qty) => {
    setPendingQuantities(prev => ({ ...prev, [treeId]: Math.max(0, qty) }));
    
    // If user reduces to 0, remove it from the actual selection too
    if (qty === 0) {
      setSelectedTrees(prev => prev.filter(item => item.id !== treeId));
    }
  };

  // Confirm and move to the global selectedTrees state
  const confirmAdd = (tree) => {
    const qty = pendingQuantities[tree.id] || 1;
    setSelectedTrees(prev => {
      const filtered = prev.filter(item => item.id !== tree.id);
      return [...filtered, { ...tree, quantity: qty }];
    });
  };

  // Badge count (total trees selected)
  const totalItems = selectedTrees.reduce((sum, item) => sum + item.quantity, 0);
  
  const TreeGrid = () => {
    const trees = Array(12).fill(null);

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
        
        <div className={`tree-grid ${!canInteract ? 'grid-disabled' : ''}`}> 
          {TREE_DATA.map((tree) => (
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

        <TreeSummary 
          selectedTrees={selectedTrees} 
          isOpen={isSummaryOpen} 
          onClose={() => setIsSummaryOpen(false)} 
        />
      </div>
    );
  }
};

export default TreeGrid;