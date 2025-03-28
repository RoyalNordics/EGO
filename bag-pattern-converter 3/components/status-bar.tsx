export default function StatusBar({ measurements = {} }) {
  // Count completed measurements
  const completedCount = Object.values(measurements).filter((value) => value !== "").length
  const totalRequired = 7 // Total number of required measurements

  return (
    <div className="border-t p-2 flex items-center justify-between text-xs bg-muted/30">
      <div className="flex items-center space-x-4">
        <div>
          Project: <span className="font-medium">Tote Bag v1.2</span>
        </div>
        <div>
          Units: <span className="font-medium">mm</span>
        </div>
        <div>
          Scale: <span className="font-medium">1:1</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-amber-600">Required measurements: {totalRequired}</div>
        <div className="text-green-600">Completed measurements: {completedCount}</div>
        <div>
          Conversion status:
          <span className="font-medium">
            {completedCount === totalRequired ? " Ready" : " Waiting for measurements"}
          </span>
        </div>
      </div>
    </div>
  )
}

