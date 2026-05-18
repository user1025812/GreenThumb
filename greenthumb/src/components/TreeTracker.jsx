import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "../Style.css";

//used ai as guide for the carousel

//sample only. will replace once may database na
const purchasedTrees = [
    {
        id: 1,
        name: "Narra",
        image: "/tree.png",
        username: "Ana Santos",
        treeID: "NR-2037-PH",
        status: "Growing",
        assignedFarmer: "Juan Dela Cruz",
        lastUpdate: "2025-05-01",
        currentLocation: "Batangas, Philippines",
        stage: "Planted",
        nextUpdateDue: "2025-08-01",
        photoUpload: null,
    },
    {
        id: 2,
        name: "Molave",
        image: "/tree.png",
        username: "Ben Reyes",
        treeID: "MV-1045-PH",
        status: "Survived",
        assignedFarmer: "Maria Santos",
        lastUpdate: "2025-04-15",
        currentLocation: "Laguna, Philippines",
        stage: "Planted",
        nextUpdateDue: "2025-07-15",
        photoUpload: null,
    },
    {
        id: 3,
        name: "Aratilis",
        image: "/tree.png",
        username: "Clara Mendoza",
        treeID: "AR-3021-PH",
        status: "Needs Care",
        assignedFarmer: "Pedro Reyes",
        lastUpdate: "2025-03-20",
        currentLocation: "Quezon, Philippines",
        stage: "Pending",
        nextUpdateDue: "2025-06-20",
        photoUpload: null,
    },
    {
        id: 4,
        name: "Narra",
        image: "/tree.png",
        username: "Diego Lim",
        treeID: "NR-2038-PH",
        status: "Growing",
        assignedFarmer: "Ana Villanueva",
        lastUpdate: "2025-04-01",
        currentLocation: "Cebu, Philippines",
        stage: "Planted",
        nextUpdateDue: "2025-07-01",
        photoUpload: null,
    },
];

const STATUS_COLORS = {
    "Survived": "#084C32",
    "Growing": "#4CAF50",
    "Needs Care": "#ee9b00",
};

const TreeCard = ({ tree, onClick }) => (
    <div
        onClick={() => onClick(tree)}
        style={{
            background: "rgba(255,255,255,0.85)",
            borderRadius: "24px",
            padding: "2.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            width: "400px",
            height: "450px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "transform 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >
        <img src={tree.image} alt={tree.name} style={{ width: "240px", height: "220px", objectFit: "contain" }} />
        <h4 style={{ color: "#084C32", fontWeight: "700", fontSize: "1.6rem", marginTop: "1rem" }}>{tree.name}</h4>
        <p style={{ fontSize: "0.9rem", color: "#888", marginTop: "0.25rem" }}>{tree.treeID}</p>

        {/* change to the speciesof trees later on. currently status of plants */}
        <span style={{
            marginTop: "0.75rem",
            background: STATUS_COLORS[tree.status] ?? "#ccc",
            color: "white",
            borderRadius: "999px",
            padding: "3px 14px",
            fontSize: "0.8rem",
            fontWeight: "600",
        }}>
            {tree.status}
        </span>
    </div>
);

const TreeDetail = ({ tree, onClose }) => (
    <div
        style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000,
        }}
        onClick={onClose}
    >
        <div
            onClick={e => e.stopPropagation()}
            style={{
                background: "white",
                borderRadius: "24px",
                padding: "2.5rem",
                maxWidth: "900px", 
                width: "90%",
                display: "flex",
                gap: "2rem",
                position: "relative",
            }}
        >
            <button
                onClick={onClose}
                style={{ position: "absolute", top: "1rem", right: "1.25rem", background: "none", border: "none", fontSize: "1.25rem", cursor: "pointer", color: "#888" }}
            >✕</button>

           <div style={{ display: "flex", flexDirection: "row", gap: "4rem", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "300px" }}>
                    <img src={tree.image} alt={tree.name} style={{ width: "260px", height: "260px", objectFit: "contain" }} />
                    <h4 style={{ color: "#084C32", fontWeight: "700", fontSize: "2.4rem", marginTop: "0.75rem" }}>{tree.name}</h4>
                </div>
            </div>

            <div style={{ fontSize: "1.2rem", color: "#333", lineHeight: "1.9", textAlign: "left", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
    <p><strong>Username</strong>: {tree.username}</p>
    <p><strong>Tree Species</strong>: {tree.name}</p>
    <p><strong>Tree ID</strong>: {tree.treeID}</p>
    <p><strong>Status</strong>: {tree.status}</p>
    <p><strong>Assigned Farmer</strong>: {tree.assignedFarmer}</p>
    <p><strong>Last Update</strong>: {tree.lastUpdate}</p>
    <p><strong>Current Location</strong>: {tree.currentLocation}</p>
    <p><strong>Stage</strong>: {tree.stage}</p>
    <p><strong>Next Update Due</strong>: {tree.nextUpdateDue}</p>
    {tree.photoUpload && (
        <img
            src={tree.photoUpload}
            alt="Tree progress"
            style={{ width: "100%", borderRadius: "12px", objectFit: "cover", marginTop: "0.5rem" }}
        />
    )}
</div>
        </div>
    </div>
);

// carousel
const TreeTracker = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [selectedTree, setSelectedTree] = useState(null);

    const VISIBLE = 3;
    const canGoLeft = startIndex > 0;
    const canGoRight = startIndex + VISIBLE < purchasedTrees.length;
    const visibleTrees = purchasedTrees.slice(startIndex, startIndex + VISIBLE);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem", marginTop: "4rem" }}>
           <h1 style={{ color: "#084C32", fontWeight: "700", marginBottom: "3rem", fontSize: "2.5rem" }}>
    Hello, {visibleTrees[0]?.username}!
</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                
                {/* left arrow */}
                <button
                    onClick={() => setStartIndex(prev => prev - 1)}
                    disabled={!canGoLeft}
                    style={{
                        background: canGoLeft ? "#084C32" : "#ccc",
                        color: "white", border: "none", borderRadius: "50%",
                        width: "56px", height: "56px",
                        fontSize: "1.2rem",
                        cursor: canGoLeft ? "pointer" : "default",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                >
                    <FaChevronLeft />
                </button>

                {/* cards */}
                <div style={{ display: "flex", gap: "2rem" }}>
                    {visibleTrees.map(tree => (
                        <TreeCard key={tree.id} tree={tree} onClick={setSelectedTree} />
                    ))}
                </div>

                {/* right arrow */}
                <button
                    onClick={() => setStartIndex(prev => prev + 1)}
                    disabled={!canGoRight}
                    style={{
                        background: canGoRight ? "#084C32" : "#ccc",
                        color: "white", border: "none", borderRadius: "50%",
                        width: "56px", height: "56px",
                        fontSize: "1.2rem",
                        cursor: canGoRight ? "pointer" : "default",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                >
                    <FaChevronRight />
                </button>

            </div>

            {selectedTree && (
                <TreeDetail tree={selectedTree} onClose={() => setSelectedTree(null)} />
            )}

        </div>
    );
};

export default TreeTracker;