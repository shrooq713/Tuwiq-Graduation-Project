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
        src="https://cdn-icons.flaticon.com/png/128/4284/premium/4284088.png?token=exp=1639291842~hmac=42d680974202c57fa302b448fdfae2f7"
        alt="Current location"
      />
    </button>
  );
}
export default Locate;
