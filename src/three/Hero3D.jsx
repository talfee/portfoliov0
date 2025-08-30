import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, Environment } from "@react-three/drei";
import { Suspense, useMemo } from "react";
// import { useGpuTier, hasWebGL } from "./useGpuTier.js";
import Scene from "./Scene";

export default function Hero3D({ isDay }) {
  const tier = useGpuTier();
  const ok = hasWebGL();
  const shadows = tier.tier >= 2; // keep soft features for better GPUs

  if (!ok) {
    // Simple fallback (img) – replace with your actual static
    return <img src="/hero-fallback.jpg" alt="" style={{ width: "100%", height: "auto" }} />;
  }

  return (
    <div style={{ width: "100%", aspectRatio: "16/9" }}>
      <Canvas
        shadows={shadows}
        dpr={[1, tier.isMobile ? 1.5 : 2]}
        frameloop="demand" // render only when needed
        onCreated={({ gl }) => { gl.setClearColor("#0b0b0b"); }}
      >
        <Suspense fallback={null}>
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          {/* Optional ambient environment tint */}
          <Environment preset={isDay ? "sunset" : "night"} background={false} />
          <Scene isDay={isDay} shadows={shadows} />
        </Suspense>
      </Canvas>
    </div>
  );
}
