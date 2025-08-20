"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Zap, Crown, Check, MessageCircle, ArrowRight } from "lucide-react"

interface PlanSelectionFooterProps {
  userEmail?: string
}

export default function PlanSelectionFooter({ userEmail }: PlanSelectionFooterProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePlanSelection = async (planName: string) => {
    setIsProcessing(true)
    setSelectedPlan(planName)

    try {
      // Simulate processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success message
      alert(`🎉 ¡Perfecto! Has seleccionado el Plan ${planName}.

📧 Un especialista VEMO se pondrá en contacto contigo en las próximas 2 horas para:
• Activar tu dashboard ${planName}
• Programar una consulta personalizada
• Responder todas tus preguntas

📱 También puedes contactarnos por WhatsApp si tienes alguna consulta urgente.

¡Gracias por confiar en VEMO!`)

      // Store selection
      localStorage.setItem("selectedPlan", planName.toLowerCase())
      localStorage.setItem("planSelectedAt", new Date().toISOString())
      localStorage.setItem("userEmail", userEmail || "")
    } catch (error) {
      console.error("Error:", error)
      alert("Error al procesar tu selección. Por favor, inténtalo de nuevo.")
    } finally {
      setIsProcessing(false)
      setSelectedPlan(null)
    }
  }

  const plans = [
    {
      name: "Plus",
      price: "$49/mes",
      icon: <Zap className="w-8 h-8" />,
      description: "Dashboard avanzado con análisis técnico y económico",
      features: [
        "Dashboard con 3 tabs: Técnica + Charging + Económica",
        "Gráficos TCO Diesel vs EV",
        "Planificación de infraestructura de carga",
        "Análisis técnico de compatibilidad",
        "10 análisis por mes",
        "Soporte prioritario",
      ],
      color: "border-[#115F5F] text-[#115F5F] hover:bg-[#115F5F] hover:text-white",
      bgColor: "bg-[#115F5F]/5",
    },
    {
      name: "Pro",
      price: "$99/mes",
      icon: <Crown className="w-8 h-8" />,
      description: "Solución completa con análisis financiero y consultoría",
      features: [
        "Todo lo de Plus +",
        "Tab de Finanzas completo",
        "Opciones de financiamiento detalladas",
        "Flujo de caja proyectado",
        "Consultoría personalizada",
        "Análisis ilimitados",
        "Soporte 24/7",
      ],
      color: "bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] text-white hover:from-[#0d4a4a] hover:to-[#115F5F]",
      bgColor: "bg-gradient-to-br from-[#115F5F]/10 to-[#1a7a7a]/10",
      highlighted: true,
    },
  ]

  return (
    <div className="w-full bg-gray-50 py-16 px-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#115F5F] mb-4">Selecciona tu Plan de Dashboard Avanzado</h2>
          <p className="text-gray-600 text-lg">
            Un especialista se contactará contigo para activar tu plan y programar una consulta personalizada
          </p>
        </div>

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#115F5F] mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-[#115F5F] mb-2">Procesando Plan {selectedPlan}...</h3>
              <p className="text-gray-600">Registrando tu selección y preparando tu consulta personalizada</p>
            </div>
          </div>
        )}

        {/* Plans Grid - Only 2 plans, side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Glow effect for Pro plan */}
              {plan.highlighted && (
                <div className="absolute -inset-1 bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] rounded-3xl blur-sm opacity-30" />
              )}

              <Card
                className={`relative h-full transition-all duration-300 border-2 shadow-xl hover:shadow-2xl ${
                  plan.highlighted ? "border-[#115F5F]" : "border-gray-200 hover:border-[#115F5F]"
                }`}
              >
                <CardContent className="p-8">
                  {/* Badge for Pro plan */}
                  {plan.highlighted && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] text-white px-4 py-1">
                      Más Popular
                    </Badge>
                  )}

                  {/* Icon and Header */}
                  <div className="text-center mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${plan.bgColor}`}
                    >
                      <div className="text-[#115F5F]">{plan.icon}</div>
                    </div>

                    <h3 className="text-2xl font-bold text-[#115F5F] mb-2">Plan {plan.name}</h3>

                    <div className="text-3xl font-bold text-[#115F5F] mb-3">{plan.price}</div>

                    <p className="text-gray-600 text-lg">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-800 mb-4">✅ Incluye:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* WhatsApp Support for paid plans */}
                  <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <h5 className="font-semibold text-green-800">Soporte WhatsApp Incluido</h5>
                        <p className="text-sm text-green-700">Consultas rápidas y soporte prioritario</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handlePlanSelection(plan.name)}
                    disabled={isProcessing}
                    className={`w-full py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${plan.color} shadow-lg hover:shadow-xl`}
                  >
                    {isProcessing && selectedPlan === plan.name ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current" />
                        <span>Procesando...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Seleccionar Plan {plan.name}</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    Un especialista te contactará en 2 horas para activar tu plan
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-[#115F5F] mb-4">¿Qué sucede después de seleccionar tu plan?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#115F5F]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#115F5F] font-bold text-lg">1</span>
                </div>
                <h4 className="font-semibold text-[#115F5F] mb-1">Contacto Inmediato</h4>
                <p className="text-sm text-gray-600">Te llamamos en 2 horas para confirmar</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#115F5F]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#115F5F] font-bold text-lg">2</span>
                </div>
                <h4 className="font-semibold text-[#115F5F] mb-1">Activación</h4>
                <p className="text-sm text-gray-600">Activamos tu dashboard personalizado</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#115F5F]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#115F5F] font-bold text-lg">3</span>
                </div>
                <h4 className="font-semibold text-[#115F5F] mb-1">Consultoría</h4>
                <p className="text-sm text-gray-600">Programamos tu sesión personalizada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-500">
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
  )
}
