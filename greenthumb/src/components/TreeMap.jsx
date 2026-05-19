import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../TreeMap.css';

// Fix missing asset path assignments for default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const regionConfigs = {
  Luzon: {
    coords: [15.1424, 121.5756],
    siteName: "Sierra Madre (Quezon Province)",
    description: "Combating illegal logging and infrastructure encroachment in the longest mountain range in the Philippines."
  },
  Visayas: {
    coords: [10.6653, 123.1672],
    siteName: "Northern Negros Natural Park",
    description: "Restoring critical lowland rain forest habitats degraded by historical agricultural expansion."
  },
  Mindanao: {
    coords: [8.4823, 125.8643],
    siteName: "Caraga Region (Agusan del Sur)",
    description: "Rehabilitating land ecosystems severely disrupted by aggressive open-pit mining operations."
  }
};

const TreeMap = () => {
  const [aggregatedData, setAggregatedData] = useState({
    Luzon: { totalTrees: 0, speciesList: new Set(), donorsCount: new Set() },
    Visayas: { totalTrees: 0, speciesList: new Set(), donorsCount: new Set() },
    Mindanao: { totalTrees: 0, speciesList: new Set(), donorsCount: new Set() }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/trees")
      .then(res => res.json())
      .then(dbTrees => {
        const summary = {
          Luzon: { totalTrees: 0, speciesList: new Set(), donorsCount: new Set() },
          Visayas: { totalTrees: 0, speciesList: new Set(), donorsCount: new Set() },
          Mindanao: { totalTrees: 0, speciesList: new Set(), donorsCount: new Set() }
        };

        dbTrees.forEach(item => {
          if (summary[item.location]) {
            summary[item.location].totalTrees += item.quantity;
            if (item.species) summary[item.location].speciesList.add(item.species);
            if (item.email) summary[item.location].donorsCount.add(item.email);
          }
        });

        setAggregatedData(summary);
        setLoading(false);
      })
      .catch(err => {
        console.error("Progress tracker map sync failure:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="map-loading-screen">
        <div className="spinner"></div>
        <p>Updating National Progress Metrics...</p>
      </div>
    );
  }

  const grandTotal = aggregatedData.Luzon.totalTrees + aggregatedData.Visayas.totalTrees + aggregatedData.Mindanao.totalTrees;

  return (
    <div className="progress-map-container">
      
      {/* Floating Modern Dashboard Overlay */}
      <div className="stats-dashboard-banner">
        <div className="stats-main-info">
          <h3>{grandTotal.toLocaleString()} Trees</h3>
          <p>Total Contributions Visualized Across National Hotspots</p>
        </div>
        
        <div className="regional-breakdown-group">
          <div className="region-stat-node">
            <span className="region-label">Luzon</span>
            <span className="region-count">{aggregatedData.Luzon.totalTrees}</span>
          </div>
          <div className="region-stat-node">
            <span className="region-label">Visayas</span>
            <span className="region-count">{aggregatedData.Visayas.totalTrees}</span>
          </div>
          <div className="region-stat-node">
            <span className="region-label">Mindanao</span>
            <span className="region-count">{aggregatedData.Mindanao.totalTrees}</span>
          </div>
        </div>
      </div>

      {/* Full Width Map Base Frame */}
      <div className="map-frame">
        <MapContainer center={[12.2000, 122.4000]} zoom={5.5} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {Object.keys(regionConfigs).map((regionKey) => {
            const config = regionConfigs[regionKey];
            const metrics = aggregatedData[regionKey];

            return (
              <Marker key={regionKey} position={config.coords}>
                <Popup className="modern-popup"
                  autoPan={true}
                  autoPanPadding={L.point(20, 150)}
                  >
                  <div className="popup-card-content">
                    <h3>{regionKey} Hub</h3>
                    <p className="popup-site-subtitle">{config.siteName}</p>
                    
                    <div className="popup-metrics-grid">
                      <div className="metric-row">
                        <strong>Total Planted:</strong> 
                        <span className="highlight-text">{metrics.totalTrees} units</span>
                      </div>
                      <div className="metric-row">
                        <strong>Unique Supporters:</strong> 
                        <span>{metrics.donorsCount.size} donors</span>
                      </div>
                      <div className="metric-row">
                        <strong>Species Count:</strong> 
                        <span>{metrics.speciesList.size} types</span>
                      </div>
                    </div>

                    <p className="popup-site-desc">{config.description}</p>
                    
                    {metrics.speciesList.size > 0 && (
                      <div className="popup-active-species">
                        <strong>Active:</strong> {Array.from(metrics.speciesList).join(', ')}
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

    </div>
  );
};

export default TreeMap;