// src/three/Scene.jsx
import { useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

/** ------- Sun / Moon sphere ------- */
function SunMoon({ isDay }) {
  const color = isDay ? 0xffd27a : 0xa8c7ff;
  const emissive = isDay ? 0xffb347 : 0x6ea8ff;

  return (
    <mesh position={[-1.6, 0.6, -1.5]} castShadow>
      <sphereGeometry args={[0.45, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.25}
        roughness={0.4}
        metalness={0.0}
      />
    </mesh>
  );
}

/** ------- Cloud model from Blender (GLB) ------- */
function CloudModel(props) {
  // Place your file at: public/models/cloud.glb
  const group = useRef();
  const gltf = useGLTF("/models/sunandmoon.glb"); // loads from /public

  // Minimal drag-to-rotate interactivity
  function onPointerDown(e) {
    e.stopPropagation();
    if (!group.current) return;
    group.current.__dragging = true;
    group.current.__lastX = e.clientX;
  }
  function onPointerUp(e) {
    e.stopPropagation();
    if (!group.current) return;
    group.current.__dragging = false;
    group.current.__lastX = undefined;
  }
  function onPointerMove(e) {
    if (!group.current?.__dragging) return;
    e.stopPropagation();
    const dx = (e.clientX - (group.current.__lastX ?? e.clientX)) || 0;
    group.current.__lastX = e.clientX;
    // Rotate around Y based on horizontal drag; tune multiplier to taste
    group.current.rotation.y += dx * 0.01;
  }

  return (
    <primitive
      ref={group}
      object={gltf.scene}
      // Typical hero placement; adjust as needed
      position={[0.8, 0.45, 0.20]}
      rotation={[0, 0, 0]}
      scale={0.1}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerOut={onPointerUp}
      onPointerMove={onPointerMove}
      {...props}
    />
  );
}

// Preload so it's cached before first render
useGLTF.preload("/models/sunandmoon.glb");

/** ------- Main scene ------- */
export default function Scene({ isDay, shadows }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={isDay ? 0.4 : 0.15} />
      <directionalLight
        position={[2.5, 3, 2]}
        intensity={isDay ? 1.2 : 0.55}
        color={isDay ? 0xffffff : 0x9fb8ff}
        castShadow={shadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Optional: subtle ground to catch shadows */}
      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#0b0b0b" />
      </mesh>

      <SunMoon isDay={isDay} />
      <CloudModel />
    </>
  );
}
