import React from "react";
import Navbar from "../components/Navbar";
import TrackYourTreeBanner from "../components/TrackYourTreeBanner";

const Progress = () => {
    return (
        <div className="App min-h-screen bg-white font-sans text-gray-900">
            <Navbar />
            <TrackYourTreeBanner />
        </div>
    );
};

export default Progress;