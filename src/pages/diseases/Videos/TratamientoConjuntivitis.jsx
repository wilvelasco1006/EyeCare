/* eslint-disable react/no-unknown-property */
import { useEffect } from "react";
import { useVideoTexture } from "@react-three/drei";

const VideoConjuntivitis = ({ videoRef }) => {
    const texture = useVideoTexture(
        "https://res.cloudinary.com/dbxvkqv6w/video/upload/v1748538579/3_CONSEJOS_para_quitar_la_CONJUNTIVITIS_Short_YoutubeShort_y3zmm2.mp4",
        {
            muted: true,
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

export default VideoConjuntivitis;
