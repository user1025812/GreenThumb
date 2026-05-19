import teresse from "../assets/teresse.png";
import micka from "../assets/micka.png";
import je from "../assets/je.png";
import zel from "../assets/zel.png";
import foundersbg from "../assets/foundersbg.png";

const foundersData = [
  { id: 1, name: "Gabrielle Teresse Comillas", role: "Founder", imgSrc: teresse },
  { id: 2, name: "Mickaela Lasala", role: "External Relations Coordinator", imgSrc: micka},
  { id: 3, name: "Jerilee Monic Rosales", role: "Research and Content Coordinator", imgSrc: je },
  { id: 4, name: "Hazel Ann Sy", role: "Finance Coordinator", imgSrc: zel }
];

const FounderCard = ({ name, role, imgSrc }) => (
  // CHANGED: Increased max-w-[260px] to max-w-[300px] so cards fill the grid space better
  <div className="bg-white/10 backdrop-blur-md border-2 border-[#B0B29B]/60 rounded-lg px-4 py-9 flex flex-col items-center text-center w-full max-w-[300px] h-[360px] sm:h-[380px] shadow-xl transition-all hover:scale-105 hover:bg-white/20 justify-self-center">
    
    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden mb-7 shrink-0">
      <img src={imgSrc} alt={name} className="w-full h-full object-cover" />
    </div>

    <p className="text-white font-bold text-md sm:text-lg leading-tight tracking-wide pb-2 px-3">{name}</p>
    <p className="text-white/90 text-xl sm:text-xl italic leading-tighter mt-auto px-2">{role}</p>
  </div>
);

function FoundersSection() {
  return (
    <div 
      className="w-full rounded-[30px] sm:rounded-[40px] relative py-12 sm:py-20 flex items-center bg-cover bg-no-repeat bg-center founder-section"
      style={{ backgroundImage: `url(${foundersbg})` }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 ">
        <p className="font-bold text-white text-center founder-title pb-8 sm:pb-12 leading-tight text-3xl sm:text-4xl">
          Meet the Founders
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 justify-center">
          {foundersData.map((founder) => (
            <FounderCard key={founder.id} {...founder} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoundersSection;