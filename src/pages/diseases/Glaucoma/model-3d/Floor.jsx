/* eslint-disable react/no-unknown-property */
const Floor =() => {
  return (
      <mesh receiveShadow={true} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="lightblue" />
      </mesh>
  );
};
export default Floor;