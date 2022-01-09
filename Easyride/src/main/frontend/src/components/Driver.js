import React, { useState } from "react";
import Locate from "./Locate";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import mapStyles from "../mapStyles";
import PinPickUp from "./PinPickUp";
import NavBar from "./Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTrips } from "../reducers/Trips/Trips";
import { formatRelative } from "date-fns";

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
export default function Driver() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBqTC5xkt1ubdlktunhCxpBI9_yEiL44XQ",
    libraries,
  });
  const state = useSelector((state) => {
    return {
      trips: state.Trips.trips,
    };
  });
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLng, setCurrentLng] = useState(0);
  const dispatch = useDispatch();

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

  const [pickSelected, setPickSelected] = useState(null);
  const [pickLocationLat, setPickLocationLat] = useState(0);
  const [pickLocationLng, setPickLocationLng] = useState(0);
  const [pin, setPin] = useState([]);

  //   test ---------------------------------------
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  // ------------------------------------------------
  const mapRef = React.useRef();
  const onMapLoad = (map) => {
    mapRef.current = map;
    console.log("mapRef");
    console.log(map);
  };
  const panTo = () => {
    // mapRef.current.panTo({ lat, lng });
    state.trips.map((trip) => {
      setPickLocationLat(trip.pickUpLat);
      setPickLocationLng(trip.pickUpLng);
      return mapRef.current.panTo({ lat: trip.pickUpLat, lng: trip.pickUpLng });
    });

    // mapRef.current.setZoom(13);
  };

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
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
  console.log(state.trips);

  return (
    <div>
      <NavBar></NavBar>
      <Locate panTo={panTo} lat={currentLat} lng={currentLng} />
      {/* <SearchPickUp panTo={panTo} /> */}

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {/* test  */}
        {/* {console.log(state.trips)}
        {state.trips.map((marker) => (
          <Marker
            key={`${24.87364}-${48.98736}`}
            position={{ lat: 24.87364, lng: 48.98736 }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: `/bear.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))} */}
        <Marker
            key={`${24.87364}-${48.98736}`}
            position={{ lat: 24.87364, lng: 48.98736 }}
            // onClick={() => {
            //   setSelected(marker);
            // }}
            icon={{
              url: `/bear.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        {console.log(selected)}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <span role="img" aria-label="bear">
                  🐻
                </span>{" "}
                Alert
              </h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
        {/* <PinPickUp
          setSelected={setPickSelected}
          selected={pickSelected}
          pickLocationLat={pickLocationLat}
          pickLocationLng={pickLocationLng}
        /> */}
      </GoogleMap>
      {/* <button
        onClick={() => {
          getTrips();
          currentLoc();
          //   panTo({ lat: state.trips[0].pickUpLat, lng: state.trips[0].pickUpLng })
          state.trips.map((trip) => {
            console.log(trip);
            // panTo({ lat: trip.pickUpLat, lng: trip.pickUpLng });
            //  panTo({ lat: trip.pickUpLat, lng: trip.pickUpLng })
            return (
              <PinPickUp
                setSelected={setPickSelected}
                selected={pickSelected}
                pickLocationLat={trip.pickUpLat}
                pickLocationLng={trip.pickUpLng}
              />
            );
          });
        }}
      >
        click me
      </button> */}
    </div>
  );
}
