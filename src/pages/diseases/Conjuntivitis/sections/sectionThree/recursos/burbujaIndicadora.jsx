/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BurbujaIndicadora = ({ position = [0, 1.5, 0], scale = 0.28 }) => {
    const ref = useRef();
    const pulseRef = useRef();
    const color = new THREE.Color("#6A0DAD"); // azul cian llamativo

    // Animación de pulso
    useFrame(({ clock }) => {
        const scaleValue = scale + Math.sin(clock.getElapsedTime() * 3) * 0.05;
        if (ref.current) {
            ref.current.scale.set(scaleValue, scaleValue, scaleValue);
            ref.current.rotation.y += 0.01;
        }
        if (pulseRef.current) {
            pulseRef.current.material.opacity = 0.3 + Math.sin(clock.getElapsedTime() * 3) * 0.2;
        }
    });

    return (
        <group position={position}>
            {/* Círculo externo pulsante */}
            <mesh ref={pulseRef}>
                <sphereGeometry args={[scale * 1.2, 16, 16]} />
                <meshBasicMaterial color={color} transparent opacity={0.5} />
            </mesh>

            {/* Burbuja principal */}
            <mesh ref={ref}>
                <sphereGeometry args={[scale, 32, 32]} />
                <meshStandardMaterial emissive={color} emissiveIntensity={1} color={"white"} />
            </mesh>
        </group>
    );
};

export default BurbujaIndicadora;
