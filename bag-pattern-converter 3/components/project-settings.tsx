"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Save, RotateCcw } from "lucide-react"

export default function ProjectSettings() {
  return (
    <div className="container py-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Project Settings</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="units">Units & Precision</TabsTrigger>
          <TabsTrigger value="export">Export Options</TabsTrigger>
          <TabsTrigger value="version">Version Control</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
              <CardDescription>Basic information about your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input id="project-name" placeholder="Enter project name" defaultValue="Tote Bag v1.2" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-author">Author</Label>
                  <Input id="project-author" placeholder="Your name" defaultValue="Design Team" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  placeholder="Describe your project..."
                  defaultValue="Standard tote bag design with reinforced bottom and interior pocket."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-tags">Tags</Label>
                <Input
                  id="project-tags"
                  placeholder="e.g., tote, canvas, medium"
                  defaultValue="tote, bag, canvas, medium"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interface Settings</CardTitle>
              <CardDescription>Customize the application interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-save">Auto Save</Label>
                  <div className="text-sm text-muted-foreground">Automatically save changes every 5 minutes</div>
                </div>
                <Switch id="auto-save" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <div className="text-sm text-muted-foreground">Use dark color scheme</div>
                </div>
                <Switch id="dark-mode" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-grid">Show Grid</Label>
                  <div className="text-sm text-muted-foreground">Display grid in pattern view</div>
                </div>
                <Switch id="show-grid" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="snap-to-grid">Snap to Grid</Label>
                  <div className="text-sm text-muted-foreground">Snap measurements to grid points</div>
                </div>
                <Switch id="snap-to-grid" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="units" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Measurement Units</CardTitle>
              <CardDescription>Set default units for measurements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-unit">Default Unit</Label>
                <Select defaultValue="mm">
                  <SelectTrigger id="default-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm">Millimeters (mm)</SelectItem>
                    <SelectItem value="cm">Centimeters (cm)</SelectItem>
                    <SelectItem value="in">Inches (in)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="angle-unit">Angle Unit</Label>
                <Select defaultValue="deg">
                  <SelectTrigger id="angle-unit">
                    <SelectValue placeholder="Select angle unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deg">Degrees (°)</SelectItem>
                    <SelectItem value="rad">Radians (rad)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="precision">Decimal Precision</Label>
                <Select defaultValue="1">
                  <SelectTrigger id="precision">
                    <SelectValue placeholder="Select precision" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 decimal places</SelectItem>
                    <SelectItem value="1">1 decimal place</SelectItem>
                    <SelectItem value="2">2 decimal places</SelectItem>
                    <SelectItem value="3">3 decimal places</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-units">Show Units</Label>
                  <div className="text-sm text-muted-foreground">Display units with measurement values</div>
                </div>
                <Switch id="show-units" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="convert-units">Auto Convert Units</Label>
                  <div className="text-sm text-muted-foreground">
                    Automatically convert between units when changing default
                  </div>
                </div>
                <Switch id="convert-units" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scale Settings</CardTitle>
              <CardDescription>Configure scale for pattern display</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scale-ratio">Scale Ratio</Label>
                <Select defaultValue="1:1">
                  <SelectTrigger id="scale-ratio">
                    <SelectValue placeholder="Select scale" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1:1">1:1 (Actual size)</SelectItem>
                    <SelectItem value="1:2">1:2 (Half size)</SelectItem>
                    <SelectItem value="1:5">1:5 (One fifth size)</SelectItem>
                    <SelectItem value="1:10">1:10 (One tenth size)</SelectItem>
                    <SelectItem value="custom">Custom scale...</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="grid-size">Grid Size</Label>
                <div className="flex gap-2">
                  <Input id="grid-size" type="number" defaultValue="10" className="w-24" />
                  <span className="flex items-center text-sm text-muted-foreground">mm</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>3D Export Options</CardTitle>
              <CardDescription>Configure 3D model export settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="export-format">Default Format</Label>
                <Select defaultValue="obj">
                  <SelectTrigger id="export-format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="obj">OBJ (.obj)</SelectItem>
                    <SelectItem value="stl">STL (.stl)</SelectItem>
                    <SelectItem value="fbx">FBX (.fbx)</SelectItem>
                    <SelectItem value="glb">glTF Binary (.glb)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="export-scale">Export Scale</Label>
                <Select defaultValue="mm">
                  <SelectTrigger id="export-scale">
                    <SelectValue placeholder="Select scale" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm">Millimeters (mm)</SelectItem>
                    <SelectItem value="cm">Centimeters (cm)</SelectItem>
                    <SelectItem value="m">Meters (m)</SelectItem>
                    <SelectItem value="in">Inches (in)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="export-materials">Export Materials</Label>
                  <div className="text-sm text-muted-foreground">Include material information in export</div>
                </div>
                <Switch id="export-materials" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="export-textures">Export Textures</Label>
                  <div className="text-sm text-muted-foreground">Include texture maps in export</div>
                </div>
                <Switch id="export-textures" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="export-separate">Export as Separate Objects</Label>
                  <div className="text-sm text-muted-foreground">Export each pattern piece as a separate object</div>
                </div>
                <Switch id="export-separate" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2D Export Options</CardTitle>
              <CardDescription>Configure 2D pattern export settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="2d-export-format">Default Format</Label>
                <Select defaultValue="svg">
                  <SelectTrigger id="2d-export-format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="svg">SVG (.svg)</SelectItem>
                    <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                    <SelectItem value="dxf">DXF (.dxf)</SelectItem>
                    <SelectItem value="png">PNG (.png)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="export-measurements">Include Measurements</Label>
                  <div className="text-sm text-muted-foreground">Show measurement annotations in export</div>
                </div>
                <Switch id="export-measurements" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="export-seam">Include Seam Allowance</Label>
                  <div className="text-sm text-muted-foreground">Add seam allowance to pattern pieces</div>
                </div>
                <Switch id="export-seam" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="version" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Version Control</CardTitle>
              <CardDescription>Manage project versions and history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Version</Label>
                <div className="text-sm p-2 bg-muted rounded-md">v1.2.0 (Last saved: Today at 10:23 AM)</div>
              </div>

              <div className="space-y-2">
                <Label>Version History</Label>
                <div className="border rounded-md divide-y">
                  <div className="p-2 flex items-center justify-between">
                    <div>
                      <div className="font-medium">v1.2.0</div>
                      <div className="text-xs text-muted-foreground">Today at 10:23 AM</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Restore
                    </Button>
                  </div>
                  <div className="p-2 flex items-center justify-between">
                    <div>
                      <div className="font-medium">v1.1.0</div>
                      <div className="text-xs text-muted-foreground">Yesterday at 3:45 PM</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Restore
                    </Button>
                  </div>
                  <div className="p-2 flex items-center justify-between">
                    <div>
                      <div className="font-medium">v1.0.0</div>
                      <div className="text-xs text-muted-foreground">March 24, 2025 at 9:12 AM</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Restore
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-version">Auto Version</Label>
                  <div className="text-sm text-muted-foreground">Automatically create versions on save</div>
                </div>
                <Switch id="auto-version" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="version-notes">Version Notes</Label>
                <Textarea
                  id="version-notes"
                  placeholder="Notes for current version..."
                  defaultValue="Added interior pocket and adjusted handle measurements."
                />
              </div>

              <Button className="w-full">
                <Save className="h-4 w-4 mr-1" />
                Save as New Version
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

