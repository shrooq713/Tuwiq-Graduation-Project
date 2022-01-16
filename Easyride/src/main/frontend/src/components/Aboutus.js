import Footer from "./Footer";
import NavBar from "./Navbar";

function AboutUs() {
  return (
    <div>
      <NavBar></NavBar>
      <div className="aboutus-font">
        <div className="image-aboutus-banner">
          <h1 className="aboutus-text">About Us</h1>
          <p className="image-text">
            Simplifying lives for riders and drivers.
          </p>
        </div>

        <div className="aboutus-container paddingTB60">
          <div>
            <h1 className="aim-header">Our aim</h1>
            <p class="aim-text">
              Build an awesome organisation <br />
              that makes people lives easier.
            </p>
          </div>
          <div>
            <p className="aboutus-p">
              We aim to exploitation of technology to provide the easiest way to
              make trip For you. <br />
              For all the places you want to go across the entire world In
              real-time. <br />
              At the incredible speed of now.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default AboutUs;
