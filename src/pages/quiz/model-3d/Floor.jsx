import { RigidBody } from '@react-three/rapier';

const Floor = () => {
    return (
        <RigidBody type="fixed" restitution={0.2} friction={1}>
            <mesh receiveShadow={true} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
                <planeGeometry args={[40, 40]} />
                <meshStandardMaterial color="#a3d9ff" opacity={0.8} transparent={true} />
            </mesh>

            
        </RigidBody>
    );
};

export default Floor;