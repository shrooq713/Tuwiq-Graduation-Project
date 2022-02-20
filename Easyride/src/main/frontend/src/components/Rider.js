import React, { useState } from "react";
import Locate from "./Locate";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
  DistanceMatrixService,
} from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import mapStyles from "../mapStyles";
import SearchPickUp from "./SearchPickUp";
import SearchDropIn from "./SearchDropIn";
import PinDropIn from "./PinDropIn";
import PinPickUp from "./PinPickUp";
import NavBar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addTrips } from "../reducers/Trips/Trips";
import { addActiveTrip } from "../reducers/ActiveTrip/ActiveTrip";

const libraries = ["places", "directions"];

const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  // location of riyadh
  //24.714952080192095, 46.670134150716606
  lat: 24.71,
  lng: 46.67,
};
let directionsService;
export default function Rider() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBqTC5xkt1ubdlktunhCxpBI9_yEiL44XQ",
    libraries,
  });

  const [button, setButton] = useState("Confirm");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return {
      user: state.User.user,
      token: state.User.token,
    };
  });
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLng, setCurrentLng] = useState(0);

  const currentLoc = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("current loc");
        console.log(position);
        setCurrentLat(position.coords.latitude);
        setCurrentLng(position.coords.longitude);
      },
      () => null
    );
  };
  // currentLoc();

  const [directions, setDirections] = useState();
  const [dropSelected, setDropSelected] = useState(null);
  const [pickSelected, setPickSelected] = useState(null);
  const [dropLocationLat, setDropLocationLat] = useState(0);
  const [dropLocationLng, setDropLocationLng] = useState(0);
  const [pickLocationLat, setPickLocationLat] = useState(0);
  const [pickLocationLng, setPickLocationLng] = useState(0);

  console.log("dropLocationLat "+dropLocationLat);
  console.log("dropLocationLng "+dropLocationLng);
  console.log("pickLocationLat "+pickLocationLat);
  console.log("pickLocationLng "+pickLocationLng);

  const onMapClick = (e) => {
    setDropLocationLat(e.latLng.lat());
    setDropLocationLng(e.latLng.lng());
  };

  const mapRef = React.useRef();
  const onMapLoad = (map) => {
    mapRef.current = map;
    console.log("mapRef");
    console.log(map);
  };

  const panTo = ({ lat, lng, pinType }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(13);
    if (pinType === "DropIn") {
      setDropLocationLat(lat);
      setDropLocationLng(lng);
    } else {
      setPickLocationLat(lat);
      setPickLocationLng(lng);
    }
    pinType = "";

    console.log(lat);
    console.log(lng);
  };

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  const origin = {
    lat: pickLocationLat,
    lng: pickLocationLng,
  };

  const destination = {
    lat: dropLocationLat,
    lng: dropLocationLng,
  };
  // get dirction between two points, distance and duration
  const changeDirection = (origin, destination) => {
    directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(Date.now()),
          trafficModel: "bestguess",
        },
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          //changing the state of directions to the result of direction service
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };
  return (
    <div className="page-header clear-filter" filter-color="orange">
      <NavBar />

      <Locate panTo={panTo} lat={currentLat} lng={currentLng} />
      <SearchDropIn panTo={panTo} />
      <SearchPickUp panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <PinDropIn
          setSelected={setDropSelected}
          selected={dropSelected}
          dropLocationLat={dropLocationLat}
          dropLocationLng={dropLocationLng}
        />
        <PinPickUp
          setSelected={setPickSelected}
          selected={pickSelected}
          pickLocationLat={pickLocationLat}
          pickLocationLng={pickLocationLng}
        />
        {directions && <DirectionsRenderer directions={directions} />}
        <DistanceMatrixService
          options={{
            destinations: destination,
            origins: origin,
            travelMode: "DRIVING",
          }}
          callback={(response) => {
            console.log("Distance");
            console.log(response);
          }}
        />
      </GoogleMap>
      <button
        className="confirm"
        onClick={() => {
          //confirm order here
          setButton("Looking for driver! 🚘");
          console.log("conf clikcked");
          // changeDirection(origin, destination);
          let today = new Date();
          let time = today.getHours() + ":" + today.getMinutes();
          const weekday = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          let day = weekday[today.getDay()];
          console.log("infooooooooooooooooooo");
          console.log(pickLocationLat);
          let trip = {
            pickUpLat: pickLocationLat,
            pickUpLng: pickLocationLng,
            dropLat: dropLocationLat,
            dropLng: dropLocationLng,
            time: time,
            day: day,
            confirmed: true,
            accepted: false,
            canceled: false,
            ended: false,
            rider: state.user,
          };
          axios
            .post(`http://localhost:8080/trip`, trip)
            .then(function (response) {
              console.log(response.data);
              console.log("accepted? ", response.data.accepted);
              console.log("trip id: ", response.data.id);
              let count = 0;
              // if (response.data.accepted === false) {
              let interval = setInterval(() => {
                if (count <= 20) {
                  console.log("inside if accepted");
                  console.log("count is : ", count);
                  axios
                    .get(`http://localhost:8080/trip/${response.data.id}`)
                    .then(function (response) {
                      console.log("repeted");
                      console.log(response.data);
                      if (response.data.accepted === true) {
                        console.log("accepted");
                        console.log(response.data);
                        dispatch(addActiveTrip(response.data));
                        count = 21;
                        navigate(`/active/${response.data.id}`);
                        return;
                      }
                    })
                    .catch(function (error) {
                      console.error(error);
                    });
                  count += 1;
                } else {
                  clearInterval(interval);
                  console.log("grater than 20");
                  setButton("No driver accept the trip! 😢");
                  return;
                }
              }, 3000);
            })
            .catch(function (error) {
              console.error(error);
            });
        }}
      >
        {button}
      </button>
      <Footer />
    </div>
  );
}
