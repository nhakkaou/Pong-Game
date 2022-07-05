import React from "react";
import Ball from "./Modules/Ball";
import Stage from "./Modules/Stage";
import Padlle from "./Modules/Padlle";
import { useEffect, useState, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
type Props = {
  size: {
    width: number;
    height: number;
  };
};

const Game = ({ size }: Props) => {
  // const [positionX, setPositionX] = useState(0);
  const { camera } = useThree();
  useEffect(() => {
    if (size.width < 1000) camera.fov = 110;
    if (size.width > 1000) camera.fov = 100;
    if (size.width < 700) camera.fov = 150;
    camera.updateProjectionMatrix();
  }, [size]);
  let positionX = 0;
  const player = useRef<any>();
  const player2 = useRef<any>();
  const ball = useRef<any>();
  const cornerTop = useRef<any>();
  const cornerBottom = useRef<any>();
  const cornerLeft = useRef<any>();
  const cornerRight = useRef<any>();

  function detectCollisionCubes(object1, object2) {
    let object1Box = new THREE.Box3().setFromObject(object1);

    let object2Box = new THREE.Box3().setFromObject(object2);
    let collision = object1Box.intersectsBox(object2Box);

    return collision;
    // object1.geometry.computeBoundingBox(); //not needed if its already calculated
    // object2.geometry.computeBoundingBox();
    // object1.updateMatrixWorld();
    // object2.updateMatrixWorld();

    // var box1 = object1.geometry.boundingBox.clone();
    // box1.applyMatrix4(object1.matrixWorld);

    // var box2 = object2.geometry.boundingBox.clone();
    // box2.applyMatrix4(object2.matrixWorld);

    // return box1.intersectsBox(box2);
  }
  let dx = 1;
  let dy = 1;
  useFrame(({ gl, scene, camera }) => {
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
        ball.current.position.x + 0.3 * dx,
        ball.current.position.y + 0.3 * dy,
        ball.current.position.z
      );
      player2.current.position.x = ball.current.position.x;
    }
    gl.render(scene, camera);
  }, 1);

  const handlePress = (e: any) => {
    if (e.key === "ArrowRight") {
      if (player.current?.position.x + 4 < 20)
        // setPositionX(player.current?.position.x + 1);
        positionX = player.current?.position.x + 2;
    }
    if (e.key === "ArrowLeft") {
      if (player.current?.position.x - 4 > -20)
        // setPositionX(player.current?.position.x - 1);
        positionX = player.current?.position.x - 2;
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
