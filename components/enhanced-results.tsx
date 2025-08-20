"use client"

import { useEffect, useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  TrendingUp,
  Leaf,
  Car,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Zap,
  Battery,
  DollarSign,
  Calendar,
  Settings,
  BarChart3,
  Crown,
  Download,
  Share2,
} from "lucide-react"
import Confetti from "./confetti"
import VemoLogo from "./vemo-logo"

interface EnhancedData {
  savingsPct: number
  co2: number
  ev: string
  monthlyFuelSavings: number
  paybackMonths: number
  totalMonthlySavings: number
  fleetSize: number
  routeKmPerDay: number
  vehicleType?: string
  batteryCapacityMin?: number
  batteryCapacityMax?: number
  technicalAnalysis?: {
    routeCompatibility: {
      urban: number
      interurban: number
      longDistance: number
    }
    vehicleSpecs: {
      range: number
      batteryCapacity: number
      chargingTime: string
      motorPower: number
    }
    chargingInfrastructure: {
      requiredChargers: number
      totalPower: number
      installationCost: number
      monthlyElectricityCost: number
    }
  }
  economicAnalysis?: {
    annualSavings: number
    fuelSavings: number
    maintenanceSavings: number
    co2Reduction: number
    tcoComparison: Array<{
      year: string
      diesel: number
      ev: number
    }>
  }
  financialAnalysis?: {
    initialInvestment: number
    financialMetrics: {
      irr: number
      paybackPeriod: number
      npv: number
    }
    financingOptions: {
      leasing: {
        monthlyPayment: number
        term: number
        includes: string
      }
      bankLoan: {
        downPayment: number
        monthlyPayment: number
        interestRate: number
      }
    }
    subsidies: {
      federal: number
      local: number
      environmental: number
    }
    cashFlow: {
      year1to3: {
        operationalSavings: number
        monthlyPayments: number
        monthlyNetFlow: number
      }
      year4to10: {
        operationalSavings: number
        maintenance: number
        monthlyNetFlow: number
      }
    }
  }
}

