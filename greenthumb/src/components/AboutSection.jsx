// there was ai used in making the image and the white background overlap
import aboutbg from "../assets/aboutbg.png";

const aboutContent = {
  image: aboutbg,
  title: "About Us",
  subtitle: "Get to know the students behind Green Thumb and our commitment to Philippine reforestation.",
  cardTitle: "Who We Are",
  paragraphs: [
    {
      id: 1,
      text: "We are GreenThumb, a student-led tree-planting program created by students from the University of Santo Tomas. We built a website that makes tree planting easy, trackable, and accessible, so that everyone can help grow a better future, no matter where they are. GreenThumb advocates for a greener environment in a society filled with carbon emissions."
    },
    {
      id: 2,
      text: "We only plant trees native to the Philippines, like Narra, Molave, and Aratilis, to support local biodiversity. By working closely with local farmers and carefully selecting locations based on soil type, we ensure every tree thrives."
    }
  ]
};

function AboutSection({ props = aboutContent }) {
  return (
    <div className="relative max-w-7xl mx-auto px-5 pb-20 pt-10 mt-10 font-sans">
      <div className="flex flex-col lg:flex-row items-start">
        
        <div className="w-full lg:w-[58%] relative">
          <img 
            src={props.image}  
            className="w-full h-[300px] md:h-[550px] lg:h-[600px] object-cover rounded-[30px_110px_30px_30px] shadow-sm"
            alt={props.title}
          />
        </div>

        <div className="w-full lg:w-[42%] lg:pl-10 pt-6 lg:pt-10 text-left">
          <p className="text-3xl font-bold mb-4 about-title text-[#084c32]">
            {props.title}
          </p>
          <p className="text-xl text-black about-subtitle lg:pr-10 pt-2 leading-tight">
            {props.subtitle}
          </p>
        </div>
      </div>


      <div className="relative lg:absolute lg:right-5 lg:bottom-[-20px] mt-6 lg:mt-0 w-full lg:w-[55%] bg-white p-8 md:p-12 rounded-[40px] shadow-2xl z-20 text-center">
        <h3 className="text-3xl font-bold mb-6 about-title-2 text-[#ee9b00]">
          {props.cardTitle}
        </h3>

        <div className="text-lg text-black leading-relaxed text-center space-y-5 about-subtitle text-justify">
          {props.paragraphs.map((p) => (
            <p key={p.id}>{p.text}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutSection;