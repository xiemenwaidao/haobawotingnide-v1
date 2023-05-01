import { useThrottle } from "@hooks/useThrottle";
import type { BoxProps, Quad, Triplet } from "@react-three/cannon";
import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { lightParams, darkParams } from "@utils/const";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

    const [boxPosition, setBoxPosition] = useState<Triplet>([0, 0, 0]);

    // 物理演算を適用
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

    /** boxの判定を正確にする */
    const boxSize = useMemo(() => {
        const box = new Box3().setFromObject(nodes.kuang);
        const size = new Vector3();
        box.getSize(size);
        // return [size.x, size.y, size.z];
        return size.toArray();
    }, [nodes.kuang]);

    /** dark mode */
    useEffect(() => {
        if (props.mode === "dark") {
            materials.neise.color = new Color(darkParams.cubeColor);
        } else {
            materials.neise.color = new Color(lightParams.cubeColor);
        }
    }, [props.mode]);

    /** 状態管理 */
    const { setPosition, setQuaternion } = useCubeStore();
    // スロットル
    const handlePositionChange = useThrottle((position: Triplet) => {
        setPosition(position);
        setBoxPosition(position);
    }, 100);
    const handleQuaternionChange = useThrottle((quaternion: Quad) => {
        setQuaternion(quaternion);
    }, 100);
    useEffect(() => {
        const positionUnsubscribe =
            api.position.subscribe(handlePositionChange);

        const quaternionUnsubscribe = api.quaternion.subscribe(
            handleQuaternionChange
        );

        return () => {
            positionUnsubscribe();
            quaternionUnsubscribe();
        };
    }, [api, setPosition, setQuaternion]);

    /** 吹っ飛ばし機能 */
    const onClickHandler = () => {
        const target = new Vector3(0, 0, 0); // オブジェクトが向かうべきターゲット（画面の中心）

        // オブジェクトの位置からターゲットへの方向ベクトルを計算
        const direction = target.clone().sub(new Vector3(...boxPosition));
        const n = direction.clone().setY(Math.abs(direction.y)).normalize();

        // 衝撃力の大きさ
        const forceMagnitude = 3.5;

        // 衝撃力を方向ベクトルに適用
        const impulse: Triplet = [
            forceMagnitude * n.x,
            forceMagnitude * n.y,
            forceMagnitude * n.z,
        ];

        // トルクの値をランダムに設定
        const torque: Triplet = [
            (Math.random() - 0.5) * Math.PI,
            (Math.random() - 0.5) * Math.PI,
            (Math.random() - 0.5) * Math.PI,
        ];

        // console.log(new Vector3(...impulse));

        const worldPoint: Triplet = [0, 0, 0];
        api.applyImpulse(impulse, worldPoint);
        api.applyTorque(torque);
    };

    return (
        <group ref={ref} onClick={onClickHandler}>
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
