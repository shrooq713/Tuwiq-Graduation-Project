import React, { useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import mapStyles from "../mapStyles";
import DriverCurrentLocation from "./DriverCurrentLocation";
import image from "../Images/logo1.png";

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

  const mapRef = React.useRef();

  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <img
        className="icon"
        src={image}
        alt="Logo"
      />
      <h1>
        <span role="img" aria-label="tent">
          Easyride
        </span>
      </h1>
      <DriverCurrentLocation />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onLoad={onMapLoad}
      ></GoogleMap>
    </div>
  );
}

export default DriverMap;
