function Locate({ panTo, lat, lng }) {
    return (
      <button
        className="locate"
        onClick={() => {
          // console.log("current loc");
          // navigator.geolocation.getCurrentPosition(
          //   (position) => {
          //     console.log("current loc");
          //     console.log(position);
          panTo({
            lat: lat,
            lng: lng,
          });
          //   },
          //   () => null
          // );
        }}
      >
        <div className="currentLocation">
        <img
          src="https://cdn-icons.flaticon.com/png/128/4284/premium/4284088.png?token=exp=1639291842~hmac=42d680974202c57fa302b448fdfae2f7"
          alt="Current location"
        />
        <h3 className="currentLocationText">Current location</h3>
      </div>
      </button>
    );
  }

export default Locate;
