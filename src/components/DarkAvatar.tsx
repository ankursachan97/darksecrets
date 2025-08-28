// src/components/DarkAvatar.tsx

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export default function DarkAvatar() {
  const group = useRef<THREE.Group>(null!);
  const bodyMat = useMemo( // इसका नाम bodyMat कर दिया ताकि कन्फ्यूजन न हो
    () =>
      new THREE.MeshStandardMaterial({
        color: "#08060a",
        metalness: 0.15,
        roughness: 0.88,
      }),
    []
  );
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.22) * 0.22;
    group.current.position.y = Math.sin(t * 0.8) * 0.05;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.12}>
      <group ref={group} position={[0, 0.1, 0]}>
        {/* --- शारीरिक हिस्से --- */}
        <mesh material={bodyMat} position={[0, 0.95, 0]}>
          <sphereGeometry args={[0.24, 32, 32]} />
        </mesh>
        <mesh material={bodyMat} position={[0, 0.62, 0]}>
          <capsuleGeometry args={[0.18, 0.52, 8, 16]} />
        </mesh>
        <mesh material={bodyMat} position={[-0.28, 0.62, 0]} rotation={[0, 0, 0.42]}>
          <capsuleGeometry args={[0.06, 0.4, 8, 16]} />
        </mesh>
        <mesh material={bodyMat} position={[0.28, 0.62, 0]} rotation={[0, 0, -0.42]}>
          <capsuleGeometry args={[0.06, 0.4, 8, 16]} />
        </mesh>
        <mesh material={bodyMat} position={[-0.1, 0.07, 0]}>
          <capsuleGeometry args={[0.07, 0.45, 8, 16]} />
        </mesh>
        <mesh material={bodyMat} position={[0.1, 0.07, 0]}>
          <capsuleGeometry args={[0.07, 0.45, 8, 16]} />
        </mesh>

        {/* --- 👇👇👇 असली बदलाव यहाँ है 👇👇👇 --- */}
        {/* चमकने वाली आँखें */}
        <mesh position={[-0.08, 1.0, 0.18]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial
            color="black"
            emissive="#ff6b00"      // चमक का रंग
            emissiveIntensity={5}   // चमक की ताकत (1 से ज़्यादा)
            toneMapped={false}        // Bloom के लिए ज़रूरी
          />
        </mesh>
        <mesh position={[0.08, 1.0, 0.18]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial
            color="black"
            emissive="#ff6b00"
            emissiveIntensity={5}
            toneMapped={false}
          />
        </mesh>

        {/* --- रोशनी डालने वाली लाइट्स (शरीर के लिए) --- */}
        <pointLight
          position={[-0.08, 1.0, 0.18]}
          intensity={1.6}
          distance={3}
          color={"#ff6b00"}
        />
        <pointLight
          position={[0.08, 1.0, 0.18]}
          intensity={1.6}
          distance={3}
          color={"#ff6b00"}
        />
        <pointLight
          position={[0, 0.6, 0.6]}
          intensity={0.12}
          distance={4}
          color={"#ff4d00"}
        />
      </group>
    </Float>
  );
}