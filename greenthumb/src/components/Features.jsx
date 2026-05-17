
import iconCommunity from '../assets/Group2799.png';
import iconNative from '../assets/Group2798.png';
import iconSDG from '../assets/Group2800.png';
function Features() {
  const items = [
    { 
      title: "Community First", 
      desc: "Partnering with local farmers for sustainable growth.", 
      iconPath: iconCommunity
    },
    { 
      title: "Native Species Only", 
      desc: "We prioritize Narra, Molave, and Anitolo.", 
      iconPath: iconNative
    },
    { 
      title: "SDG Aligned", 
      desc: "Contributing to 6 Global Sustainable Development Goals.", 
      iconPath: iconSDG
    }
  ];

  return (
    <div className="mt-10 px-8 text-center max-w-6xl mx-auto features-div">
      <div className="flex flex-wrap justify-center gap-20">
        {items.map((item, i) => (
          <div key={i} className="bg-white p-2 rounded-[40px] flex flex-col items-center text-center w-70 h-70 justify-center">
            {/* <div className="bg-green-50 p-2 rounded-full mb-6"> */}
              <img 
                className="w-13 h-13 mb-4" 
                src={item.iconPath}
                alt={item.title}
              />
            {/* </div> */}
            <h3 className="font-bold  text-2xl mb-2">{item.title}</h3>
            <p className="text-xl leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;