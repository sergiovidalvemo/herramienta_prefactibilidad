"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Zap, Truck, Battery, MapPin, Clock, Leaf, Calculator, CreditCard, Phone } from "lucide-react"
import VemoLogo from "./vemo-logo"

// Componente interno que usa useSearchParams
function DashboardContent() {
  const searchParams = useSearchParams()
  const plan = searchParams.get("plan") || "plus"
  const [showContactModal, setShowContactModal] = useState(false)

  // Datos de ejemplo para los gráficos
  const tcoData = [
    { year: "Año 1", diesel: 45000, ev: 52000 },
    { year: "Año 2", diesel: 47000, ev: 48000 },
    { year: "Año 3", diesel: 49000, ev: 45000 },
    { year: "Año 4", diesel: 51000, ev: 43000 },
    { year: "Año 5", diesel: 53000, ev: 41000 },
  ]

  const savingsData = [
    { month: "Ene", savings: 2500 },
    { month: "Feb", savings: 3200 },
    { month: "Mar", savings: 2800 },
    { month: "Abr", savings: 3500 },
    { month: "May", savings: 4100 },
    { month: "Jun", savings: 3800 },
  ]

  const chargingData = [
    { name: "Carga Rápida", value: 30, color: "#115F5F" },
    { name: "Carga Normal", value: 45, color: "#1a7a7a" },
    { name: "Carga Lenta", value: 25, color: "#2d9999" },
  ]

  const financingOptions = [
    {
      type: "Leasing Operativo",
      monthlyPayment: "€1,250",
      totalCost: "€75,000",
      benefits: ["Sin inversión inicial", "Mantenimiento incluido", "Seguro incluido"],
      recommended: true,
    },
    {
      type: "Compra Financiada",
      monthlyPayment: "€980",
      totalCost: "€58,800",
      benefits: ["Propiedad del vehículo", "Depreciación fiscal", "Flexibilidad total"],
      recommended: false,
    },
    {
      type: "Renting Flexible",
      monthlyPayment: "€1,100",
      totalCost: "€66,000",
      benefits: ["Cuota fija mensual", "Servicios incluidos", "Cambio de vehículo"],
      recommended: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <VemoLogo size="md" />
            <div>
              <h1 className="text-2xl font-bold text-[#115F5F]">Dashboard VEMO</h1>
              <p className="text-gray-600">Análisis completo de tu flota eléctrica</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-[#115F5F] text-white">
              Plan {plan === "plus" ? "Plus" : "Pro"}
            </Badge>
            <Button variant="outline" size="sm" onClick={() => setShowContactModal(true)}>
              <Phone className="w-4 h-4 mr-2" />
              Contactar Experto
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* KPIs Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ahorro Anual Proyectado</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">€42,500</div>
              <p className="text-xs text-muted-foreground">+15% vs diesel</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reducción CO₂</CardTitle>
              <Leaf className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">12.5 t</div>
              <p className="text-xs text-muted-foreground">Por vehículo/año</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Autonomía Media</CardTitle>
              <Battery className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">285 km</div>
              <p className="text-xs text-muted-foreground">Rango real</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tiempo de Carga</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45 min</div>
              <p className="text-xs text-muted-foreground">80% carga rápida</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Dashboard */}
        <Tabs defaultValue="technical" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="technical">Análisis Técnico</TabsTrigger>
            <TabsTrigger value="charging">Infraestructura</TabsTrigger>
            <TabsTrigger value="economic">Análisis Económico</TabsTrigger>
            <TabsTrigger value="financing" disabled={plan === "plus"}>
              Financiación {plan === "plus" && "🔒"}
            </TabsTrigger>
          </TabsList>

          {/* Technical Analysis Tab */}
          <TabsContent value="technical" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="h-5 w-5" />
                    <span>Compatibilidad de Vehículos</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Mercedes eVito</span>
                      <Badge className="bg-green-100 text-green-800">95% Compatible</Badge>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Nissan e-NV200</span>
                      <Badge className="bg-green-100 text-green-800">88% Compatible</Badge>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Ford E-Transit</span>
                      <Badge className="bg-yellow-100 text-yellow-800">72% Compatible</Badge>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Análisis de Rutas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Distancia media diaria</span>
                      <span className="font-semibold">145 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Rutas urbanas</span>
                      <span className="font-semibold">65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Rutas interurbanas</span>
                      <span className="font-semibold">35%</span>
                    </div>
                    <Separator />
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-green-800">✅ Tus rutas son ideales para vehículos eléctricos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Charging Infrastructure Tab */}
          <TabsContent value="charging" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Plan de Carga Recomendado</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={chargingData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {chargingData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2">
                      {chargingData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-sm">{item.name}</span>
                          </div>
                          <span className="text-sm font-semibold">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inversión en Infraestructura</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Cargadores AC (22kW) x4</span>
                      <span className="font-semibold">€12,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Cargador DC (50kW) x1</span>
                      <span className="font-semibold">€25,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Instalación y obra civil</span>
                      <span className="font-semibold">€8,500</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Inversión</span>
                      <span className="text-[#115F5F]">€45,500</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">💡 Subvenciones disponibles hasta 40% del coste</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Economic Analysis Tab */}
          <TabsContent value="economic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calculator className="h-5 w-5" />
                    <span>TCO: Diesel vs Eléctrico</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={tcoData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`€${value}`, ""]} />
                      <Bar dataKey="diesel" fill="#dc2626" name="Diesel" />
                      <Bar dataKey="ev" fill="#115F5F" name="Eléctrico" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Ahorros Mensuales</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={savingsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`€${value}`, "Ahorro"]} />
                      <Line
                        type="monotone"
                        dataKey="savings"
                        stroke="#115F5F"
                        strokeWidth={3}
                        dot={{ fill: "#115F5F", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Economic Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen Económico</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">€42,500</div>
                    <p className="text-sm text-gray-600">Ahorro anual total</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#115F5F]">2.3 años</div>
                    <p className="text-sm text-gray-600">Periodo de amortización</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">18.5%</div>
                    <p className="text-sm text-gray-600">ROI anual</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financing Tab (Pro only) */}
          <TabsContent value="financing" className="space-y-6">
            {plan === "pro" ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5" />
                      <span>Opciones de Financiación</span>
                    </CardTitle>
                    <CardDescription>Compara diferentes modalidades de financiación para tu flota</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {financingOptions.map((option, index) => (
                        <Card
                          key={index}
                          className={`relative ${option.recommended ? "border-[#115F5F] border-2" : ""}`}
                        >
                          {option.recommended && (
                            <Badge className="absolute -top-2 left-4 bg-[#115F5F]">Recomendado</Badge>
                          )}
                          <CardHeader>
                            <CardTitle className="text-lg">{option.type}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[#115F5F]">{option.monthlyPayment}</div>
                              <p className="text-sm text-gray-600">por mes</p>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-semibold">{option.totalCost}</div>
                              <p className="text-sm text-gray-600">coste total (5 años)</p>
                            </div>
                            <Separator />
                            <div className="space-y-2">
                              {option.benefits.map((benefit, benefitIndex) => (
                                <div key={benefitIndex} className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                                  <span className="text-sm">{benefit}</span>
                                </div>
                              ))}
                            </div>
                            <Button
                              className={`w-full ${option.recommended ? "bg-[#115F5F] hover:bg-[#0d4a4a]" : "bg-gray-600 hover:bg-gray-700"}`}
                            >
                              Solicitar Información
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Cash Flow Projection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Proyección de Flujo de Caja</CardTitle>
                    <CardDescription>Análisis detallado del impacto financiero mes a mes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-r from-[#115F5F]/10 to-blue-50 p-6 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Inversión Inicial</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Vehículos (5 unidades)</span>
                              <span>€175,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Infraestructura de carga</span>
                              <span>€45,500</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Subvenciones</span>
                              <span className="text-green-600">-€88,200</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold">
                              <span>Inversión neta</span>
                              <span>€132,300</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Ahorros Anuales</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Combustible</span>
                              <span className="text-green-600">€28,500</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Mantenimiento</span>
                              <span className="text-green-600">€12,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Seguros</span>
                              <span className="text-green-600">€2,000</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold">
                              <span>Total anual</span>
                              <span className="text-green-600">€42,500</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="mb-4">
                    <CreditCard className="h-16 w-16 mx-auto text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Análisis de Financiación</h3>
                  <p className="text-gray-600 mb-6">
                    Accede a opciones de financiación detalladas y proyecciones de flujo de caja
                  </p>
                  <Button className="bg-[#115F5F] hover:bg-[#0d4a4a]">Actualizar a Plan Pro</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Componente principal con Suspense
export default function Dashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#115F5F] mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando dashboard...</p>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  )
}
