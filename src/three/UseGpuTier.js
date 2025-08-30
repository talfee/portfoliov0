import { useEffect, useState } from "react";
import { getGPUTier } from "detect-gpu";

export function useGpuTier() {
  const [tier, setTier] = useState({ tier: 0, isMobile: false });
  useEffect(() => { getGPUTier().then(setTier); }, []);
  return tier; // { tier: 0..3, isMobile: boolean }
}

export function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch { return false; }
}
