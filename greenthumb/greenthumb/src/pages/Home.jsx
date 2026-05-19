import Navbar from '../../../src/components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Purpose from '../components/Purpose'
import ThreeStepSection from '../components/ThreeStepSection';
import HomeStats from '../components/HomeStats';
import BiodiversitySection from '../components/BiodiversitySection';
import { Outlet } from "react-router-dom";
import InfoGrid, { InfoBlock } from "../components/InfoGrid";
import iconCommunity from '../assets/Group2799.png';
import iconNative from '../assets/Group2798.png';
import iconSDG from '../assets/Group2800.png';

import '../App.css'

function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      <Outlet />
      <Hero />
      <Purpose />
      {/* <Features /> */}
            <InfoGrid>
        <InfoBlock 
          title= "Community First"
          description= "Partnering with local farmers for sustainable growth."
          imgSrc= {iconCommunity}
        />
        <InfoBlock 
          title= "Native Species Only" 
          description= "We local native trees." 
          imgSrc= {iconNative}
        />
        <InfoBlock 
          title= "SDG Aligned"
          description= "Contributing to 6 Global Sustainable Development Goals." 
          imgSrc= {iconSDG}
        />
      </InfoGrid>
      <ThreeStepSection />
      <HomeStats />    
      <BiodiversitySection />
      <Footer />
    </div>
  );
}

export default Home;