import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./Navbar";
import mapStyles from "../mapStyles";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { addTrips } from "../reducers/Trips/Trips";
import { addActiveTrip } from "../reducers/ActiveTrip/ActiveTrip";

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

export default function Driver() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      user: state.User.user,
      driverLocation: state.DriverLocation.DriverLocation,
      trips: state.Trips.trips,
    };
  });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBqTC5xkt1ubdlktunhCxpBI9_yEiL44XQ",
    libraries,
  });
  const [selected, setSelected] = React.useState(null);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  const AcceptClicked = () => {
    console.log("AcceptClicked");
    console.log(selected);
    console.log(state.user);
    axios
      .put(`http://localhost:8080/trip/${selected.id}/true`, state.user)
      .then(function (response) {
        console.log(response.data);
        console.log("trip selected");
        console.log(selected);
        dispatch(addActiveTrip(response.data));

      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <div className="page-header clear-filter" filter-color="orange">
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
          key={`${state.driverLocation.lat}-${state.driverLocation.lng}`}
          position={{
            lat: state.driverLocation.lat,
            lng: state.driverLocation.lng,
          }}
          icon={{
            url: "https://www.svgrepo.com/show/308201/car-driver-transportation-car-drive.svg",
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />

        {/* pin trips */}
        {console.log(state.trips)}
        {state.trips.map((marker) => {
          console.log(marker.pickUpLat + " " + marker.accepted);
          if (marker.accepted === false) {
            console.log("accepted??????????????????? yes");
            return (
              <Marker
                key={`${marker.pickUpLat}-${marker.pickUpLng}`}
                position={{ lat: marker.pickUpLat, lng: marker.pickUpLng }}
                onClick={() => {
                  setSelected(marker);
                }}
                icon={{
                  url: "https://www.svgrepo.com/show/311072/person-clock.svg",
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            );
          }
          // return;
        })}
        {console.log(selected)}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.pickUpLat, lng: selected.pickUpLng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div className="selected-marker">
              <h2 className="selected-txt">
                <span role="img" aria-label="bear">
                  👤
                </span>{" "}
                Trip
              </h2>
              <p className="selected-txt">
                Rider name:{" "}
                {selected.rider.firstName + " " + selected.rider.lastName}
              </p>
              <p className="selected-txt">Day: {selected.day}</p>
              <p className="selected-txt">Time: {selected.time}</p>
              <button className="selected-btn" onClick={AcceptClicked}>
                <Link
                  to={{
                    pathname: `/active/${selected.id}`,
                  }}
                >
                  <div class="accept-img">
                    {" "}
                    <p></p>
                  </div>
                </Link>
              </button>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <Footer />
    </div>
  );
}
