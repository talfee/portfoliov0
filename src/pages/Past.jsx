
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

export default function Home() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const width = mount.clientWidth
    const height = mount.clientHeight

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(95, width / height, 0.1, 1000)
    camera.position.z = 200
    camera.position.y = -100
    camera.position.x = 0

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    mount.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(5, 5, 5)
    scene.add(light)

    // Load GLB
    const loader = new GLTFLoader()
    loader.load(
      "/models/past.glb", 
      (gltf) => {
        const model = gltf.scene
        model.scale.set(1, 1, 1)
        scene.add(model)
      },
      undefined,
      (error) => {
        console.error("Error loading GLB:", error)
      }
    )

    // Animate
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main content area */}
      <div
        style={{
          flex: 1,
          position: "relative", // important for absolute children
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          gap: "40px",
        }}
      >
        {/* GLB container */}
        <div
          style={{
            width: "100%",
            height: "500px",
            position: "relative",
          }}
        >
          <div
            ref={mountRef}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 0, // background
            }}
          />
        </div>

        <div style={{ width: "60%", height: "200px" }}>intro text</div>

      </div>
    </div>
  )
}
