import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Instances, OrbitControls, Stage, useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { Suspense, useCallback, useEffect, useState } from "react";
import { DoubleSide } from "three";

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

function Cube(props: JSX.IntrinsicElements["group"]) {
    const [mode, setMode] = useState<"dark" | "light">("dark");
    const { nodes, materials } = useGLTF(
        "/assets/model/logocube.glb"
    ) as GLTFResult;

    const themeBtnClick = useCallback(() => {
        setMode(mode === "dark" ? "light" : "dark");
    }, [mode]);

    useEffect(() => {
        document
            .querySelector<HTMLButtonElement>("#theme-btn")
            ?.addEventListener("click", themeBtnClick);

        return () => {
            document
                .querySelector<HTMLButtonElement>("#theme-btn")
                ?.removeEventListener("click", themeBtnClick);
        };
    }, [themeBtnClick]);

    useEffect(() => {
        const m = document.firstElementChild!.getAttribute("data-theme");
        if (m === "dark" || m === "light") {
            setMode(m);
        }
    }, []);

    useEffect(() => {
        console.log("change color");
        if (mode === "dark") {
            materials.neise.color = new THREE.Color("#A33206");
        } else {
            materials.neise.color = new THREE.Color("#006CAC");
        }
    }, [mode]);

    return (
        <group {...props} dispose={null}>
            <group position={[0, 0, 0]}>
                <mesh
                    geometry={nodes.kuang.geometry}
                    material={materials.gold}
                />
                <mesh
                    geometry={nodes.neihong.geometry}
                    material={materials.neise}
                >
                    {/* <meshStandardMaterial
                        color={"#006CAC"}
                        metalness={0.5}
                        roughness={0.5}
                    /> */}
                </mesh>
            </group>
        </group>
    );
}

export default function GL404() {
    return (
        <Canvas
            // shadows
            dpr={[1, 1.5]}
            camera={{
                position: [0, 1, 0],
                // fov: 75
            }}
        >
            <ambientLight intensity={0.25} />
            <Suspense fallback={null}>
                <Stage environment="city" intensity={0.6} adjustCamera={5.0}>
                    <Cube />
                </Stage>
            </Suspense>
            <OrbitControls makeDefault />
        </Canvas>
    );
}

useGLTF.preload("/logocube.glb");
