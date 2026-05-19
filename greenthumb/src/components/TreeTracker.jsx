import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "../Style.css";

const treeImages = {
  "Dita":                "/Dita.png",
  "Araucaria":           "/Araucaria.png",
  "Aunasin":             "/Aunasin.jpg",
  "Neem Tree":           "/NeemTree.jpg",
  "Botong":              "/Botong.jpg",
  "Napoleon's Plume":    "/Napoleon.jpg",
  "Bottle Brush Tree":   "/BottleBrush.jpg",
  "Bitaog":              "/Bitaog.jpg",
  "Ylang-Ylang":         "/YlangYlang.jpg",
  "Kalingag":            "/Kalingag.jpg",
  "Bagawak Morado":      "/BagawakMorado.jpg",
  "Salingbobog":         "/Salingbobog.jpg",
  "Handkerchief Tree":   "/HandkerchiefTree.jpg",
  "Katmon":              "/Katmon.jpg",
  "Rainbow Tree":        "/RainbowTree.jpg",
  "default":             "/tree.png",
};

const getTreeImage = (species, photo) => {
  if (photo) return photo;
  return treeImages[species] || treeImages["default"];
};

const STAGE_COLORS = {
  "Seedling": "#ee9b00",
  "Growing":  "#4CAF50",
  "Mature":   "#084C32",
};

const stageSteps = ["Seedling", "Growing", "Mature"];

const StageBar = ({ stage }) => {
  const idx = stageSteps.indexOf(stage);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", margin: "8px 0" }}>
      {stageSteps.map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{
            width: 26, height: 26, borderRadius: "50%",
            background: i <= idx ? "#084C32" : "#e0e0e0",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: i <= idx ? "#fff" : "#999", fontSize: 10, fontWeight: 600,
          }}>
            {i + 1}
          </div>
          <span style={{
            fontSize: 11,
            color: i <= idx ? "#084C32" : "#999",
            fontWeight: i === idx ? 700 : 400,
          }}>
            {s}
          </span>
          {i < stageSteps.length - 1 && (
            <div style={{ width: 24, height: 2, background: i < idx ? "#084C32" : "#e0e0e0" }} />
          )}
        </div>
      ))}
    </div>
  );
};

