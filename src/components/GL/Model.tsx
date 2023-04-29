import type { BoxProps } from "@react-three/cannon";
import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { lightParams, darkParams } from "@utils/const";
import { useEffect, useMemo, useRef } from "react";
import { useCubeStore } from "stores/useGLStore";
import { Box3, Color, Vector3 } from "three";
import type { Group } from "three";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: {
        kuang: THREE.Mesh;
        neihong: THREE.Mesh;
    };
    materials: {
        gold: THREE.MeshStandardMaterial;
        neise: THREE.MeshStandardMaterial;
    };
};

useGLTF.preload("/assets/model/logocube.glb");

const Model = (props: BoxProps & { mode: "dark" | "light" }) => {
    const { nodes, materials } = useGLTF(
        "/assets/model/logocube.glb"
    ) as GLTFResult;

    const boxSize = useMemo(() => {
        const box = new Box3().setFromObject(nodes.kuang);
        const size = new Vector3();
        box.getSize(size);
        // return [size.x, size.y, size.z];
        return size.toArray();
    }, [nodes.kuang]);

    const [ref, api] = useBox(
        () => ({
            mass: 1,
            position: [0, 10, 0],
            rotation: [
                Math.PI * Math.random(),
                Math.PI * Math.random(),
                Math.PI * Math.random(),
            ],
            args: boxSize,
            ...props,
        }),
        useRef<Group>(null!)
    );

    useEffect(() => {
        if (props.mode === "dark") {
            materials.neise.color = new Color(darkParams.cubeColor);
        } else {
            materials.neise.color = new Color(lightParams.cubeColor);
        }
    }, [props.mode]);

    const { setPosition, setQuaternion } = useCubeStore();
    useEffect(() => {
        const positionUnsubscribe = api.position.subscribe(position => {
            setPosition(position);
        });

        const quaternionUnsubscribe = api.quaternion.subscribe(quaternion => {
            setQuaternion(quaternion);
        });

        return () => {
            positionUnsubscribe();
            quaternionUnsubscribe();
        };
    }, [api, setPosition, setQuaternion]);

    return (
        <group
            ref={ref}
            onClick={() => {
                api.applyImpulse(
                    [Math.random() * 1 - 0.5, 1, Math.random() * 1 - 0.5],
                    [
                        Math.random() * 0.5 - 0.25,
                        -0.0,
                        Math.random() * 0.5 - 0.25,
                    ]
                );
            }}
        >
            <group position={[0, 0, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.kuang.geometry}
                    material={materials.gold}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.neihong.geometry}
                    material={materials.neise}
                />
            </group>
        </group>
    );
};

export default Model;
