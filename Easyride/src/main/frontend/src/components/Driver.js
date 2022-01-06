import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import profile from "../Images/profile.png";
import { addDriverLocation } from "../reducers/DriverLocation/DriverLocation";
import NavBar from "./Navbar";

function Driver() {
  const dispatch = useDispatch();

  const currentLoc = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("current loc");
        console.log(position);
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        dispatch(addDriverLocation(loc));
        console.log(loc);
        if (loc) {
          getOrders();
        }
      },
      () => null
    );
  };
  const getOrders = () => {
    axios
      .get(`http://localhost:8080/trip`)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div>
    </div>
  );
}

export default Driver;
