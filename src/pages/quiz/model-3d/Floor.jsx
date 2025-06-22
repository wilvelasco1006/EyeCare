/* eslint-disable react/no-unknown-property */
const Floor =() => {
    return (
        <mesh receiveShadow={true} rotation={[-Math.PI / 2, 0, 0]} position={[-2, -1, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="lightblue" />
        </mesh>
    );
};
export default Floor;