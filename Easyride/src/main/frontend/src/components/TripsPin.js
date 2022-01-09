import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import "@reach/combobox/styles.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTrips } from "../reducers/Trips/Trips";
import acceptImage from "../Images/accept3.png";
import NavBar from "./Navbar";
import mapStyles from "../mapStyles";

const libraries = ["places"];
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

export default function TripsPin() {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      trips: state.Trips.trips,
    };
  });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBqTC5xkt1ubdlktunhCxpBI9_yEiL44XQ",
    libraries,
  });
  const [selected, setSelected] = React.useState(null);
  const [currentLoc, setCurrentLoc] = React.useState({});
//   get current location for driver
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setCurrentLoc({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    () => null
  );
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
//   Get trips from database
  const getTrips = () => {
    axios
      .get(`http://localhost:8080/trip`)
      .then(function (response) {
        dispatch(addTrips(response.data));
      })
      .catch(function (error) {
        console.error(error);
      });
    console.log(state.trips);
  };
  return (
    <div>
      <NavBar />
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {/*  Pin driver location  */}
        <Marker
          key={`${currentLoc.lat}-${currentLoc.lng}`}
          position={{ lat: currentLoc.lat, lng: currentLoc.lng }}
          icon={{
            // url: '../Images/person.svg',
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />

        {/* pin trips */}
        {state.trips.map((marker) => (
          <Marker
            key={`${marker.pickUpLat}-${marker.pickUpLng}`}
            position={{ lat: marker.pickUpLat, lng: marker.pickUpLng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              // url: '../Images/person.svg',
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.pickUpLat, lng: selected.pickUpLng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <span role="img" aria-label="bear">
                  👤
                </span>{" "}
                Trip
              </h2>
              <p>
                Rider name:{" "}
                {selected.rider.firstName + " " + selected.rider.lastName}
              </p>
              <p>Day: {selected.day}</p>
              <p>Time: {selected.time}</p>
              <button
                onClick={() => {
                  console.log("cliked" + selected.id);
                }}
              >
                {" "}
                <img className="logo-img" src={acceptImage} alt="Logo" />
              </button>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <button onClick={getTrips}>getTrips</button>
    </div>
  );
}
