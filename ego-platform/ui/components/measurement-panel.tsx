"use client";

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Check, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Panel colors
const PANEL_COLORS = {
  front: "#E11D48", // Red
  back: "#2563EB", // Blue
  side: "#16A34A", // Green
  bottom: "#CA8A04", // Yellow/Gold
  material: "#9333EA", // Purple
}

export default function MeasurementPanel({ onMeasurementsChange }) {
  const [activeTab, setActiveTab] = useState("guided")
  const [currentStep, setCurrentStep] = useState(0)
  const [measurements, setMeasurements] = useState({
    topWidth: "",
    bottomWidth: "",
    topDepth: "",
    bottomDepth: "",
    height: "",
    openingWidth: "",
    materialThickness: "",
  });
  const [bagModel, setBagModel] = useState("Tote Bag");
  const [materials, setMaterials] = useState(["Canvas", "Leather"]);

  // Update parent component when measurements change
  useEffect(() => {
    if (onMeasurementsChange) {
      onMeasurementsChange({ ...measurements, bagModel, materials });
    }
  }, [measurements, bagModel, materials, onMeasurementsChange])

  const handleInputChange = (field, value) => {
    const updatedMeasurements = {
      ...measurements,
      [field]: value,
    }
    setMeasurements(updatedMeasurements)

    // Pass both the updated measurements and the active field
    if (onMeasurementsChange) {
      onMeasurementsChange({ ...updatedMeasurements, bagModel, materials }, field)
    }
  }

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const guidedSteps = [
    {
      title: "Top Width",
      field: "topWidth",
      description: "Measure the horizontal width at the top of the bag (front panel)",
      image: "top-width.svg",
      color: PANEL_COLORS.front,
      panel: "Front Panel",
    },
    {
      title: "Bottom Width",
      field: "bottomWidth",
      description: "Measure the horizontal width at the bottom of the bag (front panel)",
      image: "bottom-width.svg",
      color: PANEL_COLORS.front,
      panel: "Front Panel",
    },
    {
      title: "Top Depth",
      field: "topDepth",
      description: "Measure the bag width/depth at the top (side panel)",
      image: "top-depth.svg",
      color: PANEL_COLORS.side,
      panel: "Side Panel",
    },
    {
      title: "Bottom Depth",
      field: "bottomDepth",
      description: "Measure the bag width/depth at the bottom (side panel)",
      image: "bottom-depth.svg",
      color: PANEL_COLORS.side,
      panel: "Side Panel",
    },
    {
      title: "Bag Height",
      field: "height",
      description: "Measure the vertical height of the bag",
      image: "height.svg",
      color: PANEL_COLORS.back,
      panel: "Back Panel",
    },
    {
      title: "Opening Width",
      field: "openingWidth",
      description: "Measure the width of the top opening",
      image: "opening-width.svg",
      color: PANEL_COLORS.bottom,
      panel: "Bottom Panel",
    },
    {
      title: "Material Thickness",
      field: "materialThickness",
      description: "Specify the thickness of the material",
      image: "thickness.svg",
      color: PANEL_COLORS.material,
      panel: "Material",
    },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b bg-muted/30">
        <h3 className="text-sm font-medium">Measurement Panel</h3>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="mx-2 mt-2 justify-start">
          <TabsTrigger value="guided">Guided</TabsTrigger>
          <TabsTrigger value="all">All Measurements</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
        </TabsList>

        <TabsContent value="guided" className="flex-1 m-0 p-2 overflow-hidden">
          <ScrollArea className="h-full pr-2">
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-2">
                Step {currentStep + 1} of 7: Please specify the following measurement in mm.
              </div>

              <Card style={{ borderColor: guidedSteps[currentStep].color }}>
                <CardHeader className="pb-2" style={{ backgroundColor: `${guidedSteps[currentStep].color}10` }}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: guidedSteps[currentStep].color }}
                    ></div>
                    <CardTitle className="text-base">{guidedSteps[currentStep].title}</CardTitle>
                  </div>
                  <CardDescription>{guidedSteps[currentStep].description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex justify-center">
                    <div className="border rounded-md p-2 bg-muted/20 w-full max-w-[200px] h-[120px] flex items-center justify-center">
                      {/* Simplified diagram showing which measurement to take */}
                      <svg viewBox="0 0 100 60" className="w-full h-full">
                        {guidedSteps[currentStep].field === "topWidth" && (
                          <>
                            <rect x="10" y="10" width="80" height="40" fill="none" stroke="#888" strokeWidth="1" />
                            <line
                              x1="10"
                              y1="10"
                              x2="90"
                              y2="10"
                              stroke={guidedSteps[currentStep].color}
                              strokeWidth="2"
                            />
                            <text x="50" y="5" textAnchor="middle" fontSize="8" fill={guidedSteps[currentStep].color}>
                              Top Width
                            </text>
                          </>
                        )}
                        {guidedSteps[currentStep].field === "bottomWidth" && (
                          <>
                            <rect x="10" y="10" width="80" height="40" fill="none" stroke="#888" strokeWidth="1" />
                            <line
                              x1="10"
                              y1="50"
                              x2="90"
                              y2="50"
                              stroke={guidedSteps[currentStep].color}
                              strokeWidth="2"
                            />
                            <text x="50" y="58" textAnchor="middle" fontSize="8" fill={guidedSteps[currentStep].color}>
                              Bottom Width
                            </text>
                          </>
                        )}
                        {guidedSteps[currentStep].field === "topDepth" && (
                          <>
                            <rect x="30" y="10" width="40" height="40" fill="none" stroke="#888" strokeWidth="1" />
                            <line
                              x1="30"
                              y1="10"
                              x2="70"
                              y2="10"
                              stroke={guidedSteps[currentStep].color}
                              strokeWidth="2"
                            />
                            <text x="50" y="5" textAnchor="middle" fontSize="8" fill={guidedSteps[currentStep].color}>
                              Top Depth
                            </text>
                          </>
                        )}
                        {guidedSteps[currentStep].field === "bottomDepth" && (
                          <>
                            <rect x="30" y="10" width="40" height="40" fill="none" stroke="#888" strokeWidth="1" />
                            <line
                              x1="30"
                              y1="50"
                              x2="70"
                              y2="50"
                              stroke={guidedSteps[currentStep].color}
                              strokeWidth="2"
                            />
                            <text x="50" y="58" textAnchor="middle" fontSize="8" fill={guidedSteps[currentStep].color}>
                              Bottom Depth
                            </text>
                          </>
                        )}
                        {guidedSteps[currentStep].field === "height" && (
                          <>
                            <rect x="30" y="10" width="40" height="40" fill="none" stroke="#888" strokeWidth="1" />
                            <line
                              x1="30"
                              y1="10"
                              x2="30"
                              y2="50"
                              stroke={guidedSteps[currentStep].color}
                              strokeWidth="2"
                            />
                            <text
                              x="25"
                              y="30"
                              textAnchor="middle"
                              fontSize="8"
                              fill={guidedSteps[currentStep].color}
                              transform="rotate(-90, 25, 30)"
                            >
                              Height
                            </text>
                          </>
                        )}
                        {guidedSteps[currentStep].field === "openingWidth" && (
                          <>
                            <path d="M 30,10 L 70,10 L 70,50 L 30,50 Z" fill="none" stroke="#888" strokeWidth="1" />
                            <path d="M 35,15 L 65,15" stroke={guidedSteps[currentStep].color} strokeWidth="2" />
                            <text x="50" y="12" textAnchor="middle" fontSize="8" fill={guidedSteps[currentStep].color}>
                              Opening Width
                            </text>
                          </>
                        )}
                        {guidedSteps[currentStep].field === "materialThickness" && (
                          <>
                            <rect x="30" y="20" width="40" height="20" fill="none" stroke="#888" strokeWidth="1" />
                            <rect x="30" y="20" width="40" height="3" fill={guidedSteps[currentStep].color} />
                            <text x="50" y="15" textAnchor="middle" fontSize="8" fill={guidedSteps[currentStep].color}>
                              Material Thickness
                            </text>
                          </>
                        )}
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Input
                      id={guidedSteps[currentStep].field}
                      type="number"
                      placeholder="0"
                      value={measurements[guidedSteps[currentStep].field]}
                      onChange={(e) => handleInputChange(guidedSteps[currentStep].field, e.target.value)}
                      className="flex-1"
                      style={{
                        borderColor: guidedSteps[currentStep].color,
                        backgroundColor: `${guidedSteps[currentStep].color}05`,
                      }}
                    />
                    <span className="text-sm font-medium">mm</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={prevStep} disabled={currentStep === 0}>
                    Previous
                  </Button>
                  <Button
                    size="sm"
                    onClick={nextStep}
                    disabled={currentStep === 6}
                    style={{
                      backgroundColor: guidedSteps[currentStep].color,
                      color: "#fff",
                    }}
                  >
                    {currentStep < 6 ? (
                      <>
                        Next
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Finish
                        <Check className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              {currentStep === 6 && (
                <Card className="mt-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Measurement Summary</CardTitle>
                    <CardDescription>Review all measurements before finalizing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableBody>
                        {guidedSteps.map((step, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: step.color }}></div>
                                <span className="font-medium">{step.title}</span>
                              </div>
                            </TableCell>
                            <TableCell>{measurements[step.field] || "-"} mm</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Check className="mr-1 h-4 w-4" />
                      Apply All Measurements
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="all" className="flex-1 m-0 p-2 overflow-hidden">
          <ScrollArea className="h-full pr-2">
            <div className="space-y-4">
              <Accordion type="single" collapsible defaultValue="bag-dimensions">
                <AccordionItem value="bag-dimensions">
                  <AccordionTrigger className="text-sm font-medium">Bag Dimensions</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-1">
                      <div className="space-y-2">
                        <Label htmlFor="all-bag-model" className="text-xs">
                          Bag Model
                        </Label>
                        <Select defaultValue={bagModel} onValueChange={(value) => setBagModel(value)}>
                          <SelectTrigger id="all-bag-model">
                            <SelectValue placeholder="Select bag model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Tote Bag">Tote Bag</SelectItem>
                            <SelectItem value="Backpack">Backpack</SelectItem>
                            <SelectItem value="Clutch">Clutch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="all-materials" className="text-xs">
                          Materials
                        </Label>
                        <Select defaultValue={materials.join(",")} onValueChange={(value) => setMaterials(value.split(","))}>
                          <SelectTrigger id="all-materials">
                            <SelectValue placeholder="Select materials" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Canvas,Leather">Canvas, Leather</SelectItem>
                            <SelectItem value="Leather,Suede">Leather, Suede</SelectItem>
                            <SelectItem value="Canvas">Canvas</SelectItem>
                            <SelectItem value="Leather">Leather</SelectItem>
                            <SelectItem value="Suede">Suede</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Front Panel Measurements (Red) */}
                      <div className="p-2 rounded-md" style={{ backgroundColor: `${PANEL_COLORS.front}10` }}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PANEL_COLORS.front }}></div>
                          <span className="text-sm font-medium">Front Panel</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="all-top-width" className="text-xs">
                              Top Width (mm)
                            </Label>
                            <Input
                              id="all-top-width"
                              type="number"
                              placeholder="0"
                              value={measurements.topWidth}
                              onChange={(e) => handleInputChange("topWidth", e.target.value)}
                              className="h-8"
                              style={{
                                borderColor: PANEL_COLORS.front,
                                backgroundColor: `${PANEL_COLORS.front}05`,
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="all-bottom-width" className="text-xs">
                              Bottom Width (mm)
                            </Label>
                            <Input
                              id="all-bottom-width"
                              type="number"
                              placeholder="0"
                              value={measurements.bottomWidth}
                              onChange={(e) => handleInputChange("bottomWidth", e.target.value)}
                              className="h-8"
                              style={{
                                borderColor: PANEL_COLORS.front,
                                backgroundColor: `${PANEL_COLORS.front}05`,
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Side Panel Measurements (Green) */}
                      <div className="p-2 rounded-md" style={{ backgroundColor: `${PANEL_COLORS.side}10` }}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PANEL_COLORS.side }}></div>
                          <span className="text-sm font-medium">Side Panel</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="all-top-depth" className="text-xs">
                              Top Depth (mm)
                            </Label>
                            <Input
                              id="all-top-depth"
                              type="number"
                              placeholder="0"
                              value={measurements.topDepth}
                              onChange={(e) => handleInputChange("topDepth", e.target.value)}
                              className="h-8"
                              style={{
                                borderColor: PANEL_COLORS.side,
                                backgroundColor: `${PANEL_COLORS.side}05`,
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="all-bottom-depth" className="text-xs">
                              Bottom Depth (mm)
                            </Label>
                            <Input
                              id="all-bottom-depth"
                              type="number"
                              placeholder="0"
                              value={measurements.bottomDepth}
                              onChange={(e) => handleInputChange("bottomDepth", e.target.value)}
                              className="h-8"
                              style={{
                                borderColor: PANEL_COLORS.side,
                                backgroundColor: `${PANEL_COLORS.side}05`,
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Back Panel Measurements (Blue) */}
                      <div className="p-2 rounded-md" style={{ backgroundColor: `${PANEL_COLORS.back}10` }}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PANEL_COLORS.back }}></div>
                          <span className="text-sm font-medium">Back Panel</span>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="all-height" className="text-xs">
                            Bag Height (mm)
                          </Label>
                          <Input
                            id="all-height"
                            type="number"
                            placeholder="0"
                            value={measurements.height}
                            onChange={(e) => handleInputChange("height", e.target.value)}
                            className="h-8"
                            style={{
                              borderColor: PANEL_COLORS.back,
                              backgroundColor: `${PANEL_COLORS.back}05`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Bottom Panel Measurements (Yellow/Gold) */}
                      <div className="p-2 rounded-md" style={{ backgroundColor: `${PANEL_COLORS.bottom}10` }}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PANEL_COLORS.bottom }}></div>
                          <span className="text-sm font-medium">Bottom Panel</span>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="all-opening-width" className="text-xs">
                            Opening Width (mm)
                          </Label>
                          <Input
                            id="all-opening-width"
                            type="number"
                            placeholder="0"
                            value={measurements.openingWidth}
                            onChange={(e) => handleInputChange("openingWidth", e.target.value)}
                            className="h-8"
                            style={{
                              borderColor: PANEL_COLORS.bottom,
                              backgroundColor: `${PANEL_COLORS.bottom}05`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Material Thickness (Purple) */}
                      <div className="p-2 rounded-md" style={{ backgroundColor: `${PANEL_COLORS.material}10` }}>
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: PANEL_COLORS.material }}
                          ></div>
                          <span className="text-sm font-medium">Material</span>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="all-material-thickness" className="text-xs">
                            Material Thickness (mm)
                          </Label>
                          <Input
                            id="all-material-thickness"
                            type="number"
                            placeholder="0"
                            value={measurements.materialThickness}
                            onChange={(e) => handleInputChange("materialThickness", e.target.value)}
                            className="h-8"
                            style={{
                              borderColor: PANEL_COLORS.material,
                              backgroundColor: `${PANEL_COLORS.material}05`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="additional">
                  <AccordionTrigger className="text-sm font-medium">Additional Features</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-1">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label htmlFor="handle-width" className="text-xs">
                            Handle Width (mm)
                          </Label>
                          <Input id="handle-width" type="number" placeholder="0" className="h-8" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="handle-length" className="text-xs">
                            Handle Length (mm)
                          </Label>
                          <Input id="handle-length" type="number" placeholder="0" className="h-8" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label htmlFor="pocket-width" className="text-xs">
                            Pocket Width (mm)
                          </Label>
                          <Input id="pocket-width" type="number" placeholder="0" className="h-8" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="pocket-height" className="text-xs">
                            Pocket Height (mm)
                          </Label>
                          <Input id="pocket-height" type="number" placeholder="0" className="h-8" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="seam-allowance" className="text-xs">
                          Seam Allowance (mm)
                        </Label>
                        <Input id="seam-allowance" type="number" placeholder="0" className="h-8" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Button className="w-full">
                <Check className="mr-1 h-4 w-4" />
                Apply All Measurements
              </Button>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="presets" className="flex-1 m-0 p-2 overflow-hidden">
          <ScrollArea className="h-full pr-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Bag Type Presets</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a bag type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tote">Standard Tote</SelectItem>
                    <SelectItem value="messenger">Messenger Bag</SelectItem>
                    <SelectItem value="backpack">Backpack</SelectItem>
                    <SelectItem value="clutch">Clutch</SelectItem>
                    <SelectItem value="duffle">Duffle Bag</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Size Presets</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    Small
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    Medium
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    Large
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preset-thickness">Material Thickness</Label>
                <Select defaultValue="1.2">
                  <SelectTrigger id="preset-thickness">
                    <SelectValue placeholder="Select thickness" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.8">0.8mm - Light</SelectItem>
                    <SelectItem value="1.2">1.2mm - Medium</SelectItem>
                    <SelectItem value="2.0">2.0mm - Heavy</SelectItem>
                    <SelectItem value="3.0">3.0mm - Extra Heavy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">
                <Check className="mr-1 h-4 w-4" />
                Apply Preset Measurements
              </Button>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
