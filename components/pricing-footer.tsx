"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Zap, Crown, Star, ArrowRight, Check, Mail, Phone, MessageCircle, Building2 } from "lucide-react"

interface PricingFooterProps {
  currentPlan?: "freemium" | "plus" | "pro"
  onContactEnterprise?: () => void
}

export default function PricingFooter({ currentPlan = "freemium", onContactEnterprise }: PricingFooterProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const goToDashboard = async (plan: "plus" | "pro") => {
    setIsLoading(plan)

    try {
      // Simulate loading
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store plan selection
      localStorage.setItem("selectedPlan", plan)
      localStorage.setItem("planSelectedAt", new Date().toISOString())

      // Redirect to dashboard
      window.location.href = `/dashboard?plan=${plan}`
    } catch (error) {
      console.error("Error navigating to dashboard:", error)
      alert("Error al acceder al dashboard. Por favor, inténtalo de nuevo.")
    } finally {
      setIsLoading(null)
    }
  }

  const handleContactEnterprise = () => {
    if (onContactEnterprise) {
      onContactEnterprise()
    } else {
      // Default behavior - open email
      window.location.href = "mailto:enterprise@vemo.com?subject=Consulta Enterprise - Flota +100 Vehículos"
    }
  }

  const plans = [
    {
      id: "freemium",
      name: "Freemium",
      icon: <Star className="w-5 h-5" />,
      price: "Gratis",
      description: "Análisis básico",
      features: ["Análisis ROI básico", "Reporte PDF", "1 análisis/mes"],
      current: currentPlan === "freemium",
      disabled: currentPlan === "freemium",
    },
    {
      id: "plus",
      name: "Plus",
      icon: <Zap className="w-5 h-5" />,
      price: "$49/mes",
      description: "Dashboard avanzado",
      features: ["Dashboard técnico", "Análisis de carga", "TCO detallado", "10 análisis/mes"],
      current: currentPlan === "plus",
      disabled: currentPlan === "plus",
    },
    {
      id: "pro",
      name: "Pro",
      icon: <Crown className="w-5 h-5" />,
      price: "$99/mes",
      description: "Solución completa",
      features: ["Todo de Plus", "Análisis financiero", "Consultoría", "Análisis ilimitados"],
      current: currentPlan === "pro",
      disabled: currentPlan === "pro",
      highlighted: true,
    },
  ]

  return (
    <div className="w-full bg-gray-50 py-16 px-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#115F5F] mb-4">Elige el Plan Perfecto para tu Flota</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Herramientas profesionales para optimizar la electrificación de tu flota comercial
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Glow effect for Pro plan */}
              {plan.highlighted && (
                <div className="absolute -inset-1 bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] rounded-2xl blur-sm opacity-30" />
              )}

              <Card
                className={`relative h-full transition-all duration-300 ${
                  plan.highlighted ? "border-[#115F5F] border-2 shadow-xl" : "border-gray-200 shadow-lg hover:shadow-xl"
                } ${plan.current ? "bg-gray-50" : "bg-white hover:border-[#115F5F]/50"}`}
              >
                <CardContent className="p-6">
                  {/* Badge for current plan */}
                  {plan.current && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#115F5F] text-white">
                      Plan Actual
                    </Badge>
                  )}

                  {/* Badge for highlighted plan */}
                  {plan.highlighted && !plan.current && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] text-white">
                      Más Popular
                    </Badge>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      plan.highlighted
                        ? "bg-gradient-to-br from-[#115F5F] to-[#1a7a7a] text-white"
                        : plan.current
                          ? "bg-gray-300 text-gray-600"
                          : "bg-[#115F5F]/10 text-[#115F5F]"
                    }`}
                  >
                    {plan.icon}
                  </div>

                  {/* Plan Info */}
                  <h3 className={`text-xl font-bold mb-2 ${plan.current ? "text-gray-600" : "text-[#115F5F]"}`}>
                    {plan.name}
                  </h3>

                  <div className={`text-2xl font-bold mb-2 ${plan.current ? "text-gray-600" : "text-[#115F5F]"}`}>
                    {plan.price}
                  </div>

                  <p className="text-gray-600 mb-4">{plan.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <Check className={`w-4 h-4 ${plan.highlighted ? "text-[#115F5F]" : "text-green-500"}`} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    onClick={() => {
                      if (plan.id === "plus") goToDashboard("plus")
                      if (plan.id === "pro") goToDashboard("pro")
                    }}
                    disabled={plan.disabled || isLoading === plan.id}
                    className={`w-full py-3 font-semibold transition-all duration-300 ${
                      plan.highlighted && !plan.disabled
                        ? "bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] hover:from-[#0d4a4a] hover:to-[#115F5F] text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                        : plan.disabled
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-white border-2 border-[#115F5F] text-[#115F5F] hover:bg-[#115F5F] hover:text-white shadow-md hover:shadow-lg"
                    }`}
                  >
                    {isLoading === plan.id ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                        <span>Cargando...</span>
                      </div>
                    ) : plan.disabled ? (
                      "Plan Actual"
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Acceder a Dashboard {plan.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#115F5F] to-[#1a7a7a] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-2xl font-bold text-[#115F5F] mb-4">¿Flota de más de 100 vehículos?</h3>

            <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
              Ofrecemos soluciones empresariales completamente personalizadas con análisis detallado, implementación
              asistida y soporte dedicado para grandes flotas.
            </p>

            {/* Enterprise Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#115F5F]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-[#115F5F]" />
                </div>
                <h4 className="font-semibold text-[#115F5F] mb-1">Análisis Personalizado</h4>
                <p className="text-sm text-gray-600">Evaluación específica de tu operación</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-[#115F5F]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-[#115F5F]" />
                </div>
                <h4 className="font-semibold text-[#115F5F] mb-1">Implementación Asistida</h4>
                <p className="text-sm text-gray-600">Acompañamiento durante todo el proceso</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-[#115F5F]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-[#115F5F]" />
                </div>
                <h4 className="font-semibold text-[#115F5F] mb-1">Soporte Dedicado</h4>
                <p className="text-sm text-gray-600">Equipo especializado 24/7</p>
              </div>
            </div>

            {/* Enterprise CTA */}
            <Button
              onClick={handleContactEnterprise}
              size="lg"
              className="bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] hover:from-[#0d4a4a] hover:to-[#115F5F] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Contactar Especialista Enterprise</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Button>

            {/* Contact Options */}
            <div className="mt-6 flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+52 55 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>enterprise@vemo.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp disponible</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="flex justify-center items-center space-x-12 text-gray-500">
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Soporte en español</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Datos 100% seguros</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Especialistas en LATAM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
