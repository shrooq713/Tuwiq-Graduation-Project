const initialState = {
  DriverLocation: {},
};

const DriverLocation = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_DRIVER_LOCATION":
      return {
        DriverLocation: payload,
      };
    default:
      return state;
  }
};

export default DriverLocation;

export const addDriverLocation = (DriverLocation) => {
  return {
    type: "ADD_DRIVER_LOCATION",
    payload: DriverLocation,
  };
};
