import { useTexture } from "@react-three/drei";
import React, { useMemo } from "react"; 
const Floor = () => {
    const PATH = useMemo(() => "/textures/floor/light-plank-flooring_", []);
    const floorTexture = useTexture({
        map: PATH + "albedo.png",
        normalMap: PATH + "normal-ogl.png",
        roughnessMap: PATH + "roughness.png",
        aoMap: PATH + "ao.png",
        //displacementMap: PATH + "height.png",
        metalnessMap: PATH + "metallic.png",

    });
    console.log(floorTexture);

    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial {...floorTexture} />
      </mesh>
    );
}

export default Floor;