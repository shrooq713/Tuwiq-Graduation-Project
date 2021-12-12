import React, { useState } from "react";
import Search from "./Search";
// import Locate from "./Locate";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";

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

export default function Rider() {
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
  console.log("Current lat and lng");
  console.log(currentLat);
  console.log(currentLng);

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <img
        className="icon"
        src="https://cdn-icons.flaticon.com/png/512/1916/premium/1916788.png?token=exp=1639293991~hmac=32551fdba3422eacb6daf105dde8eb8d"
      ></img>
      <h1>
        <span role="img" aria-label="tent">
          Easyride
        </span>
      </h1>

      <Locate panTo={panTo} lat={currentLat} lng={currentLng} />
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              // url: `/bear.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

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
                  🚗
                </span>{" "}
                Drop Location
              </h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
function Locate({ panTo, lat, lng }) {
  return (
    <button
      className="locate"
      onClick={() => {
        console.log("current loc");
        if (lat !== 0 && lng !== 0) {
          panTo({
            lat: lat,
            lng: lng,
          });
        } else {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log("current loc");
              console.log(position);
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }
      }}
    >
      <img
        src="https://cdn-icons.flaticon.com/png/128/4284/premium/4284088.png?token=exp=1639291842~hmac=42d680974202c57fa302b448fdfae2f7"
        alt="Current location"
      />
    </button>
  );
}
