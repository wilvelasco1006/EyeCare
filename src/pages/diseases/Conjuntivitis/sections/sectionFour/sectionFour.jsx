/* eslint-disable react/no-unknown-property */
import "./sectionFour.css"
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Text} from "@react-three/drei";
import { CiPause1 } from "react-icons/ci"
import { FaPlay } from "react-icons/fa";
import { AiFillMuted } from "react-icons/ai";
import { HandModel } from "../../model-3d/hand";
import { TowelModel } from "../../model-3d/towel";
import VideoPrevencionC from "../../model-3d/videoPrevencion";
import Floor from "../../model-3d/Floor";

const SectionFour= () => {
    const videoRef = useRef(null);
    const handlePlay = () => videoRef.current?.play();
    const handlePause = () => videoRef.current?.pause();
    const handleToggleMute = () => {
        if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
    };
    return(
        <div className="sectionFourContainer">
            <h2>Prevención</h2>
            <p>Conoce algunas maneras de prevenir la Conjutivitis</p>
            <div className="container__canva">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }} > 
                    <directionalLight intensity={3}/>
                    <spotLight/>
                    <OrbitControls/>
                    <Floor/>
                    <HandModel position={[4,0,0]} scale={0.1}/>
                    <TowelModel position={[-4,1.2,0]} scale={7}/>
                    <group position={[0, 0, 0]} scale={0.7} rotation={[0, 0, 0]}>
                        <Text position={[0, 3, 0]} fontSize={0.4} color="black" font="/fonts/Mofulina.ttf">
                            Dale Play y Enterate
                        </Text>

                        <VideoPrevencionC videoRef={videoRef} />

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

export default SectionFour;