import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar">

        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-icon">📚</span>

          <span className="logo-text">
            <span>StudySync</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="navbar-links">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/planner"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Planner
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/calendar"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Calendar
          </NavLink>

        </nav>

        {/* User Area */}
        <div className="navbar-user">

          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className="user-details">
              <span className="user-name">
                {user?.name || "Student"}
              </span>

              <span className="user-status">
                {user?.isDemo ? "Demo Student" : "Student"}
              </span>
            </div>
          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>
    </header>
  );
}

export default Navbar;