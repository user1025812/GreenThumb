import React, { useState } from 'react';
import Sidebar from "../components/Sidebar";
import ActiveTree from "../components/ActiveTree";
import TreeHistory from "../components/TreeHistory";
import "../Style.css";

const TreeTracker = () => {
  const [activeTab, setActiveTab] = useState('active');
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  return (
    <div className="tracker-container">
      <div className="max-width-wrapper">
        <header>
          <h1 className="header-title">The Green Tracker</h1>
        </header>

        <div className="main-layout">
          <Sidebar />

          <div className="content-wrapper">
            <nav className="tabs-header rounded-t-lg">
              <button
                onClick={() => setActiveTab('active')}
                className={`tab-button ${activeTab === 'active' ? 'tab-button-active' : 'tab-button-inactive'}`}
              >
                Active Tree/s
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`tab-button ${activeTab === 'history' ? 'tab-button-active' : 'tab-button-inactive'}`}
              >
                History
              </button>
            </nav>

            <div className="tab-content-padding">
              {activeTab === 'active' ? <ActiveTree /> : <TreeHistory />}
            </div>
          </div>
        </div>
      </div>

    </div>


  );
};

export default TreeTracker;