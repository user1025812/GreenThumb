import { useState } from "react";

// installed and used recharts. used ai to convert from tsx to jsx

const data = [
  { name: "Survived", value: 400 },
  { name: "Growing", value: 300 },
  { name: "Needs Care", value: 300 },
];

const COLORS = ["#084C32", "#4CAF50", "#ee9b00"];

const getSlices = (data) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;
  return data.map((d, i) => {
    const startAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;
    cumulative += d.value;
    const endAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;
    return { ...d, startAngle, endAngle, color: COLORS[i] };
  });
};

const polarToCartesian = (cx, cy, r, angle) => ({
  x: cx + r * Math.cos(angle),
  y: cy + r * Math.sin(angle),
});

const describeSlice = (cx, cy, innerR, outerR, startAngle, endAngle) => {
  const o1 = polarToCartesian(cx, cy, outerR, startAngle);
  const o2 = polarToCartesian(cx, cy, outerR, endAngle);
  const i1 = polarToCartesian(cx, cy, innerR, endAngle);
  const i2 = polarToCartesian(cx, cy, innerR, startAngle);
  const large = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M${o1.x},${o1.y} A${outerR},${outerR} 0 ${large} 1 ${o2.x},${o2.y}
          L${i1.x},${i1.y} A${innerR},${innerR} 0 ${large} 0 ${i2.x},${i2.y} Z`;
};

const TreePieChart = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const slices = getSlices(data);
  const cx = 250, cy = 200, innerR = 80, outerR = 120;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <svg width={500} height={400}>
        {slices.map((slice, i) => {
          const isActive = activeIndex === i;
          const r = isActive ? outerR + 10 : outerR;
          const midAngle = (slice.startAngle + slice.endAngle) / 2;
          const labelR = r + 30;
          const lx = cx + labelR * Math.cos(midAngle);
          const ly = cy + labelR * Math.sin(midAngle);

          return (
            <g key={i}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              style={{ cursor: "pointer", transition: "all 0.2s" }}
            >
              <path
                d={describeSlice(cx, cy, innerR, r, slice.startAngle, slice.endAngle)}
                fill={slice.color}
                opacity={activeIndex === null || isActive ? 1 : 0.6}
              />
              {isActive && (
                <>
                  <line
                    x1={cx + (r + 2) * Math.cos(midAngle)}
                    y1={cy + (r + 2) * Math.sin(midAngle)}
                    x2={lx}
                    y2={ly}
                    stroke={slice.color}
                    strokeWidth={1.5}
                  />
                  <text x={lx} y={ly - 8} textAnchor="middle" fill="#333" fontSize={13} fontWeight="600">
                    {slice.name}
                  </text>
                  <text x={lx} y={ly + 8} textAnchor="middle" fill="#666" fontSize={12}>
                    {slice.value} trees
                  </text>
                  <text x={lx} y={ly + 22} textAnchor="middle" fill="#999" fontSize={11}>
                    ({((slice.value / data.reduce((s, d) => s + d.value, 0)) * 100).toFixed(1)}%)
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Center label */}
        <text x={cx} y={cy - 8} textAnchor="middle" fill="#084C32" fontSize={14} fontWeight="600">
          {activeIndex !== null ? slices[activeIndex].name : "Total"}
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill="#555" fontSize={13}>
          {activeIndex !== null ? `${slices[activeIndex].value} trees` : `${data.reduce((s, d) => s + d.value, 0)} trees`}
        </text>
      </svg>

      {/* Legend */}
      <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem" }}>
        {slices.map((slice, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#333" }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: slice.color }} />
            {slice.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreePieChart;