import React from "react";

const Ball = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
      <meshPhysicalMaterial color="#daf7a6" attach="material" />
    </mesh>
  );
};

export default Ball;
