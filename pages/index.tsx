import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import Game from "./Game";
import { useEffect, useState } from "react";
const Home: NextPage = () => {
  const [size, setWindow] = useState({
    width: 40,
    height: 60,
  });
  const handleResize = () => {
    setWindow({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
        <directionalLight position={[0, 0, 10]} color={"white"} intensity={1} />
        <ambientLight intensity={0.8} color={"white"} />
        <Game size={size} />
      </Canvas>
    </div>
  );
};

export default Home;
