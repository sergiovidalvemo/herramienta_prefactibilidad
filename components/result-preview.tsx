"use client"

import { useEffect, useState, useCallback, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, Leaf, ArrowRight, CheckCircle, AlertCircle, Zap, Battery, Crown, X, Plug } from "lucide-react"
import Confetti from "./confetti"
import VemoLogo from "./vemo-logo"
import ContactForm from "./contact-form"

interface ChargingInfrastructure {
  dailyEnergyPerVehicle: number
  totalDailyEnergy: number
  chargingHours: number
  requiredChargingPower: number
  chargerType: string
  chargerPowerKw: number
  effectiveChargerPower: number
  chargersPerStation: number
  requiredChargers: number
  requiredStations: number
  totalInstalledPower: number
  estimatedInstallationCost: number
  efficiencyFactor: number
}

interface ResultData {
  savingsPct: number
  co2: number
  ev?: string
  monthlyFuelSavings: number
  paybackMonths: number
  totalMonthlySavings?: number
  monthlySavings?: number
  fleetSize?: number
  routeKmPerDay?: number
  vehicleType?: string
  operationType?: string
  chargingWindow?: number
  batteryCapacityMin?: number
  batteryCapacityMax?: number
  chargingInfrastructure?: ChargingInfrastructure
}

