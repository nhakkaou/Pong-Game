import { io, Socket } from "socket.io-client";
import { createContext } from "react";
import React, { useEffect, useState } from "react";

interface AppContextInterface {
  socket: Socket | null;
  ballPosition: {
    x: number;
    y: number;
    z: number;
  };
}

export const AppCtx = createContext<AppContextInterface | null>(null);

export const SocketContext = ({ children }: any) => {
  const [ballPosition, setBallPosition] = useState({
    x: 3,
    y: 3,
    z: 1,
  });
  const [socket, setSocket] = useState<Socket | null>(null);
  const [score, setScore] = useState<Number | 0>(0);
  useEffect(() => {
    const sk = io("http://localhost:4242");
    console.log("SOCKET", sk);
    setSocket(sk);
    return () => {
      sk.close();
    };
  }, []);
  socket?.on("ballMove", (data: any) => {
    console.log(score);
    // if (score < 5) {
    // socket.emit("ballMove");
    setBallPosition(data);
    // } else
    //   setBallPosition({
    //     x: 3,
    //     y: 3,
    //     z: 1,
    //   });
  });
  socket?.on("goal", (data: any) => {
    let t: Number = +score + 1;
    setScore(t);
  });
  return (
    <AppCtx.Provider
      value={{
        socket,
        ballPosition,
      }}
    >
      {children}
    </AppCtx.Provider>
  );
};
