/* eslint-disable react/no-unknown-property */
import { Html } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Card3D = ({ title, content, position }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [scale, setScale] = useState(0); // Para animación de entrada

    useFrame(() => {
        // Animación de entrada (escala desde 0 a 1)
        if (scale < 1) {
            setScale((prev) => Math.min(prev + 0.05, 1));
        }

        if (meshRef.current) {
            meshRef.current.scale.set(scale, scale, scale);
            meshRef.current.material.color = new THREE.Color(hovered ? "#FFD700" : "#ffffff");
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <boxGeometry args={[2, 1, 0.1]} />
            <meshStandardMaterial color="#fff" />
            <Html  scale={0.4} transform center>
                <div
                    style={{
                        width: "180px",
                        padding: "10px",
                        background: hovered ? "#fffbeb" : "#ffffff",
                        borderRadius: "12px",
                        boxShadow: hovered
                            ? "0px 0px 20px rgba(255, 215, 0, 0.6)"
                            : "0px 0px 10px rgba(0,0,0,0.3)",
                        textAlign: "center",
                        transition: "all 0.3s ease-in-out",
                    }}
                >
                    <h3>{title}</h3>
                    <p>{content}</p>
                </div>
            </Html>
        </mesh>
    );
};

export default Card3D;
