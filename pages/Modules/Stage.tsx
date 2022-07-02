import { MeshPhysicalMaterial } from "three";
import Padlle from "./Padlle";

const Stage = () => {
  const material = new MeshPhysicalMaterial({
    color: "#ffffff",
    emissive: 0x000000,
    metalness: 0.5,
    roughness: 0.5,
    reflectivity: 1,
    clearcoat: 0.5,
    clearcoatRoughness: 0.5,
  });
  return (
    <>
      <mesh castShadow={true} material={material}>
        <planeBufferGeometry attach="geometry" args={[40, 60]} />
      </mesh>
      {/* // TOP */}
      <Padlle
        position={[0, 60 / 2, 0.75]}
        color="#00bfff"
        args={[1.5, 1.5, 40]}
        rotateX={Math.PI / 2}
        rotateY={Math.PI / 2}
      />
      {/* BOTTOM */}
      <Padlle
        position={[0, -60 / 2, 0.75]}
        color="#00bfff"
        args={[1.5, 1.5, 40]}
        rotateX={Math.PI / 2}
        rotateY={Math.PI / 2}
      />
      {/* LEFT */}
      <Padlle
        position={[-40 / 2, 0, 0.75]}
        color="#00bfff"
        args={[1.5, 1.5, 60]}
        rotateX={Math.PI / 2}
      />
      {/* RIGHT */}
      <Padlle
        position={[40 / 2, 0, 0.75]}
        color="#00bfff"
        args={[1.5, 1.5, 60]}
        rotateX={Math.PI / 2}
      />
    </>
  );
};

export default Stage;
