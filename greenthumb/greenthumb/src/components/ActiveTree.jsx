import React from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { MdHeight } from "react-icons/md";
import { TbHeartbeat } from "react-icons/tb";
import { PiMagnifyingGlass } from "react-icons/pi";
import { LuLeaf } from "react-icons/lu";
import { FiInfo } from "react-icons/fi";
import TreeMap from "./TreeMap"; // 1. Import your custom styled satellite map

// 2. Accept the real-time "tree" object from the database parent container as a prop
const ActiveTree = ({ tree }) => {

  // Safety fallbacks if formatting dates or values
  const formattedLastUpdate = tree.lastUpdate && tree.lastUpdate !== "N/A" 
    ? new Date(tree.lastUpdate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) 
    : "Pending Allocation";

  const formattedNextUpdate = tree.nextUpdate && tree.nextUpdate !== "N/A"
    ? new Date(tree.nextUpdate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : "To Be Scheduled";

  return (
    <div className="stats-content">
      <div className="stats-header">
        <div className="tree-id-selector">
          <span className="id-label">Tree ID:</span>
          <select className="styled-select" defaultValue={tree.donationId}>
            {/* Populating dynamically with the searched item ID */}
            <option value={tree.donationId}>{tree.donationId}</option>
          </select>
        </div>
        <div className="update-date-container" style={{ textAlign: 'right' }}>
          <p className="update-date-label">Last Update: <span className="update-date-value">{formattedLastUpdate}</span></p>
        </div>
      </div>

      <div className="map-placeholder-container">
        {/* Left Side: Info Card */}
        <div className="map-info-card">
          <span className="map-marker-icon"><FaMapLocationDot /></span>
          <div className="map-info-text">
            <strong className="map-tree-id">{tree.donationId}</strong>
            <p className="map-location-subtext" style={{ fontSize: '11px', color: '#666', margin: 0 }}>
              {tree.location || "Assigning site..."}
            </p>
          </div>
        </div>

        {/* Right Side: The Dynamic Map itself */}
        <div className="map-wrapper" style={{ height: '100%', width: '100%' }}>
          {/* 3. Replaced static openstreetmap configuration with your specific satellite TreeMap. 
                 We pass the single tree wrapped into an array [] so it maps cleanly! */}
          <TreeMap plantedTrees={tree ? [tree] : []} />
        </div>
      </div>

      <div className="status-section">
        <div className="status-section-header">
          <h4 className="status-title">Status Updates</h4>
        </div>        

        <div className="status-list">
          <div className="status-item">
            <div className="status-label">
              <span className="status-icon"><MdHeight /></span>
              <span>Growth Stage:</span>
            </div>
            {/* Shows dynamic growth updates from your admin progress controller dropdown */}
            <span className="status-value" style={{ fontWeight: '600' }}>{tree.stage || "Seedling"}</span>
          </div>

          <div className="status-item">
            <div className="status-label">
              <span className="status-icon"><TbHeartbeat /></span>
              <span>Plantation Status:</span>
            </div>
            <span className="status-value status-value-inline" style={{ fontWeight: '600' }}>
              {tree.status} 
              <span className="info-icon"><FiInfo /></span>
            </span>
          </div>

          <div className="status-item">
            <div className="status-label">
              <span className="status-icon"><PiMagnifyingGlass /></span>
              <span>Assigned Caretaker:</span>
            </div>
            <span className="status-value">{tree.farmer || "Allocating local partner"}</span>
          </div>

          <div className="status-item alignment-top">
            <div className="status-label">
              <span className="status-icon"><LuLeaf /></span>
              <span>Species & Quantity:</span>
            </div>
            <div className="status-value contributions-group">
              <p>Planted batch: <strong>{tree.quantity}x {tree.species || "Native Tree"}</strong></p>
              <p>Site coordination managed by community farmers.</p>
              <p>Absorbing carbon emissions and restoring local biodiversity footprints.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="next-update-footer">
        <p className="timeline-date" style={{ width: 'auto', margin: 0 }}>
          Next Update Due: <span className="update-date-value">{formattedNextUpdate}</span>
        </p>
        <span className="badge" style={{ background: tree.status === "Planted" ? "#084C32" : "#999" }}>
          {tree.status === "Planted" ? "Active Care Phase" : "Processing Request"}
        </span>
      </div>
    </div>
  );
};

export default ActiveTree;