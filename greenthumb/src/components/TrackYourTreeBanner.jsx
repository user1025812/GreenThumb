import { MdOutlineEmail } from "react-icons/md";
import { LuKeyRound } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaSeedling } from "react-icons/fa";
import "../Style.css";
import TreeMap from "./TreeMap";
import TrackProgressImg from "./TreeProgressImg";
import HomeStats from "./HomeStats";
import Track from "../pages/Track";
import TreeTracker from "./TreeTracker";

const TrackYourTreeBanner = () => {
  const [allImagesShown, setAllImagesShown] = useState(false);
  const [email, setEmail]   = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTrack = async () => {
    if (!email || !userId) {
      setError("Please enter both your email and User ID.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res  = await fetch(
        `http://localhost:5000/api/progress/track?email=${encodeURIComponent(email)}&userId=${encodeURIComponent(userId)}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "No account found with that email and User ID.");
        setLoading(false);
        return;
      }

      // Navigate to tracker page with the real data
      navigate("/tracker", { state: { trees: data, email } });

    } catch (err) {
      setError("Could not connect to server. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <section
        className="relative w-full bg-cover bg-center flex items-center rounded-b-[50px] h-[47vw]"
        style={{ backgroundImage: "url('/trackbannerimg.png')" }}
      >
        <div className="absolute inset-0 backdrop-blur-[20px] bg-white/10 rounded-b-[50px]" style={{ width: "50%" }} />

        <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 pt-[72px] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
          <div className="max-w-md text-white text-center md:text-left">
            <h1 className="trackbanner-title">Witness Your Impact Grow</h1>
            <p className="banner-description">From a tiny seed to a flourishing forest.</p>
            <p className="banner-description">
              Here, you can track the real-time progress of your donated trees and see
              how our partner farmers in the Philippines are turning your generosity
              into a greener reality.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-xs sm:max-w-sm" style={{ marginRight: "4.5rem" }}>
            <h2 className="text-lg font-bold" style={{ color: "#084C32", marginBottom: "1rem" }}>Track Your Tree</h2>
            <div className="flex flex-col gap-4">

              <div className="flex items-center border border-gray-200 rounded-lg px-4 py-2 gap-2">
                <MdOutlineEmail size={20} color="#084C32" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="outline-none text-sm w-full text-gray-600"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className="flex items-center border border-gray-200 rounded-lg px-4 py-2 gap-2">
                <LuKeyRound size={20} color="#084C32" />
                <input
                  type="text"
                  placeholder="User ID (e.g. USER-123456)"
                  className="outline-none text-sm w-full text-gray-600"
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                />
              </div>

              {error && <p style={{ color: "red", fontSize: "0.8rem" }}>{error}</p>}

              <button
                onClick={handleTrack}
                disabled={loading}
                className="btn-primary w-1/2 bg-[#ee9b00] hover:bg-[#d4890a] text-white font-bold py-2 rounded-full transition centered mx-auto"
                style={{ maxWidth: "200px", width: "100%" }}
              >
                {loading ? "Searching..." : "Track"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-row items-center justify-center gap-40 px-8" style={{ marginBottom: "4rem" }}>
          <HomeStats />
        </div>

        <div style={{ marginBottom: "4rem" }}>
          <TreeMap />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", marginBottom: "4rem" }}>
          <h1 className="trackbanner-title" style={{ textAlign: "center", marginBottom: "3rem" }}>
            From the Field: Our Community in Action
          </h1>
          <p className="trackbanner-description" style={{ textAlign: "center", maxWidth: "1000px", width: "100%" }}>
            We don't just plant trees; we empower communities. Meet the local Filipino farmers
            who are the primary caretakers of your donations.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: "4rem" }}>
          <TrackProgressImg
            onAllShown={() => setAllImagesShown(true)}
            onCollapse={() => setAllImagesShown(false)}
          />
        </div>

        {allImagesShown && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", marginBottom: "4rem" }}>
            <p className="trackbanner-description" style={{ textAlign: "center", maxWidth: "1000px", width: "100%", color: "#084C32" }}>
              Ready to grow the forest? Start your own planting journey today.
            </p>
            <Link to="/join" className="btn-primary" style={{ maxWidth: "300px", width: "100%" }}>
              Plant a Tree Now <FaSeedling />
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default TrackYourTreeBanner;