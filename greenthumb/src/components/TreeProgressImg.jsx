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
const INITIAL_COUNT = 3;
const LOAD_MORE_COUNT = 6;

const TrackProgressImg = ({ onAllShown, onCollapse }) => {
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    const handleSeeMore = () => {
        const newCount = Math.min(visibleCount + LOAD_MORE_COUNT, images.length);
        setVisibleCount(newCount);
        if (newCount >= images.length) {
            onAllShown();
        }
    };

    const handleSeeLess = () => {
    const newCount = Math.max(visibleCount - LOAD_MORE_COUNT, INITIAL_COUNT);
    setVisibleCount(newCount);
    if (newCount < images.length) {
        onCollapse();
    }
};

    const hasMore = visibleCount < images.length;

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
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

            <div style={{ display: "flex", gap: "1rem" }}>
                {hasMore && (
                    <button
                        onClick={handleSeeMore}
                        className="bg-[#ee9b00] hover:bg-[#d4890a] text-white font-bold py-2 px-8 rounded-full transition"
                    >
                        See More
                    </button>
                )}

                {visibleCount > INITIAL_COUNT && (
                    <button
                        onClick={handleSeeLess}
                        className="bg-[#084c32] hover:bg-[#063a25] text-white font-bold py-2 px-8 rounded-full transition"
                    >
                        See Less
                    </button>
                )}
            </div>
        </div>
    );
};

export default TrackProgressImg;