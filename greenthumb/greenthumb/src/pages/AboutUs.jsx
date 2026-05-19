import Navbar from "../../../src/components/Navbar";
import Footer from "../components/Footer";
import AboutSection from "../components/AboutSection";
import InfoGrid, { InfoBlock } from "../components/InfoGrid";
import FoundersSection from "../components/FoundersSection";
import PartnersSection from "../components/PartnersSection";
import mission from "../assets/vision.png";
import vision from "../assets/mission.png";
import '../App.css'

function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <AboutSection />
      <InfoGrid>
        <InfoBlock 
          title="Our Mission"
          description="To provide an accessible platform for people to plant trees, track the growth and help fight climate change."
          imgSrc={mission}
        />
        <InfoBlock 
          title="Our Vision"
          description="A place where collective action is used towards creating a greener tomorrow for the future generation."
          imgSrc={vision}
        />
      </InfoGrid>
      <InfoGrid />
      <FoundersSection />
      <PartnersSection />
      <Footer />
    </div>
  );
}

export default AboutUs;