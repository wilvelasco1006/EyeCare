import { useEffect } from "react";
import { useVideoTexture } from "@react-three/drei";

const VideoCataracts = ({ videoRef }) => {
    const texture = useVideoTexture(
        "https://res.cloudinary.com/dijh9two4/video/upload/v1748662729/tratamiento-cataratas_oedvx7.mp4",
        {
            muted: false,
            loop: true,
            autoplay: true,
            crossOrigin: "anonymous",
        }
    );

    useEffect(() => {
        if (texture?.source?.data && videoRef) {
            videoRef.current = texture.source.data;
        }
    }, [texture, videoRef]);

    return (
        <mesh position={[0, 1, 0]}>
            {/* Proporción vertical */}
            <planeGeometry args={[2, 3.5]} />
            <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
    );
};
export default VideoCataracts;