import { MeshPhysicalMaterial } from "three";

type typePadle = {
  position?: [number, number, number];
  color?: string;
  args: [number, number, number];
  rotateX?: number;
  rotateY?: number;
  name?: string;
};

const Padlle = ({
  position,
  rotateX = 0,
  rotateY = 0,
  color = "#00bfff",
  args,
  name,
}: typePadle) => {
  const material = new MeshPhysicalMaterial({
    color: color,
    emissive: 0x000000,
    metalness: 0.5,
    roughness: 0.5,
    reflectivity: 0.5,
    clearcoat: 0.5,
    clearcoatRoughness: 0.5,
  });
  return (
    <mesh
      position={position}
      material={material}
      rotation={[rotateX, rotateY, 0]}
      name={name}
    >
      <boxGeometry attach="geometry" args={args} />
    </mesh>
  );
};

export default Padlle;
