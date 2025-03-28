"use client"

import { useState } from "react"
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

export default function BagPatternConverter() {
  const [showMeasurementPanel, setShowMeasurementPanel] = useState(true)
  const [activeTab, setActiveTab] = useState("editor")

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

                <div className="flex-1 flex overflow-hidden">
                  <PatternView />

                  {showMeasurementPanel && (
                    <div className="w-64 border-l bg-background overflow-y-auto">
                      <MeasurementPanel />
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
                  <ModelPreview />
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
      <StatusBar />
    </div>
  )
}

