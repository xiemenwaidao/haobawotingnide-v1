import type { Quad, Triplet } from "@react-three/cannon";
import { create } from "zustand";

interface State {
    position: Triplet;
    quaternion: Quad;
}

interface Actions {
    setPosition: (position: Triplet) => void;
    setQuaternion: (position: Quad) => void;
}

export const useCubeStore = create<State & Actions>(set => ({
    position: [0, 0, 0],
    quaternion: [0, 0, 0, 0],
    setPosition: (position: Triplet) => set({ position: position }),
    setQuaternion: (quaternion: Quad) => set({ quaternion: quaternion }),
}));
