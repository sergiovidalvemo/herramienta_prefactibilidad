"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  TrendingUp,
  Leaf,
  Car,
  Zap,
  DollarSign,
  Calendar,
  BarChart3,
  Crown,
  Download,
  Share2,
  Users,
  Target,
  Gauge,
  ArrowUp,
} from "lucide-react"
import VemoLogo from "./vemo-logo"

interface DashboardData {
  plan: "plus" | "pro"
  fleetSize: number
  monthlySavings: number
  co2Reduction: number
  batteryCapacity: string
  chargingPower: number
  paybackPeriod: number
  roi: number
}

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

const formatYAxis = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}k`
  }
  return `$${value.toLocaleString()}`
}

export default function Dashboard() {
  const searchParams = useSearchParams()
  const currentPlan = (searchParams.get("plan") as "plus" | "pro") || "plus"
  const [data] = useState<DashboardData>({ ...mockData, plan: currentPlan })

  const handlePlanSwitch = () => {
    const newPlan = currentPlan === "plus" ? "pro" : "plus"
    window.location.href = `/dashboard?plan=${newPlan}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <VemoLogo size="md" />
              <div>
                <h1 className="text-2xl font-bold text-[#115F5F]">Dashboard VEMO</h1>
                <p className="text-gray-600">Monitoreo en tiempo real de tu flota eléctrica</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-[#115F5F] text-white">Plan {currentPlan === "pro" ? "Pro" : "Plus"}</Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlanSwitch}
                className="border-[#115F5F] text-[#115F5F] hover:bg-[#115F5F] hover:text-white bg-transparent"
              >
                {currentPlan === "plus" ? (
                  <>
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade a Pro
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Cambiar a Plus
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Status Banner */}
      <div
        className={`${currentPlan === "pro" ? "bg-gradient-to-r from-[#115F5F] to-[#1a7a7a]" : "bg-gradient-to-r from-blue-500 to-blue-600"} text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                {currentPlan === "pro" ? "🚀 Dashboard Pro Activo" : "⚡ Dashboard Plus Activo"}
              </h2>
              <p className="text-sm opacity-90">
                {currentPlan === "pro"
                  ? "Acceso completo a todas las métricas avanzadas y análisis predictivo"
                  : "Monitoreo básico con métricas esenciales para tu flota"}
              </p>
            </div>
            {currentPlan === "plus" && (
              <Button
                variant="secondary"
                onClick={handlePlanSwitch}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Upgrade a Pro
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-[#115F5F]/10 to-[#115F5F]/20 border-[#115F5F]/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#115F5F]">Ahorro Mensual</p>
                  <p className="text-3xl font-bold text-[#115F5F]">${data.monthlySavings.toLocaleString()}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12% vs mes anterior
                  </p>
                </div>
                <DollarSign className="w-12 h-12 text-[#115F5F] opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">CO₂ Evitado</p>
                  <p className="text-3xl font-bold text-green-600">{data.co2Reduction}t</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <Leaf className="w-4 h-4 mr-1" />
                    Este año
                  </p>
                </div>
                <Leaf className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Flota Activa</p>
                  <p className="text-3xl font-bold text-blue-600">{data.fleetSize}</p>
                  <p className="text-sm text-blue-600 flex items-center mt-1">
                    <Car className="w-4 h-4 mr-1" />
                    Vehículos EV
                  </p>
                </div>
                <Users className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">ROI Actual</p>
                  <p className="text-3xl font-bold text-purple-600">{data.roi}%</p>
                  <p className="text-sm text-purple-600 flex items-center mt-1">
                    <Target className="w-4 h-4 mr-1" />
                    Anualizado
                  </p>
                </div>
                <BarChart3 className="w-12 h-12 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="savings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="savings">Ahorros</TabsTrigger>
            <TabsTrigger value="environmental">Ambiental</TabsTrigger>
            <TabsTrigger value="fleet">Estado Flota</TabsTrigger>
            <TabsTrigger value="performance" disabled={currentPlan === "plus"}>
              Rendimiento {currentPlan === "plus" && "(Pro)"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="savings">
            <Card>
              <CardHeader>
                <CardTitle>Comparación de Costos Operativos</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    diesel: { label: "Diesel", color: "#FF7575" },
                    ev: { label: "EV", color: "#115F5F" },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={savingsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={formatYAxis} width={80} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="diesel" fill="var(--color-diesel)" name="Diesel" />
                      <Bar dataKey="ev" fill="var(--color-ev)" name="EV" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="environmental">
            <Card>
              <CardHeader>
                <CardTitle>Reducción de CO₂ Mensual</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    reduccion: { label: "CO₂ Evitado (t)", color: "#115F5F" },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={co2Data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis width={80} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="reduccion" stroke="var(--color-reduccion)" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fleet">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Estado Actual de la Flota</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      operativos: { label: "Operativos", color: "#115F5F" },
                      mantenimiento: { label: "Mantenimiento", color: "#FF7575" },
                      carga: { label: "En Carga", color: "#FFA500" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={fleetStatusData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {fleetStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Métricas de Rendimiento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Eficiencia Energética</span>
                      <span className="text-sm text-gray-600">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Disponibilidad de Flota</span>
                      <span className="text-sm text-gray-600">88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Utilización de Cargadores</span>
                      <span className="text-sm text-gray-600">76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardContent className="p-8 text-center">
                <Crown className="w-16 h-16 text-[#115F5F] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Funcionalidad Pro</h3>
                <p className="text-gray-600 mb-6">
                  Las métricas avanzadas de rendimiento están disponibles en el Plan Pro
                </p>
                <Button onClick={handlePlanSwitch} className="bg-[#115F5F] hover:bg-[#0d4a4a] text-white">
                  Upgrade a Pro
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="border-[#115F5F]/20 bg-[#115F5F]/5">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#115F5F]/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#115F5F]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#115F5F]">Próximo Mantenimiento</h3>
                  <p className="text-sm text-gray-600">3 vehículos requieren servicio en 7 días</p>
                </div>
                <Button variant="outline" size="sm" className="border-[#115F5F] text-[#115F5F] bg-transparent">
                  Ver Detalles
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                  <Gauge className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-800">Optimización Disponible</h3>
                  <p className="text-sm text-green-700">Potencial ahorro adicional del 8%</p>
                </div>
                <Button variant="outline" size="sm" className="border-green-600 text-green-600 bg-transparent">
                  Optimizar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
