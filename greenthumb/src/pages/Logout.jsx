import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Join page/Login page
    navigate("/join");
  }, [navigate]);

  return (
    <div>
      <h1>Logging Out...</h1>
    </div>
  );
}