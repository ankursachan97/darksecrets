// src/components/LavaPlane.tsx

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function LavaPlane() {
  const mesh = useRef<THREE.Mesh>(null!);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#ff6b00") },
      uColor2: { value: new THREE.Color("#ff2d00") },
      uGlow: { value: new THREE.Color("#ffb347") },
    }),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh
      ref={mesh}
      rotation={[-Math.PI / 2.2, 0, 0]}
      position={[0, -0.45, 0]}
    >
      <planeGeometry args={[20, 20, 200, 200]} />
      <shaderMaterial
        vertexShader={`
          varying vec2 vUv;
          varying float vWave;
          uniform float uTime;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float wave = sin(pos.x * 2.0 + uTime * 2.0) * 0.15;
            wave += sin(pos.y * 3.0 + uTime * 1.5) * 0.1;
            pos.z += wave;
            vWave = wave;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          varying float vWave;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uGlow;
          void main() {
            float mixStrength = smoothstep(-0.2, 0.4, vWave);
            vec3 lavaColor = mix(uColor1, uColor2, mixStrength);
            
            // 👇👇👇 यही असली समस्या थी। मैंने इसे कमेंट कर दिया है। 👇👇👇
            // lavaColor += uGlow * (0.4 + mixStrength * 0.6);
            
            gl_FragColor = vec4(lavaColor, 1.0);
          }
        `}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}