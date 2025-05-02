import { Environment } from "@react-three/drei";

const Staging = () => {
  return (
    <Environment
        files={"/public/staging/hdris/surgery/surgery-2k.hdr"} // Escena
        ground={{
            heigh: 60,
            radius: 100,
            scale: 4,
        }} background
    />
  )
}

export default Staging
