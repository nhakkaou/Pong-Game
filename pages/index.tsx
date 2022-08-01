import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import Game from "./Game";
import { AppCtx } from "./Context/SocketContext";
import { useContext } from "react";
const Home: NextPage = () => {
  const { socket, ballPosition } = useContext(AppCtx);
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
        onClick={() => {
          console.log("send", socket);
          socket.emit("ballMove");
        }}
      >
        PLAY
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
          <Game socket={socket} ballPosition={ballPosition} />
        </Canvas>
      </div>
    </>
  );
};

export default Home;
