import React, { useEffect, useState } from "react";
// This connects with Server’s STOMP endpoint (in websocketconfig) and listens message on “/topic/message”.
// After connection is established, message sent to “/topic/message” is received
// and handled by onMessageReceived method.
import SockJsClient from "react-stomp";

const SOCKET_URL = "http://localhost:8083/ws-message";

function DriverCurrentLocation() {
  const [message, setMessage] = useState("You server message here.");
  const [connection, setConnect] = useState("");
  let clientRef = React.useRef();
  let onConnected = (e) => {
    setConnect("connected");
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
    const data = await clientRef.sendMessage("/app/sendMessage", msg);
    console.log(data);
  };
  useEffect(() => {
    setInterval(() => {
      if (connection === "connected") {
        console.log("cccccc  ");
        console.log(clientRef);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("position");
            console.log(position);
            sendMessage(
              JSON.stringify({
                message:
                  position.coords.latitude + "," + position.coords.longitude,
              })
            );
          },
          () => null
        );
      }
    }, 5000);
  }, [connection]);

  return (
    <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={["/topic/message"]}
        onConnect={(e) => onConnected()}
        onDisconnect={console.log("Disconnected!")}
        onMessage={(msg) => onMessageReceived(msg)}
        debug={false}
        ref={(client) => (clientRef = client)}
      /> 
    </div>
  );
}

export default DriverCurrentLocation;
