# Análisis de Cálculos - Dashboard VEMO

## 📍 Ubicación de los Cálculos

### 1. **Cálculos REALES** - `app/api/estimate/route.ts`
Este es donde se encuentran los cálculos matemáticos verdaderos:

\`\`\`typescript
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

// Mock calculations for savings
const dailyFuelCost = routeKmPerDay * 0.35 * dieselCost * fleetSize // 0.35L per km average
const monthlyFuelCost = dailyFuelCost * 30
const monthlyElectricityCost = totalDailyEnergy * 0.15 * fleetSize * 30 // $0.15 per kWh

const monthlySavings = monthlyFuelCost + maintenanceSpend - monthlyElectricityCost - maintenanceSpend * 0.4
const savingsPct = Math.round((monthlySavings / (monthlyFuelCost + maintenanceSpend)) * 100)

// CO2 calculation (kg per month)
const co2 = Math.round((routeKmPerDay * 2.3 * fleetSize * 30) / 1000) // 2.3kg CO2 per liter diesel
\`\`\`

#### Cálculos de Infraestructura de Carga:
- **Potencia requerida**: Basada en energía diaria y ventana de carga de 9 horas
- **Tipo de cargador**: Determinado por tipo de operación (relajada, intermedia, intensiva)
- **Número de estaciones**: Calculado según potencia total necesaria
- **Costo de instalación**: Estimado según tipo de cargador

### 2. **Datos Simulados de la Dashboard** - `components/dashboard.tsx`
La dashboard actualmente muestra datos hardcodeados:

\`\`\`typescript
const mockData: DashboardData = {
  plan: "plus",
  fleetSize: 25,
  monthlySavings: 48844,
  co2Reduction: 259,
  batteryCapacity: "85-110",
  chargingPower: 450,
  paybackPeriod: 41,
  roi: 65,
}

const savingsData = [
  { month: "Ene", diesel: 85000, ev: 52000 },
  { month: "Feb", diesel: 87000, ev: 53500 },
  { month: "Mar", diesel: 89000, ev: 54800 },
  { month: "Abr", diesel: 91000, ev: 56200 },
  { month: "May", diesel: 93000, ev: 57600 },
  { month: "Jun", diesel: 95000, ev: 59000 },
]

const co2Data = [
  { month: "Ene", reduccion: 18 },
  { month: "Feb", reduccion: 22 },
  { month: "Mar", reduccion: 25 },
  { month: "Abr", reduccion: 28 },
  { month: "May", reduccion: 31 },
  { month: "Jun", reduccion: 35 },
]

const fleetStatusData = [
  { name: "Operativos", value: 22, color: "#115F5F" },
  { name: "Mantenimiento", value: 2, color: "#FF7575" },
  { name: "Carga", value: 1, color: "#FFA500" },
]
\`\`\`

### 3. **Datos por Defecto** - `app/dashboard/page.tsx`
La página del dashboard tiene datos predeterminados:

\`\`\`typescript
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
\`\`\`

## 🚨 Problema Identificado

### **La dashboard NO está conectada con los cálculos reales**

Los cálculos verdaderos están en la API `/api/estimate/route.ts`, pero la dashboard está mostrando únicamente datos simulados/mock.

## 🔧 Soluciones Propuestas

Para conectar los cálculos reales con la dashboard se pueden implementar las siguientes opciones:

### Opción 1: Dashboard consume API existente
- Hacer que la dashboard llame a `/api/estimate` con datos de entrada
- Mostrar los resultados calculados en tiempo real

### Opción 2: Utility compartido
- Mover la lógica de cálculo a `lib/calculations.ts`
- Usar la misma lógica tanto en la API como en la dashboard

### Opción 3: Nueva API específica
- Crear `/api/dashboard` con cálculos optimizados para la vista del dashboard
- Incluir datos históricos y proyecciones

## 📊 Métricas Calculadas Disponibles

Desde la API `/api/estimate/route.ts`:

- **Ahorros mensuales**: `monthlySavings`
- **Porcentaje de ahorro**: `savingsPct` (15-65%)
- **CO2 evitado**: `co2` (kg por mes)
- **Período de retorno**: `paybackMonths`
- **Infraestructura de carga**:
  - Energía diaria por vehículo
  - Potencia de carga requerida
  - Tipo y número de cargadores
  - Costo estimado de instalación

## 📁 Estructura de Archivos Relevantes

\`\`\`
app/
├── api/
│   └── estimate/
│       └── route.ts          # ✅ Cálculos reales
├── dashboard/
│   └── page.tsx             # ❌ Datos estáticos por defecto
components/
└── dashboard.tsx            # ❌ Datos mock hardcodeados
\`\`\`

## 🎯 Recomendación

**Prioridad Alta**: Conectar la dashboard con los cálculos reales para mostrar datos precisos y actualizados basados en los parámetros de entrada del usuario.
