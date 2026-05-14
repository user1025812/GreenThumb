import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlantATree from './pages/PlantATree';
import Join from './pages/Join';
import Navbar from './components/Navbar';
import './App.css'
import './Style.css';

function App() {
    return (
        <Router>
            <div className="App min-h-screen bg-white font-sans text-gray-900">
                
                <Navbar />

                <Routes>
                    <Route path="/" element={<PlantATree />} />
                    <Route path="/join" element={<Join />} />
                </Routes>
            </div>
        </Router>
    );

}

export default App;