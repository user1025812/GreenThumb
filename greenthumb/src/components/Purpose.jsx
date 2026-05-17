import { NavLink } from "react-router-dom";

function Purpose() {
  return (
    <div className="mt-24 pb-10 px-8 text-center max-w-6xl mx-auto features-div">
      <p className="text-4xl font-bold features-title tracking-wide text-[#084c32]">Rooted in Purpose</p>
      <p className=" pb-12 mt-10 text-xl px-15 pt-5 text-center leading-relaxed  mx-auto features-subtitle">
        We are a student-led project from the University of Santo Tomas. We believe creating a better future should be simple, which is why we’ve made tree planting accessible and trackable for everyone. From addressing climate action to supporting local farmers, we are growing a greener world, right from your screen.
      </p>
      <NavLink to="/aboutus" className="text-[#EE9B00] border-b-2 border-[#EE9B00] pb-1 hover:opacity-80 transition-opacity purpose-btn ">See Our Impact  &rarr;</NavLink>

    </div>
  );
};

export default Purpose;