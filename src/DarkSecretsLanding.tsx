// src/DarkSecretsLanding.tsx

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import LavaPlane from "./components/LavaPlane";
import DarkAvatar from "./components/DarkAvatar";
import Embers from "./components/Embers";
import Overlay from "./components/Overlay";

import "./styles.css";

function CamRig() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { useThree } = require("@react-three/fiber");
  const { camera } = useThree();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.15) * 0.32;
    camera.position.y = 0.6 + Math.sin(t * 0.12) * 0.07;
    camera.lookAt(0, 0.35, 0);
  });
  return null;
}

export default function DarkSecretsLanding() {
  const emberCount = 400;

  return (
    <div className="landing-container">
      {/* 1. कैनवास को पारदर्शी बनाया गया */}
      <Canvas
        shadows
        camera={{ position: [0, 0.8, 3.6], fov: 46 }}
        gl={{ alpha: true }}
      >
        {/* 2. पुराना बैकग्राउंड कलर हटा दिया गया */}

        <fog attach="fog" args={["#07060a", 4, 12]} />
        <ambientLight intensity={0.22} />
        <directionalLight
          position={[3, 4, 2]}
          intensity={1.05}
          color={"#ff6b00"}
          castShadow
        />
        <Stars radius={100} depth={50} count={2200} factor={3} fade />

        <DarkAvatar />
        <LavaPlane />
        <Embers key={emberCount} count={emberCount} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2.1}
        />
        <CamRig />

        {/* 3. Bloom की सही सेटिंग्स यहाँ हैं */}
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.38} // यह अब सही से काम करेगा
            luminanceSmoothing={0.3}
          />
        </EffectComposer>
      </Canvas>

      <Overlay />
    </div>
  );
}
