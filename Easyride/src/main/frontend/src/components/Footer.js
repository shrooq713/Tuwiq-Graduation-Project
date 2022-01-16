import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <section id="footer">
        <div class="footer-container">
          <div class="easyride-container">
            <h5 className="footer-header">Easyride</h5>
            <ul class="quick-links">
              <li className="footer-list">
                <Link className="nav-link" to="/aboutus">
                  <i class="fa fa-angle-double-right element"></i>About us
                </Link>
              </li>
              <li className="footer-list">
                <Link className="nav-link" to="/">
                  <i class="fa fa-angle-double-right element"></i> Contact with
                  us
                </Link>
              </li>
            </ul>
          </div>
          <div class="joinus-container">
            <h5 className="footer-header">Join with us</h5>
            <ul class="quick-links">
              <li className="footer-list">
                <Link className="nav-link" to="/">
                  <i class="fa fa-angle-double-right element"></i>
                  Ride
                </Link>
              </li>
              <li className="footer-list">
                <Link className="nav-link" to="/SignUpDriver">
                  <i class="fa fa-angle-double-right element"></i>Drive
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
