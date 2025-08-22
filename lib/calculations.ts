interface CalculationInputs {
  fleetSize: number
  routeKmPerDay: number
  dieselCost: number
  maintenanceSpend: number
  vehicleType: "sedan" | "van" | "truck"
  operationType: "relaxed" | "intermediate" | "intensive"
}

interface CalculationResult {
  savingsPct: number
  co2: number
  monthlyFuelSavings: number
  paybackMonths: number
  totalMonthlySavings: number
  fleetSize: number
  routeKmPerDay: number
  vehicleType: string
  operationType: string
  chargingInfrastructure: {
    dailyEnergyPerVehicle: number
    totalDailyEnergy: number
    chargingHours: number
    requiredChargingPower: number
    chargerType: string
    chargerPowerKw: number
    chargersPerStation: number
    requiredStations: number
    totalInstalledPower: number
    estimatedInstallationCost: number
  }
}

export function calculateVehicleElectrification(inputs: CalculationInputs): CalculationResult {
  const { fleetSize, routeKmPerDay, dieselCost, maintenanceSpend, vehicleType, operationType } = inputs

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

  // Calculate savings
  const dailyFuelCost = routeKmPerDay * 0.35 * dieselCost * fleetSize // 0.35L per km average
  const monthlyFuelCost = dailyFuelCost * 30
  const monthlyElectricityCost = totalDailyEnergy * 0.15 * fleetSize * 30 // $0.15 per kWh

  const monthlySavings = monthlyFuelCost + maintenanceSpend - monthlyElectricityCost - maintenanceSpend * 0.4
  const savingsPct = Math.round((monthlySavings / (monthlyFuelCost + maintenanceSpend)) * 100)

  // CO2 calculation (kg per month)
  const co2 = Math.round((routeKmPerDay * 2.3 * fleetSize * 30) / 1000) // 2.3kg CO2 per liter diesel

  return {
    savingsPct: Math.max(15, Math.min(savingsPct, 65)), // Clamp between 15-65%
    co2,
    monthlyFuelSavings: Math.round(monthlyFuelCost - monthlyElectricityCost),
    paybackMonths: Math.round((fleetSize * 80000) / monthlySavings), // Assuming $80k per EV
    totalMonthlySavings: Math.round(monthlySavings),
    fleetSize,
    routeKmPerDay,
    vehicleType,
    operationType,
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
}

// Helper function to generate monthly data for charts
export function generateMonthlyData(baseCalculation: CalculationResult) {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"]
  
  const savingsData = months.map((month, index) => {
    // Add some variation to make the data more realistic
    const variation = 1 + (Math.sin(index * 0.5) * 0.05) // ±5% variation
    const monthlyFuelCost = (baseCalculation.totalMonthlySavings + baseCalculation.chargingInfrastructure.totalDailyEnergy * 0.15 * 30) * variation
    const monthlyElectricityCost = baseCalculation.chargingInfrastructure.totalDailyEnergy * 0.15 * 30 * variation
    
    return {
      month,
      diesel: Math.round(monthlyFuelCost),
      ev: Math.round(monthlyElectricityCost),
    }
  })

  const co2Data = months.map((month, index) => ({
    month,
    reduccion: Math.round(baseCalculation.co2 * (0.8 + index * 0.03)), // Progressive improvement
  }))

  return { savingsData, co2Data }
}

// Helper function to calculate fleet status based on fleet size
export function generateFleetStatus(fleetSize: number) {
  const operational = Math.floor(fleetSize * 0.88) // 88% operational
  const maintenance = Math.floor(fleetSize * 0.08) // 8% in maintenance
  const charging = fleetSize - operational - maintenance // Rest charging

  return [
    { name: "Operativos", value: operational, color: "#115F5F" },
    { name: "Mantenimiento", value: maintenance, color: "#FF7575" },
    { name: "Carga", value: charging, color: "#FFA500" },
  ]
}

export type { CalculationInputs, CalculationResult }
