import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import { useSelector } from "react-redux";
import NavBar from "./Navbar";
import mapStyles from "../mapStyles";
import { Link, useNavigate } from "react-router-dom";

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
        {state.trips.map((marker) => (
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
              <button>
                <Link
                  to={{
                    pathname: `/activeTrip/${selected.id}`,
                  }}
                >
                  <img
                    className="accept-img"
                    src="https://www.svgrepo.com/show/92787/check-mark.svg"
                    alt="Logo"
                  />
                </Link>
              </button>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      {/* <button onClick={getTrips}>getTrips</button> */}
    </div>
  );
}
