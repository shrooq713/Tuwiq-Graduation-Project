import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import image from "../Images/logo1.png";
import { addDriverLocation } from "../reducers/DriverLocation/DriverLocation";

function Driver() {
  const dispatch = useDispatch();

  const currentLoc = () => {
    console.log("online clicked");
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
      <img className="icon" src={image} alt="Logo" />
      <h1>
        <span role="img" aria-label="tent">
          Easyride
        </span>
      </h1>
      <button onClick={currentLoc}>online</button>
    </div>
  );
}

export default Driver;
