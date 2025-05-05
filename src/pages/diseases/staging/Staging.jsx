import { Environment } from "@react-three/drei";

const Staging = () => {
  return (
    <Environment
        file={[
          "px.png",
          "nx.png",
          "py.png",
          "ny.png",
          "pz.png",
          "nz.png",
          
        ]}
        path="/staging/cubemaps/surgery/"
        ground={{
            heigh: 60,
            radius: 100,
            scale: 4,
        }} background
    />
  )
}

export default Staging;
