/* eslint-disable react/no-unknown-property */
import { useEffect } from "react";
import { useVideoTexture } from "@react-three/drei";

const VideoPrevencionC = ({ videoRef }) => {
    const texture = useVideoTexture(
        "https://res.cloudinary.com/dbxvkqv6w/video/upload/v1750028509/C%C3%B3mo_prevenir_la_conjuntivitis_vw56jv.mp4",
        {
            muted: true,
            loop: true,
            autoplay: false,
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
            <planeGeometry args={[4,3]} />
            <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
    );
};

export default VideoPrevencionC;