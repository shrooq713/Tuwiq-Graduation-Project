const trips = JSON.parse(localStorage.getItem("trips"));
const initialState = {
    trips: trips ? trips : {},
};

const Trips = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_TRIPS":
      console.log(state.trips);
      localStorage.setItem("trips", JSON.stringify(payload));
      return {
        trips: payload,
      };
    default:
      return state;
  }
};

export default Trips;

export const addTrips = (trips) => {
  return {
    type: "ADD_TRIPS",
    payload: trips,
  };
};

