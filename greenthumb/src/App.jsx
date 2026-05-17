import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, {useState} from 'react';
import PlantATree from './pages/PlantATree';
import Join from './pages/Join';
import Navbar from './components/Navbar';
import TreeTracker from './pages/TreeTracker';
import QuickLink from './components/QuickLink';
import './App.css'
import './Style.css';

function App() {

    const [selectedTrees, setSelectedTrees] = useState([]);

    return (
            <div className="App min-h-screen bg-white font-sans text-gray-900">
                
                <Navbar />

                <Routes>
                    <Route path="/" element={<PlantATree />} />
                    <Route 
                        path="/join" 
                        element={
                        <Join 
                            selectedTrees={selectedTrees} 
                            setSelectedTrees={setSelectedTrees} 
                        />
                        } 
                    />
                    <Route path="/tracker" element={<TreeTracker />} />
                </Routes>   

                <QuickLink />
                
            </div>
    );

}

export default App;