import { Routes, Route } from 'react-router-dom';
import PlantATree from './pages/PlantATree';
import Join from './pages/Join';
import Progress from './pages/Progress';
import Navbar from './components/Navbar';
import Track from './pages/Track';
import './App.css'
import './Style.css';

function App() {
    return (
            <div className="App min-h-screen bg-white font-sans text-gray-900">
                
                <Navbar />

                <Routes>
                    <Route path="/" element={<PlantATree />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/track" element={<Track />} /> 
                </Routes>
            </div>
    );

}

export default App;