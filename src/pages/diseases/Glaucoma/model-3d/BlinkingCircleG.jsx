/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const BlinkingCircle = ({ onClick }) => {
    const meshRef = useRef();
    let scale = 1;
    let direction = 1;

    useFrame(() => {
        if (meshRef.current) {
            scale += direction * 0.01;
            if (scale > 1.1 || scale < 0.9) direction *= -1;
            meshRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <mesh ref={meshRef} position={[-1.2, 0.5, 0]} onClick={onClick}>
            <circleGeometry args={[0.3, 32]} />
            <meshStandardMaterial color="hotpink" emissive="purple" />
        </mesh>
    );
};

export default BlinkingCircle;
