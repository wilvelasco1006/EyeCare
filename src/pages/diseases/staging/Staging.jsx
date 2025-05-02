import { Environment } from "@react-three/drei";

const Staging = () => {
  return (
    <Environment
        files={"/public/staging/hdris/surgery/surgery_2k.hdr"} // Escena sala de cirugía
        ground={{
            heigh: 60,
            radius: 100,
            scale: 4,
        }} background
    />
  )
}

export default Staging
