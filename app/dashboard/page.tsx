import Dashboard from "@/components/dashboard"

export default function DashboardPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  // Default calculation inputs for demonstration
  // In a real app, these would come from user session, database, or form data
  const defaultInputs = {
    fleetSize: Number.parseInt(searchParams.fleetSize || "25"),
    routeKmPerDay: Number.parseFloat(searchParams.routeKmPerDay || "150"),
    dieselCost: Number.parseFloat(searchParams.dieselCost || "1.45"),
    maintenanceSpend: Number.parseFloat(searchParams.maintenanceSpend || "5000"),
    vehicleType: (searchParams.vehicleType as "sedan" | "van" | "truck") || "truck",
    operationType: (searchParams.operationType as "relaxed" | "intermediate" | "intensive") || "intermediate",
  }

  const plan = (searchParams.plan as "plus" | "pro") || "plus"

  return <Dashboard plan={plan} calculationInputs={defaultInputs} />
}
