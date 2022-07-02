import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import Ball from "./Modules/Ball";
import Controll from "./Modules/Controll";
import Stage from "./Modules/Stage";
import Padlle from "./Modules/Padlle";
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Canvas
        shadows={true}
        camera={{
          fov: 75,
          position: [
            -0.018223506966510716, -39.32133451246589, 11.195381095421007,
          ],
          near: 0.1,
          far: 1000,
        }}
        className={styles.canvas}
      >
        <ambientLight intensity={0.8} color={"white"} />
        <Ball />
        <Stage />
        {/* Player 1 */}
        <Padlle
          position={[0, -60 / 2 + 3, 0]}
          args={[1.5, 2, 40 / 5]}
          rotateX={Math.PI / 2}
          rotateY={Math.PI / 2}
          color="#9ffe47"
        />
        {/* Player 2 */}
        <Padlle
          position={[0, 60 / 2 - 3, 0]}
          args={[1.5, 2, 40 / 5]}
          rotateX={Math.PI / 2}
          rotateY={Math.PI / 2}
          color="#bb3a27"
        />
        <Controll />
      </Canvas>
    </div>
  );
};

export default Home;
