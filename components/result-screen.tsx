"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { TrendingDown, Leaf, Zap, ArrowRight, CheckCircle } from "lucide-react"
import Confetti from "./confetti"
import VemoLogo from "./vemo-logo"
import PaywallModal from "./paywall-modal"

export default function ResultScreen() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)

  useEffect(() => {
    // Trigger confetti animation on mount
    setShowConfetti(true)
  }, [])

  // Calculate required battery capacity considering degradation
  const calculateBatteryCapacity = () => {
    const dailyKmPerVehicle = 150 // Example daily km
    const energyConsumptionPerKm = 1.2 // kWh per km for electric vehicle
    const dailyEnergyNeed = dailyKmPerVehicle * energyConsumptionPerKm

    // Safety margin for operational flexibility
    const safetyMargin = 1.2

    // Battery degradation: 20% degradation (80% SoH) at 5 years/500,000km
    const degradationFactor = 1.25 // Need 25% more capacity to account for 20% degradation

    const requiredCapacity = dailyEnergyNeed * safetyMargin * degradationFactor

    // Round to common battery pack sizes
    if (requiredCapacity <= 60) return "50-60"
    if (requiredCapacity <= 80) return "70-80"
    if (requiredCapacity <= 120) return "100-120"
    return "200-250"
  }

  const batteryCapacity = calculateBatteryCapacity()

  const metrics = [
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: "Ahorro estimado en OPEX anual",
      value: "35%",
      subtitle: "vs. flota diesel actual",
      color: "text-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "CO₂ evitado",
      value: "18 t/año",
      subtitle: "reducción de emisiones",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Capacidad de batería requerida",
      value: `${batteryCapacity} kWh`,
      subtitle: "considerando degradación a 5 años",
      color: "text-[#115F5F]",
      bgColor: "bg-[#115F5F]/10",
      iconColor: "text-[#115F5F]",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      {showConfetti && <Confetti />}

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl w-full">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <VemoLogo size="lg" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#115F5F] mb-4">Resultado Preliminar</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Basado en los datos de tu flota, hemos calculado el potencial de electrificación
          </p>
        </motion.div>

        {/* Metrics Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                  <div>
                    <div
                      className={`w-16 h-16 ${metric.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
                    >
                      <div className={metric.iconColor}>{metric.icon}</div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 leading-tight">{metric.title}</h3>
                  </div>
                  <div>
                    <div className={`text-4xl md:text-5xl font-bold ${metric.color} mb-2`}>{metric.value}</div>
                    <p className="text-sm text-gray-500">{metric.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Battery Degradation Info */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="shadow-md border-0 bg-amber-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">Consideraciones de degradación de batería</h4>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    El cálculo incluye un margen de seguridad considerando que las baterías se degradan aproximadamente
                    20% (Estado de Salud del 80%) al alcanzar 500,000 km o 5 años de operación. La capacidad recomendada
                    garantiza el cumplimiento operativo durante todo el período de recuperación de la inversión.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Info */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#115F5F] mb-1">2.5 años</div>
                  <div className="text-sm text-gray-600">Período de recuperación</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#115F5F] mb-1">$245,000</div>
                  <div className="text-sm text-gray-600">Ahorro total en 5 años</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#115F5F] mb-1">95%</div>
                  <div className="text-sm text-gray-600">Compatibilidad de rutas</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="text-center">
          <Button
            size="lg"
            className="bg-[#115F5F] hover:bg-[#0d4a4a] text-white px-12 py-6 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full md:w-auto"
            onClick={() => setShowPaywall(true)}
          >
            <span>Ver Planes de Dashboard Avanzado</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-sm text-gray-500 mt-4">Accede a análisis técnico, económico y financiero detallado</p>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Datos verificados</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Cálculos precisos</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Recomendaciones personalizadas</span>
            </div>
          </div>
        </motion.div>

        {/* Paywall Modal */}
        <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} />
      </motion.div>
    </div>
  )
}
