import type { PlaneProps } from "@react-three/cannon";
import { usePlane } from "@react-three/cannon";
import { useRef } from "react";
import type { Mesh } from "three";

const Plane = (props: PlaneProps & { color: string }) => {
    const [ref] = usePlane(
        () => ({ rotation: [-Math.PI / 2, 0, 0], ...props }),
        useRef<Mesh>(null)
    );
    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <shadowMaterial color={props.color} />
        </mesh>
    );
};

export default Plane;
