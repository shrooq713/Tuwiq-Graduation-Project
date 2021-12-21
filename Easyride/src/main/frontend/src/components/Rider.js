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

  const [markers, setMarkers] = useState([]);
  const [directions, setDirections] = useState();
  const [dropSelected, setDropSelected] = useState(null);
  const [pickSelected, setPickSelected] = useState(null);
  const [dropLocationLat, setDropLocationLat] = useState(0);
  const [dropLocationLng, setDropLocationLng] = useState(0);
  const [pickLocationLat, setPickLocationLat] = useState(0);
  const [pickLocationLng, setPickLocationLng] = useState(0);

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
          // console.log("result");
          // console.log(result);
          // console.log(result.routes[0].legs[0].distance.text);
          // console.log(result.routes[0].legs[0].duration.text);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  return (
    <div>
      <img
        className="icon"
        src="https://cdn-icons.flaticon.com/png/512/1916/premium/1916788.png?token=exp=1639550670~hmac=09861a67572e4df4a26dceca0d51538c"
      />
      <h1>
        <span role="img" aria-label="tent">
          Easyride
        </span>
      </h1>

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
          console.log("conf clikcked");
          changeDirection(origin, destination);
        }}
      >
        Confirm order
      </button>
    </div>
  );
}
