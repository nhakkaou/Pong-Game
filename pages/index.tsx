import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import Ball from "./Modules/Ball";
import Padlle from "./Modules/Padlle";
import Controll from "./Modules/Controll";
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Canvas
        shadows={true}
        camera={{
          fov: 75,
          position: [0, 0, 10],
          near: 0.1,
          far: 1000,
        }}
        className={styles.canvas}
      >
        <ambientLight intensity={0.8} color={"white"} />
        <Padlle />
        <Ball />
        <Controll />
      </Canvas>
    </div>
  );
};

export default Home;
