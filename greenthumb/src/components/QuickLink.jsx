import { Link } from 'react-router-dom';
import { PiTreeFill } from "react-icons/pi";

const QuickLink = () => {
  return (
    <Link to="/tracker" className="floating-tracker-btn">
      <span className="icon"><PiTreeFill /></span>
      <span className="label">Track My Trees</span>
    </Link>
  );
};

export default QuickLink;