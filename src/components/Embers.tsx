// src/components/Embers.tsx

import React, { useRef, useMemo } from "react"; // React इम्पोर्ट करें
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 👇 यह 'नियमों की किताब' (rulebook) है
// हम बता रहे हैं कि Embers को एक 'count' prop मिल सकता है,
// जो एक नंबर हो सकता है, लेकिन यह ज़रूरी नहीं है (?)
interface EmbersProps {
  count?: number;
}

// 👇 यहाँ हम उस किताब को लागू कर रहे हैं
export default function Embers({ count = 200 }: EmbersProps) {
  const ref = useRef<THREE.Points>(null!);
  const { positions, speeds } = useMemo(() => {
    // ... बाकी का कोड बिल्कुल वैसा ही रहेगा ...
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 2.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      speeds[i] = 0.08 + Math.random() * 0.25;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, dt) => {
    // ... यह भी वैसा ही रहेगा ...
    const arr = (
      ref.current.geometry.attributes.position as THREE.BufferAttribute
    ).array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * dt;
      if (arr[i * 3 + 1] > 2.6) arr[i * 3 + 1] = -0.2;
    }
    (ref.current.geometry.attributes.position as any).needsUpdate = true;
  });

  return (
    // ... यह भी वैसा ही रहेगा ...
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06} /* आकार बढ़ा हुआ */
        sizeAttenuation
        color={"#ffb366"}
        blending={THREE.AdditiveBlending} /* चमक के लिए */
      />
    </points>
  );
}
