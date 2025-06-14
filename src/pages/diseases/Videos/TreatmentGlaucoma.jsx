/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useVideoTexture } from "@react-three/drei";
import { useEffect } from "react";

const VideoGlaucoma = ({ videoRef }) => {
    const texture = useVideoTexture(
        "https://res.cloudinary.com/deqfbq5py/video/upload/v1749437679/cjodzc7w0lcz3mnxohy5.mp4",
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
            <planeGeometry args={[3.6, 2]} />
            <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
    );
}
export default VideoGlaucoma;