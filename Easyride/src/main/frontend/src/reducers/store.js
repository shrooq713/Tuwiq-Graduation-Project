import { createStore, combineReducers } from "redux";
import webSocketRef from "./WebSocket/webSocketRef";
import User from "./User/User";

const reducers = combineReducers({ webSocketRef, User });
const store = createStore(reducers);

export default store;
