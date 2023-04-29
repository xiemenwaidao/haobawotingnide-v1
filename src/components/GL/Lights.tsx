import { useHelper } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useCubeStore } from "stores/useGLStore";
import { Quaternion, SpotLight, SpotLightHelper, Vector3 } from "three";

const Lights = () => {
    const ref = useRef<SpotLight>(null!);
    useHelper(ref, SpotLightHelper);

    const cubePosition = useCubeStore(state => state.position);
    const cubeQuaternion = useCubeStore(state => state.quaternion);

    const upFaceNormal = new Vector3(0, 1, 0).applyQuaternion(
        new Quaternion(...cubeQuaternion)
    );

    const lightOffset = new Vector3(2, 3, 2);
    const lightPosition = new Vector3()
        .addVectors(new Vector3(...cubePosition), upFaceNormal)
        .add(lightOffset);

    useFrame(() => {
        if (ref.current) {
            ref.current.target.position.set(...cubePosition);
            ref.current.target.updateMatrixWorld();
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            {/* <hemisphereLight ref={hemiRef} intensity={0.35} /> */}
            <spotLight
                position={lightPosition.toArray()}
                angle={0.3}
                penumbra={1}
                intensity={2}
                castShadow
                shadow-mapSize-width={256}
                shadow-mapSize-height={256}
                ref={ref}
                color={"#ff0000"}
                distance={10}
            />
        </>
    );
};

export default Lights;
