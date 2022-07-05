import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import Game from "./Game";
import { useEffect, useState } from "react";
const Home: NextPage = () => {
  const [size, setWindow] = useState({
    width: 1000,
    height: 1000,
  });
  const handleResize = () => {
    setWindow({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    setWindow({
      width: window.innerWidth,
      height: window.innerHeight,
    });
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
          position: [-0.018223506966510716, -54, 20],
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
