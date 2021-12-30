import { createStore, combineReducers } from "redux";
import webSocketRef from "./WebSocket/webSocketRef";
const reducers = combineReducers({ webSocketRef });

const store = createStore(reducers);

export default store;
