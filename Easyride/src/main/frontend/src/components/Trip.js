import { Navigate, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
  DistanceMatrixService,
} from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import mapStyles from "../mapStyles";
import NavBar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useSelector } from "react-redux";

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
export default function Trip() {
  // const params = useParams();
  let { id } = useParams();
  let navigate = useNavigate();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBqTC5xkt1ubdlktunhCxpBI9_yEiL44XQ",
    libraries,
  });
  const state = useSelector((state) => {
    return {
      user: state.User.user,
      token: state.User.token,
      trip: state.Trips.trips,
    };
  });

  const [directions, setDirections] = useState();

  const mapRef = React.useRef();
  const onMapLoad = (map) => {
    mapRef.current = map;
    console.log("mapRef");
    console.log(map);
  };

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  console.log(state.trip);
  const origin = {
    lat: state.trip.pickUpLat,
    lng: state.trip.pickUpLng,
  };

  const destination = {
    lat: state.trip.dropLat,
    lng: state.trip.dropLng,
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
  changeDirection(origin, destination);

  return (
    <div className="page-header clear-filter" filter-color="orange">
      <NavBar />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
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
          axios
            .put(`http://localhost:8080/trip/canceled/${id}`)
            .then(function (response) {
              console.log("Canceled");
              console.log(response.data);
              navigate("/trips");
            })
            .catch(function (error) {
              console.error(error);
            });
        }}
      >
        Cancel Trip
      </button>
      <button
        className="end-trip"
        onClick={() => {
          axios
            .put(`http://localhost:8080/trip/ended/${id}`)
            .then(function (response) {
              console.log("Ended");
              console.log(response.data);
              navigate("/trips");
            })
            .catch(function (error) {
              console.error(error);
            });
        }}
      >
        End Trip
      </button>
      <Footer />
    </div>
  );
}
