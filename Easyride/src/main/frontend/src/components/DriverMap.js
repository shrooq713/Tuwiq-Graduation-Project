import React, { useState } from "react";
import Locate from "./Locate";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import "@reach/combobox/styles.css";
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

function DriverMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAhjreWRl3uJuInXHRVsaG2e2vQ7udmfqQ",
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
  currentLoc();

  const [markers, setMarkers] = React.useState([]);
  const [dropSelected, setDropSelected] = React.useState(null);
  const [pickSelected, setPickSelected] = React.useState(null);
  const [dropLocationLat, setDropLocationLat] = useState(0);
  const [dropLocationLng, setDropLocationLng] = useState(0);
  const [pickLocationLat, setPickLocationLat] = useState(0);
  const [pickLocationLng, setPickLocationLng] = useState(0);

  const onMapClick = (e) => {
    setDropLocationLat(e.latLng.lat());
    setDropLocationLng(e.latLng.lng());
    let test = e.latLng.lat();
  };

  const mapRef = React.useRef();
  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  const panTo = ({ lat, lng, pinType }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
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

      <Locate
        panTo={panTo}
        lat={currentLat}
        lng={currentLng}
        markers={markers}
        setSelected={setPickSelected}
        onMapClick={onMapClick}
        setMarkers={setMarkers}
      />
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >

      </GoogleMap>

    </div>
  );
}

export default DriverMap;