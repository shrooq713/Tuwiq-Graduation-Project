import React, { useState } from "react";
// This connects with Server’s STOMP endpoint (in websocketconfig) and listens message on “/topic/message”.
// After connection is established, message sent to “/topic/message” is received
// and handled by onMessageReceived method.
import SockJsClient from "react-stomp";

const SOCKET_URL = "http://localhost:8082/ws-message";

function DriverCurrentLocation() {
  const [message, setMessage] = useState("You server message here.");
  const [currentLocation, setCurrentLocation] = useState({});
  const [connection, setConnect] = useState("connected");

  let onConnected = () => {
    setConnect(connection);
    console.log("Connected!!");
  };

  let onMessageReceived = (msg) => {
    console.log("msg recived: ");
    console.log(msg);
    setMessage(msg.message);
  };

  // Check for died connections at regular intervals.
  setInterval(function () {
    // wsServer.clients.forEach(function(connection) {
    if (connection === "connected") {
      console.log("Connection alive", connection.id);
      // return connection.terminate();
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude);
          let location = position.coords.latitude +","+position.coords.longitude
          setCurrentLocation(location)
        },
        () => null
      );
    }
    // Request the client to respond with pong. Client does this automatically.
    // }
    // );
  }, 50000);

  console.log(currentLocation);

  return (
    <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={["/topic/message"]}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={(msg) => onMessageReceived(msg)}
        debug={false}
      />
      <div>{message}</div>
    </div>
  );
}

export default DriverCurrentLocation;
