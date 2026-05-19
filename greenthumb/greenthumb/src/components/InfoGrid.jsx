export const InfoBlock = ({ title, description, imgSrc }) => (
  // Added "w-full" and "flex flex-col items-center" so the card itself centers its own inner text/image
  <div className="flex flex-col items-center misvis max-w-sm mx-auto w-full">
    {imgSrc && <img src={imgSrc} alt={title} className="w-16 h-16 object-contain mb-4" />}
    <p className="text-xl sm:text-2xl font-bold pb-2 sm:pb-3">{title}</p>
    <p className="text-lg sm:text-xl leading-relaxed px-4 sm:px-12">{description}</p>
  </div>
);

function InfoGrid({ children }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 my-16 md:my-20 flex flex-wrap lg:flex-nowrap justify-center gap-10 md:gap-8 lg:gap-12 text-center text-black items-start">
      {children}
    </div>
  );
}

export default InfoGrid;