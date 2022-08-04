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
  setSymbol: (symbol: boolean) => void;
  sym: boolean;
}

export const AppCtx = createContext<AppContextInterface | null>(null);

export const SocketContext = ({ children }: any) => {
  const [ballPosition, setBallPosition] = useState({
    x: 3,
    y: 3,
    z: 1,
  });
  const socket = io("http://localhost:4242");
  const [score, setScore] = useState<Number | 0>(0);

  useEffect(() => {
    console.log("HEREE");
    socket.on("ballMove", (data: any) => {
      console.log("BALL MOVE", data);
      setBallPosition(data);
    });
    // return () => {
    //   socket.off("ballMove");
    // };
  }, [socket, ballPosition]);
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
