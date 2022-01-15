import { Link } from "react-router-dom";
import image from "../Images/logo1.png";
function NavBar() {
  return (
    <div>
      <nav className="navbar">
        <div className="align-nav">
          <div className="header-container">
            <img className="logo-img" src={image} alt="Logo" />
            <h1 className="header-nav">Easyride</h1>
          </div>
          <div className="link-nav">
            <ul className="navbar-nav link-nav">
              <li className="nav-item">
                <Link className="nav-link nav-item" to="/profile">
                  profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  All trips
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                Have an issue?
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
