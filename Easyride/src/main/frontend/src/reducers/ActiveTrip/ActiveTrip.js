const initialState = {
    ActiveTrip: {},
  };
  
  const ActiveTrip = (state = initialState, { type, payload }) => {
    switch (type) {
      case "ADD_ACTIVE_TRIP":
        return {
            ActiveTrip: payload,
        };
      default:
        return state;
    }
  };
  
  export default ActiveTrip;
  
  export const addActiveTrip = (ActiveTrip) => {
    return {
      type: "ADD_ACTIVE_TRIP",
      payload: ActiveTrip,
    };
  };
  