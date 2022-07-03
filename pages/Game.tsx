import React from "react";
// import Ball from "./Modules/Ball";
import Stage from "./Modules/Stage";
import Padlle from "./Modules/Padlle";
import { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Props = {
  size: {
    width: number;
    height: number;
  };
};

const Game = ({ size }: Props) => {
  const player = useRef<any>();
  const ball = useRef<any>();
  const [positionX, setPositionX] = useState(0);
  const ballBox = new THREE.Box3().setFromObject(ball.current);
  const playerBox = new THREE.Box3().setFromObject(player.current);
  useFrame(({ gl, scene, camera }) => {
    if (player.current) {
      player.current.position.x = positionX;
    }

    gl.render(scene, camera);
  }, 1);
  const handlePress = (e: any) => {
    if (e.key === "ArrowRight") {
      if (player.current?.position.x + 4 < 20)
        setPositionX(player.current?.position.x + 1);
    }
    if (e.key === "ArrowLeft") {
      if (player.current?.position.x - 4 > -20)
        setPositionX(player.current?.position.x - 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => handlePress(e));
    return () => {
      window.removeEventListener("keydown", (e) => handlePress(e));
    };
  }, []);
  return (
    <>
      {/* <Ball ref={ball} /> */}
      <mesh position={[3, 3, 1]} ref={ball}>
        <sphereBufferGeometry attach="geometry" args={[1, 100, 100]} />
        <meshStandardMaterial attach="material" color="Orange" />
      </mesh>
      <Stage />
      {/* Player 1 */}
      {/* <Padlle
        position={[positionX, -60 / 2 + 3, 0]}
        args={[1.5, 2, 40 / 5]}
        rotateX={Math.PI / 2}
        rotateY={Math.PI / 2}
        color="#C70039"
        name="player1"
        ref={player}
      /> */}
      <mesh
        ref={player}
        position={[positionX, -60 / 2 + 3, 0]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
        name="player1"
      >
        <boxGeometry attach="geometry" args={[1.5, 2, 40 / 5]} />
        <meshStandardMaterial attach="material" color="#C70039" />
      </mesh>
      {/* Player 2 */}
      <Padlle
        position={[0, 60 / 2 - 3, 0]}
        args={[1.5, 2, 40 / 5]}
        rotateX={Math.PI / 2}
        rotateY={Math.PI / 2}
        color="#00FF00"
        name="player2"
      />
    </>
  );
};

export default Game;
