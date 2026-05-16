import "../Style.css";
import {motion} from "framer-motion";
import HIWCard from "./HIWCard";

const processData = [

  {
    number: 1,
    title: "Select Your Tree",
    description: "Explore our diverse catalog of native and fruit-bearing trees. Choose the species that resonates most with you and learn about its unique benefits to the ecosystem before making your choice.",
    img: '/step1.jpg'
  },

  {
    number: 2,
    title: "Secure Your Impact",
    description: "Complete your contribution through our encrypted checkout. We support a variety of convenient payment options, including GCash, Maya, and all major debit or credit cards, ensuring your transaction is safe and seamless.",
    img: '/step2.png'
  },

  {
    number: 3,
    title: "Check Your Inbox",
    description: "As soon as your payment is confirmed, we’ll send a detailed receipt and a confirmation email to your inbox. This serves as your official record of the life you’ve helped start.",
    img: '/step3.jpg'
  },

  {
    number: 4,
    title: "Planting & Growth",
    description: "Our team schedules your tree for planting within 1 to 3 days. To ensure the highest survival rate, we carefully coordinate the planting with local weather conditions—good things take a little time and the right rain!",
    img: '/step4.png'
  },

  {
    number: 5,
    title: "Follow the Journey",
    description: "Watch your tree grow from anywhere in the world. We’ll send high-quality photo updates directly to your email on Day 1, Weeks 1–3, Month 1, and quarterly thereafter.",
    img: '/step5.png'
  }

];

const HowItWorks = () => {

  return (

    <main>
      <section className="steps-section">
        <h2 className="section-heading">How It Works</h2>
        {processData.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, amount: 0.2 }} 
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <HIWCard 
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              img={step.img}
            />
          </motion.div>
        ))}
      </section>
    </main>

  );
};

export default HowItWorks;