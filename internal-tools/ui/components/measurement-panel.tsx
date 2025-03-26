"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X, Plus, FileSpreadsheet } from "lucide-react"

export default function MeasurementPanel() {
  const [activeTab, setActiveTab] = useState("add")

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b bg-muted/30">
        <h3 className="text-sm font-medium">Measurement Panel</h3>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="mx-2 mt-2 justify-start">
          <TabsTrigger value="add">Add</TabsTrigger>
          <TabsTrigger value="batch">Batch</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
        </TabsList>

        <TabsContent value="add" className="flex-1 m-0 p-2 overflow-hidden">
          <ScrollArea className="h-full pr-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="measurement-name">Measurement Name</Label>
                <Input id="measurement-name" placeholder="e.g., Front Width" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="measurement-value">Value</Label>
                <div className="flex gap-2">
                  <Input id="measurement-value" placeholder="0.0" className="flex-1" />
                  <Select defaultValue="mm">
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm">mm</SelectItem>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="in">inches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="measurement-type">Measurement Type</Label>
                <Select defaultValue="length">
                  <SelectTrigger id="measurement-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="length">Length</SelectItem>
                    <SelectItem value="width">Width</SelectItem>
                    <SelectItem value="height">Height</SelectItem>
                    <SelectItem value="depth">Depth</SelectItem>
                    <SelectItem value="thickness">Thickness</SelectItem>
                    <SelectItem value="radius">Radius</SelectItem>
                    <SelectItem value="angle">Angle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="measurement-notes">Notes</Label>
                <Textarea id="measurement-notes" placeholder="Add any additional information..." />
              </div>

              <div className="space-y-2">
                <Label>Required</Label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="required" className="h-4 w-4" />
                  <label htmlFor="required" className="text-sm">
                    Mark as required measurement
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline" size="sm">
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button size="sm">
                  <Check className="h-4 w-4 mr-1" />
                  Add Measurement
                </Button>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="batch" className="flex-1 m-0 p-2 overflow-hidden">
          <ScrollArea className="h-full pr-2">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium">Batch Measurements</h4>
                <Button variant="outline" size="sm">
                  <FileSpreadsheet className="h-4 w-4 mr-1" />
                  Import CSV
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Input placeholder="Name" className="h-7 text-xs" />
                    </TableCell>
                    <TableCell>
                      <Input placeholder="Value" className="h-7 text-xs" />
                    </TableCell>
                    <TableCell>
                      <Select defaultValue="mm">
                        <SelectTrigger className="h-7 text-xs">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mm">mm</SelectItem>
                          <SelectItem value="cm">cm</SelectItem>
                          <SelectItem value="in">in</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select defaultValue="length">
                        <SelectTrigger className="h-7 text-xs">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="length">Length</SelectItem>
                          <SelectItem value="width">Width</SelectItem>
                          <SelectItem value="depth">Depth</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Input placeholder="Name" className="h-7 text-xs" />
                    </TableCell>
                    <TableCell>
                      <Input placeholder="Value" className="h-7 text-xs" />
                    </TableCell>
                    <TableCell>
                      <Select defaultValue="mm">
                        <SelectTrigger className="h-7 text-xs">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mm">mm</SelectItem>
                          <SelectItem value="cm">cm</SelectItem>
                          <SelectItem value="in">in</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select defaultValue="length">
                        <SelectTrigger className="h-7 text-xs">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="length">Length</SelectItem>
                          <SelectItem value="width">Width</SelectItem>
                          <SelectItem value="depth">Depth</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-1" />
                Add Row
              </Button>

              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline" size="sm">
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button size="sm">
                  <Check className="h-4 w-4 mr-1" />
                  Apply All
                </Button>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="presets" className="flex-1 m-0 p-2 overflow-hidden">
          <ScrollArea className="h-full pr-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="preset-category">Material Category</Label>
                <Select defaultValue="leather">
                  <SelectTrigger id="preset-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leather">Leather</SelectItem>
                    <SelectItem value="canvas">Canvas</SelectItem>
                    <SelectItem value="denim">Denim</SelectItem>
                    <SelectItem value="synthetic">Synthetic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preset-thickness">Standard Thickness</Label>
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

              <div className="space-y-2">
                <Label>Hardware Presets</Label>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="hardware-zipper" className="h-4 w-4" />
                    <label htmlFor="hardware-zipper" className="text-sm">
                      Zipper (5mm)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="hardware-buckle" className="h-4 w-4" />
                    <label htmlFor="hardware-buckle" className="text-sm">
                      Buckle (25mm)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="hardware-snap" className="h-4 w-4" />
                    <label htmlFor="hardware-snap" className="text-sm">
                      Snap Button (15mm)
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Standard Measurements</Label>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="standard-strap" className="h-4 w-4" />
                    <label htmlFor="standard-strap" className="text-sm">
                      Strap Width (30mm)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="standard-seam" className="h-4 w-4" />
                    <label htmlFor="standard-seam" className="text-sm">
                      Seam Allowance (10mm)
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button size="sm">
                  <Check className="h-4 w-4 mr-1" />
                  Apply Presets
                </Button>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

