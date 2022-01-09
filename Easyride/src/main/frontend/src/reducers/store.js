import { createStore, combineReducers } from "redux";
import webSocketRef from "./WebSocket/webSocketRef";
import User from "./User/User";
import Trips from "./Trips/Trips";


const reducers = combineReducers({ webSocketRef, User, Trips });
const store = createStore(reducers);

export default store;
