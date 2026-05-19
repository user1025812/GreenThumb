import Navbar from "../components/Navbar";
import TrackYourTreeBanner from "../components/TrackYourTreeBanner";
import TreeTracker from "../components/TreeTracker";

const Track = () => {
    return (
        <div className="min-h-screen w-full font-sans text-gray-900">
            <Navbar />
            <TrackYourTreeBanner />
            <TreeTracker />
        </div>
    );
};

export default Track;