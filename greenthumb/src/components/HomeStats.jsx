import { useState } from "react";
import infoIcon from "../assets/info.png";

const CHART_DATA = [
  { name: "Survived", value: 400 },
  { name: "Growing", value: 300 },
  { name: "Needs Care", value: 300 },
];

const COLORS = ["#084C32", "#4CAF50", "#ee9b00"];
const TOTAL_TREES = CHART_DATA.reduce((sum, d) => sum + d.value, 0);

const getSlices = (data) => {
  let cumulative = 0;
  return data.map((d, i) => {
    const startAngle = (cumulative / TOTAL_TREES) * 2 * Math.PI - Math.PI / 2;
    cumulative += d.value;
    const endAngle = (cumulative / TOTAL_TREES) * 2 * Math.PI - Math.PI / 2;
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

function HomeStats() {
  const [activeIndex, setActiveIndex] = useState(null);
  const slices = getSlices(CHART_DATA);
  const cx = 250, cy = 200, innerR = 80, outerR = 120;

  return (
    <div className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-10">
        <p className="text-4xl font-bold text-green-800 text-center pb-10 homestat-title">
          See the Change You're Making
        </p>

        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col items-center">
            <p className="font-bold text-black-900 mb-2 text-3xl homestats-chart-title">
              Trees Planted
            </p>
            
            <div className="flex flex-col items-center justify-center">
              <svg width={500} height={360} viewBox="0 0 500 360" className="w-full h-auto max-w-[500px]">
                {slices.map((slice, i) => {
                  const isActive = activeIndex === i;
                  const r = isActive ? outerR + 10 : outerR;
                  const midAngle = (slice.startAngle + slice.endAngle) / 2;
                  const labelR = r + 30;
                  const lx = cx + labelR * Math.cos(midAngle);
                  const ly = cy + labelR * Math.sin(midAngle);

                  return (
                    <g
                      key={i}
                      onMouseEnter={() => setActiveIndex(i)}
                      onMouseLeave={() => setActiveIndex(null)}
                      style={{ cursor: "pointer" }}
                      className="transition-all duration-200"
                    >
                      <path
                        d={describeSlice(cx, cy, innerR, r, slice.startAngle, slice.endAngle)}
                        fill={slice.color}
                        opacity={activeIndex === null || isActive ? 1 : 0.6}
                        className="transition-all duration-200"
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
                            {((slice.value / TOTAL_TREES) * 100).toFixed(1)}%
                          </text>
                        </>
                      )}
                    </g>
                  );
                })}

                {/* Center text indicators */}
                <text x={cx} y={cy - 8} textAnchor="middle" fill="#084C32" fontSize={14} fontWeight="600">
                  {activeIndex !== null ? slices[activeIndex].name : "Total"}
                </text>
                <text x={cx} y={cy + 12} textAnchor="middle" fill="#555" fontSize={13}>
                  {activeIndex !== null ? `${slices[activeIndex].value} trees` : `${TOTAL_TREES} trees`}
                </text>
              </svg>

              {/* Chart Legend */}
              <div className="flex gap-6 mt-2">
                {slices.map((slice, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-3 h-3 rounded-full" style={{ background: slice.color }} />
                    {slice.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cards Section */}
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <div className="homestats-card p-6 rounded-[40px] text-white text-center shadow-md w-full max-w-[500px]">
              <div className="text-4xl font-bold drop-shadow-md">23</div>
              <div className="text-2xl font-medium drop-shadow-lg homestats-card-subtitle">
                Local Farmers Supported
              </div>
            </div>
            <div className="homestats-card p-8 rounded-[40px] text-white text-center shadow-md w-full max-w-[500px]">
              <div className="text-4xl font-bold drop-shadow-md">P 43, 325.00</div>
              <div className="text-2xl font-medium flex items-center justify-center gap-2 drop-shadow-lg homestats-card-subtitle">
                Funds Raised for Planting
                <img src={infoIcon} alt="info" className="w-4 h-4 object-contain brightness-0 invert" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeStats;