import { type NextRequest, NextResponse } from "next/server"
import { calculateVehicleElectrification, type CalculationInputs } from "@/lib/calculations"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Parse form data
    const inputs: CalculationInputs = {
      fleetSize: Number.parseInt(formData.fleetSize) || 1,
      routeKmPerDay: Number.parseFloat(formData.routeKmPerDay) || 100,
      dieselCost: Number.parseFloat(formData.dieselCost) || 1.2,
      maintenanceSpend: Number.parseFloat(formData.maintenanceSpend) || 1000,
      vehicleType: formData.vehicleType || "sedan",
      operationType: formData.operationType || "intermediate",
    }

    // Calculate using shared utility
    const response = calculateVehicleElectrification(inputs)

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error processing estimate:", error)
    return NextResponse.json({ error: "Failed to process estimate" }, { status: 500 })
  }
}
