import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaMapLocationDot } from "react-icons/fa6";
import { MdHeight } from "react-icons/md";
import { TbHeartbeat } from "react-icons/tb";
import { PiMagnifyingGlass } from "react-icons/pi";
import { LuLeaf } from "react-icons/lu";
import { FiInfo } from "react-icons/fi";
import 'leaflet/dist/leaflet.css';

const ActiveTree = () => {
  const position = [51.505, -0.09]

  return (
    <div className="stats-content">
      <div className="stats-header">
        <div className="tree-id-selector">
          <span className="id-label">Tree ID:</span>
          <select className="styled-select">
            <option>NR-2037-PH</option>
            <option>NR-2038-PH</option>
          </select>
        </div>
        <div className="update-date-container" style={{ textAlign: 'right' }}>
          <p className="update-date-label">Last Update: <span className="update-date-value">March 20, 2026</span></p>
        </div>
      </div>

      <div className="map-placeholder-container">
        {/* Left Side: Info Card */}
        <div className="map-info-card">
          <span className="map-marker-icon"><FaMapLocationDot /></span>
          <div className="map-info-text">
            <strong className="map-tree-id">NR-2037-PH</strong>
            <a href="#view" className="map-view-link">Map View</a>
          </div>
        </div>

        {/* Right Side: The Map itself */}
        <div className="map-wrapper">
          <MapContainer 
            center={position} 
            zoom={13} 
            scrollWheelZoom={false} 
            zoomControl={false} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}></Marker>
          </MapContainer>
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
              <span>Height:</span>
            </div>
            <span className="status-value">1.4 meters</span>
          </div>

          <div className="status-item">
            <div className="status-label">
              <span className="status-icon"><TbHeartbeat /></span>
              <span>Health:</span>
            </div>
            <span className="status-value status-value-inline">
              Excellent 
              <span className="info-icon"><FiInfo /></span>
            </span>
          </div>

          <div className="status-item">
            <div className="status-label">
              <span className="status-icon"><PiMagnifyingGlass /></span>
              <span>Pest Inspection:</span>
            </div>
            <span className="status-value">No pests detected</span>
          </div>

          <div className="status-item alignment-top">
            <div className="status-label">
              <span className="status-icon"><LuLeaf /></span>
              <span>Contribution:</span>
            </div>
            <div className="status-value contributions-group">
              <p>Absorbed approx. 4.3 kg of CO₂</p>
              <p>Providing shade to nearby seedlings</p>
              <p>Soil around shows reduced erosion signs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="next-update-footer">
        <p className="timeline-date" style={{ width: 'auto', margin: 0 }}>
          Next Update: <span className="update-date-value">March 27, 2026</span>
        </p>
        <span className="badge">7 days away</span>
      </div>
    </div>
  );
};

export default ActiveTree;