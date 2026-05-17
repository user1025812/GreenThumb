import React from 'react';
import { FiInfo } from "react-icons/fi";

const TreeHistory = () => {
  const historyEvents = [
    { date: "March 20, 2026", text: "", isPending: true },
    { date: "March 17, 2026", text: "NR-2037-PH: Tree health check and stabilization.", info: false },
    { date: "March 15, 2026", text: "NR-2037-PH: Placed in field (from nursery).", info: true },
    { date: "March 12, 2026", text: "NR-2037-PH: Hardening off process completed.", info: true },
    { date: "March 10, 2026", text: "NR-2037-PH: Logged in nursery.", info: true },
  ];

  return (
    <div className="timeline-wrapper">
      <div className="timeline-container">
        <div className="timeline-line"></div>

        {historyEvents.map((event, index) => (
          <div 
            key={index} 
            className={`timeline-item ${event.isPending ? 'pending' : ''}`}
          >
            {/* Conditional Node Indicator */}
            <div className="timeline-dot">
              {!event.isPending && (
                <svg className="checkmark-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            
            {/* Content Group (Date + Text) */}
            <div className="timeline-content">
              <span className="timeline-date">
                {event.date}
              </span>
              {event.text && (
                <span className="timeline-text">
                  {event.text}
                  {event.info && (
                    <span className="info-icon-container">
                      <FiInfo />
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreeHistory;