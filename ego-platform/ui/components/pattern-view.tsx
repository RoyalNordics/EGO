"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Lock, Unlock } from "lucide-react"

// Panel colors
const PANEL_COLORS = {
  front: "#E11D48", // Red
  back: "#2563EB", // Blue
  side: "#16A34A", // Green
  bottom: "#CA8A04", // Yellow/Gold
  material: "#9333EA", // Purple
}

export default function PatternView({ measurements = {} }) {
  const [patternPieces, setPatternPieces] = useState([
    { id: 1, name: "Front Panel", visible: true, locked: false, color: PANEL_COLORS.front },
    { id: 2, name: "Back Panel", visible: true, locked: false, color: PANEL_COLORS.back },
    { id: 3, name: "Side Panel", visible: true, locked: false, color: PANEL_COLORS.side },
    { id: 4, name: "Bottom Panel", visible: true, locked: false, color: PANEL_COLORS.bottom },
    { id: 5, name: "Pocket", visible: true, locked: false, color: "#9333EA" },
    { id: 6, name: "Strap", visible: true, locked: false, color: "#0891B2" },
  ])

  const toggleVisibility = (id: number) => {
    setPatternPieces(patternPieces.map((piece) => (piece.id === id ? { ...piece, visible: !piece.visible } : piece)))
  }

  const toggleLock = (id: number) => {
    setPatternPieces(patternPieces.map((piece) => (piece.id === id ? { ...piece, locked: !piece.locked } : piece)))
  }

  // Convert measurements to numbers for display
  const topWidth = measurements.topWidth ? Number.parseFloat(measurements.topWidth) : 200
  const bottomWidth = measurements.bottomWidth ? Number.parseFloat(measurements.bottomWidth) : 200
  const topDepth = measurements.topDepth ? Number.parseFloat(measurements.topDepth) : 100
  const bottomDepth = measurements.bottomDepth ? Number.parseFloat(measurements.bottomDepth) : 100
  const height = measurements.height ? Number.parseFloat(measurements.height) : 300

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="canvas" className="flex-1 flex flex-col">
        <TabsList className="mx-2 mt-2 justify-start">
          <TabsTrigger value="canvas">Canvas</TabsTrigger>
          <TabsTrigger value="pieces">Pieces</TabsTrigger>
          <TabsTrigger value="measurements">Measurements</TabsTrigger>
        </TabsList>

        <TabsContent value="canvas" className="flex-1 m-0 p-2 overflow-hidden">
          <div className="w-full h-full bg-muted/20 border rounded-md flex items-center justify-center relative">
            {/* SVG Pattern Display */}
            <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
              {/* Grid */}
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Example Pattern Pieces with dynamic measurements */}
              {patternPieces.map(
                (piece) =>
                  piece.visible && (
                    <g key={piece.id}>
                      {piece.id === 1 && (
                        <rect
                          x={400 - topWidth / 2}
                          y={150}
                          width={topWidth}
                          height={height}
                          fill="none"
                          stroke={piece.color}
                          strokeWidth="2"
                        />
                      )}
                      {piece.id === 2 && (
                        <rect
                          x={400 - topWidth / 2 + topWidth + topDepth}
                          y={150}
                          width={topWidth}
                          height={height}
                          fill="none"
                          stroke={piece.color}
                          strokeWidth="2"
                        />
                      )}
                      {piece.id === 3 && (
                        <rect
                          x={400 - topWidth / 2 + topWidth}
                          y={150}
                          width={topDepth}
                          height={height}
                          fill="none"
                          stroke={piece.color}
                          strokeWidth="2"
                        />
                      )}
                      {piece.id === 4 && (
                        <rect
                          x={400 - bottomWidth / 2}
                          y={150 + height}
                          width={bottomWidth}
                          height={bottomDepth}
                          fill="none"
                          stroke={piece.color}
                          strokeWidth="2"
                        />
                      )}
                      {piece.id === 5 && (
                        <rect
                          x={400 - 50}
                          y={200}
                          width={100}
                          height={80}
                          fill="none"
                          stroke={piece.color}
                          strokeWidth="2"
                        />
                      )}
                      {piece.id === 6 && (
                        <rect
                          x={400 + topWidth / 2 + topDepth + 50}
                          y={200}
                          width={30}
                          height={200}
                          fill="none"
                          stroke={piece.color}
                          strokeWidth="2"
                        />
                      )}
                    </g>
                  ),
              )}

              {/* Example Measurements */}
              <g>
                {/* Top Width Measurement */}
                {measurements.topWidth && (
                  <>
                    <line
                      x1={400 - topWidth / 2}
                      y1={130}
                      x2={400 + topWidth / 2}
                      y2={130}
                      stroke={PANEL_COLORS.front}
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                    <text x={400} y={125} textAnchor="middle" fontSize="12" fill={PANEL_COLORS.front}>
                      {topWidth}mm
                    </text>
                  </>
                )}

                {/* Height Measurement */}
                {measurements.height && (
                  <>
                    <line
                      x1={380}
                      y1={150}
                      x2={380}
                      y2={150 + height}
                      stroke={PANEL_COLORS.back}
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                    <text
                      x={375}
                      y={150 + height / 2}
                      textAnchor="middle"
                      fontSize="12"
                      fill={PANEL_COLORS.back}
                      transform={`rotate(-90, 375, ${150 + height / 2})`}
                    >
                      {height}mm
                    </text>
                  </>
                )}

                {/* Top Depth Measurement */}
                {measurements.topDepth && (
                  <>
                    <line
                      x1={400 + topWidth / 2}
                      y1={130}
                      x2={400 + topWidth / 2 + topDepth}
                      y2={130}
                      stroke={PANEL_COLORS.side}
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                    <text
                      x={400 + topWidth / 2 + topDepth / 2}
                      y={125}
                      textAnchor="middle"
                      fontSize="12"
                      fill={PANEL_COLORS.side}
                    >
                      {topDepth}mm
                    </text>
                  </>
                )}
              </g>
            </svg>

            {/* Measurement Annotation Overlay */}
            <div className="absolute top-2 right-2 bg-background/80 p-2 rounded-md border shadow-sm">
              <div className="text-xs font-medium">Current Measurements</div>
              {measurements.topWidth && (
                <div className="text-xs" style={{ color: PANEL_COLORS.front }}>
                  Top Width: {measurements.topWidth}mm
                </div>
              )}
              {measurements.bottomWidth && (
                <div className="text-xs" style={{ color: PANEL_COLORS.front }}>
                  Bottom Width: {measurements.bottomWidth}mm
                </div>
              )}
              {measurements.height && (
                <div className="text-xs" style={{ color: PANEL_COLORS.back }}>
                  Height: {measurements.height}mm
                </div>
              )}
              {measurements.topDepth && (
                <div className="text-xs" style={{ color: PANEL_COLORS.side }}>
                  Top Depth: {measurements.topDepth}mm
                </div>
              )}
              {measurements.bottomDepth && (
                <div className="text-xs" style={{ color: PANEL_COLORS.side }}>
                  Bottom Depth: {measurements.bottomDepth}mm
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pieces" className="flex-1 m-0 p-2 overflow-hidden">
          <ScrollArea className="h-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Color</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patternPieces.map((piece) => (
                  <TableRow key={piece.id}>
                    <TableCell>
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: piece.color }}></div>
                    </TableCell>
                    <TableCell>{piece.name}</TableCell>
                    <TableCell className="text-right">
                      <button
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted"
                        onClick={() => toggleVisibility(piece.id)}
                      >
                        {piece.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      <button
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted"
                        onClick={() => toggleLock(piece.id)}
                      >
                        {piece.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="measurements" className="flex-1 m-0 p-2 overflow-hidden">
          <ScrollArea className="h-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PANEL_COLORS.front }}></div>
                    <span>Front Width (Top)</span>
                  </TableCell>
                  <TableCell>{measurements.topWidth || "-"} mm</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        measurements.topWidth
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }
                    >
                      {measurements.topWidth ? "Valid" : "Required"}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PANEL_COLORS.front }}></div>
                    <span>Front Width (Bottom)</span>
                  </TableCell>
                  <TableCell>{measurements.bottomWidth || "-"} mm</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        measurements.bottomWidth
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }
                    >
                      {measurements.bottomWidth ? "Valid" : "Required"}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PANEL_COLORS.side }}></div>
                    <span>Side Depth (Top)</span>
                  </TableCell>
                  <TableCell>{measurements.topDepth || "-"} mm</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        measurements.topDepth
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }
                    >
                      {measurements.topDepth ? "Valid" : "Required"}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PANEL_COLORS.side }}></div>
                    <span>Side Depth (Bottom)</span>
                  </TableCell>
                  <TableCell>{measurements.bottomDepth || "-"} mm</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        measurements.bottomDepth
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }
                    >
                      {measurements.bottomDepth ? "Valid" : "Required"}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PANEL_COLORS.back }}></div>
                    <span>Bag Height</span>
                  </TableCell>
                  <TableCell>{measurements.height || "-"} mm</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        measurements.height
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }
                    >
                      {measurements.height ? "Valid" : "Required"}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PANEL_COLORS.bottom }}></div>
                    <span>Opening Width</span>
                  </TableCell>
                  <TableCell>{measurements.openingWidth || "-"} mm</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        measurements.openingWidth
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }
                    >
                      {measurements.openingWidth ? "Valid" : "Required"}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PANEL_COLORS.material }}></div>
                    <span>Material Thickness</span>
                  </TableCell>
                  <TableCell>{measurements.materialThickness || "-"} mm</TableCell>
                  <TableCell>Thickness</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        measurements.materialThickness
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }
                    >
                      {measurements.materialThickness ? "Valid" : "Required"}
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

