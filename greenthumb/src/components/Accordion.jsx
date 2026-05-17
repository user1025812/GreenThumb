import { Plus } from 'lucide-react';
import { useState } from "react";

function Accordion() {
  const faqsData = [
    { 
      id: 1,
      question: "How do I know the tree was planted?", 
      answer: "After receiving the payment confirmation through email. We will be sending you photos and updates through your email.", 
    },
    { 
      id: 2,
      question: "Who plants the trees?", 
      answer: "We will be working with local farmers who have the knowledge and experience to take care and know how to make the tree survive.", 
    },
    { 
      id: 3,
      question: "Where are the trees planted?", 
      answer: "We researched locations, personally visited them to study the soil type and biodiversity, and examined how the planting process would be done.", 
    }, 
    {
      id: 4,
      question: "How soon is my tree planted?",
      answer: "This depends on the availability of the seeds and the weather. You will receive a confirmation email and updates will be sent to you.",
    },
    {
      id: 5,
      question: "Can I visit the location where my tree is planted?",
      answer: "Yes, but it should be requested through contacting us on our Facebook, Instagram, email, or contact number. This may also depend on the location's sensitivity and safeness.",
    },
    {
      id: 6,
      question: "Can I get a receipt?",
      answer: "Yes, you can, and we will be sending it through your email. This email includes the payment confirmation and planting date.",
    },
    {
      id: 7,
      question: "What are the available payment methods?",
      answer: "We accept GCash, Maya, and debit/credit cards. All transactions are secured.",
    },
    {
      id: 8,
      question: "Is my payment and personal information secured?",
      answer: "Yes, we use an encrypted payment method to ensure that your personal information are secured. We also do not store any personal information about your payment. Personal data like your name and email address is stored only for tree updates.",
    },
    {
      id: 9,
      question: "What kind of trees do you plant?",
      answer: "We only plant native trees and trees that will not be harmful and invasive towards the existing biodiversity in the location. These are trees that thrive in our ecosystem and weather. These are also the type of trees that grow faster than the other trees.",
    },
    {
      id: 10,
      question: "When can I get an update?",
      answer: "You will be receiving an update the first day, week 1, week 2, week 3, month 1, and every three month or quarterly after the first month.",
    }
  ];

  const [isOpen, setOpen] = useState(null);

  const handleAccordion = (id) => {
    setOpen((current) => (current === id ? null : id));
  };
  
  return (
    <div className="w-full px-30 mx-auto mt-5 text-black mb-45 faqspage">
      {faqsData.map((faq) => {
        const open = isOpen === faq.id;
        
        return (
          <div 
            key={faq.id} 
            className={`overflow-hidden border-b border-neutral-300 transition-all duration-200 rounded-2xl mb-3 ${
              open ? 'bg-neutral-25' : 'bg-transparent'
            }`}
          >
            <h2>
              <button 
                type="button" 
                className={`flex justify-between items-center w-full p-5 gap-4 font-bold text-2xl text-left transition-all duration-200 ${
                  open ? 'bg-[#084c32] text-white' : 'bg-transparent text-black'
                }`}
                onClick={() => handleAccordion(faq.id)}
              >
                <span className="faqs-header">{faq.question}</span>
                <Plus 
                  strokeWidth={2.5} 
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                    open ? 'rotate-45 text-white' : 'text-black'
                  }`} 
                />
              </button>
            </h2>
            
            <div className={open ? 'open' : 'close'}>
              <div className={`px-5 pb-6 pt-3 text-black font-medium  text-justify text-lg ${!open && 'hidden'}`}>
                <p className="leading-tight">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;