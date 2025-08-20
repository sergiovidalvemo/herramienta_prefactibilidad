"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, CheckCircle, Truck, Car, Zap, MapPin, DollarSign, Fuel } from "lucide-react"
import VemoLogo from "./vemo-logo"

interface FormData {
  // Step 1: Fleet Information
  fleetSize: string
  vehicleType: string
  operationType: string

  // Step 2: Route Information
  routeKmPerDay: string
  routeType: string

  // Step 3: Cost Information
  fuelCostPerLiter: string
  currentMonthlyCost: string
}

const initialFormData: FormData = {
  fleetSize: "",
  vehicleType: "",
  operationType: "",
  routeKmPerDay: "",
  routeType: "",
  fuelCostPerLiter: "",
  currentMonthlyCost: "",
}

export default function FormWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalSteps = 3

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {}

    switch (step) {
      case 1:
        if (!formData.fleetSize) newErrors.fleetSize = "Requerido"
        if (!formData.vehicleType) newErrors.vehicleType = "Requerido"
        if (!formData.operationType) newErrors.operationType = "Requerido"
        break
      case 2:
        if (!formData.routeKmPerDay) newErrors.routeKmPerDay = "Requerido"
        if (!formData.routeType) newErrors.routeType = "Requerido"
        break
      case 3:
        if (!formData.fuelCostPerLiter) newErrors.fuelCostPerLiter = "Requerido"
        if (!formData.currentMonthlyCost) newErrors.currentMonthlyCost = "Requerido"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Calculate basic results
      const fleetSize = Number.parseInt(formData.fleetSize)
      const routeKmPerDay = Number.parseInt(formData.routeKmPerDay)
      const fuelCostPerLiter = Number.parseFloat(formData.fuelCostPerLiter)
      const currentMonthlyCost = Number.parseInt(formData.currentMonthlyCost)

      // Basic calculations
      const fuelConsumptionLitersPer100km = formData.vehicleType === "sedan" ? 8 : 12
      const dailyFuelConsumption = (routeKmPerDay * fuelConsumptionLitersPer100km) / 100
      const monthlyFuelCost = dailyFuelConsumption * fuelCostPerLiter * 30 * fleetSize

      const electricityCostPerKwh = 0.12
      const energyConsumptionKwhPer100km = formData.vehicleType === "sedan" ? 15 : 30
      const dailyEnergyConsumption = (routeKmPerDay * energyConsumptionKwhPer100km) / 100
      const monthlyElectricityCost = dailyEnergyConsumption * electricityCostPerKwh * 30 * fleetSize

      const monthlyFuelSavings = monthlyFuelCost - monthlyElectricityCost
      const totalMonthlySavings = monthlyFuelSavings + fleetSize * 500 // Add maintenance savings
      const savingsPct = Math.round((totalMonthlySavings / currentMonthlyCost) * 100)

      const co2EmissionKgPerLiter = 2.31
      const monthlyCo2Diesel = dailyFuelConsumption * co2EmissionKgPerLiter * 30 * fleetSize
      const co2ReductionKg = monthlyCo2Diesel * 0.85 // 85% reduction
      const co2ReductionTons = Math.round((co2ReductionKg * 12) / 1000) // Annual tons

      const paybackMonths = Math.round((fleetSize * 80000) / totalMonthlySavings) // Assuming 80k per EV

      const resultData = {
        savingsPct,
        co2: co2ReductionTons,
        monthlyFuelSavings: Math.round(monthlyFuelSavings),
        paybackMonths,
        totalMonthlySavings: Math.round(totalMonthlySavings),
        fleetSize,
        routeKmPerDay,
        vehicleType: formData.vehicleType,
        operationType: formData.operationType,
      }

      // Encode data and redirect to results
      const encodedData = btoa(JSON.stringify(resultData))
      window.location.href = `/result/preview?d=${encodedData}`
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#115F5F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-[#115F5F]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Información de la Flota</h2>
              <p className="text-gray-600">Cuéntanos sobre tu flota actual</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="fleetSize">Número de vehículos en la flota</Label>
                <Input
                  id="fleetSize"
                  type="number"
                  placeholder="ej. 25"
                  value={formData.fleetSize}
                  onChange={(e) => updateFormData("fleetSize", e.target.value)}
                  className={errors.fleetSize ? "border-red-500" : ""}
                />
                {errors.fleetSize && <p className="text-red-500 text-sm mt-1">{errors.fleetSize}</p>}
              </div>

              <div>
                <Label htmlFor="vehicleType">Tipo de vehículos</Label>
                <Select value={formData.vehicleType} onValueChange={(value) => updateFormData("vehicleType", value)}>
                  <SelectTrigger className={errors.vehicleType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecciona el tipo de vehículo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedán / Auto ejecutivo</SelectItem>
                    <SelectItem value="van">Camioneta / Van</SelectItem>
                    <SelectItem value="truck">Camión / Vehículo de carga</SelectItem>
                  </SelectContent>
                </Select>
                {errors.vehicleType && <p className="text-red-500 text-sm mt-1">{errors.vehicleType}</p>}
              </div>

              <div>
                <Label htmlFor="operationType">Tipo de operación</Label>
                <Select
                  value={formData.operationType}
                  onValueChange={(value) => updateFormData("operationType", value)}
                >
                  <SelectTrigger className={errors.operationType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecciona el tipo de operación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relaxed">Relajada (horarios flexibles, tiempo suficiente para carga)</SelectItem>
                    <SelectItem value="intermediate">
                      Intermedia (operación estándar, ventanas de carga regulares)
                    </SelectItem>
                    <SelectItem value="intensive">Intensiva (operación continua, necesidad de carga rápida)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.operationType && <p className="text-red-500 text-sm mt-1">{errors.operationType}</p>}
              </div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#115F5F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-[#115F5F]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Información de Rutas</h2>
              <p className="text-gray-600">Detalles sobre el uso diario de los vehículos</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="routeKmPerDay">Kilómetros recorridos por día (promedio por vehículo)</Label>
                <Input
                  id="routeKmPerDay"
                  type="number"
                  placeholder="ej. 150"
                  value={formData.routeKmPerDay}
                  onChange={(e) => updateFormData("routeKmPerDay", e.target.value)}
                  className={errors.routeKmPerDay ? "border-red-500" : ""}
                />
                {errors.routeKmPerDay && <p className="text-red-500 text-sm mt-1">{errors.routeKmPerDay}</p>}
              </div>

              <div>
                <Label htmlFor="routeType">Tipo de rutas principales</Label>
                <Select value={formData.routeType} onValueChange={(value) => updateFormData("routeType", value)}>
                  <SelectTrigger className={errors.routeType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecciona el tipo de ruta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urban">Urbanas (ciudad, tráfico denso)</SelectItem>
                    <SelectItem value="mixed">Mixtas (ciudad y carretera)</SelectItem>
                    <SelectItem value="highway">Carretera (largas distancias)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.routeType && <p className="text-red-500 text-sm mt-1">{errors.routeType}</p>}
              </div>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#115F5F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-[#115F5F]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Información de Costos</h2>
              <p className="text-gray-600">Datos financieros actuales de tu flota</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="fuelCostPerLiter">Costo del combustible por litro (USD)</Label>
                <Input
                  id="fuelCostPerLiter"
                  type="number"
                  step="0.01"
                  placeholder="ej. 1.45"
                  value={formData.fuelCostPerLiter}
                  onChange={(e) => updateFormData("fuelCostPerLiter", e.target.value)}
                  className={errors.fuelCostPerLiter ? "border-red-500" : ""}
                />
                {errors.fuelCostPerLiter && <p className="text-red-500 text-sm mt-1">{errors.fuelCostPerLiter}</p>}
              </div>

              <div>
                <Label htmlFor="currentMonthlyCost">Costo operativo mensual actual (USD)</Label>
                <Input
                  id="currentMonthlyCost"
                  type="number"
                  placeholder="ej. 45000"
                  value={formData.currentMonthlyCost}
                  onChange={(e) => updateFormData("currentMonthlyCost", e.target.value)}
                  className={errors.currentMonthlyCost ? "border-red-500" : ""}
                />
                {errors.currentMonthlyCost && <p className="text-red-500 text-sm mt-1">{errors.currentMonthlyCost}</p>}
                <p className="text-sm text-gray-500 mt-1">
                  Incluye combustible, mantenimiento, seguros y otros costos operativos
                </p>
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <VemoLogo size="lg" />
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Calculadora de Electrificación</h1>
          <p className="mt-2 text-gray-600">
            Descubre el potencial de ahorro y beneficios ambientales de electrificar tu flota
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Paso {currentStep} de {totalSteps}
            </span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% completado</span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </Button>

              {currentStep < totalSteps ? (
                <Button onClick={nextStep} className="flex items-center space-x-2 bg-[#115F5F] hover:bg-[#0d4a4a]">
                  <span>Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 bg-[#115F5F] hover:bg-[#0d4a4a]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Calculando...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Calcular Resultados</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Benefits Preview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <Zap className="w-8 h-8 text-[#115F5F] mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Ahorro Operativo</h3>
            <p className="text-sm text-gray-600">Reduce costos de combustible y mantenimiento</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <Car className="w-8 h-8 text-[#115F5F] mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Análisis Personalizado</h3>
            <p className="text-sm text-gray-600">Recomendaciones específicas para tu flota</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <Fuel className="w-8 h-8 text-[#115F5F] mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Impacto Ambiental</h3>
            <p className="text-sm text-gray-600">Calcula la reducción de emisiones CO₂</p>
          </div>
        </div>
      </div>
    </div>
  )
}
