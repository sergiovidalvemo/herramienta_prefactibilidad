import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock calculation based on form data
    const fleetSize = Number.parseInt(formData.fleetSize) || 1
    const routeKmPerDay = Number.parseFloat(formData.routeKmPerDay) || 100
    const dieselCost = Number.parseFloat(formData.dieselCost) || 1.2
    const maintenanceSpend = Number.parseFloat(formData.maintenanceSpend) || 1000
    const vehicleType = formData.vehicleType || "sedan"
    const operationType = formData.operationType || "intermediate"

    // Calculate energy consumption based on vehicle type
    let energyConsumptionKwhPerKm = 0.15 // Default for sedans
    if (vehicleType === "van") {
      energyConsumptionKwhPerKm = 0.3 // For vans
    } else if (vehicleType === "truck") {
      energyConsumptionKwhPerKm = 0.3 // For trucks
    }

    // Calculate daily energy requirement per vehicle
    const dailyEnergyPerVehicle = routeKmPerDay * energyConsumptionKwhPerKm
    const totalDailyEnergy = dailyEnergyPerVehicle * fleetSize

    // Charging window (22:00 to 07:00 = 9 hours)
    const chargingHours = 9

    // Required charging power based on energy needs and time window
    const requiredChargingPower = totalDailyEnergy / chargingHours

    // Determine charger type and power based on operation type
    let chargerPowerKw = 7 // Default for relaxed
    let chargersPerStation = 1

    if (operationType === "intermediate") {
      chargerPowerKw = 30 // 60kW with 2 hoses of 30kW each
      chargersPerStation = 2
    } else if (operationType === "intensive") {
      chargerPowerKw = 60 // 120kW with 2 hoses of 60kW each
      chargersPerStation = 2
    }

    // Calculate number of charging stations needed
    const effectiveChargerPower = chargerPowerKw * chargersPerStation
    const requiredStations = Math.ceil(requiredChargingPower / effectiveChargerPower)

    // Total installed power needed
    const totalInstalledPower = requiredStations * (chargerPowerKw * chargersPerStation)

    // Mock calculations for savings
    const dailyFuelCost = routeKmPerDay * 0.35 * dieselCost * fleetSize // 0.35L per km average
    const monthlyFuelCost = dailyFuelCost * 30
    const monthlyElectricityCost = totalDailyEnergy * 0.15 * fleetSize * 30 // $0.15 per kWh

    const monthlySavings = monthlyFuelCost + maintenanceSpend - monthlyElectricityCost - maintenanceSpend * 0.4
    const savingsPct = Math.round((monthlySavings / (monthlyFuelCost + maintenanceSpend)) * 100)

    // CO2 calculation (kg per month)
    const co2 = Math.round((routeKmPerDay * 2.3 * fleetSize * 30) / 1000) // 2.3kg CO2 per liter diesel

    const response = {
      savingsPct: Math.max(15, Math.min(savingsPct, 65)), // Clamp between 15-65%
      co2,
      // Additional data for detailed analysis
      monthlyFuelSavings: Math.round(monthlyFuelCost - monthlyElectricityCost),
      paybackMonths: Math.round((fleetSize * 80000) / monthlySavings), // Assuming $80k per EV
      totalMonthlySavings: Math.round(monthlySavings),
      fleetSize,
      routeKmPerDay,
      vehicleType,
      operationType,
      // Charging infrastructure calculations
      chargingInfrastructure: {
        dailyEnergyPerVehicle: Math.round(dailyEnergyPerVehicle * 100) / 100,
        totalDailyEnergy: Math.round(totalDailyEnergy * 100) / 100,
        chargingHours,
        requiredChargingPower: Math.round(requiredChargingPower * 100) / 100,
        chargerType:
          operationType === "relaxed"
            ? "7kW Domiciliario"
            : operationType === "intermediate"
              ? "60kW Comercial (2x30kW)"
              : "120kW Rápido (2x60kW)",
        chargerPowerKw,
        chargersPerStation,
        requiredStations,
        totalInstalledPower,
        estimatedInstallationCost:
          requiredStations * (operationType === "relaxed" ? 8000 : operationType === "intermediate" ? 45000 : 85000),
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error processing estimate:", error)
    return NextResponse.json({ error: "Failed to process estimate" }, { status: 500 })
  }
}
