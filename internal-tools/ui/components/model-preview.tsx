"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Grid, Environment, PerspectiveCamera } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ChevronsUp, ChevronsDown, ChevronsLeft, ChevronsRight, Maximize2 } from "lucide-react"

function BagModel() {
  return (
    <group>
      {/* Front Panel */}
      <mesh position={[0, 0, 0.5]}>
        <boxGeometry args={[2, 3, 0.02]} />
        <meshStandardMaterial color="#E11D48" transparent opacity={0.7} />
      </mesh>

      {/* Back Panel */}
      <mesh position={[0, 0, -0.5]}>
        <boxGeometry args={[2, 3, 0.02]} />
        <meshStandardMaterial color="#2563EB" transparent opacity={0.7} />
      </mesh>

      {/* Left Side Panel */}
      <mesh position={[-1, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[1, 3, 0.02]} />
        <meshStandardMaterial color="#16A34A" transparent opacity={0.7} />
      </mesh>

      {/* Right Side Panel */}
      <mesh position={[1, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[1, 3, 0.02]} />
        <meshStandardMaterial color="#16A34A" transparent opacity={0.7} />
      </mesh>

      {/* Bottom Panel */}
      <mesh position={[0, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[2, 1, 0.02]} />
        <meshStandardMaterial color="#CA8A04" transparent opacity={0.7} />
      </mesh>

      {/* Pocket */}
      <mesh position={[0, 0, 0.51]}>
        <boxGeometry args={[1, 0.8, 0.01]} />
        <meshStandardMaterial color="#9333EA" transparent opacity={0.7} />
      </mesh>

      {/* Strap */}
      <mesh position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[2, 0.3, 0.02]} />
        <meshStandardMaterial color="#0891B2" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

export default function ModelPreview() {
  const [viewMode, setViewMode] = useState("solid")
  const [showSeams, setShowSeams] = useState(true)
  const [showMeasurements, setShowMeasurements] = useState(true)
  const [showWarnings, setShowWarnings] = useState(true)

  return (
    <div className="w-full h-full relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Grid infiniteGrid fadeDistance={30} fadeStrength={5} />
        <BagModel />
        <OrbitControls />
        <Environment preset="studio" background />

        {/* Measurement Indicators */}
        {showMeasurements && (
          <group>
            {/* Width Measurement */}
            <mesh position={[0, 0, 1.5]} rotation={[0, 0, 0]}>
              <boxGeometry args={[2, 0.01, 0.01]} />
              <meshBasicMaterial color="black" />
            </mesh>

            {/* Height Measurement */}
            <mesh position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={[3, 0.01, 0.01]} />
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
        <div className="text-xs">Width: 200mm</div>
        <div className="text-xs">Height: 300mm</div>
        <div className="text-xs">Depth: 100mm</div>
        <div className="text-xs text-amber-600 mt-1">Missing: Material Thickness</div>
      </div>
    </div>
  )
}