const TreeCard = ({ tree, onClick }) => (
  <div
    onClick={() => onClick(tree)}
    style={{
      background: "rgba(255,255,255,0.85)",
      borderRadius: "24px",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      width: "300px",
      height: "420px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      transition: "transform 0.2s",
    }}
    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
  >
    <img
      src={getTreeImage(tree.species, tree.photo)}
      alt={tree.species}
      style={{ width: "180px", height: "180px", objectFit: "cover", borderRadius: 12 }}
      onError={e => { e.target.src = treeImages["default"]; }}
    />
    <h4 style={{ color: "#084C32", fontWeight: "700", fontSize: "1.3rem", marginTop: "1rem", textAlign: "center" }}>
      {tree.species}
    </h4>
    <p style={{ fontSize: "0.8rem", color: "#888", marginTop: "0.2rem" }}>
      {tree.donationId}
    </p>
    <p style={{ fontSize: "0.8rem", color: "#555", marginTop: "0.2rem" }}>
      {tree.quantity} tree{tree.quantity > 1 ? "s" : ""}
    </p>
    <span style={{
      marginTop: "0.6rem",
      background: STAGE_COLORS[tree.stage] ?? "#ccc",
      color: "white",
      borderRadius: "999px",
      padding: "3px 14px",
      fontSize: "0.78rem",
      fontWeight: "600",
    }}>
      {tree.stage}
    </span>
    <p style={{ fontSize: "0.78rem", color: "#777", marginTop: "0.4rem", textAlign: "center" }}>
      📍 {tree.location}
    </p>
    <p style={{ fontSize: "0.78rem", color: "#999", marginTop: "0.2rem", textAlign: "center" }}>
      Farmer: {tree.farmer}
    </p>
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
        maxHeight: "85vh",
        overflowY: "auto",
        display: "flex",
        gap: "2rem",
        position: "relative",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: "1rem", right: "1.25rem",
          background: "none", border: "none",
          fontSize: "1.25rem", cursor: "pointer", color: "#888",
        }}
      >✕</button>

      <div style={{ display: "flex", flexDirection: "row", gap: "3rem", alignItems: "flex-start", width: "100%" }}>

        {/* Left — image + name + stage */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "220px" }}>
          <img
            src={getTreeImage(tree.species, tree.photo)}
            alt={tree.species}
            style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: 16 }}
            onError={e => { e.target.src = treeImages["default"]; }}
          />
          <h4 style={{ color: "#084C32", fontWeight: "700", fontSize: "1.5rem", marginTop: "0.75rem", textAlign: "center" }}>
            {tree.species}
          </h4>
          <StageBar stage={tree.stage} />
          <span style={{
            marginTop: "0.4rem",
            background: STAGE_COLORS[tree.stage] ?? "#ccc",
            color: "white", borderRadius: "999px",
            padding: "3px 16px", fontSize: "0.82rem", fontWeight: "600",
          }}>
            {tree.stage}
          </span>
        </div>

        {/* Right — all fields matching Progress dashboard tab */}
        <div style={{ fontSize: "0.95rem", color: "#333", lineHeight: "2.2", flex: 1 }}>
          <p><strong>Donation ID:</strong> {tree.donationId || "N/A"}</p>
          <p><strong>User ID:</strong> {tree.userId || "N/A"}</p>
          <p><strong>Donor Name:</strong> {tree.donorName || "N/A"}</p>
          <p><strong>Tree Species:</strong> {tree.species || "N/A"}</p>
          <p><strong>Quantity:</strong> {tree.quantity || 1} tree{tree.quantity > 1 ? "s" : ""}</p>
          <p><strong>Assigned Farmer:</strong> {tree.farmer || "Unassigned"}</p>
          <p><strong>Last Update:</strong> {tree.lastUpdate || "N/A"}</p>
          <p><strong>Current Location:</strong> {tree.location || "N/A"}</p>
          <p><strong>Specific Site:</strong> {tree.specificSite || "N/A"}</p>
          <p><strong>Stage:</strong> {tree.stage || "N/A"}</p>
          <p><strong>Next Update Due:</strong> {tree.nextUpdate || "N/A"}</p>

          {tree.photo ? (
            <>
              <p><strong>Progress Photo:</strong></p>
              <img
                src={tree.photo}
                alt="Tree progress"
                style={{ width: "100%", borderRadius: "12px", objectFit: "cover", marginTop: "0.5rem" }}
              />
            </>
          ) : (
            <p><strong>Progress Photo:</strong> No photo uploaded yet</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

const TreeTracker = () => {
  const [startIndex, setStartIndex]     = useState(0);
  const [selectedTree, setSelectedTree] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const trees      = location.state?.trees ?? [];
  const donorName  = trees[0]?.donorName || location.state?.email || "there";

  const VISIBLE    = 3;
  const canGoLeft  = startIndex > 0;
  const canGoRight = startIndex + VISIBLE < trees.length;
  const visibleTrees = trees.slice(startIndex, startIndex + VISIBLE);

  if (!trees.length) {
    return (
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        minHeight: "60vh", gap: "1rem",
      }}>
        <h2 style={{ color: "#084C32" }}>No trees found.</h2>
        <p style={{ color: "#555" }}>Please go back and enter your email and User ID.</p>
        <button
          onClick={() => navigate("/progresspage")}
          style={{
            background: "#084C32", color: "white",
            border: "none", borderRadius: 24,
            padding: "10px 28px", cursor: "pointer", fontWeight: 600,
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", padding: "2rem",
      marginTop: "3rem", marginBottom: "4rem",
    }}>
      <h1 style={{ color: "#084C32", fontWeight: "700", marginBottom: "2rem", fontSize: "2.5rem" }}>
        Hello, {donorName}!
      </h1>
      
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>

        {/* Left arrow */}
        <button
          onClick={() => setStartIndex(prev => prev - 1)}
          disabled={!canGoLeft}
          style={{
            background: canGoLeft ? "#084C32" : "#ccc",
            color: "white", border: "none", borderRadius: "50%",
            width: "56px", height: "56px", fontSize: "1.2rem",
            cursor: canGoLeft ? "pointer" : "default",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <FaChevronLeft />
        </button>

        {/* Cards */}
        <div style={{ display: "flex", gap: "2rem" }}>
          {visibleTrees.map((tree, i) => (
            <TreeCard key={tree._id || i} tree={tree} onClick={setSelectedTree} />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => setStartIndex(prev => prev + 1)}
          disabled={!canGoRight}
          style={{
            background: canGoRight ? "#084C32" : "#ccc",
            color: "white", border: "none", borderRadius: "50%",
            width: "56px", height: "56px", fontSize: "1.2rem",
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