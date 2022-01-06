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
                <a className="nav-link nav-item" href="#">
                  <p>profile</p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <p>All trips</p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-item" href="#">
                  Have an issue?
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
