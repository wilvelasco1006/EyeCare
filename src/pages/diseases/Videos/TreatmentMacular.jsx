/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useVideoTexture } from "@react-three/drei";
import { useEffect } from "react";

const VideoMacular = ({ videoRef }) => {
    const texture = useVideoTexture(
        "https://res.cloudinary.com/daiftklny/video/upload/v1749232959/fxfxrs2p1h2tbbkg56qs.mp4",
        {
            muted: true, // Cambiado a false para permitir el control manual del sonido
            loop: true,
            autoplay: false,
            crossOrigin: "anonymous",
        }
    );

    // Actualiza la referencia del video cuando el texture cambia
    useEffect(() => {
        if (texture?.source?.data && videoRef) {
            videoRef.current = texture.source.data;
        }
    }, [texture, videoRef]);

    return (
        <mesh position={[0, 1, 0]}>
            <planeGeometry args={[2.4, 3.5]} />
            <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
    );
}
export default VideoMacular;