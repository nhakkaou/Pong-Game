import React from "react";
import Ball from "./Modules/Ball";
import Stage from "./Modules/Stage";
import Padlle from "./Modules/Padlle";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
type Props = {
  size: {
    width: number;
    height: number;
  };
};

const Game = ({ size }: Props) => {
  const { camera }: any = useThree();
  const player = useRef<any>();
  const player2 = useRef<any>();
  const ball = useRef<any>();
  const cornerTop = useRef<any>();
  const cornerBottom = useRef<any>();
  const cornerLeft = useRef<any>();
  const cornerRight = useRef<any>();
  let dx = 1;
  let dy = 1;
  let positionX = 0;

  useEffect(() => {
    if (size.width < 1000) camera.fov = 110;
    if (size.width > 1000) camera.fov = 100;
    if (size.width < 700) camera.fov = 150;
    camera.updateProjectionMatrix();
  }, [size]);

  function detectCollisionCubes(object1: any, object2: any) {
    let object1Box = new THREE.Box3().setFromObject(object1);

    let object2Box = new THREE.Box3().setFromObject(object2);
    let collision = object1Box.intersectsBox(object2Box);
    return collision;
  }
  useFrame(({ gl, scene, camera }) => {
    if (ball.current) {
      if (
        detectCollisionCubes(ball.current, cornerLeft.current) ||
        detectCollisionCubes(ball.current, cornerRight.current)
      )
        dx *= -1;
      if (
        detectCollisionCubes(ball.current, player.current) ||
        detectCollisionCubes(ball.current, player2.current)
      )
        dy *= -1;
      if (
        detectCollisionCubes(ball.current, cornerTop.current) ||
        detectCollisionCubes(ball.current, cornerBottom.current)
      )
        ball.current.position?.set(0, 0, 1);
      ball.current.position?.set(
        ball.current.position.x + 0.2 * dx,
        ball.current.position.y + 0.2 * dy,
        ball.current.position.z
      );
      player2.current.position.x = ball.current.position.x;
      player.current.position.set(
        positionX,
        player.current.position.y,
        player.current.position.z
      );
    }
    gl.render(scene, camera);
  }, 1);

  const handlePress = (e: any) => {
    if (e.key === "ArrowRight") {
      if (player.current?.position.x + 4 < 20)
        positionX = player.current?.position.x + 2;
    }
    if (e.key === "ArrowLeft") {
      if (player.current?.position.x - 4 > -20)
        positionX = player.current?.position.x - 2;
    }
    console.log(positionX);
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => handlePress(e));
    return () => {
      window.removeEventListener("keydown", (e) => handlePress(e));
    };
  }, []);
  return (
    <>
      <Ball ref={ball} />
      <Stage
        ref={{
          refBottom: cornerBottom,
          refTop: cornerTop,
          refLeft: cornerLeft,
          refRight: cornerRight,
        }}
      />
      {/* Player 1 */}
      <Padlle
        position={[positionX, -60 / 2 + 3, 0]}
        args={[1.5, 2, 40 / 5]}
        rotateX={Math.PI / 2}
        rotateY={Math.PI / 2}
        color="#C70039"
        name="player1"
        ref={player}
      />
      {/* Player 2 */}
      <Padlle
        position={[0, 60 / 2 - 3, 0]}
        args={[1.5, 2, 40 / 5]}
        rotateX={Math.PI / 2}
        rotateY={Math.PI / 2}
        color="#00FF00"
        name="player2"
        ref={player2}
      />
    </>
  );
};

export default Game;
