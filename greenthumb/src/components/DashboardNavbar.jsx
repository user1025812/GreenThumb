import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {Bell, ChevronDown, LogOut,} from "lucide-react";
import "../Dashboard.css";
import adminLogo from "../../assets/adminLogo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );
  const user = {
  name: storedUser?.name || "Admin",
  username: storedUser?.username || "@admin",
};
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/logout");
  };
  return (
    <div className="dashboard-navbar">
      {/*LOGO*/}
      <div className="logo-container">
    <NavLink to="/home">
        <img 
            src={adminLogo} 
            alt="GreenThumbs" 
            className="h-14 w-auto object-contain -my-8 max-w-[150px]" 
        />
    </NavLink>
</div>
      {/*NAVIGATION*/}
      <div className="nav-links">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-btn active-nav" : "nav-btn"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "nav-btn active-nav" : "nav-btn"
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/trees"
          className={({ isActive }) =>
            isActive ? "nav-btn active-nav" : "nav-btn"
          }
        >
          Trees
        </NavLink>
        <NavLink
          to="/payment"
          className={({ isActive }) =>
            isActive ? "nav-btn active-nav" : "nav-btn"
          }
        >
          Payment
        </NavLink>
        <NavLink
          to="/progress"
          className={({ isActive }) =>
            isActive ? "nav-btn active-nav" : "nav-btn"
          }
        >
          Progress
        </NavLink>
      </div>
      {/*PROFILE*/}
      <div className="profile-wrapper">
        {/*PROFILE*/}
        <div className="profile-dropdown-wrapper">
          <div
            className="profile-container"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="profile-details">
              <h4>{user.name}</h4>
              <p>{user.username}</p>
            </div>
            <ChevronDown
              size={18}
              className="dropdown-icon"
            />
          </div>
          {/*DROPDOWN*/}
          {showDropdown && (
            <div className="profile-dropdown">
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}