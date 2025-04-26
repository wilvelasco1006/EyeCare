import { useTexture } from "@react-three/drei";
import { useMemo } from "react"; 
const Floor = () => {
    return (
      <mesh rotation-x={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} position-y={-1} receiveShadow={true}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={"white"} transparent  opacity={0.40}/>
      </mesh>
    );
}

export default Floor;