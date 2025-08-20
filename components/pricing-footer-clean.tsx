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

export default function PricingFooterClean({ currentPlan = "freemium", onContactEnterprise }: PricingFooterProps) {
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
    <div className="w-full bg-gray-50 py-20 px-6" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#115F5F] mb-6">Elige el Plan Perfecto para tu Flota</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Herramientas profesionales para optimizar la electrificación de tu flota comercial
          </p>
        </div>

        {/* Plans Grid - Extra spacing to prevent overlap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
              style={{ zIndex: 10 - index }} // Ensure proper stacking order
            >
              {/* Glow effect for Pro plan */}
              {plan.highlighted && (
                <div className="absolute -inset-2 bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] rounded-3xl blur-sm opacity-30" />
              )}

              <Card
                className={`relative h-full transition-all duration-300 ${
                  plan.highlighted
                    ? "border-[#115F5F] border-2 shadow-2xl"
                    : "border-gray-200 shadow-lg hover:shadow-xl"
                } ${plan.current ? "bg-gray-50" : "bg-white hover:border-[#115F5F]/50"}`}
              >
                <CardContent className="p-8">
                  {/* Badge for current plan - positioned with extra margin */}
                  {plan.current && (
                    <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#115F5F] text-white px-4 py-1">
                      Plan Actual
                    </Badge>
                  )}

                  {/* Badge for highlighted plan */}
                  {plan.highlighted && !plan.current && (
                    <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] text-white px-4 py-1">
                      Más Popular
                    </Badge>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
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
                  <h3 className={`text-2xl font-bold mb-3 ${plan.current ? "text-gray-600" : "text-[#115F5F]"}`}>
                    {plan.name}
                  </h3>

                  <div className={`text-3xl font-bold mb-3 ${plan.current ? "text-gray-600" : "text-[#115F5F]"}`}>
                    {plan.price}
                  </div>

                  <p className="text-gray-600 mb-6 text-lg">{plan.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className={`w-5 h-5 ${plan.highlighted ? "text-[#115F5F]" : "text-green-500"}`} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button - Extra padding and margin to prevent overlap */}
                  <div className="mt-8">
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (plan.id === "plus") goToDashboard("plus")
                        if (plan.id === "pro") goToDashboard("pro")
                      }}
                      disabled={plan.disabled || isLoading === plan.id}
                      className={`w-full py-4 font-semibold transition-all duration-300 text-lg relative ${
                        plan.highlighted && !plan.disabled
                          ? "bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] hover:from-[#0d4a4a] hover:to-[#115F5F] text-white shadow-lg hover:shadow-2xl transform hover:scale-105"
                          : plan.disabled
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-white border-2 border-[#115F5F] text-[#115F5F] hover:bg-[#115F5F] hover:text-white shadow-md hover:shadow-lg transform hover:scale-105"
                      }`}
                      style={{ zIndex: 20 }} // Ensure buttons are on top
                    >
                      {isLoading === plan.id ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current" />
                          <span>Cargando...</span>
                        </div>
                      ) : plan.disabled ? (
                        "Plan Actual"
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <span>Acceder a Dashboard {plan.name}</span>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Section - Completely separate with large margin */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-12 mt-16"
          style={{ zIndex: 5 }} // Lower z-index than plan cards
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#115F5F] to-[#1a7a7a] rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Building2 className="w-10 h-10 text-white" />
            </div>

            <h3 className="text-3xl font-bold text-[#115F5F] mb-6">¿Flota de más de 100 vehículos?</h3>

            <p className="text-gray-600 text-xl mb-10 max-w-3xl mx-auto">
              Ofrecemos soluciones empresariales completamente personalizadas con análisis detallado, implementación
              asistida y soporte dedicado para grandes flotas.
            </p>

            {/* Enterprise Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#115F5F]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-[#115F5F]" />
                </div>
                <h4 className="font-semibold text-[#115F5F] mb-2 text-lg">Análisis Personalizado</h4>
                <p className="text-gray-600">Evaluación específica de tu operación</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#115F5F]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-[#115F5F]" />
                </div>
                <h4 className="font-semibold text-[#115F5F] mb-2 text-lg">Implementación Asistida</h4>
                <p className="text-gray-600">Acompañamiento durante todo el proceso</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#115F5F]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-[#115F5F]" />
                </div>
                <h4 className="font-semibold text-[#115F5F] mb-2 text-lg">Soporte Dedicado</h4>
                <p className="text-gray-600">Equipo especializado 24/7</p>
              </div>
            </div>

            {/* Enterprise CTA - Isolated with extra margin */}
            <div className="mt-12">
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleContactEnterprise()
                }}
                size="lg"
                className="bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] hover:from-[#0d4a4a] hover:to-[#115F5F] text-white px-12 py-5 text-xl font-semibold rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                style={{ zIndex: 30 }} // Highest z-index for enterprise button
              >
                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6" />
                  <span>Contactar Especialista Enterprise</span>
                  <ArrowRight className="w-6 h-6" />
                </div>
              </Button>
            </div>

            {/* Contact Options - Well spaced */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-12 text-gray-500">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>+52 55 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>enterprise@vemo.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp disponible</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators - Final section with extra spacing */}
        <div className="mt-16 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-16 text-gray-500">
            <div className="flex items-center space-x-2">
              <Check className="w-6 h-6 text-green-500" />
              <span className="text-lg">Soporte en español</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-6 h-6 text-green-500" />
              <span className="text-lg">Datos 100% seguros</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-6 h-6 text-green-500" />
              <span className="text-lg">Especialistas en LATAM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
