/* eslint-disable react/no-unknown-property */
import { useEffect } from "react";
import { useVideoTexture } from "@react-three/drei";

const VideoPrevencionG = ({ videoRef }) => {
    const texture = useVideoTexture(
        "https://res.cloudinary.com/deqfbq5py/video/upload/v1750645495/tzytbjo59hibxrtrblkj.mp4",
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

export default VideoPrevencionG;