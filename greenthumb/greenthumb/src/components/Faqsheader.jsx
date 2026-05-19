
function Faqsheader(props) {
    return (
        <div className="mt-45 text-left px-35">
            <p className="faqs-title text-4xl ">{props.title}</p>
            <p className="faqs-subtitle text-black text-lg pt-2">{props.subtitle}</p>
        </div>
    )
}
export default Faqsheader;