import React from "react";
import Ball from "./Modules/Ball";
import Stage from "./Modules/Stage";
import Padlle from "./Modules/Padlle";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { usePersonControls, resize } from "./Hooks/movement";
import * as THREE from "three";
import SocketIOClient from "socket.io-client";
const PADDLE_SIZE = 40 / 5;

const Game = () => {
  const { camera }: any = useThree();
  const player = useRef<any>();
  const player2 = useRef<any>();
  const ball = useRef<any>();
  const cornerTop = useRef<any>();
  const cornerBottom = useRef<any>();
  const cornerLeft = useRef<any>();
  const cornerRight = useRef<any>();
  const [dataBall, setData] = React.useState({
    x: 3,
    y: 3,
    z: 1,
  });
  const [load, setLoad] = React.useState(false);
  let dx = 1;
  let dy = 1;
  let { left, right } = usePersonControls();
  let size = resize();

  useEffect(() => {
    setLoad(true);
    // connect to socket server
    const socket = SocketIOClient.connect("http://localhost:4242");

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      socket.emit("newGame");
    });

    // update chat on new message dispatched
    socket.on("ballMove", (data) => {
      console.log(data);
      // let sym = false;
      // if (
      //   detectCollisionCubes(ball.current, cornerLeft.current) ||
      //   detectCollisionCubes(ball.current, cornerRight.current)
      // ) {
      //   console.log("collision with corner");
      //   dx *= -1;
      // }
      // if (
      //   detectCollisionCubes(ball.current, player.current) ||
      //   detectCollisionCubes(ball.current, player2.current)
      // ) {
      //   console.log("collision with player");
      //   dy *= -1;
      // }
      // if (
      //   detectCollisionCubes(ball.current, cornerTop.current) ||
      //   detectCollisionCubes(ball.current, cornerBottom.current)
      // ) {
      //   sym = true;
      // }
      setData({
        x: data[0],
        y: data[1],
        z: data[2],
      });
      socket.emit("ballMove");
    });
    if (left || right) {
      socket.emit("padlleMove", {
        left: left,
        right: right,
      });
    }
    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, [left, right]);
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
    ball.current.position?.set(dataBall.x, dataBall.y, dataBall.z);

    //   if (load) {
    //     if (ball.current) {
    //       if (
    //         detectCollisionCubes(ball.current, cornerLeft.current) ||
    //         detectCollisionCubes(ball.current, cornerRight.current)
    //       ) {
    //         console.log("collision with corner");
    //         dx *= -1;
    //       }
    //       if (
    //         detectCollisionCubes(ball.current, player.current) ||
    //         detectCollisionCubes(ball.current, player2.current)
    //       ) {
    //         console.log("collision with player");
    //         dy *= -1;
    //       }
    //       if (
    //         detectCollisionCubes(ball.current, cornerTop.current) ||
    //         detectCollisionCubes(ball.current, cornerBottom.current)
    //       ) {
    //         setScore(score + 1);
    //         ball.current.position?.set(0, 0, 1);
    //       }
    // ball.current.position?.set(
    //   ball.current.position.x + 0.2 * dx,
    //   ball.current.position.y + 0.2 * dy,
    //   ball.current.position.z
    // );
    player2.current.position.x = ball.current.position.x;
    //     }
    //     if (
    //       player.current.position.x +
    //         PADDLE_SIZE / 2 +
    //         Number(right) -
    //         Number(left) <=
    //         cornerRight.current.position.x &&
    //       player.current.position.x -
    //         PADDLE_SIZE / 2 +
    //         Number(right) -
    //         Number(left) >=
    //         cornerLeft.current.position.x
    //     )
    //       player.current.position.set(
    //         player.current.position.x + Number(right) - Number(left),
    //         player.current.position.y,
    //         player.current.position.z
    //       );
    //   }
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
