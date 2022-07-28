import { MeshPhysicalMaterial } from "three";
import Padlle from "./Padlle";
import React from "react";

const Stage = React.forwardRef((props, ref: any) => {
  const material = new MeshPhysicalMaterial({
    color: "#C19A6B",
    emissive: 0x000000,
    metalness: 0.5,
    roughness: 0.5,
    reflectivity: 1,
    clearcoat: 0.5,
    clearcoatRoughness: 0.5,
  });
  const { refTop, refBottom, refLeft, refRight } = ref;
  return (
    <>
      <mesh castShadow={true} material={material} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[40, 60]} />
      </mesh>
      {/* // TOP */}
      <Padlle
        position={[0, 60 / 2, 0.75]}
        color="#4a2bd6"
        args={[1.5, 1.5, 40]}
        rotateX={Math.PI / 2}
        rotateY={Math.PI / 2}
        ref={refTop}
        name="top"
      />
      {/* BOTTOM */}
      <Padlle
        position={[0, -60 / 2, 0.75]}
        color="#4a2bd6"
        args={[1.5, 1.5, 40]}
        rotateX={Math.PI / 2}
        rotateY={Math.PI / 2}
        ref={refBottom}
        name="bottom"
      />
      {/* LEFT */}
      <Padlle
        position={[-40 / 2, 0, 0.75]}
        color="#4a2bd6"
        args={[1.5, 1.5, 61.5]}
        rotateX={Math.PI / 2}
        name="left"
        ref={refLeft}
      />
      {/* RIGHT */}
      <Padlle
        position={[40 / 2, 0, 0.75]}
        color="#4a2bd6"
        args={[1.5, 1.5, 61.5]}
        rotateX={Math.PI / 2}
        name="right"
        ref={refRight}
      />
    </>
  );
});
Stage.displayName = "Stage";

export default Stage;
