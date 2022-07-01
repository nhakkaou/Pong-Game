import React from "react";
import { extend, useThree } from "@react-three/fiber";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// extend({ OrbitControls });
const Controll = () => {
  const { camera, gl } = useThree();
  console.log(camera);
  return <mesh></mesh>;
};

export default Controll;
