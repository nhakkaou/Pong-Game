import React, { useContext, useState } from "react";
import { AppCtx } from "./Context/SocketContext";

const index = () => {
  const { socket, gameData } = useContext(AppCtx);
  const [load, setLoading] = useState(false);
  const findMatch = () => {
    socket.emit("findGame");
    setLoading(!load);
  };
  return (
    <div
      style={{
        display: "flex",
        color: "#FFF",
        fontSize: "2.5rem",
      }}
    >
      <div style={{ position: "absolute", left: "12%", top: "25%" }}>
        <h1>Pong Game</h1>
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          fontSize: "1.5rem",
          fontWeight: "bold",
          padding: "15px",
          background:
            "radial-gradient(circle, rgba(174,140,250,1) 60%, rgba(116,108,254,1) 100%);",
          borderRadius: "35px",
          cursor: "pointer",
        }}
        onClick={findMatch}
      >
        {!load ? "Play online" : "Loading ..."}
      </div>
    </div>
  );
};

export default index;
