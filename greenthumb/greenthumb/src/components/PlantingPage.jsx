import React, { useState } from 'react';
import TreeCard from '../../../src/components/TreeCard';
import TreeSummary from './TreeSummary';

const TREE_DATA = [
  { id: 1, name: 'Narra', price: 210, image: '/tree.png' },
  { id: 2, name: 'Mahogany', price: 180, image: '/tree.png' }
  // ... add more trees
];

const PlantingPage = () => {
  const [cart, setCart] = useState([]); // Confirmed trees
  const [pendingQuantities, setPendingQuantities] = useState({}); // Temporary counts

  const [selectedTrees, setSelectedTrees] = useState([]);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const updatePending = (treeId, qty) => {
    setPendingQuantities(prev => ({ ...prev, [treeId]: Math.max(0, qty) }));
    // If quantity is set to 0, remove from cart automatically
    if (qty === 0) {
      setCart(prev => prev.filter(item => item.id !== treeId));
    }
  };

  const confirmAdd = (tree) => {
    const qty = pendingQuantities[tree.id];
    setCart(prev => {
      const filtered = prev.filter(item => item.id !== tree.id);
      return [...filtered, { ...tree, quantity: qty }];
    });
  };

  const totalItems = selectedTrees.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="page-container">

      <div className="tracker-shortcut-banner">
        <p>Already planted? Check your progress!</p>
        <Link to="/tracker" className="secondary-btn">Go to Tracker →</Link>
      </div>
      
      <header className="selection-header">
        <h2>Choose Your Trees</h2>
        <button className="cart-button" onClick={() => setIsSummaryOpen(true)}>
          <span>🛒 View Basket</span>
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
      </header>

      <TreeGrid 
        selectedTrees={selectedTrees} 
        setSelectedTrees={setSelectedTrees} 
      />

      <TreeSummary 
        selectedTrees={selectedTrees} 
        isOpen={isSummaryOpen} 
        onClose={() => setIsSummaryOpen(false)} 
      />
    </div>
  );
};

export default PlantingPage;