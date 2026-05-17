import React from 'react';

const TreeSummary = ({ selectedTrees, isOpen, onClose }) => {
  const totalCost = selectedTrees.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <h3 className="summary-title">Your Planting Summary</h3>
        
        {selectedTrees.length === 0 ? (
          <p className="empty-msg">Your basket is empty. Start picking some trees!</p>
        ) : (
          <>
            <div className="summary-list">
              {selectedTrees.map(tree => (
                <div key={tree.id} className="summary-item">
                  <div className="item-info">
                    <span className="item-qty">{tree.quantity}x</span>
                    <span className="item-name">{tree.name}</span>
                  </div>
                  <span className="item-price">P {(tree.price * tree.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="summary-divider" />
            
            <div className="summary-total">
              <span>Total Amount</span>
              <span className="total-price">P {totalCost.toFixed(2)}</span>
            </div>
            
            <button className="checkout-btn">Proceed to Plant</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TreeSummary;