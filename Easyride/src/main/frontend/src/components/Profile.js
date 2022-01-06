import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import profile from "../Images/profile.png";
import { addDriverLocation } from "../reducers/DriverLocation/DriverLocation";
import NavBar from "./Navbar";

function Profile() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onlineClicked = () => {
    navigate("/driver");
  };
  const state = useSelector((state) => {
    return {
        user: state.User.user,
    };
  });
  
  return (
    <div>
      <div className="page-header clear-filter" filter-color="orange">
        <NavBar />
        <div className="container">
          <div>
            <img className="profile-img" src={profile} alt="profile" />
          </div>
          <h3 className="title">{state.user.firstName +" "+ state.user.lastName}</h3>
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
    </div>
  );
}

export default Profile;
