"use client"

import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Save,
  FolderOpen,
  FileUp,
  FileDown,
  Plus,
  Undo,
  Redo,
  Maximize,
  Grid,
  Eye,
  EyeOff,
  Layers,
  Ruler,
  CuboidIcon as Cube,
  Settings,
  RotateCcw,
} from "lucide-react"
import PatternView from "@/components/pattern-view"
import ModelPreview from "@/components/model-preview"
import MeasurementPanel from "@/components/measurement-panel"
import StatusBar from "@/components/status-bar"
import TemplateManager from "@/components/template-manager"
import ProjectSettings from "@/components/project-settings"
import MeasurementSummary from "@/components/measurement-summary"
import DesignSummary from "@/components/design-summary";

export default function BagPatternConverter() {
  const [showMeasurementPanel, setShowMeasurementPanel] = useState(true);
  const [activeTab, setActiveTab] = useState("editor");
  const [measurements, setMeasurements] = useState({
    topWidth: "",
    bottomWidth: "",
    topDepth: "",
    bottomDepth: "",
    height: "",
    openingWidth: "",
    materialThickness: "",
  });
  const [activeField, setActiveField] = useState("");
  const [bagModel, setBagModel] = useState("Tote Bag");
  const [materials, setMaterials] = useState(["Canvas", "Leather"]);
  const [isConverting, setIsConverting] = useState(false);

  const handleMeasurementsChange = (newMeasurements, field = "") => {
    setMeasurements(newMeasurements);
    if (newMeasurements.bagModel) {
      setBagModel(newMeasurements.bagModel);
    }
    if (newMeasurements.materials) {
      setMaterials(newMeasurements.materials);
    }
    if (field) {
      setActiveField(field)
    }
  }

  const convertTo3D = useCallback(async () => {
    setIsConverting(true);
    try {
      // Send the 2D pattern data to the backend
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ measurements, bagModel, materials }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Handle the 3D model data
      console.log(data);
    } catch (error) {
      console.error("Could not convert 2D to 3D", error);
    } finally {
      setIsConverting(false);
    }
  }, [measurements, bagModel, materials]);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top Toolbar */}
      <div className="border-b p-2 flex items-center justify-between bg-background">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" title="New Project">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="Open Project">
            <FolderOpen className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="Save Project">
            <Save className="h-4 w-4" />
          </Button>
          <div className="h-4 w-px bg-border mx-1" />
          <Button variant="outline" size="icon" title="Import SVG">
            <FileUp className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="Export 3D Model">
            <FileDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="Convert to 3D" onClick={convertTo3D} disabled={isConverting}>
            {isConverting ? "Converting..." : "Convert to 3D"}
          </Button>
          <div className="h-4 w-px bg-border mx-1" />
          <Button variant="outline" size="icon" title="Undo">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="Redo">
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-lg font-semibold text-center">2D to 3D Bag Pattern Converter</div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList>
            <TabsTrigger value="editor" className="flex items-center gap-1">
              <Ruler className="h-4 w-4" />
              <span>Editor</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-1">
              <Layers className="h-4 w-4" />
              <span>Templates</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsContent value="editor" className="flex-1 flex m-0 p-0 h-full">
            {/* Main Editor Interface */}
            <div className="flex flex-1 overflow-hidden">
              {/* 2D Pattern View (40%) */}
              <div className="w-2/5 border-r flex flex-col">
                <div className="border-b p-2 flex items-center justify-between bg-muted/30">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="h-8">
                      <Ruler className="h-4 w-4 mr-1" />
                      Linear
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8">
                      <Grid className="h-4 w-4 mr-1" />
                      Angular
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8">
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Radius
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowMeasurementPanel(!showMeasurementPanel)}
                      className="h-8"
                    >
                      {showMeasurementPanel ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                      {showMeasurementPanel ? "Hide Panel" : "Show Panel"}
                    </Button>
                  </div>
                </div>

                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="flex-1 overflow-hidden">
                    <PatternView measurements={measurements} />
                  </div>

                  {/* Measurement Summary at the bottom of the left panel */}
                  <MeasurementSummary measurements={measurements} />

                  {/* Design Summary at the bottom of the left panel */}
                  <DesignSummary bagModel={bagModel} materials={materials} />

                  {showMeasurementPanel && (
                    <div className="w-64 border-l bg-background overflow-y-auto">
                      <MeasurementPanel onMeasurementsChange={handleMeasurementsChange} />
                    </div>
                  )}
                </div>
              </div>

              {/* 3D Model Preview (60%) */}
              <div className="w-3/5 flex flex-col">
                <div className="border-b p-2 flex items-center justify-between bg-muted/30">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="h-8">
                      <Cube className="h-4 w-4 mr-1" />
                      Solid
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8">
                      <Eye className="h-4 w-4 mr-1" />
                      Show Seams
                    </Button>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm" className="h-8">
                      <Maximize className="h-4 w-4 mr-1" />
                      Reset View
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-hidden">
                  <ModelPreview measurements={measurements} activeField={activeField} />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="flex-1 m-0 p-0 h-full overflow-auto">
            <TemplateManager />
          </TabsContent>

          <TabsContent value="settings" className="flex-1 m-0 p-0 h-full overflow-auto">
            <ProjectSettings />
          </TabsContent>
        </Tabs>
      </div>

      {/* Status Bar */}
      <StatusBar measurements={measurements} />
    </div>
  )
}
