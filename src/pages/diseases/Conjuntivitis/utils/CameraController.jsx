// components/CameraController.jsx
import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

const CameraController = ({ viewIndex }) => {
  const { camera } = useThree();
  const targetRef = useRef({ position: new THREE.Vector3(), lookAt: new THREE.Vector3() });

  const views = [
    { position: [0.9, 0.3, 2], lookAt: [0, 0, 0] },
    { position: [1.8, 0.5, 1.5], lookAt: [0, 0, 0] },
    { position: [0, 2.5, 1], lookAt: [0, 0, 0.5] },
  ];

  useEffect(() => {
    const { position, lookAt } = views[viewIndex];
    targetRef.current.position.set(...position);
    targetRef.current.lookAt.set(...lookAt);
  }, [viewIndex]);

  useFrame(() => {
    camera.position.lerp(targetRef.current.position, 0.05);
    camera.lookAt(targetRef.current.lookAt);
  });

  return null;
};

export default CameraController;
