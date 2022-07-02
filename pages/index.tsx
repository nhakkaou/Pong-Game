import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import Ball from "./Modules/Ball";
import Controll from "./Modules/Controll";
import Stage from "./Modules/Stage";
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Canvas
        shadows={true}
        camera={{
          fov: 75,
          position: [
            -0.018223506966510716, -39.32133451246589, 12.195381095421007,
          ],
          near: 0.1,
          far: 1000,
        }}
        className={styles.canvas}
      >
        <ambientLight intensity={0.8} color={"white"} />
        <Ball />
        <Stage />
        <Controll />
      </Canvas>
    </div>
  );
};

export default Home;
