"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Lock, Unlock } from "lucide-react";

export default function PatternView() {
  const [patternPieces, setPatternPieces] = useState([
    { id: 1, name: "Front Panel", visible: true, locked: false, color: "#E11D48" },
    { id: 2, name: "Back Panel", visible: true, locked: false, color: "#2563EB" },
    { id: 3, name: "Side Panel", visible: true, locked: false, color: "#16A34A" },
    { id: 4, name: "Bottom Panel", visible: true, locked: false, color: "#CA8A04" },
    { id: 5, name: "Pocket", visible: true, locked: false, color: "#9333EA" },
    { id: 6, name: "Strap", visible: true, locked: false, color: "#0891B2" },
  ])

  const toggleVisibility = (id: number) => {
    setPatternPieces(patternPieces.map((piece) => (piece.id === id ? { ...piece, visible: !piece.visible } : piece)))
  }

  const toggleLock = (id: number) => {
    setPatternPieces(patternPieces.map((piece) => (piece.id === id ? { ...piece, locked: !piece.locked } : piece)))
  }

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

              {/* Example Pattern Pieces */}
              {patternPieces.map(
                (piece) =>
                  piece.visible && (
                    <g key={piece.id}>
                      {piece.id === 1 && (
                        <rect
                          x="200"
                          y="150"
                          width="200"
                          height="300"
                          fill="none"
                          stroke={piece.color}
                          strokeWidth="2"
                        />
                      )}
                      {piece.id === 2 && (
                        <rect
                          x="450"
                          y="150"
                          width="200"
                          height="300"
                          fill="none"
                          stroke={piece.color}
                          strokeWidth="2"
                        />
                      )}
                      {piece.id === 3 && (
                        <rect
                          x="200"
                          y="100"
                          width="50"
                          height="300"
                          fill="none"
                          stroke={piece.color}
                          strokeWidth="2"
                        />
                      )}
                      {piece.id === 4 && (
                        <rect
                          x="200"
                          y="450"
                          width="200"
                          height="50"
                          fill="none"
                          stroke={piece.color}
                          strokeWidth="2"
                        />
                      )}
                      {piece.id === 5 && (
                        <rect
                          x="250"
                          y="200"
                          width="100"
                          height="80"
                          fill="none"
                          stroke={piece.color}
                          strokeWidth="2"
                        />
                      )}
                      {piece.id === 6 && (
                        <rect
                          x="650"
                          y="200"
                          width="30"
                          height="200"
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
                <line x1="200" y1="130" x2="400" y2="130" stroke="#000" strokeWidth="1" strokeDasharray="5,5" />
                <text x="300" y="125" textAnchor="middle" fontSize="12" fill="#000">
                  200mm
                </text>

                <line x1="180" y1="150" x2="180" y2="450" stroke="#000" strokeWidth="1" strokeDasharray="5,5" />
                <text x="175" y="300" textAnchor="middle" fontSize="12" fill="#000" transform="rotate(-90, 175, 300)">
                  300mm
                </text>
              </g>
            </svg>

            {/* Measurement Annotation Overlay */}
            <div className="absolute top-2 right-2 bg-background/80 p-2 rounded-md border shadow-sm">
              <div className="text-xs font-medium">Current Measurement</div>
              <div className="text-sm">Width: 200mm</div>
              <div className="text-sm">Height: 300mm</div>
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
                  <TableCell>Front Width</TableCell>
                  <TableCell>200mm</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Valid
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Front Height</TableCell>
                  <TableCell>300mm</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Valid
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Side Width</TableCell>
                  <TableCell>50mm</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Valid
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bottom Width</TableCell>
                  <TableCell>200mm</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Valid
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bottom Depth</TableCell>
                  <TableCell>50mm</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Valid
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pocket Width</TableCell>
                  <TableCell>100mm</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Valid
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pocket Height</TableCell>
                  <TableCell>80mm</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Valid
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Strap Width</TableCell>
                  <TableCell>30mm</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Valid
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Strap Length</TableCell>
                  <TableCell>200mm</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Valid
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Material Thickness</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Thickness</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Required
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

