import howitworks from "../assets/howitworks.png";

function ThreeStepSection() {
  return (
    <div className="bg-white py-20 ps-10 overflow-hidden">
      <div className="max-w-7xl ml-auto grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-4 pr-2">
          <p className="text-4xl font-bold leading-tight mb-4 text-[#064e3b] threestep-title">
            Your Tree's Journey<br/>in 3 Easy Steps
          </p>
          <p className="pt-3 text-xl threestep-subtitle px-8 pb-8">
            It takes just one click to make a greener future.
          </p>
          <a href="#" className="text-[#EE9B00] font-bold border-b-2 border-[#EE9B00] pb-1 hover:opacity-80 transition-opacity threestep-btn text-lg">
            How It Works &rarr;
          </a>
        </div>

        <div 
          className="md:col-span-8 relative rounded-l-[50px] bg-cover bg-center min-h-[600px] flex items-center" 
          style={{ backgroundImage: `url(${howitworks})` }}
        >
          <div className="absolute inset-0 bg-black/20 rounded-l-[50px]"></div>

          <div className="relative w-full md:py-10 md:px-25 flex flex-col space-y-4">
            {[
              { n: 1, t: "Choose Your Native Tree", d: "Select from Narra, Molave, or Aratilis—species native to the Philippines that support local biodiversity." },
              { n: 2, t: "Secure Planting", d: "Pay via GCash, Maya, or Card. Every peso goes toward reforestation and supporting our partner farmers." },
              { n: 3, t: "Track the Growth", d: "Receive real-time photo updates in your email, from Day 1 to quarterly milestones." }
            ].map(step => (
              <div key={step.n} className="bg-white/20 backdrop-blur-md px-6  py-6 rounded-[10px] text-white border border-white/20 shadow-xl max-w-2xl ">
                <div className="flex gap-6">
                 <div className="flex items-center">
                     <span className="text-4xl opacity-80 leading-none threestep-steps-no px-3 z-10">{step.n}</span>
                 </div>
                  <div className="text-left">
                    <h4 className="font-bold text-2xl mb-1 threestep-steps-title text-white">{step.t}</h4>
                    <p className="text-lg opacity-90 leading-5 threestep-steps-subtitle text-white">{step.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreeStepSection;