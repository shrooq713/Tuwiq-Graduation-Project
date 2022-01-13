import { createStore, combineReducers } from "redux";
import webSocketRef from "./WebSocket/webSocketRef";
import User from "./User/User";
import Trips from "./Trips/Trips";
import DriverLocation from "./DriverLocation/DriverLocation"


const reducers = combineReducers({ webSocketRef, User, Trips, DriverLocation });
const store = createStore(reducers);

export default store;
