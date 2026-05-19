import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import PlantATree from './pages/PlantATree';
import Join from './pages/Join';
import ProgressPage from './pages/ProgressPage';
import Navbar from './components/Navbar';
import TreeTracker from './pages/TreeTracker';
import QuickLink from './components/QuickLink';
import Track from './pages/Track';
import AboutUs from './pages/AboutUs';
import Faqs from './pages/Faqs';
import Library from './pages/Library';
import TreeDetails from './pages/TreeDetails';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Trees from './pages/Trees';
import Payment from './pages/Payment';
import Progress from './pages/Progress';
import Logout from './pages/Logout';
import './App.css';
import './Style.css';

const dashboardRoutes = ['/dashboard', '/users', '/trees', '/payment', '/progress', '/logout'];

function AppContent() {
    const [selectedTrees, setSelectedTrees] = useState([]);
    const location = useLocation();

    const isDashboard = dashboardRoutes.includes(location.pathname);

    return (
        <div className={isDashboard ? "dashboard-root" : "App min-h-screen bg-white font-sans text-gray-900"}>
            {!isDashboard && <Navbar />}
            {!isDashboard && <QuickLink />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/join" element={<Join selectedTrees={selectedTrees} setSelectedTrees={setSelectedTrees} />} />
                <Route path="/plantatree" element={<PlantATree />} />
                <Route path="/tracker" element={<TreeTracker />} />
                <Route path="/progresspage" element={<ProgressPage />} />
                <Route path="/track" element={<Track />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/faqs" element={<Faqs />} />
                <Route path="/library" element={<Library />} />
                <Route path="/treedetails" element={<TreeDetails />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/trees" element={<Trees />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </div>
    );
}

function App() {
    return <AppContent />;
}

export default App;