export default function EnhancedResults() {
  const searchParams = useSearchParams()
  const [data, setData] = useState<EnhancedData | null>(null)
  const [plan, setPlan] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Memoize the confetti trigger to prevent re-renders
  const triggerConfetti = useCallback(() => {
    if (!showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  useEffect(() => {
    const encodedData = searchParams.get("d")
    const planParam = searchParams.get("plan")

    if (!encodedData || !planParam) {
      setError("No data provided")
      setIsLoading(false)
      return
    }

    try {
      const decodedData = JSON.parse(atob(encodedData))

      // Generate mock technical analysis data
      const mockTechnicalAnalysis = {
        routeCompatibility: {
          urban: 95,
          interurban: 85,
          longDistance: 65,
        },
        vehicleSpecs: {
          range: 400,
          batteryCapacity: 100,
          chargingTime: "45 min (80%)",
          motorPower: 150,
        },
        chargingInfrastructure: {
          requiredChargers: Math.ceil(decodedData.fleetSize / 3),
          totalPower: Math.ceil(decodedData.fleetSize / 3) * 50,
          installationCost: Math.ceil(decodedData.fleetSize / 3) * 25000,
          monthlyElectricityCost: decodedData.fleetSize * 800,
        },
      }

      // Generate mock economic analysis data
      const mockEconomicAnalysis = {
        annualSavings: decodedData.totalMonthlySavings * 12,
        fuelSavings: decodedData.monthlyFuelSavings * 12,
        maintenanceSavings: decodedData.fleetSize * 2400,
        co2Reduction: decodedData.co2,
        tcoComparison: Array.from({ length: 10 }, (_, i) => ({
          year: `Año ${i + 1}`,
          diesel: 100000 + i * 15000 + decodedData.fleetSize * 50000,
          ev: 120000 + i * 8000 + decodedData.fleetSize * 45000,
        })),
      }

      // Generate mock financial analysis data (only for pro plan)
      const mockFinancialAnalysis =
        planParam === "pro"
          ? {
              initialInvestment: decodedData.fleetSize * 80000,
              financialMetrics: {
                irr: 18,
                paybackPeriod: 3.2,
                npv: decodedData.fleetSize * 45000,
              },
              financingOptions: {
                leasing: {
                  monthlyPayment: decodedData.fleetSize * 1200,
                  term: 5,
                  includes: "Mantenimiento y seguro",
                },
                bankLoan: {
                  downPayment: decodedData.fleetSize * 16000,
                  monthlyPayment: decodedData.fleetSize * 1400,
                  interestRate: 8.5,
                },
              },
              subsidies: {
                federal: decodedData.fleetSize * 15000,
                local: decodedData.fleetSize * 8000,
                environmental: decodedData.fleetSize * 5000,
              },
              cashFlow: {
                year1to3: {
                  operationalSavings: decodedData.totalMonthlySavings,
                  monthlyPayments: decodedData.fleetSize * 1200,
                  monthlyNetFlow: decodedData.totalMonthlySavings - decodedData.fleetSize * 1200,
                },
                year4to10: {
                  operationalSavings: decodedData.totalMonthlySavings,
                  maintenance: decodedData.fleetSize * 200,
                  monthlyNetFlow: decodedData.totalMonthlySavings - decodedData.fleetSize * 200,
                },
              },
            }
          : undefined

      const enhancedData = {
        ...decodedData,
        technicalAnalysis: mockTechnicalAnalysis,
        economicAnalysis: mockEconomicAnalysis,
        financialAnalysis: mockFinancialAnalysis,
      }

      setData(enhancedData)
      setPlan(planParam)
      setIsLoading(false)

      // Trigger confetti only once
      triggerConfetti()
    } catch (err) {
      console.error("Error decoding data:", err)
      setError("Invalid data format")
      setIsLoading(false)
    }
  }, [searchParams.get("d"), searchParams.get("plan")]) // Use specific params instead of searchParams object

  // Custom formatter for Y-axis with better fit
  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`
    }
    return `$${value.toLocaleString()}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#115F5F] mx-auto mb-4"></div>
          <p className="text-gray-600">Generando análisis avanzado...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
            <p className="text-gray-600 mb-6">{error || "No se encontraron datos"}</p>
            <Button onClick={() => (window.location.href = "/form")} className="bg-[#115F5F] hover:bg-[#0d4a4a]">
              Volver al formulario
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const tabs = [
    { id: "overview", label: "Resumen", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "technical", label: "Técnico", icon: <Settings className="w-4 h-4" /> },
    { id: "economic", label: "Económico", icon: <TrendingUp className="w-4 h-4" /> },
    ...(plan === "pro" ? [{ id: "financial", label: "Financiero", icon: <DollarSign className="w-4 h-4" /> }] : []),
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-[#115F5F]/10 to-[#115F5F]/20 border-[#115F5F]/30">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-[#115F5F] mx-auto mb-2" />
                  <div className="text-3xl font-bold text-[#115F5F] mb-1">{data.savingsPct}%</div>
                  <p className="text-sm text-[#115F5F]">Ahorro OPEX</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6 text-center">
                  <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-green-600 mb-1">{data.co2}t</div>
                  <p className="text-sm text-green-700">CO₂ evitado/año</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#115F5F]/10 to-[#115F5F]/20 border-[#115F5F]/30">
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-8 h-8 text-[#115F5F] mx-auto mb-2" />
                  <div className="text-3xl font-bold text-[#115F5F] mb-1">
                    ${data.totalMonthlySavings?.toLocaleString()}
                  </div>
                  <p className="text-sm text-[#115F5F]">Ahorro mensual</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-purple-600 mb-1">{data.paybackMonths}</div>
                  <p className="text-sm text-purple-700">Meses payback</p>
                </CardContent>
              </Card>
            </div>

            {/* Plan Benefits */}
            <Card className="border-2 border-[#115F5F]/20 bg-gradient-to-r from-[#115F5F]/5 to-[#1a7a7a]/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {plan === "pro" ? (
                    <Crown className="w-6 h-6 text-[#115F5F]" />
                  ) : (
                    <Zap className="w-6 h-6 text-[#115F5F]" />
                  )}
                  <span>Análisis Plan {plan === "pro" ? "Pro" : "Plus"}</span>
                  <Badge className="bg-[#115F5F] text-white">Activado</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-[#115F5F] mb-3">Análisis Incluidos:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#115F5F]" />
                        <span className="text-sm">Análisis técnico de compatibilidad</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#115F5F]" />
                        <span className="text-sm">Planificación de infraestructura</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#115F5F]" />
                        <span className="text-sm">Análisis económico TCO</span>
                      </li>
                      {plan === "pro" && (
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-[#115F5F]" />
                          <span className="text-sm">Análisis financiero completo</span>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#115F5F] mb-3">Próximos Pasos:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <ArrowRight className="w-4 h-4 text-[#115F5F]" />
                        <span className="text-sm">Revisar análisis detallado en tabs</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <ArrowRight className="w-4 h-4 text-[#115F5F]" />
                        <span className="text-sm">Descargar reporte ejecutivo</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <ArrowRight className="w-4 h-4 text-[#115F5F]" />
                        <span className="text-sm">Agendar consultoría especializada</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick TCO Comparison */}
            {data.economicAnalysis && (
              <Card>
                <CardHeader>
                  <CardTitle>Comparación TCO Rápida (5 años)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      diesel: { label: "Diesel", color: "#FF7575" },
                      ev: { label: "EV", color: "#115F5F" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={data.economicAnalysis.tcoComparison.slice(0, 5)}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
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
            )}
          </div>
        )

      case "technical":
        return (
          <div className="space-y-6">
            {data.technicalAnalysis && (
              <>
                {/* Route Compatibility */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Battery className="w-5 h-5 text-[#115F5F]" />
                      <span>Compatibilidad de Rutas</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span>Rutas urbanas</span>
                          <Badge className="bg-green-100 text-green-800">
                            {data.technicalAnalysis.routeCompatibility.urban}% Compatible
                          </Badge>
                        </div>
                        <Progress value={data.technicalAnalysis.routeCompatibility.urban} className="h-3" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span>Rutas interurbanas</span>
                          <Badge className="bg-yellow-100 text-yellow-800">
                            {data.technicalAnalysis.routeCompatibility.interurban}% Compatible
                          </Badge>
                        </div>
                        <Progress value={data.technicalAnalysis.routeCompatibility.interurban} className="h-3" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span>Rutas largas</span>
                          <Badge className="bg-red-100 text-red-800">
                            {data.technicalAnalysis.routeCompatibility.longDistance}% Compatible
                          </Badge>
                        </div>
                        <Progress value={data.technicalAnalysis.routeCompatibility.longDistance} className="h-3" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Vehicle Specifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Car className="w-5 h-5 text-[#115F5F]" />
                        <span>Especificaciones del Vehículo</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Autonomía:</span>
                          <span className="font-semibold">{data.technicalAnalysis.vehicleSpecs.range} km</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Capacidad batería:</span>
                          <span className="font-semibold">
                            {data.technicalAnalysis.vehicleSpecs.batteryCapacity} kWh
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tiempo de carga:</span>
                          <span className="font-semibold">{data.technicalAnalysis.vehicleSpecs.chargingTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Potencia motor:</span>
                          <span className="font-semibold">{data.technicalAnalysis.vehicleSpecs.motorPower} kW</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Zap className="w-5 h-5 text-[#115F5F]" />
                        <span>Infraestructura de Carga</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cargadores requeridos:</span>
                          <span className="font-semibold">
                            {data.technicalAnalysis.chargingInfrastructure.requiredChargers}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Potencia total:</span>
                          <span className="font-semibold">
                            {data.technicalAnalysis.chargingInfrastructure.totalPower} kW
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Costo instalación:</span>
                          <span className="font-semibold">
                            ${data.technicalAnalysis.chargingInfrastructure.installationCost.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Costo eléctrico mensual:</span>
                          <span className="font-semibold">
                            ${data.technicalAnalysis.chargingInfrastructure.monthlyElectricityCost.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        )

      case "economic":
        return (
          <div className="space-y-6">
            {data.economicAnalysis && (
              <>
                {/* Economic Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="w-8 h-8 text-[#115F5F] mx-auto mb-2" />
                      <div className="text-2xl font-bold text-[#115F5F] mb-1">
                        ${data.economicAnalysis.annualSavings.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-600">Ahorro anual total</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <DollarSign className="w-8 h-8 text-[#115F5F] mx-auto mb-2" />
                      <div className="text-2xl font-bold text-[#115F5F] mb-1">
                        ${data.economicAnalysis.fuelSavings.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-600">Ahorro en combustible</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Settings className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        ${data.economicAnalysis.maintenanceSavings.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-600">Ahorro en mantenimiento</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Full TCO Comparison */}
                <Card>
                  <CardHeader>
                    <CardTitle>Análisis TCO Completo (10 años)</CardTitle>
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
                        <BarChart
                          data={data.economicAnalysis.tcoComparison}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
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

                {/* Environmental Impact */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Leaf className="w-5 h-5 text-green-600" />
                      <span>Impacto Ambiental</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          {data.economicAnalysis.co2Reduction}t
                        </div>
                        <p className="text-gray-600">CO₂ evitado por año</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          {Math.round(data.economicAnalysis.co2Reduction / 4.6)}
                        </div>
                        <p className="text-gray-600">Autos equivalentes fuera de circulación</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )

      case "financial":
        return (
          <div className="space-y-6">
            {data.financialAnalysis && (
              <>
                {/* Financial Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <DollarSign className="w-8 h-8 text-[#115F5F] mx-auto mb-2" />
                      <div className="text-2xl font-bold text-[#115F5F] mb-1">
                        ${(data.financialAnalysis.initialInvestment / 1000000).toFixed(1)}M
                      </div>
                      <p className="text-sm text-gray-600">Inversión inicial</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="w-8 h-8 text-[#115F5F] mx-auto mb-2" />
                      <div className="text-2xl font-bold text-[#115F5F] mb-1">
                        {data.financialAnalysis.financialMetrics.irr}%
                      </div>
                      <p className="text-sm text-gray-600">TIR</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {data.financialAnalysis.financialMetrics.paybackPeriod}
                      </div>
                      <p className="text-sm text-gray-600">Años payback</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        ${(data.financialAnalysis.financialMetrics.npv / 1000000).toFixed(1)}M
                      </div>
                      <p className="text-sm text-gray-600">VPN</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Financing Options */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Opciones de Financiamiento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border border-[#115F5F] rounded-lg bg-[#115F5F]/5">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-[#115F5F]">Leasing Operativo</h4>
                            <Badge className="bg-[#115F5F] text-white">Recomendado</Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Cuota mensual:</span>
                              <span className="font-semibold">
                                ${data.financialAnalysis.financingOptions.leasing.monthlyPayment.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Plazo:</span>
                              <span>{data.financialAnalysis.financingOptions.leasing.term} años</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Incluye:</span>
                              <span>{data.financialAnalysis.financingOptions.leasing.includes}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Crédito Bancario</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Enganche:</span>
                              <span>
                                ${data.financialAnalysis.financingOptions.bankLoan.downPayment.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Cuota mensual:</span>
                              <span>
                                ${data.financialAnalysis.financingOptions.bankLoan.monthlyPayment.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tasa:</span>
                              <span>{data.financialAnalysis.financingOptions.bankLoan.interestRate}% anual</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Subsidios Disponibles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span>Gobierno Federal</span>
                          <span className="font-bold text-green-600">
                            ${data.financialAnalysis.subsidies.federal.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span>Programa Local</span>
                          <span className="font-bold text-green-600">
                            ${data.financialAnalysis.subsidies.local.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span>Incentivo Ambiental</span>
                          <span className="font-bold text-green-600">
                            ${data.financialAnalysis.subsidies.environmental.toLocaleString()}
                          </span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">Total Subsidios:</span>
                            <span className="font-bold text-green-600 text-lg">
                              $
                              {(
                                data.financialAnalysis.subsidies.federal +
                                data.financialAnalysis.subsidies.local +
                                data.financialAnalysis.subsidies.environmental
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Cash Flow Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Análisis de Flujo de Caja</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-3">Años 1-3 (Implementación)</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Ahorros operativos:</span>
                            <span className="text-green-600">
                              +${data.financialAnalysis.cashFlow.year1to3.operationalSavings.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Pagos mensuales:</span>
                            <span className="text-red-600">
                              ${data.financialAnalysis.cashFlow.year1to3.monthlyPayments.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between border-t pt-2 font-semibold">
                            <span>Flujo neto mensual:</span>
                            <span className="text-green-600">
                              +${data.financialAnalysis.cashFlow.year1to3.monthlyNetFlow.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-3">Años 4-10 (Operación)</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Ahorros operativos:</span>
                            <span className="text-green-600">
                              +${data.financialAnalysis.cashFlow.year4to10.operationalSavings.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Mantenimiento EV:</span>
                            <span className="text-red-600">
                              ${data.financialAnalysis.cashFlow.year4to10.maintenance.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between border-t pt-2 font-semibold">
                            <span>Flujo neto mensual:</span>
                            <span className="text-green-600">
                              +${data.financialAnalysis.cashFlow.year4to10.monthlyNetFlow.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showConfetti && <Confetti />}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <VemoLogo size="md" />
              <div>
                <h1 className="text-2xl font-bold text-[#115F5F]">Análisis Avanzado</h1>
                <p className="text-gray-600">Resultados detallados para tu flota</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-[#115F5F] text-white">Plan {plan === "pro" ? "Pro" : "Plus"}</Badge>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                🎉 ¡Análisis {plan === "pro" ? "Pro" : "Plus"} Generado Exitosamente!
              </h2>
              <p className="text-sm opacity-90">
                Tu análisis personalizado está listo. Explora los tabs para ver todos los detalles.
              </p>
            </div>
            <Button variant="secondary" onClick={() => window.open("https://calendly.com/vemo-consultation", "_blank")}>
              Agendar Consultoría
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-4 px-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                  activeTab === tab.id ? "text-[#115F5F]" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#115F5F]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA Section */}
      <div className="bg-[#115F5F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para Implementar?</h2>
            <p className="text-xl mb-8 opacity-90">
              Nuestros especialistas te ayudarán a convertir este análisis en realidad
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => window.open("https://calendly.com/vemo-implementation", "_blank")}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Implementación
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#115F5F] bg-transparent"
                onClick={() => (window.location.href = "/dashboard?plan=" + plan)}
              >
                Ver Dashboard Completo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
