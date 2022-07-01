import React from "react";

const Padlle = () => {
  return (
    <mesh
      position={[0, 3, 0]}
      rotateX={3}
      recieveShadow={true}
      castShadow={true}
    >
      <boxGeometry attach="geometry" args={[1.5, 2, 10]} />
      <meshPhysicalMaterial color="#00bfff" attach="material" />
    </mesh>
  );
};

export default Padlle;
