import Dashboard from "@/components/dashboard"

export default function DashboardPage() {
  // Default data for demonstration
  const defaultData = {
    fleetSize: 25,
    vehicleType: "Camiones de reparto",
    dailyKm: 150,
    fuelCostPerLiter: 1.45,
    currentMonthlyCost: 45000,
    projectedMonthlyCost: 28000,
    monthlySavings: 17000,
    co2Reduction: 85,
    paybackPeriod: 3.2,
    totalInvestment: 850000,
    roi5Years: 125,
  }

  return <Dashboard plan="plus" data={defaultData} />
}
