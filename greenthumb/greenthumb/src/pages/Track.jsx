
import Navbar from "../components/Navbar";
import TreeTracker from "../components/TreeTracker";

const Track = () => {
    return (
        <div
            className="min-h-screen w-full bg-cover bg-center font-sans text-gray-900"
            style={{ backgroundImage: "url('/trackbgimg.png')" }}
        >
            <Navbar />
            <TreeTracker />
        </div>
    );
};

export default Track;