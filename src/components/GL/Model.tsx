import type { BoxProps } from "@react-three/cannon";
import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
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
            materials.neise.color = new Color("#A33206");
        } else {
            materials.neise.color = new Color("#006CAC");
        }
    }, [props.mode]);

    // const mesh = useRef<Group>(null!);
    // useHelper(mesh, BoxHelper, "red");

    return (
        <group
            ref={ref}
            onClick={() => {
                api.applyImpulse(
                    [Math.random() * 0.1, 3, Math.random() * 1],
                    [0, -0.5, 0]
                );
            }}
        >
            <group
                position={[0, 0, 0]}
                //  ref={mesh}
            >
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
