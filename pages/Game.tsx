import React from "react";
import Ball from "./Modules/Ball";
import Stage from "./Modules/Stage";
import Padlle from "./Modules/Padlle";
import { useEffect, useRef, useContext } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { usePersonControls, resize } from "./Hooks/movement";

const PADDLE_SIZE = 40 / 5;

const Game = (props: any) => {
  const { camera }: any = useThree();
  const player = useRef<any>();
  const player2 = useRef<any>();
  const ball = useRef<any>();
  const cornerTop = useRef<any>();
  const cornerBottom = useRef<any>();
  const cornerLeft = useRef<any>();
  const cornerRight = useRef<any>();
  const { socket, ballPosition } = props;

  let { left, right } = usePersonControls();
  let size = resize();

  useEffect(() => {
    if (size.width < 1000) camera.fov = 110;
    if (size.width > 1000) camera.fov = 100;
    if (size.width < 700) camera.fov = 150;
    camera.updateProjectionMatrix();
  }, [size]);
  useFrame(({ gl, scene, camera }) => {
    ball.current.position.copy(ballPosition);
    gl.render(scene, camera);
  }, 1);
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
        position={[0, -60 / 2 + 3, 0]}
        args={[1.5, 2, PADDLE_SIZE]}
        rotateX={Math.PI / 2}
        rotateY={Math.PI / 2}
        color="#C70039"
        name="player1"
        ref={player}
      />
      {/* Player 2 */}
      <Padlle
        position={[0, 60 / 2 - 3, 0]}
        args={[1.5, 2, PADDLE_SIZE]}
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
