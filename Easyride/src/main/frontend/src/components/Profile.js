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
  
  return (
    <div>
      <div className="page-header clear-filter" filter-color="orange">
        <NavBar />
        <div className="container">
          <div>
            <img className="profile-img" src={profile} alt="profile" />
          </div>
          <h3 className="title">Shrooq Alamri</h3>
          <p className="category">Rider</p>
          <div className="content">
            <div className="social-description">
              <div className="flex-btn">
                <p className="category">UserName:</p>
                <p>Sh2394</p>
              </div>
              <div className="flex-btn">
                <p className="category">Email:</p>
                <p>Shrooq@gmail.com</p>
              </div>
              <div className="flex-text">
                <p className="category">Phone:</p>
                <p>0550605486</p>
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
