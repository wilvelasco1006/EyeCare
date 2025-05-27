import { Canvas } from "@react-three/fiber";
import Scene3d from "./scene3d";
import { OrbitControls } from "@react-three/drei";
import Staging from "./staging/Staging";
import "./CarouselDiseases.css";

const CarouselDiseases = () => {
  return (
    <div className="carousel-diseases-container">
      <Canvas 
        className="carousel-canvas"
        camera={{ position: [-0.1, 0, 1], fov: 115 }}
        style={{ width: '100%', height: '100vh' }}
        gl={{ antialias: true }}
      >
        <OrbitControls 
          enablePan={false} 
          maxDistance={4} 
          minDistance={1.5}
          enableRotate={true}
          enableZoom={false}
        />
        <Scene3d />
        <Staging />
      </Canvas>
    </div>
  );
};

export default CarouselDiseases;