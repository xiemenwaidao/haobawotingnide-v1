import type * as THREE from "three";
import { Canvas, MeshProps } from "@react-three/fiber";
import {
    Environment,
    OrbitControls,
    Stage,
    useGLTF,
    useHelper,
} from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import {
    Suspense,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    Physics,
    usePlane,
    useBox,
    BoxProps,
    Debug,
} from "@react-three/cannon";
import type { PlaneProps } from "@react-three/cannon";
import { Box3, BoxHelper, Color, Vector3 } from "three";
import type { Group, Mesh } from "three";
import useMode from "./useMode";

useGLTF.preload("/assets/model/logocube.glb");

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

function Plane(props: PlaneProps & { color: string }) {
    const [ref] = usePlane(
        () => ({ rotation: [-Math.PI / 2, 0, 0], ...props }),
        useRef<Mesh>(null)
    );
    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <shadowMaterial color={props.color} />
        </mesh>
    );
}

function TestCube(props: BoxProps) {
    const [ref] = useBox(() => ({ mass: 1, ...props }), useRef<Mesh>(null));
    return (
        <mesh castShadow ref={ref}>
            <boxGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
}

function Cube(props: BoxProps & { mode: "dark" | "light" }) {
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
        <group ref={ref}>
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
}

export default function GL404() {
    const mode = useMode();

    const [ready, set] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => set(true), 1000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <Suspense fallback={null}>
            <Canvas
                shadows
                gl={{ alpha: false }}
                camera={{ position: [-5, 10, 5], fov: 50 }}
                onCreated={({ scene }) =>
                    (scene.background = new Color(
                        mode === "dark" ? "#212737" : "#f5f3ff"
                    ))
                }
            >
                <color
                    attach="background"
                    args={[mode === "dark" ? "#212737" : "#f5f3ff"]}
                />
                <Environment preset="sunset" />
                <ambientLight intensity={0.5} />
                <hemisphereLight intensity={0.35} />
                <spotLight
                    position={[5, 5, 5]}
                    angle={0.3}
                    penumbra={1}
                    intensity={2}
                    castShadow
                    shadow-mapSize-width={256}
                    shadow-mapSize-height={256}
                />
                {/* <Stage environment="city" intensity={0.6} adjustCamera={2.0}>
                </Stage> */}
                <Physics broadphase="SAP">
                    {/* <Debug color="red" scale={1.1}> */}
                    <Plane color={mode === "dark" ? "#212737" : "#f5f3ff"} />
                    {Array.from({ length: 1 }).map((_, i) => (
                        <Cube position={[0, 10, 0]} key={i} mode={mode} />
                    ))}
                    {/* <TestCube position={[0, 5, 0]} /> */}
                    {/* </Debug> */}
                </Physics>
                {/* <OrbitControls makeDefault /> */}
            </Canvas>
        </Suspense>
    );
}
