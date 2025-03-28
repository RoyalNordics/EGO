"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash, Copy, Save, FolderOpen, Filter } from "lucide-react"

export default function TemplateManager() {
  const [activeTab, setActiveTab] = useState("browse")

  return (
    <div className="container py-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Measurement Templates</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FolderOpen className="h-4 w-4 mr-2" />
            Import Template
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="browse">Browse Templates</TabsTrigger>
          <TabsTrigger value="editor">Template Editor</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search templates..." className="pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Tote Bag</CardTitle>
                <CardDescription>Standard tote bag measurements</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-sm text-muted-foreground">
                  <div>10 measurements</div>
                  <div>Last updated: 2 days ago</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
                <Button size="sm">
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Apply
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Messenger Bag</CardTitle>
                <CardDescription>Crossbody messenger style</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-sm text-muted-foreground">
                  <div>15 measurements</div>
                  <div>Last updated: 1 week ago</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
                <Button size="sm">
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Apply
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Backpack</CardTitle>
                <CardDescription>Standard backpack with pockets</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-sm text-muted-foreground">
                  <div>22 measurements</div>
                  <div>Last updated: 3 weeks ago</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
                <Button size="sm">
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Apply
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Clutch</CardTitle>
                <CardDescription>Small handheld clutch bag</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-sm text-muted-foreground">
                  <div>8 measurements</div>
                  <div>Last updated: 1 month ago</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
                <Button size="sm">
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Apply
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Duffle Bag</CardTitle>
                <CardDescription>Cylindrical travel bag</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-sm text-muted-foreground">
                  <div>12 measurements</div>
                  <div>Last updated: 2 months ago</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
                <Button size="sm">
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Apply
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="editor" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input id="template-name" placeholder="e.g., Standard Tote Bag" defaultValue="Tote Bag" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-description">Description</Label>
                <Textarea
                  id="template-description"
                  placeholder="Describe the template..."
                  defaultValue="Standard tote bag measurements for medium-sized bags."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-category">Category</Label>
                <Input id="template-category" placeholder="e.g., Totes, Backpacks" defaultValue="Totes" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Default Units</Label>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="units-mm" name="units" className="h-4 w-4" defaultChecked />
                    <label htmlFor="units-mm" className="text-sm">
                      mm
                    </label>

                    <input type="radio" id="units-cm" name="units" className="h-4 w-4 ml-2" />
                    <label htmlFor="units-cm" className="text-sm">
                      cm
                    </label>

                    <input type="radio" id="units-in" name="units" className="h-4 w-4 ml-2" />
                    <label htmlFor="units-in" className="text-sm">
                      inches
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Default Material</Label>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="material-leather" name="material" className="h-4 w-4" />
                  <label htmlFor="material-leather" className="text-sm">
                    Leather
                  </label>

                  <input type="radio" id="material-canvas" name="material" className="h-4 w-4 ml-2" defaultChecked />
                  <label htmlFor="material-canvas" className="text-sm">
                    Canvas
                  </label>

                  <input type="radio" id="material-synthetic" name="material" className="h-4 w-4 ml-2" />
                  <label htmlFor="material-synthetic" className="text-sm">
                    Synthetic
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Default Thickness</Label>
                <Input type="number" defaultValue="1.2" min="0.1" step="0.1" className="w-24" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Measurements</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Measurement
              </Button>
            </div>

            <ScrollArea className="h-[400px] border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Default Value</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Front Width</TableCell>
                    <TableCell>300</TableCell>
                    <TableCell>Length</TableCell>
                    <TableCell>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </TableCell>
                    <TableCell>Main panel width</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Front Height</TableCell>
                    <TableCell>350</TableCell>
                    <TableCell>Length</TableCell>
                    <TableCell>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </TableCell>
                    <TableCell>Main panel height</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Side Width</TableCell>
                    <TableCell>100</TableCell>
                    <TableCell>Length</TableCell>
                    <TableCell>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </TableCell>
                    <TableCell>Bag depth</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bottom Width</TableCell>
                    <TableCell>300</TableCell>
                    <TableCell>Length</TableCell>
                    <TableCell>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </TableCell>
                    <TableCell>Bottom panel width</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bottom Depth</TableCell>
                    <TableCell>100</TableCell>
                    <TableCell>Length</TableCell>
                    <TableCell>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </TableCell>
                    <TableCell>Bottom panel depth</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Handle Width</TableCell>
                    <TableCell>30</TableCell>
                    <TableCell>Length</TableCell>
                    <TableCell>
                      <input type="checkbox" className="h-4 w-4" />
                    </TableCell>
                    <TableCell>Handle strap width</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Handle Length</TableCell>
                    <TableCell>500</TableCell>
                    <TableCell>Length</TableCell>
                    <TableCell>
                      <input type="checkbox" className="h-4 w-4" />
                    </TableCell>
                    <TableCell>Handle strap length</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Material Thickness</TableCell>
                    <TableCell>1.2</TableCell>
                    <TableCell>Thickness</TableCell>
                    <TableCell>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </TableCell>
                    <TableCell>Fabric thickness</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ScrollArea>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button>
              <Save className="h-4 w-4 mr-1" />
              Save Template
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

