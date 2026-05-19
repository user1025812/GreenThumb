import Navbar from "../../../src/components/Navbar";
import Footer from "../components/Footer";
import Accordion from "../components/Accordion";
import Faqsheader from "../components/Faqsheader"
import '../App.css'
function Faqs () {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
        <Faqsheader title="Frequently Asked Questions" subtitle="Got questions? Get your answers here."/>
            <Accordion />
            <Footer />
        </div>
    )
}
export default Faqs;