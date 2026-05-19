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
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

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
    const totalOrderAmount = selectedTrees.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = async () => {
        if (totalItems === 0) {
            alert("Your basket is empty! Please select some trees from the grid below first.");
            return;
        }

        setIsProcessingPayment(true);

        // Generate ONE shared donationId for this entire order
        const sharedDonationId = `DN-${Math.floor(100000 + Math.random() * 900000)}`;

        try {
            // 1. Create the database user entry first
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

            // 2. Call backend payment gateway — pass donationId, trees, and location
            const paymentInitResponse = await fetch("http://localhost:5000/api/payments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: totalOrderAmount,
                    userId: user.email,
                    donationId: sharedDonationId,
                    selectedTrees: selectedTrees.map(t => ({
                        name: t.name || t.species || "Unknown Species",
                        quantity: t.quantity
                    })),
                    region: selectedRegion,
                    specificSite: targetHotspots[selectedRegion],
                    description: `Reforestation Donation for ${totalItems} trees in ${selectedRegion}`
                })
            });

            if (!paymentInitResponse.ok) {
                throw new Error("Failed to initialize transaction details with backend payment gateway.");
            }

            const paymentInitData = await paymentInitResponse.json();
            const { clientKey, intentId } = paymentInitData;

            // 3. Document individual tree logs — all share the same donationId
            await Promise.all(
                selectedTrees.map(async (tree) => {
                    const treeResponse = await fetch("http://localhost:5000/api/trees", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            donationId: sharedDonationId,
                            paymentIntentId: intentId,
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

            // 4. Create the PayMongo Payment Method (GCash)
            const PAYMONGO_PUBLIC_KEY = "pk_test_XchStmZaYhwLyozcFiBB2ihp";
            const authHeader = `Basic ${btoa(PAYMONGO_PUBLIC_KEY + ':')}`;

            const paymentMethodResponse = await fetch('https://api.paymongo.com/v1/payment_methods', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader
                },
                body: JSON.stringify({
                    data: {
                        attributes: {
                            type: 'gcash'
                        }
                    }
                })
            });

            const paymentMethodData = await paymentMethodResponse.json();

            if (!paymentMethodResponse.ok || !paymentMethodData.data) {
                throw new Error(paymentMethodData.errors?.[0]?.detail || "Failed to establish GCash payment method token.");
            }

            const paymentMethodId = paymentMethodData.data.id;

            // 5. Attach Payment Method to the Payment Intent
            const cleanIntentId = clientKey.split('_client_')[0];
            const attachResponse = await fetch(`https://api.paymongo.com/v1/payment_intents/${cleanIntentId}/attach`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader
                },
                body: JSON.stringify({
                    data: {
                        attributes: {
                            client_key: clientKey,
                            payment_method: paymentMethodId,
                            return_url: window.location.origin + "/progresspage"
                        }
                    }
                })
            });

            const attachData = await attachResponse.json();

            if (!attachResponse.ok || !attachData.data) {
                throw new Error(attachData.errors?.[0]?.detail || "Gateway attachment validation rejected.");
            }

            const attachAttributes = attachData.data.attributes;

            // 6. Handle redirect or success
            if (attachAttributes.status === 'awaiting_next_action') {
                window.location.href = attachAttributes.next_action.redirect.url;
            } else if (attachAttributes.status === 'succeeded') {
                setPlantedCount(totalItems);
                setShowSuccessModal(true);
            }

        } catch (error) {
            console.error("Payment routing system failure:", error);
            alert("Oops! There was a problem reaching the backend payment data server. Please try again.");
        } finally {
            setIsProcessingPayment(false);
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
        <div className="page-container" style={{ paddingBottom: isJoined ? '140px' : '0px' }}>
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

            {isJoined && (
                <div className="welcome-banner fade-in unified-sticky-footer">
                    <div className="welcome-text-group">
                        <h1>Happy Planting, {user.name}!</h1>
                        <p>Basket Total: <strong>P {totalOrderAmount.toFixed(2)}</strong> ({totalItems} trees)</p>
                    </div>
                    <div className="checkout-action-group">
                        <button
                            className="btn-primary"
                            onClick={handleCheckout}
                            disabled={isProcessingPayment}
                        >
                            {isProcessingPayment ? "Processing GCash Securely..." : "Confirm & Plant Now"}
                            {totalItems > 0 && !isProcessingPayment && (
                                <span className="banner-badge">{totalItems}</span>
                            )}
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
        Thank you for your donation, <strong>{user.name}</strong>! You have
        successfully contributed <strong>{plantedCount} tree(s)</strong> targeted
        for reforestation in <strong>{targetHotspots[selectedRegion]}</strong>.
      </p>
      {/* ADD THIS */}
      <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#084C32" }}>
        Use your <strong>email</strong> and <strong>User ID</strong> to track
        your trees on the Progress page.
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