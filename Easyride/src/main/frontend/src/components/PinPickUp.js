import { Marker, InfoWindow } from "@react-google-maps/api";
import { formatRelative } from "date-fns";

function PinPickUp({
  setSelected,
  selected,
  pickLocationLat,
  pickLocationLng,
}) {
  console.log("in pin");
  return (
    <>
      <Marker
        key={`${pickLocationLat}-${pickLocationLng}`}
        position={{ lat: pickLocationLat, lng: pickLocationLng }}
        onClick={() => {
          let pin = {
            lat: pickLocationLat,
            lng: pickLocationLng,
            time: new Date(),
          };
          setSelected(pin);
          console.log(pin);
        }}
        icon={{
          // url: `/bear.svg`,
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15),
          scaledSize: new window.google.maps.Size(30, 30),
        }}
      />
      ))
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
              Pick Up Location
            </h2>
            <p>Spotted {formatRelative(selected.time, new Date())}</p>
          </div>
        </InfoWindow>
      ) : null}
    </>
  );
}

export default PinPickUp;
