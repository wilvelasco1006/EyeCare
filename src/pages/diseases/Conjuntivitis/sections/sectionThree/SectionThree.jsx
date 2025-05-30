/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import "./SectionThree.css";
import VideoConjuntivitis from "../../../Videos/TratamientoConjuntivitis";
import { OrbitControls, Text, Html, Sky } from "@react-three/drei";
import { CiPause1 } from "react-icons/ci"
import { FaPlay } from "react-icons/fa";
import { AiFillMuted } from "react-icons/ai";

import { useRef } from "react";
import Floor from "../../model-3d/Floor";

const SectionThree = () => {
    const videoRef = useRef(null);

    const handlePlay = () => videoRef.current?.play();
    const handlePause = () => videoRef.current?.pause();
    const handleToggleMute = () => {
        if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
    };

    return (
        <div className="content-container">
            <div className="Container-tratamiento">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight />
                    <Sky />
                    <Floor />
                    <OrbitControls />
                    <group position={[2.5,0.4,-2]} scale={0.7} rotation={[0,-0.5,0]}>
                        <Text position={[0, 3, 0]} fontSize={0.4} color="black">
                            TRATAMIENTO
                        </Text>

                        {/* Video */}
                        <VideoConjuntivitis videoRef={videoRef} />

                        {/* Controles flotantes */}
                        <Html transform scale={0.5} position={[0, -1.2, 0]} center>
                            <div className="video-controls">
                                <button onClick={handlePlay} title="Reproducir"><FaPlay /></button>
                                <button onClick={handlePause} title="Pausar"><CiPause1 /></button>
                                <button onClick={handleToggleMute} title="Mutear"><AiFillMuted /></button>
                            </div>
                        </Html>
                    </group>

                </Canvas>
            </div>
        </div>
    );
};

export default SectionThree;

