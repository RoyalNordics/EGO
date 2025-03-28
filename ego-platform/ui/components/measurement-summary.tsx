import { Card, CardContent } from "@/components/ui/card"

// Panel colors
const PANEL_COLORS = {
  front: "#E11D48", // Red
  back: "#2563EB", // Blue
  side: "#16A34A", // Green
  bottom: "#CA8A04", // Yellow/Gold
  material: "#9333EA", // Purple
}

export default function MeasurementSummary({ measurements }) {
  // Check if any measurements have been entered
  const hasMeasurements = Object.values(measurements).some((value) => value !== "")

  if (!hasMeasurements) {
    return null
  }

  return (
    <div className="border-t p-2 bg-muted/20">
      <div className="text-xs font-medium mb-2">Measurement Summary</div>
      <div className="flex flex-wrap gap-2">
        {/* Front Panel Measurements (Red) */}
        {(measurements.topWidth || measurements.bottomWidth) && (
          <Card className="p-1 flex-1 min-w-[120px]" style={{ borderColor: PANEL_COLORS.front }}>
            <CardContent className="p-1">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PANEL_COLORS.front }}></div>
                <span className="text-xs font-medium">Front Panel</span>
              </div>
              {measurements.topWidth && <div className="text-xs">Top: {measurements.topWidth} mm</div>}
              {measurements.bottomWidth && <div className="text-xs">Bottom: {measurements.bottomWidth} mm</div>}
            </CardContent>
          </Card>
        )}

        {/* Side Panel Measurements (Green) */}
        {(measurements.topDepth || measurements.bottomDepth) && (
          <Card className="p-1 flex-1 min-w-[120px]" style={{ borderColor: PANEL_COLORS.side }}>
            <CardContent className="p-1">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PANEL_COLORS.side }}></div>
                <span className="text-xs font-medium">Side Panel</span>
              </div>
              {measurements.topDepth && <div className="text-xs">Top: {measurements.topDepth} mm</div>}
              {measurements.bottomDepth && <div className="text-xs">Bottom: {measurements.bottomDepth} mm</div>}
            </CardContent>
          </Card>
        )}

        {/* Back Panel Measurements (Blue) */}
        {measurements.height && (
          <Card className="p-1 flex-1 min-w-[120px]" style={{ borderColor: PANEL_COLORS.back }}>
            <CardContent className="p-1">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PANEL_COLORS.back }}></div>
                <span className="text-xs font-medium">Back Panel</span>
              </div>
              <div className="text-xs">Height: {measurements.height} mm</div>
            </CardContent>
          </Card>
        )}

        {/* Bottom Panel Measurements (Yellow/Gold) */}
        {measurements.openingWidth && (
          <Card className="p-1 flex-1 min-w-[120px]" style={{ borderColor: PANEL_COLORS.bottom }}>
            <CardContent className="p-1">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PANEL_COLORS.bottom }}></div>
                <span className="text-xs font-medium">Bottom Panel</span>
              </div>
              <div className="text-xs">Opening: {measurements.openingWidth} mm</div>
            </CardContent>
          </Card>
        )}

        {/* Material Thickness (Purple) */}
        {measurements.materialThickness && (
          <Card className="p-1 flex-1 min-w-[120px]" style={{ borderColor: PANEL_COLORS.material }}>
            <CardContent className="p-1">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PANEL_COLORS.material }}></div>
                <span className="text-xs font-medium">Material</span>
              </div>
              <div className="text-xs">Thickness: {measurements.materialThickness} mm</div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

