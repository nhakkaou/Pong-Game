import React from "react";

const Stage = () => {
  return (
    <mesh castShadow={true}>
      <planeBufferGeometry attach="geometry" args={[40, 60]} />
    </mesh>
  );
};

export default Stage;