function ResultPreviewContent() {
  const searchParams = useSearchParams()
  const [data, setData] = useState<ResultData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showPlanModal, setShowPlanModal] = useState(false)

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

    if (!encodedData) {
      setError("No data provided")
      setIsLoading(false)
      return
    }

    try {
      const decodedData = JSON.parse(atob(encodedData))

      // Calculate battery capacity with realistic consumption rates and 30% margin
      const dailyKm = decodedData.routeKmPerDay || 150
      const vehicleType = decodedData.vehicleType || "sedan"
      const operationType = decodedData.operationType || "intermediate"
      const fleetSize = decodedData.fleetSize || 1

      // Consumption rates based on vehicle type
      let energyConsumptionKwhPerKm = 0.15 // Default for sedans
      if (vehicleType === "van" || vehicleType === "truck") {
        energyConsumptionKwhPerKm = 0.3 // For vans and trucks
      }

      // Daily energy consumption
      const dailyEnergyNeed = dailyKm * energyConsumptionKwhPerKm

      // Base battery capacity with 30% operational buffer
      const batteryCapacityBase = dailyEnergyNeed * 1.3

      // Account for 80% State of Health at year 5 (20% degradation)
      // Need to size battery 25% larger to maintain operation at 80% SOH
      const batteryCapacityWithDegradation = batteryCapacityBase * 1.25

      // Apply 30% margin for recommendations and round to common battery sizes
      const recommendedMinCapacity = Math.ceil((batteryCapacityBase * 1.3) / 5) * 5 // Round to nearest 5kWh
      const recommendedMaxCapacity = Math.ceil((batteryCapacityWithDegradation * 1.3) / 5) * 5 // Round to nearest 5kWh

      // Calculate charging infrastructure
      const dailyEnergyPerVehicle = dailyKm * energyConsumptionKwhPerKm
      const totalDailyEnergy = dailyEnergyPerVehicle * fleetSize
      const chargingHours = decodedData.chargingWindow || 9 // Use form value or default to 9 hours
      
      // Determine charger type and efficiency factor based on operation type
      let chargerType = ""
      let chargerPowerKw = 0
      let chargersPerStation = 1
      let estimatedCostPerStation = 0
      let efficiencyFactor = 0.9 // Default

      switch (operationType) {
        case "relaxed":
          chargerType = "Cargador domiciliario 7kW"
          chargerPowerKw = 7
          chargersPerStation = 1
          estimatedCostPerStation = 3500
          efficiencyFactor = 0.95
          break
        case "intermediate":
          chargerType = "Cargador comercial 60kW (2×30kW)"
          chargerPowerKw = 60
          chargersPerStation = 2
          estimatedCostPerStation = 45000
          efficiencyFactor = 0.9
          break
        case "intensive":
          chargerType = "Cargador rápido 120kW (2×60kW)"
          chargerPowerKw = 120
          chargersPerStation = 2
          estimatedCostPerStation = 85000
          efficiencyFactor = 0.85
          break
        default:
          chargerType = "Cargador comercial 60kW (2×30kW)"
          chargerPowerKw = 60
          chargersPerStation = 2
          estimatedCostPerStation = 45000
          efficiencyFactor = 0.9
      }

      // Apply efficiency factor to charger power
      const effectiveChargerPower = chargerPowerKw * efficiencyFactor
      
      // Calculate number of chargers needed using the formula:
      // energia total requerida / potencia de cargador elegido / ventana temporal de recarga
      const requiredChargers = Math.ceil(totalDailyEnergy / effectiveChargerPower / chargingHours)
      
      // Calculate stations needed (considering chargers per station)
      const requiredStations = Math.ceil(requiredChargers / chargersPerStation)
      const totalInstalledPower = requiredStations * chargerPowerKw * chargersPerStation
      const estimatedInstallationCost = requiredStations * estimatedCostPerStation
      
      const requiredChargingPower = totalDailyEnergy / chargingHours

      const chargingInfrastructure: ChargingInfrastructure = {
        dailyEnergyPerVehicle: Math.round(dailyEnergyPerVehicle * 10) / 10,
        totalDailyEnergy: Math.round(totalDailyEnergy * 10) / 10,
        chargingHours,
        requiredChargingPower: Math.round(requiredChargingPower * 10) / 10,
        chargerType,
        chargerPowerKw,
        effectiveChargerPower: Math.round(effectiveChargerPower * 10) / 10,
        chargersPerStation,
        requiredChargers,
        requiredStations,
        totalInstalledPower,
        estimatedInstallationCost,
        efficiencyFactor,
      }

      const enhancedData = {
        ...decodedData,
        monthlySavings: decodedData.totalMonthlySavings || decodedData.monthlySavings || 0,
        fleetSize: fleetSize,
        batteryCapacityMin: recommendedMinCapacity,
        batteryCapacityMax: recommendedMaxCapacity,
        chargingInfrastructure,
      }

      setData(enhancedData)
      setIsLoading(false)

      // Trigger confetti only once
      triggerConfetti()
    } catch (err) {
      console.error("Error decoding data:", err)
      setError("Invalid data format")
      setIsLoading(false)
    }
  }, [searchParams.get("d"), triggerConfetti]) // Use specific param instead of searchParams object

  const handlePlanSelection = (plan: "plus" | "pro") => {
    if (data) {
      const encodedData = btoa(JSON.stringify(data))
      window.location.href = `/result/enhanced?d=${encodedData}&plan=${plan}`
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#115F5F] mx-auto mb-4"></div>
          <p className="text-gray-600">Calculando resultados...</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {showConfetti && <Confetti />}

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <VemoLogo size="md" />
              <div>
                <h1 className="text-2xl font-bold text-[#115F5F]">Resultados Preliminares</h1>
                <p className="text-gray-600">Análisis básico de tu flota eléctrica</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">Análisis Completado</Badge>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <h2 className="text-lg font-semibold">🎉 ¡Excelentes noticias para tu flota!</h2>
            <p className="text-sm opacity-90">
              La electrificación puede generar ahorros significativos y reducir tu huella de carbono
            </p>
          </div>
        </div>
      </div>

      {/* Main Results */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Savings Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="text-center bg-gradient-to-br from-[#115F5F]/5 to-[#115F5F]/10 border-[#115F5F]/20">
              <CardContent className="p-6">
                <TrendingUp className="w-12 h-12 text-[#115F5F] mx-auto mb-4" />
                <div className="text-3xl font-bold text-[#115F5F] mb-2">{data.savingsPct}%</div>
                <p className="text-gray-600 font-medium">Ahorro OPEX</p>
                <p className="text-sm text-gray-500 mt-2">${(data.monthlySavings || 0).toLocaleString()} mensuales</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* CO2 Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-green-600 mb-2">{data.co2}t</div>
                <p className="text-gray-600 font-medium">CO₂ evitado/año</p>
                <p className="text-sm text-gray-500 mt-2">Equivale a plantar {Math.round(data.co2 * 45)} árboles</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Battery Capacity Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <Battery className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {data.batteryCapacityMin}-{data.batteryCapacityMax} kWh
                </div>
                <p className="text-gray-600 font-medium">Batería recomendada</p>
                <p className="text-sm text-gray-500 mt-2">Capacidad por vehículo</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Charging Infrastructure Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <Plug className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {data.chargingInfrastructure?.requiredChargers || 0}
                </div>
                <p className="text-gray-600 font-medium">Cargadores necesarios</p>
                <p className="text-sm text-gray-500 mt-2">{data.chargingInfrastructure?.totalInstalledPower || 0} kW total</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charging Infrastructure Details */}
        {data.chargingInfrastructure && (
          <Card className="mb-8 border-purple-200 bg-purple-50/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plug className="w-6 h-6 text-purple-600" />
                <span>Infraestructura de Carga Recomendada</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-purple-900 mb-3">Análisis Energético:</h4>
                  <ul className="text-sm text-purple-800 space-y-2">
                    <li>
                      • <strong>Consumo por vehículo:</strong> {data.chargingInfrastructure.dailyEnergyPerVehicle}{" "}
                      kWh/día
                    </li>
                    <li>
                      • <strong>Consumo total flota:</strong> {data.chargingInfrastructure.totalDailyEnergy} kWh/día
                    </li>
                    <li>
                      • <strong>Ventana de carga:</strong> {data.chargingInfrastructure.chargingHours} horas
                    </li>
                    <li>
                      • <strong>Potencia de carga requerida:</strong>{" "}
                      {data.chargingInfrastructure.requiredChargingPower} kW
                    </li>
                    <li>
                      • <strong>Factor de eficiencia:</strong> {Math.round(data.chargingInfrastructure.efficiencyFactor * 100)}%
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-900 mb-3">Solución Recomendada:</h4>
                  <ul className="text-sm text-purple-800 space-y-2">
                    <li>
                      • <strong>Tipo de cargador:</strong> {data.chargingInfrastructure.chargerType}
                    </li>
                    <li>
                      • <strong>Potencia nominal:</strong> {data.chargingInfrastructure.chargerPowerKw} kW
                    </li>
                    <li>
                      • <strong>Potencia efectiva:</strong> {data.chargingInfrastructure.effectiveChargerPower} kW (con eficiencia)
                    </li>
                    <li>
                      • <strong>Cargadores necesarios:</strong> {data.chargingInfrastructure.requiredChargers}
                    </li>
                    <li>
                      • <strong>Estaciones necesarias:</strong> {data.chargingInfrastructure.requiredStations}
                    </li>
                    <li>
                      • <strong>Potencia total instalada:</strong> {data.chargingInfrastructure.totalInstalledPower} kW
                    </li>
                    <li>
                      • <strong>Costo estimado instalación:</strong> $
                      {data.chargingInfrastructure.estimatedInstallationCost.toLocaleString()}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-purple-100 rounded-lg">
                <p className="text-sm text-purple-800">
                  <strong>💡 Recomendación:</strong> Los cargadores se calcularon con tu ventana de carga de{" "}
                  <span className="font-semibold">{data.chargingInfrastructure.chargingHours} horas</span>, 
                  considerando un factor de eficiencia del{" "}
                  <span className="font-semibold">{Math.round(data.chargingInfrastructure.efficiencyFactor * 100)}%</span>{" "}
                  para operación{" "}
                  <span className="font-semibold">
                    {data.operationType === "relaxed"
                      ? "relajada"
                      : data.operationType === "intermediate"
                        ? "intermedia"
                        : "intensiva"}
                  </span>{" "}
                  y el consumo energético de vehículos tipo{" "}
                  <span className="font-semibold">
                    {data.vehicleType === "sedan" ? "sedán" : data.vehicleType === "van" ? "camioneta" : "camión"}
                  </span>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Battery Capacity Explanation */}
        <Card className="mb-8 border-blue-200 bg-blue-50/50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Battery className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Capacidad de Batería Recomendada</h3>
                <p className="text-blue-800 text-sm mb-3">
                  El rango de {data.batteryCapacityMin}-{data.batteryCapacityMax} kWh incluye un margen de seguridad del
                  30% y considera:
                </p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>
                    • <strong>Valor mínimo:</strong> Capacidad base + 30% de margen operativo
                  </li>
                  <li>
                    • <strong>Valor máximo:</strong> Incluye degradación hasta 80% SOH a los 5 años o 500,000 km
                  </li>
                  <li>
                    • <strong>Consumo estimado:</strong>{" "}
                    {data.vehicleType === "van" || data.vehicleType === "truck" ? "0.30" : "0.15"} kWh/km para este tipo
                    de vehículo
                  </li>
                  <li>
                    • <strong>Recomendación:</strong> Seleccionar vehículos con capacidad dentro de este rango para
                    garantizar autonomía
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fleet Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-[#115F5F]" />
              <span>Resumen de Análisis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#115F5F] mb-1">{data.paybackMonths || 36} meses</div>
                <div className="text-sm text-gray-600">Período de recuperación</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#115F5F] mb-1">
                  ${(data.monthlyFuelSavings || 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Ahorro mensual combustible</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#115F5F] mb-1">
                  {data.fleetSize || 1} vehículo{(data.fleetSize || 1) > 1 ? "s" : ""}
                </div>
                <div className="text-sm text-gray-600">Flota analizada</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Rutas diarias de {data.routeKmPerDay || 150} km • Tipo de vehículo:{" "}
                {data.vehicleType === "sedan" ? "Sedán" : data.vehicleType === "van" ? "Camioneta" : "Camión"} •
                Operación{" "}
                {data.operationType === "relaxed"
                  ? "relajada"
                  : data.operationType === "intermediate"
                    ? "intermedia"
                    : "intensiva"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">¿Quieres un análisis más detallado?</h2>
            <p className="text-lg mb-6 opacity-90">
              Obtén insights avanzados, análisis financiero completo y recomendaciones personalizadas
            </p>
            <Button
              onClick={() => setShowPlanModal(true)}
              size="lg"
              className="bg-white text-[#115F5F] hover:bg-gray-100 font-semibold"
            >
              Ver Planes de Análisis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Contact Form Section */}
        <div className="mt-8">
          <ContactForm 
            preliminaryData={{
              fleetSize: data.fleetSize,
              vehicleType: data.vehicleType,
              operationType: data.operationType,
              routeKmPerDay: data.routeKmPerDay,
              chargingWindow: data.chargingWindow,
              monthlyFuelSavings: data.monthlyFuelSavings,
              savingsPct: data.savingsPct,
              co2: data.co2,
              batteryCapacityMin: data.batteryCapacityMin,
              batteryCapacityMax: data.batteryCapacityMax
            }}
            onSuccess={() => {
              // Opcionalmente mostrar confetti o alguna animación
              setShowConfetti(true)
            }}
          />
        </div>
      </div>

      {/* Plan Selection Modal */}
      <AnimatePresence>
        {showPlanModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowPlanModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Selecciona tu Plan</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPlanModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-gray-600 mt-2">Elige el nivel de análisis que mejor se adapte a tus necesidades</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Plus Plan */}
                  <Card className="relative border-2 border-[#115F5F]/20 hover:border-[#115F5F]/40 transition-colors">
                    <CardContent className="p-8">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-[#115F5F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Zap className="w-8 h-8 text-[#115F5F]" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Plus</h3>
                        <p className="text-gray-600 mb-4">Perfecto para flotas medianas</p>
                        <div className="text-4xl font-bold text-gray-900 mb-1">$299</div>
                        <p className="text-gray-500">/mes</p>
                      </div>

                      <ul className="space-y-3 mb-8">
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#115F5F]" />
                          <span className="text-sm">Análisis básico de ROI</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#115F5F]" />
                          <span className="text-sm">Comparativa de costos</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#115F5F]" />
                          <span className="text-sm">Reportes mensuales</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#115F5F]" />
                          <span className="text-sm">Soporte por email</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#115F5F]" />
                          <span className="text-sm">Dashboard básico</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#115F5F]" />
                          <span className="text-sm">Hasta 50 vehículos</span>
                        </li>
                        <li className="flex items-center space-x-3 opacity-50">
                          <X className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-400">Sin análisis operacional</span>
                        </li>
                        <li className="flex items-center space-x-3 opacity-50">
                          <X className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-400">Sin métricas ambientales</span>
                        </li>
                        <li className="flex items-center space-x-3 opacity-50">
                          <X className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-400">Sin recomendaciones avanzadas</span>
                        </li>
                      </ul>

                      <Button
                        onClick={() => handlePlanSelection("plus")}
                        className="w-full bg-[#115F5F] hover:bg-[#0d4a4a] text-white"
                        size="lg"
                      >
                        Seleccionar Plus
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Pro Plan */}
                  <Card className="relative border-2 border-[#115F5F] bg-gradient-to-br from-[#115F5F]/5 to-[#115F5F]/10">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-[#115F5F] text-white px-4 py-1">⭐ Más Popular</Badge>
                    </div>
                    <CardContent className="p-8">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-[#115F5F]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Crown className="w-8 h-8 text-[#115F5F]" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                        <p className="text-gray-600 mb-4">Para empresas que buscan optimización completa</p>
                        <div className="text-4xl font-bold text-gray-900 mb-1">$599</div>
                        <p className="text-gray-500">/mes</p>
                      </div>

                      <ul className="space-y-3 mb-8">
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#115F5F]" />
                          <span className="text-sm">Todo lo de Plus +</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#115F5F]" />
                          <span className="text-sm">Análisis operacional avanzado</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#115F5F]" />
                          <span className="text-sm">Métricas ambientales detalladas</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#115F5F]" />
                          <span className="text-sm">Recomendaciones personalizadas</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#115F5F]" />
                          <span className="text-sm">Soporte prioritario 24/7</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#115F5F]" />
                          <span className="text-sm">Vehículos ilimitados</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#115F5F]" />
                          <span className="text-sm">Certificaciones ambientales</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#115F5F]" />
                          <span className="text-sm">Análisis de ciclo de vida</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#115F5F]" />
                          <span className="text-sm">Integración con sistemas ERP</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#115F5F]" />
                          <span className="text-sm">Reportes personalizados</span>
                        </li>
                      </ul>

                      <Button
                        onClick={() => handlePlanSelection("pro")}
                        className="w-full bg-[#115F5F] hover:bg-[#0d4a4a] text-white"
                        size="lg"
                      >
                        Seleccionar Pro
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Only show consultation option if a plan is selected */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-4">
                    ¿Necesitas ayuda para decidir? Nuestros especialistas te pueden orientar.
                  </p>
                  <p className="text-sm text-gray-500">
                    La consultoría está disponible después de seleccionar un plan.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ResultPreview() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#115F5F] mx-auto mb-4"></div>
            <p className="text-gray-600">Calculando resultados...</p>
          </div>
        </div>
      }
    >
      <ResultPreviewContent />
    </Suspense>
  )
}
