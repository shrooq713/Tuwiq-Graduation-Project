import { Marker, InfoWindow } from "@react-google-maps/api";
import { formatRelative } from "date-fns";

function PinDropIn({
  setSelected,
  selected,
  dropLocationLat,
  dropLocationLng,
}) {
  return (
    <>
      <Marker
        key={`${dropLocationLat}-${dropLocationLng}`}
        position={{ lat: dropLocationLat, lng: dropLocationLng }}
        onClick={() => {
          let pin = {
            lat: dropLocationLat,
            lng: dropLocationLng,
            time: new Date(),
          };
          setSelected(pin);
        }}
        icon={{
          // url: `/bear.svg`,
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15),
          scaledSize: new window.google.maps.Size(50, 50),
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
                📍
              </span>{" "}
              Drop In Location
            </h2>
            <p>Spotted {formatRelative(selected.time, new Date())}</p>
          </div>
        </InfoWindow>
      ) : null}
    </>
  );
}

export default PinDropIn;
