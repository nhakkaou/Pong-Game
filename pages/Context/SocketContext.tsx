import { io } from "socket.io-client";
import { createContext } from "react";
import React, { useEffect, useState } from "react";

type Position = {
  x: Number;
  y: Number;
  z: Number;
};
type GameDataType = {
  ball: Position;
  player1: Position;
  player2: Position;
  speed: Number;
  score: {
    player1: Number;
    player2: Number;
  };
};
interface AppContextInterface {
  socket: any | null;
  gameData: GameDataType;
}
export const AppCtx = createContext<AppContextInterface | null>(null);

const socket = io("http://localhost:4000");
export const SocketContext = ({ children }: any) => {
  const [gameData, setData] = useState<GameDataType>({
    ball: {
      x: 3,
      y: 3,
      z: 1,
    },
    player1: {
      x: 0,
      y: -60 / 2 + 3,
      z: 0,
    },
    player2: {
      x: 0,
      y: 60 / 2 - 3,
      z: 0,
    },
    speed: 0.1,
    score: {
      player1: 0,
      player2: 0,
    },
  });

  useEffect(() => {
    console.log("HEREE");
    socket.on("gameData", (data: GameDataType) => {
      console.log(data);
      setData(data);
    });
    if (gameData.score.player1 === 10 || gameData.score.player2 === 10)
      socket.emit("gameOver");
    return () => {
      socket.off("gameData");
    };
  }, [gameData]);
  return (
    <AppCtx.Provider
      value={{
        socket,
        gameData,
      }}
    >
      {children}
    </AppCtx.Provider>
  );
};
