import { useState } from 'react';
import "../Style.css";

// used ai to control the view of cards per click

//will replace once meron nang database
const images = [
    "/trackbannerimg.png",
    "/trackbannerimg.png",
    "/trackbannerimg.png",
    "/trackbannerimg.png",
    "/trackbannerimg.png",
    "/trackbannerimg.png",
    "/trackbannerimg.png",
    "/trackbannerimg.png",
    "/trackbannerimg.png",
    "/trackbannerimg.png",
];
const INITIAL_COUNT = 3;   // first 3 rows
const LOAD_MORE_COUNT = 6; // how many to add per click of see more

const TrackProgressImg = () => {
    // controls how many images are visible at a time
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    const handleSeeMore = () => {
        setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, images.length));
    };

    const hasMore = visibleCount < images.length;

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>

            {/* image grid — only renders up to visibleCount */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "4rem",
                width: "100%",
                maxWidth: "1200px",
            }}>
                {images.slice(0, visibleCount).map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Community ${index + 1}`}
                        style={{
                            width: "100%",
                            height: "220px",
                            objectFit: "cover",
                            borderRadius: "12px",
                        }}
                    />
                ))}
            </div>

            {/* See More button — hides when all images are shown */}
            {hasMore && (
                <button
                    onClick={handleSeeMore}
                    className="bg-[#ee9b00] hover:bg-[#d4890a] text-white font-bold py-2 px-8 rounded-full transition"
                >
                    See More
                </button>
            )}

        </div>
    );
};

export default TrackProgressImg;