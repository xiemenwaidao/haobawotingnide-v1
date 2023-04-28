import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import { Physics } from "@react-three/cannon";
import { Color } from "three";
import useMode from "@hooks/useMode";
import Plane from "./Plane";

import Cube from "./Model";

export default function GL404() {
    const mode = useMode();

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
                <Physics broadphase="SAP">
                    {/* <Debug color="red" scale={1.1}> */}
                    <Plane color={mode === "dark" ? "#212737" : "#f5f3ff"} />
                    {Array.from({ length: 1 }).map((_, i) => (
                        <Cube position={[0, 10, 0]} key={i} mode={mode} />
                    ))}
                    {/* </Debug> */}
                </Physics>
                {/* <OrbitControls makeDefault /> */}
            </Canvas>
        </Suspense>
    );
}
