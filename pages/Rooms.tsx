import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import Game from "./Components/Game";
import { AppCtx } from "./Context/SocketContext";
import { useContext } from "react";
const Home: NextPage = () => {
  const { socket, gameData } = useContext(AppCtx);
  return (
    <>
      <div
        style={{
          color: "white",
          position: "absolute",
          fontWeight: "bold",
          backgroundColor: "transparent",
          cursor: "pointer",
          zIndex: 999,
        }}
        onClick={() => socket.emit("startGame")}
      >
        PLAY
      </div>
      <div
        style={{
          color: "white",
          position: "absolute",
          fontWeight: "bolder",
          backgroundColor: "transparent",
          cursor: "pointer",
          left: "50%",
          zIndex: 999,
        }}
      >
        {gameData.score.player1} - {gameData.score.player2}
      </div>
      <div className={styles.container}>
        <Canvas
          shadows={true}
          camera={{
            fov: 75,
            position: [-0.018223506966510716, -54, 20],
            near: 0.1,
            far: 1000,
          }}
          className={styles.canvas}
        >
          <directionalLight
            position={[0, 0, 10]}
            color={"white"}
            intensity={1}
          />
          <ambientLight intensity={0.8} color={"white"} />
          <Game socket={socket} gameData={gameData} />
        </Canvas>
      </div>
    </>
  );
};

export default Home;
