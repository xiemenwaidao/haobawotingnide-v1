import { useHelper } from "@react-three/drei/native";
import { useRef } from "react";
import { Color, DirectionalLight, DirectionalLightHelper } from "three";

const Lights = () => {
    // const direRef = useRef<DirectionalLight>(null!);
    // useHelper(direRef, DirectionalLightHelper);

    return (
        <>
            {/* <ambientLight intensity={0.5} /> */}
            {/* <hemisphereLight ref={hemiRef} intensity={0.35} /> */}
            {/* <spotLight
                position={[5, 5, 5]}
                angle={0.3}
                penumbra={1}
                intensity={2}
                castShadow
                shadow-mapSize-width={256}
                shadow-mapSize-height={256}
            /> */}
            <directionalLight
                // ref={direRef}
                position={[-3, 5, 10]}
                color={new Color("#FFFFFF")}
                intensity={1}
                castShadow
            />
        </>
    );
};

export default Lights;
