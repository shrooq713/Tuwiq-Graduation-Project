import { createStore, combineReducers } from "redux";
import webSocketRef from "./WebSocket/webSocketRef";
import User from "./User/User";
import Trips from "./Trips/Trips";
import DriverLocation from "./DriverLocation/DriverLocation";
import ActiveTrip from "./ActiveTrip/ActiveTrip";


const reducers = combineReducers({
  webSocketRef,
  User,
  Trips,
  DriverLocation,
  ActiveTrip,
});
const store = createStore(reducers);

export default store;
