import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import image from "../Images/logo1.png";
function NavBar() {
  const state = useSelector((state) => {
    return {
      user: state.User.user,
    };
  });
  return (
    <div>
      <nav className="navbar">
        <div className="align-nav">
          <div className="header-container">
            <img className="logo-img" src={image} alt="Logo" />
            <h1 className="header-nav">Easyride</h1>
          </div>
          <div className="link-nav">
            {state.user.id ? (
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
                  <Link className="nav-link" to="/aboutus">
                    about us
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    logout
                  </Link>
                </li>
              </ul>
            ) : (
              <ul />
            )}
            {console.log(state.user.id)}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
