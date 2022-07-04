import React from "react";
import Ball from "./Modules/Ball";
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
  const [positionX, setPositionX] = useState(0);
  const player = useRef<any>();
  const player2 = useRef<any>();
  const ball = useRef<any>();
  const cornerTop = useRef<any>();
  const cornerBottom = useRef<any>();
  const cornerLeft = useRef<any>();
  const cornerRight = useRef<any>();

  function detectCollisionCubes(object1, object2) {
    object1.geometry.computeBoundingBox(); //not needed if its already calculated
    object2.geometry.computeBoundingBox();
    object1.updateMatrixWorld();
    object2.updateMatrixWorld();

    var box1 = object1.geometry.boundingBox.clone();
    box1.applyMatrix4(object1.matrixWorld);

    var box2 = object2.geometry.boundingBox.clone();
    box2.applyMatrix4(object2.matrixWorld);

    return box1.intersectsBox(box2);
  }
  useFrame(({ gl, scene, camera }) => {
    let dx = -1;
    let dy = -1;
    // console.log(detectCollisionCubes(ball.current, cornerRight.current));
    if (player.current) {
      player.current.position.x = positionX;
    }
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
        ball.current.position.x + 0.1 * dx,
        ball.current.position.y + 0.4 * dy,
        ball.current.position.z
      );
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
