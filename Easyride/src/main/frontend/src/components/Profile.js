import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import profile from "../Images/profile.png";
import { addDriverLocation } from "../reducers/DriverLocation/DriverLocation";
import { addTrips } from "../reducers/Trips/Trips";
import Footer from "./Footer";
import NavBar from "./Navbar";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return {
      user: state.User.user,
      driverLocation: state.DriverLocation.DriverLocation,
    };
  });

  const onlineClicked = () => {
    axios
      .get(`http://localhost:8080/trip`)
      .then(function (response) {
        dispatch(addTrips(response.data));
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          addDriverLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        );
      },
      () => null
    );

    console.log("current location");
    console.log(state.driverLocation);
    navigate("/driver");
  };

  return (
    <div>
      <div className="page-header clear-filter" filter-color="orange">
        <NavBar />
        <div className="container">
          <div>
            <img className="profile-img" src={profile} alt="profile" />
          </div>
          <h3 className="title">
            {state.user.firstName + " " + state.user.lastName}
          </h3>
          <p className="category">Driver</p>
          <div className="content">
            <div className="social-description">
              <div className="flex-text">
                <p className="category">User name:</p>
                <p>{state.user.id}</p>
              </div>
              <div className="flex-text">
                <p className="category">Email:</p>
                <p>{state.user.email}</p>
              </div>
              <div className="flex-text">
                <p className="category">Phone:</p>
                <p>{state.user.phoneNumber}</p>
              </div>
              <div className="flex-text">
                <p className="category">Car:</p>
                <p>{state.user.carName}</p>
              </div>
              <div className="flex-text">
                <p className="category">licenses plate:</p>
                <p>{state.user.licenses_plate}</p>
              </div>
            </div>
            <div className="social-description">
              <h2>26</h2>
              <p>Trips</p>
            </div>
            <div className="flex-btn">
              <div className="social-description">
                <button className="online_btn">Edit profile</button>
              </div>
              <div className="social-description">
                <button className="online_btn" onClick={onlineClicked}>
                  Online
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Profile;
