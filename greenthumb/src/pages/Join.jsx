import React, { useState } from 'react';
import "../Style.css";
import AccountInput from '../components/AccountInput';
import TreeGrid from '../components/TreeGrid';

const Join = ({ selectedTrees = [], setSelectedTrees }) => {
    const [isJoined, setIsJoined] = useState(false);
    const [user, setUser] = useState({ name: '', email: '' });
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [plantedCount, setPlantedCount] = useState(0);
    const [sessionKey, setSessionKey] = useState(0);
    const [selectedRegion, setSelectedRegion] = useState('Luzon'); 

    const targetHotspots = {
        Luzon: "Sierra Madre (Quezon)",
        Visayas: "Northern Negros Protected Area",
        Mindanao: "Caraga Region (Agusan del Sur)"
    };

    const handleJoin = (userData) => {
        setUser(userData);
        setIsJoined(true);
    };

    const totalItems = selectedTrees.reduce((sum, item) => sum + item.quantity, 0);

    const handleCheckout = async () => {
        if (totalItems === 0) {
            alert("Your basket is empty! Please select some trees from the grid below first.");
            return;
        }

        try {
            const userResponse = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    treesDonated: totalItems,
                    joinedDate: new Date().toLocaleDateString()
                }),
            });

            if (!userResponse.ok) {
                throw new Error("Failed to write donor user metadata to database.");
            }

            await Promise.all(
                selectedTrees.map(async (tree) => {
                    const treeResponse = await fetch("http://localhost:5000/api/trees", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            donationId: `DN-${Math.floor(100000 + Math.random() * 900000)}`,
                            name: user.name,
                            email: user.email,
                            species: tree.name || tree.species || "Unknown Species", 
                            quantity: tree.quantity,
                            date: new Date().toLocaleDateString(),
                            location: selectedRegion, 
                            specificSite: targetHotspots[selectedRegion], 
                            status: "Pending"
                        }),
                    });

                    if (!treeResponse.ok) {
                        console.error(`Could not log database row entry for tree type: ${tree.name}`);
                    }
                })
            );

            setPlantedCount(totalItems);
            setShowSuccessModal(true);

        } catch (error) {
            console.error("Database connection failure context details:", error);
            alert("Oops! There was a problem reaching the backend data server. Please try again.");
        }
    };

    const handleCloseModal = () => {
        setSelectedTrees([]);
        setUser({ name: '', email: '' });
        setIsJoined(false);
        setShowSuccessModal(false);
        setSessionKey(prev => prev + 1);
        setSelectedRegion('Luzon'); 
    };

    return (
        <div className="page-container">
            {!isJoined && (
                <div className="login-stage-wrapper">
                    <AccountInput onJoin={handleJoin} />
                </div>
            )}

            <TreeGrid 
                key={sessionKey} 
                selectedTrees={selectedTrees} 
                setSelectedTrees={setSelectedTrees} 
                canInteract={isJoined} 
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
            />

            {/* Positioned directly under the TreeGrid (and its drop-down section) */}
            {isJoined && (
                <div className="welcome-banner fade-in">
                    <div className="welcome-text-group">
                        <h1>Happy Planting, {user.name}!</h1>
                        <p>Logged in as: {user.email}</p>
                    </div>
                    
                    <div className="checkout-action-group">
                        <button className="btn-primary" onClick={handleCheckout}>
                            Confirm & Plant Trees
                            {totalItems > 0 && <span className="banner-badge">{totalItems}</span>}
                        </button>
                    </div>
                </div>
            )}

            {showSuccessModal && (
                <div className="modal-overlay">
                    <div className="success-modal-content">
                        <div className="success-icon-badge">✓</div>
                        <h2>Planting Confirmed!</h2>
                        <p className="modal-message">
                            Thank you for your donation, <strong>{user.name}</strong>! You have successfully contributed <strong>{plantedCount} tree(s)</strong> targeted for reforestation in <strong>{targetHotspots[selectedRegion]}</strong>.
                        </p>
                        <button className="modal-close-action-btn" onClick={handleCloseModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Join;