import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// This connects with Server’s STOMP endpoint (in websocketconfig) and listens message on “/topic/message”.
// After connection is established, message sent to “/topic/message” is received
// and handled by onMessageReceived method.
import SockJsClient from "react-stomp";
import { addWebSocketRef } from "../reducers/WebSocket/webSocketRef";

const SOCKET_URL = "http://localhost:8083/our-websocket";

function DriverCurrentLocation() {
  const [message, setMessage] = useState("You server message here.");
  const [connection, setConnection] = useState("");
  let clientRef = React.useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      webSocketRef: state.webSocketRef.webSocketRef,
    };
  });
  let onConnected = (e) => {
    setConnection("connected");
    console.log("connect");
  };

  let onMessageReceived = (msg) => {
    console.log("msg recived: ");
    console.log(msg);
    setMessage(msg.message);
  };
  const sendMessage = async (msg) => {
    console.log("in send msg");
    console.log(clientRef);
    if (clientRef) {
      console.log("send msg");
      await clientRef.sendMessage("/ws/message", msg);
    }
  };
  useEffect(() => {
    setInterval(() => {
      if (connection === "connected") {
        console.log("cccccc  ");
        console.log(state.webSocketRef);
        console.log(clientRef);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("position");
            console.log(position);

            sendMessage(
              JSON.stringify({
                messageContent:
                  position.coords.latitude + "," + position.coords.longitude,
              })
            );
          },
          () => null
        );
      }
    }, 5000);
  }, [connection]);
  console.log(state.webSocketRef);
  return (
    <div>
      {console.log("rendered")}
      <SockJsClient
        url={SOCKET_URL}
        topics={["/topic/message"]}
        onConnect={(e) => onConnected()}
        onDisconnect={console.log("Disconnected!")}
        onMessage={(msg) => onMessageReceived(msg)}
        debug={false}
        ref={(client) => {
          clientRef = client;
        }}
      />
    </div>
  );
}

export default DriverCurrentLocation;
