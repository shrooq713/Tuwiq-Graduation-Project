function Locate({ panTo, lat, lng }) {
  return (
    <button
      className="locate"
      onClick={() => {
        if (lat !== 0 && lng !== 0) {
          panTo({
            lat: lat,
            lng: lng,
          });
        } else {
          navigator.geolocation.getCurrentPosition(
            (position) => {
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
      className="img-current-loc"
        src="https://www.svgrepo.com/show/115354/map-location.svg"
        alt="Current location"
      />
      <p className="current-loc-text">current <br/> location</p>
    </button>
  );
}
export default Locate;
