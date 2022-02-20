import { useParams } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import image from "../Images/logo1.png";
import { useState } from "react";

export default function AllTrip() {
  let { id } = useParams();
  const state = useSelector((state) => {
    return {
      user: state.User.user,
      token: state.User.token,
      trip: state.Trips.trips,
      activeTrip: state.ActiveTrip.ActiveTrip,
    };
  });
  let [tripState, setTripState] = useState("");

  if(state.activeTrip.canceled === true){
      console.log("canceled");
      setTripState("canceled");
  }else if(state.activeTrip.ended === true){
    console.log("ended");
    setTripState("ended");
  }
  console.log(tripState);
  return (
    <div className="page-header clear-filter" filter-color="orange">
      <NavBar />
      <div className="align">
        <div>
          <div className="trip_card">
            <div className="brand_logo_container">
              <img src={image} className="brand_logo" alt="Logo" />
            </div>
            <div className="trip-txt">
              <div className="trip-flex">
                <h2 className="txt-color">Trip</h2>
                <p>
                trip is {tripState}
                </p>
                <p>
                  {state.activeTrip.day} - {state.activeTrip.time}
                </p>
              </div>
              <div className="trip-flex">
                <h3>Driver</h3>
                <p>
                  Name: {state.activeTrip.driver.firstName}{" "}
                  {state.activeTrip.driver.lastName}
                </p>
                <p>Phone Namber: {state.activeTrip.driver.phoneNumber}</p>
                <p>
                  Car: {state.activeTrip.driver.carType} {state.activeTrip.driver.carName}
                </p>
                <p>licenses plate: {state.activeTrip.driver.licenses_plate}</p>
              </div>
              <div className="trip-flex">
                <h3>Rider</h3>
                <p>
                  Name: {state.activeTrip.rider.firstName} {state.activeTrip.rider.lastName}
                </p>
                <p>Phone Namber: {state.activeTrip.rider.phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
