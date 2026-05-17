import React, { useState } from 'react';
import "../Style.css";
import AccountInput from '../components/AccountInput';
import TreeGrid from '../components/TreeGrid';

const Join = ({selectedTrees, setSelectedTrees}) => {
    const [isJoined, setIsJoined] = useState(false);
    const [user, setUser] = useState({ name: '', email: '' });

    const handleJoin = (userData) => {
        setUser(userData);
        setIsJoined(true);
    };

    return (
        <div className="page-container">
            {!isJoined ? (
                <AccountInput onJoin={handleJoin} />
            ) : (
                <div className="welcome-banner fade-in">
                    <h1>Happy Planting, {user.name}!</h1>
                    <p>Logged in as: {user.email}</p>
                </div>
            )}

            <TreeGrid 
                selectedTrees={selectedTrees} 
                setSelectedTrees={setSelectedTrees} 
                canInteract={isJoined} 
            />

        </div>
    );
};

export default Join;