"use client"

import { useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Grid, Environment, PerspectiveCamera } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ChevronsUp, ChevronsDown, ChevronsLeft, ChevronsRight, Maximize2 } from "lucide-react"

function BagModel({ measurements = {}, activeField = "" }) {
  // Default measurements if not provided
  const {
    topWidth = 200,
    bottomWidth = 200,
    topDepth = 100,
    bottomDepth = 100,
    height = 300,
    materialThickness = 2,
    openingWidth = 180,
  } = measurements

  // Convert to Three.js units (divide by 100 for better scale)
  const tw = topWidth / 100
  const bw = bottomWidth / 100
  const td = topDepth / 100
  const bd = bottomDepth / 100
  const h = height / 100
  const mt = materialThickness / 100

  // Panel colors
  const PANEL_COLORS = {
    front: "#E11D48", // Red
    back: "#2563EB", // Blue
    side: "#16A34A", // Green
    bottom: "#CA8A04", // Yellow/Gold
    material: "#9333EA", // Purple
  }

  // Map fields to panel types for coloring
  const fieldToPanelMap = {
    topWidth: "front",
    bottomWidth: "front",
    topDepth: "side",
    bottomDepth: "side",
    height: "back",
    openingWidth: "bottom",
    materialThickness: "material",
  }

  // Determine which panel is active
  const activePanel = fieldToPanelMap[activeField as keyof typeof fieldToPanelMap] || ""

  // Create pulsing effect for active elements
  const [scale, setScale] = useState(1)

  useFrame((state) => {
    if (activeField) {
      // Create a pulsing effect between 0.95 and 1.05
      setScale(1 + Math.sin(state.clock.getElapsedTime() * 5) * 0.05)
    } else {
      setScale(1)
    }
  })

  return (
    <group>
      {/* Front Panel */}
      <mesh
        position={[0, 0, td / 2]}
        rotation={[0, 0, 0]}
        scale={activePanel === "front" ? [scale, scale, 1] : [1, 1, 1]}
      >
        <planeGeometry args={[tw, h]} />
        <meshStandardMaterial
          color={PANEL_COLORS.front}
          transparent
          opacity={activePanel === "front" ? 0.9 : 0.7}
          side={2}
          emissive={activePanel === "front" ? PANEL_COLORS.front : "#000000"}
          emissiveIntensity={activePanel === "front" ? 0.5 : 0}
        />
      </mesh>

      {/* Back Panel */}
      <mesh
        position={[0, 0, -td / 2]}
        rotation={[0, Math.PI, 0]}
        scale={activePanel === "back" ? [scale, scale, 1] : [1, 1, 1]}
      >
        <planeGeometry args={[tw, h]} />
        <meshStandardMaterial
          color={PANEL_COLORS.back}
          transparent
          opacity={activePanel === "back" ? 0.9 : 0.7}
          side={2}
          emissive={activePanel === "back" ? PANEL_COLORS.back : "#000000"}
          emissiveIntensity={activePanel === "back" ? 0.5 : 0}
        />
      </mesh>

      {/* Left Side Panel */}
      <mesh
        position={[-tw / 2, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={activePanel === "side" ? [scale, scale, 1] : [1, 1, 1]}
      >
        <planeGeometry args={[td, h]} />
        <meshStandardMaterial
          color={PANEL_COLORS.side}
          transparent
          opacity={activePanel === "side" ? 0.9 : 0.7}
          side={2}
          emissive={activePanel === "side" ? PANEL_COLORS.side : "#000000"}
          emissiveIntensity={activePanel === "side" ? 0.5 : 0}
        />
      </mesh>

      {/* Right Side Panel */}
      <mesh
        position={[tw / 2, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={activePanel === "side" ? [scale, scale, 1] : [1, 1, 1]}
      >
        <planeGeometry args={[td, h]} />
        <meshStandardMaterial
          color={PANEL_COLORS.side}
          transparent
          opacity={activePanel === "side" ? 0.9 : 0.7}
          side={2}
          emissive={activePanel === "side" ? PANEL_COLORS.side : "#000000"}
          emissiveIntensity={activePanel === "side" ? 0.5 : 0}
        />
      </mesh>

      {/* Bottom Panel */}
      <mesh
        position={[0, -h / 2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={activePanel === "bottom" ? [scale, scale, 1] : [1, 1, 1]}
      >
        <planeGeometry args={[bw, bd]} />
        <meshStandardMaterial
          color={PANEL_COLORS.bottom}
          transparent
          opacity={activePanel === "bottom" ? 0.9 : 0.7}
          side={2}
          emissive={activePanel === "bottom" ? PANEL_COLORS.bottom : "#000000"}
          emissiveIntensity={activePanel === "bottom" ? 0.5 : 0}
        />
      </mesh>

      {/* Material Thickness Indicator (when active) */}
      {activePanel === "material" && (
        <group scale={[scale, scale, scale]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[tw + 0.1, h + 0.1, mt]} />
            <meshStandardMaterial color={PANEL_COLORS.material} transparent opacity={0.3} wireframe={true} />
          </mesh>
        </group>
      )}
    </group>
  )
}

export default function ModelPreview({ measurements = {}, activeField = "" }) {
  const [viewMode, setViewMode] = useState("solid")
  const [showSeams, setShowSeams] = useState(true)
  const [showMeasurements, setShowMeasurements] = useState(true)
  const [showWarnings, setShowWarnings] = useState(true)

  // Panel colors
  const PANEL_COLORS = {
    front: "#E11D48", // Red
    back: "#2563EB", // Blue
    side: "#16A34A", // Green
    bottom: "#CA8A04", // Yellow/Gold
    material: "#9333EA", // Purple
  }

  // Sample measurements - in a real app, these would come from the measurement panel
  // const measurements = {
  const sampleMeasurements = {
    topWidth: 300,
    bottomWidth: 300,
    topDepth: 100,
    bottomDepth: 100,
    height: 350,
    openingWidth: 280,
    materialThickness: 1.2,
  }

  return (
    <div className="w-full h-full relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Grid infiniteGrid fadeDistance={30} fadeStrength={5} />
        <BagModel measurements={measurements} activeField={activeField} />
        <OrbitControls />
        <Environment preset="studio" background />

        {/* Measurement Indicators */}
        {showMeasurements && (
          <group>
            {/* Width Measurement */}
            <mesh position={[0, 0, 1.5]} rotation={[0, 0, 0]}>
              <boxGeometry args={[3, 0.01, 0.01]} />
              <meshBasicMaterial color="black" />
            </mesh>

            {/* Height Measurement */}
            <mesh position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={[3.5, 0.01, 0.01]} />
              <meshBasicMaterial color="black" />
            </mesh>

            {/* Depth Measurement */}
            <mesh position={[1.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <boxGeometry args={[1, 0.01, 0.01]} />
              <meshBasicMaterial color="black" />
            </mesh>
          </group>
        )}

        {/* Warning Indicators */}
        {showWarnings && (
          <mesh position={[0, -1.5, 0.5]} rotation={[0, 0, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="red" />
          </mesh>
        )}
      </Canvas>

      {/* Camera Controls Overlay */}
      <div className="absolute bottom-4 right-4 bg-background/80 p-2 rounded-md border shadow-sm">
        <div className="grid grid-cols-3 gap-1">
          <div></div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronsUp className="h-4 w-4" />
          </Button>
          <div></div>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronsRight className="h-4 w-4" />
          </Button>

          <div></div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronsDown className="h-4 w-4" />
          </Button>
          <div></div>
        </div>
      </div>

      {/* View Options Overlay */}
      <div className="absolute top-4 left-4 bg-background/80 p-2 rounded-md border shadow-sm">
        <div className="text-xs font-medium mb-1">View Options</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="show-seams"
              checked={showSeams}
              onChange={() => setShowSeams(!showSeams)}
              className="h-3 w-3"
            />
            <label htmlFor="show-seams" className="text-xs">
              Show Seams
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="show-measurements"
              checked={showMeasurements}
              onChange={() => setShowMeasurements(!showMeasurements)}
              className="h-3 w-3"
            />
            <label htmlFor="show-measurements" className="text-xs">
              Show Measurements
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="show-warnings"
              checked={showWarnings}
              onChange={() => setShowWarnings(!showWarnings)}
              className="h-3 w-3"
            />
            <label htmlFor="show-warnings" className="text-xs">
              Show Warnings
            </label>
          </div>
        </div>
      </div>

      {/* Measurement Info Overlay */}
      <div className="absolute top-4 right-4 bg-background/80 p-2 rounded-md border shadow-sm">
        <div className="text-xs font-medium">Model Dimensions</div>
        <div
          className="text-xs"
          style={{
            fontWeight: activeField === "topWidth" ? "bold" : "normal",
            color: activeField === "topWidth" ? PANEL_COLORS.front : "inherit",
          }}
        >
          Top Width: {measurements.topWidth || "-"}mm
          {activeField === "topWidth" && " ←"}
        </div>
        <div
          className="text-xs"
          style={{
            fontWeight: activeField === "bottomWidth" ? "bold" : "normal",
            color: activeField === "bottomWidth" ? PANEL_COLORS.front : "inherit",
          }}
        >
          Bottom Width: {measurements.bottomWidth || "-"}mm
          {activeField === "bottomWidth" && " ←"}
        </div>
        <div
          className="text-xs"
          style={{
            fontWeight: activeField === "topDepth" ? "bold" : "normal",
            color: activeField === "topDepth" ? PANEL_COLORS.side : "inherit",
          }}
        >
          Top Depth: {measurements.topDepth || "-"}mm
          {activeField === "topDepth" && " ←"}
        </div>
        <div
          className="text-xs"
          style={{
            fontWeight: activeField === "bottomDepth" ? "bold" : "normal",
            color: activeField === "bottomDepth" ? PANEL_COLORS.side : "inherit",
          }}
        >
          Bottom Depth: {measurements.bottomDepth || "-"}mm
          {activeField === "bottomDepth" && " ←"}
        </div>
        <div
          className="text-xs"
          style={{
            fontWeight: activeField === "height" ? "bold" : "normal",
            color: activeField === "height" ? PANEL_COLORS.back : "inherit",
          }}
        >
          Height: {measurements.height || "-"}mm
          {activeField === "height" && " ←"}
        </div>
        <div
          className="text-xs"
          style={{
            fontWeight: activeField === "openingWidth" ? "bold" : "normal",
            color: activeField === "openingWidth" ? PANEL_COLORS.bottom : "inherit",
          }}
        >
          Opening Width: {measurements.openingWidth || "-"}mm
          {activeField === "openingWidth" && " ←"}
        </div>
        <div
          className="text-xs"
          style={{
            fontWeight: activeField === "materialThickness" ? "bold" : "normal",
            color: activeField === "materialThickness" ? PANEL_COLORS.material : "inherit",
          }}
        >
          Material Thickness: {measurements.materialThickness || "-"}mm
          {activeField === "materialThickness" && " ←"}
        </div>
        <div className="text-xs text-amber-600 mt-1">
          Missing:{" "}
          {Object.entries(measurements).filter(([_, v]) => !v).length > 0
            ? Object.entries(measurements)
                .filter(([_, v]) => !v)
                .map(([k, _]) => k.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()))
                .join(", ")
            : "None"}
        </div>
      </div>
    </div>
  )
}

