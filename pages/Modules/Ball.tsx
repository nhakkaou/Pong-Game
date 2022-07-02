import React from "react";
import { MeshPhysicalMaterial } from "three";
const Ball = ({ color = "#000000" }) => {
  const meterial = new MeshPhysicalMaterial({
    color: color,
    emissive: 0x000000,
    metalness: 0.5,
    roughness: 0.5,
    reflectivity: 0.5,
    clearcoat: 0.5,
    clearcoatRoughness: 0.5,
  });
  return (
    <mesh position={[3, 3, 1]} material={meterial}>
      <sphereBufferGeometry attach="geometry" args={[1, 100, 100]} />
    </mesh>
  );
};

export default Ball;
