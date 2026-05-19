import Navbar from "../components/Navbar";
import TreeTracker from "../components/TreeTracker";

const Track = () => {
    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                backgroundImage: "url('/trackbgimg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Navbar />
            <TreeTracker />
        </div>
    );
};

export default Track;