import "../Style.css";

const treeImages = {
  "Dita":              "/Dita.png",
  "Araucaria":         "/Araucaria.png",
  "Aunasin":           "/Aunasin.jpg",
  "Neem Tree":         "/NeemTree.jpg",
  "Botong":            "/Botong.jpg",
  "Napoleon's Plume":  "/Napoleon.jpg",
  "Bottle Brush Tree": "/BottleBrush.jpg",
  "Bitaog":            "/Bitaog.jpg",
  "Ylang-Ylang":       "/YlangYlang.jpg",
  "Kalingag":          "/Kalingag.jpg",
  "Bagawak Morado":    "/BagawakMorado.jpg",
  "Salingbobog":       "/Salingbobog.jpg",
  "Handkerchief Tree": "/HandkerchiefTree.jpg",
  "Katmon":            "/Katmon.jpg",
  "Rainbow Tree":      "/RainbowTree.jpg",
  "default":           "/tree.png",
};

const getTreeImage = (species, photo) => {
  if (photo) return photo;
  return treeImages[species] || treeImages["default"];
};

const STAGE_COLORS = {
  "Seedling": "#ee9b00",
  "Growing":  "#4CAF50",
  "Mature":   "#084C32",
};

const TreeCard = ({ tree, onClick }) => (
  <div
    onClick={() => onClick(tree)}
    style={{
      background: "rgba(255,255,255,0.85)",
      borderRadius: "24px",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      width: "300px",
      height: "380px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      transition: "transform 0.2s",
    }}
    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
  >
    <div style={{ width: "200px", height: "200px", borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
      <img
        src={getTreeImage(tree.species, tree.photo)}
        alt={tree.species}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onError={e => { e.target.src = treeImages["default"]; }}
      />
    </div>
    <h4 style={{ color: "#084C32", fontWeight: "700", fontSize: "1.3rem", marginTop: "1rem", textAlign: "center" }}>
      {tree.species}
    </h4>
    <p style={{ fontSize: "0.8rem", color: "#888", marginTop: "0.2rem" }}>{tree.donationId}</p>
    <p style={{ fontSize: "0.8rem", color: "#555", marginTop: "0.2rem" }}>
      {tree.quantity} tree{tree.quantity > 1 ? "s" : ""}
    </p>
    {/* <span style={{
      marginTop: "0.6rem",
      background: STAGE_COLORS[tree.stage] ?? "#ccc",
      color: "white", borderRadius: "999px",
      padding: "3px 14px", fontSize: "0.78rem", fontWeight: "600",
    }}>
      {tree.stage}
    </span> */}
  </div>
);

export default TreeCard;