const initialState = {
  webSocketRef: {},
};

const webSocketRef = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_WebSocketRef":
      return {
        webSocketRef: payload,
      };
    default:
      return state;
  }
};

export default webSocketRef;

export const addWebSocketRef = (webSocketRef) => {
  return {
    type: "ADD_WebSocketRef",
    payload: webSocketRef,
  };
};
