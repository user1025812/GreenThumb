import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// used ai to look for a map api and create the code

const trees = [
  { id: 1, lat: 14.5995, lng: 120.9842, species: "Narra", date: "2025-01-15", status: "Growing" },
  { id: 2, lat: 14.6100, lng: 121.0100, species: "Molave", date: "2025-03-02", status: "Survived" },
  { id: 3, lat: 14.5800, lng: 120.9700, species: "Mahogany", date: "2025-04-20", status: "Needs Care" },
];

const STATUS_COLORS = {
  "Survived": "#084C32",
  "Growing": "#4CAF50",
  "Needs Care": "#ee9b00",
};

// custom tree marker per status color
const getTreeIcon = (status) =>
  L.divIcon({
    className: "",
    html: `<div style="
      background:${STATUS_COLORS[status] ?? "#084C32"};
      width:32px; height:32px;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      border:2px solid white;
      box-shadow:0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -35],
  });

const TreeMap = () => {
  return (
    <div style={{ width: "100%", height: "500px", borderRadius: "16px", overflow: "hidden" }}>
      <MapContainer
        center={[14.5995, 120.9842]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Satellite tiles — free, no API key */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri"
        />

        {trees.map((tree) => (
          <Marker key={tree.id} position={[tree.lat, tree.lng]} icon={getTreeIcon(tree.status)}>
            <Popup>
              <div style={{ fontFamily: "sans-serif", minWidth: "140px" }}>
                <p style={{ fontWeight: "700", fontSize: "14px", color: "#084C32", marginBottom: "6px" }}>
                  🌳 {tree.species}
                </p>
                <p style={{ fontSize: "12px", color: "#555", margin: "3px 0" }}>
                  📅 {tree.date}
                </p>
                <p style={{ fontSize: "12px", margin: "3px 0" }}>
                  <span style={{
                    background: STATUS_COLORS[tree.status],
                    color: "white",
                    borderRadius: "999px",
                    padding: "2px 10px",
                    fontSize: "11px",
                  }}>
                    {tree.status}
                  </span>
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default TreeMap;