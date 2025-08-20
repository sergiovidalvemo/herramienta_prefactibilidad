"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Star, Zap, Crown, Sparkles } from "lucide-react"
import VemoLogo from "./vemo-logo"
import ContactModal from "./contact-modal"

export default function PaywallPage() {
  const [showModal, setShowModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  const handleCloseModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    // Open modal after 0.3 seconds
    const timer = setTimeout(() => {
      setShowModal(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const tiers = [
    {
      name: "Freemium",
      icon: <Star className="w-6 h-6" />,
      price: "Gratis",
      period: "siempre",
      description: "Análisis básico para comenzar",
      features: [
        "Análisis básico de ROI",
        "Comparación simple EV vs Diesel",
        "Reporte en PDF básico",
        "1 análisis por mes",
        "Soporte por email",
      ],
      limitations: [
        "Sin acceso al dashboard avanzado",
        "Sin análisis detallado de rutas",
        "Sin recomendaciones personalizadas",
        "Sin análisis de múltiples escenarios",
      ],
      current: true,
      cta: "Plan Actual",
      ctaDisabled: true,
    },
    {
      name: "Plus",
      icon: <Zap className="w-6 h-6" />,
      price: "$49",
      period: "/mes",
      description: "Dashboard avanzado + Análisis técnico y económico",
      features: [
        "Todo lo de Freemium",
        "🎯 Dashboard con tabs: Técnica + Charging + Económica",
        "📊 Gráficos TCO Diesel vs EV",
        "⚡ Planificación de infraestructura de carga",
        "🔧 Análisis técnico de compatibilidad",
        "10 análisis por mes",
        "Soporte prioritario",
      ],
      limitations: ["Sin tab de Finanzas avanzado", "Sin análisis de financiamiento", "Sin consultoría personalizada"],
      current: false,
      cta: "Acceder a Dashboard Plus",
      ctaDisabled: false,
    },
    {
      name: "Pro",
      icon: <Crown className="w-6 h-6" />,
      price: "$99",
      period: "/mes",
      description: "Solución completa: Dashboard + Finanzas + Consultoría",
      features: [
        "Todo lo de Plus",
        "💰 Tab de Finanzas completo",
        "🏦 Opciones de financiamiento detalladas",
        "📈 Flujo de caja proyectado",
        "🎯 Análisis de múltiples escenarios",
        "👨‍💼 Consultoría personalizada",
        "🔗 Integración empresarial",
        "Análisis ilimitados",
        "Soporte 24/7",
      ],
      limitations: [],
      current: false,
      cta: "Acceder a Dashboard Pro",
      ctaDisabled: false,
      highlighted: true,
    },
  ]

  const handleSelectPlan = async (tierName: string) => {
    if (tierName === "Freemium") return

    console.log("Plan selected:", tierName) // Debug log

    try {
      const planParam = tierName.toLowerCase() === "plus" ? "plus" : "pro"

      // Store plan selection
      localStorage.setItem("selectedPlan", planParam)
      localStorage.setItem("planSelectedAt", new Date().toISOString())

      // Close modal first
      setShowModal(false)

      // Show success message
      alert(`🎉 ¡Plan ${tierName} activado exitosamente! Serás redirigido al dashboard avanzado.`)

      // Small delay then redirect
      setTimeout(() => {
        window.location.href = `/dashboard?plan=${planParam}`
      }, 500)
    } catch (error) {
      console.error("Error selecting plan:", error)
      alert("Error al activar el plan. Por favor, inténtalo de nuevo.")
    }
  }

  const handleContactSales = () => {
    console.log("Contact sales clicked") // Debug log
    setShowModal(false) // Close main modal first
    setTimeout(() => {
      setShowContactModal(true)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Background Content */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <VemoLogo size="lg" />
        </div>
        <h1 className="text-4xl font-bold text-[#115F5F] mb-4">Desbloquea el Potencial Completo de VEMO</h1>
        <p className="text-xl text-gray-600 mb-8">
          Accede a análisis avanzados y herramientas profesionales para tu flota
        </p>

        {/* Placeholder content while modal loads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-30">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="h-32 bg-gray-200 rounded-lg mb-4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(17, 95, 95, 0.9)" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="relative p-8 border-b border-gray-200">
                <button
                  onClick={handleCloseModal}
                  className="absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      <VemoLogo size="lg" />
                    </motion.div>
                  </div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl font-bold text-[#115F5F] mb-4"
                  >
                    Elige tu Plan Perfecto
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-600 text-xl max-w-2xl mx-auto"
                  >
                    Desbloquea análisis avanzados y herramientas profesionales para optimizar tu flota eléctrica
                  </motion.p>
                </div>
              </div>

              {/* Pricing Tiers */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {tiers.map((tier, index) => (
                    <motion.div
                      key={tier.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="relative h-full"
                    >
                      {/* Pro tier glow effect */}
                      {tier.highlighted && (
                        <motion.div
                          className="absolute -inset-2 bg-gradient-to-r from-[#115F5F] via-[#1a7a7a] to-[#115F5F] rounded-3xl blur-lg opacity-75"
                          animate={{
                            opacity: [0.5, 0.8, 0.5],
                            scale: [1, 1.02, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />
                      )}

                      <Card
                        className={`relative h-full transition-all duration-300 ${
                          tier.highlighted
                            ? "border-[#115F5F] border-2 shadow-2xl bg-gradient-to-br from-white to-[#115F5F]/5"
                            : tier.current
                              ? "border-gray-300 bg-gray-50/50"
                              : "border-gray-200 hover:border-[#115F5F]/50 hover:shadow-xl"
                        }`}
                      >
                        <CardHeader className="text-center pb-4 relative">
                          {/* Badges */}
                          {tier.current && (
                            <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white">
                              Plan Actual
                            </Badge>
                          )}
                          {tier.highlighted && (
                            <motion.div
                              animate={{ y: [-2, 2, -2] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] text-white">
                                <Sparkles className="w-3 h-3 mr-1" />
                                Más Popular
                              </Badge>
                            </motion.div>
                          )}

                          {/* Icon */}
                          <motion.div
                            className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 ${
                              tier.highlighted
                                ? "bg-gradient-to-br from-[#115F5F] to-[#1a7a7a] text-white shadow-lg"
                                : tier.current
                                  ? "bg-gray-400 text-white"
                                  : "bg-[#115F5F]/10 text-[#115F5F]"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {tier.icon}
                          </motion.div>

                          {/* Title and Price */}
                          <CardTitle className={`text-3xl mb-2 ${tier.current ? "text-gray-600" : "text-[#115F5F]"}`}>
                            {tier.name}
                          </CardTitle>
                          <div className="mb-4">
                            <span className={`text-5xl font-bold ${tier.current ? "text-gray-600" : "text-[#115F5F]"}`}>
                              {tier.price}
                            </span>
                            <span className="text-gray-500 text-xl">{tier.period}</span>
                          </div>
                          <p className="text-gray-600 text-lg">{tier.description}</p>
                        </CardHeader>

                        <CardContent className="pt-0 flex flex-col h-full">
                          {/* Features */}
                          <div className="space-y-4 mb-8 flex-grow">
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-3 text-lg">✅ Incluye:</h4>
                              {tier.features.map((feature, featureIndex) => (
                                <motion.div
                                  key={featureIndex}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.8 + featureIndex * 0.05 }}
                                  className="flex items-start space-x-3 mb-2"
                                >
                                  <Check
                                    className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                                      tier.highlighted ? "text-[#115F5F]" : "text-green-500"
                                    }`}
                                  />
                                  <span className="text-gray-700">{feature}</span>
                                </motion.div>
                              ))}
                            </div>

                            {/* Limitations */}
                            {tier.limitations.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-gray-600 mb-3 text-lg">❌ No incluye:</h4>
                                {tier.limitations.map((limitation, limitationIndex) => (
                                  <div key={limitationIndex} className="flex items-start space-x-3 mb-2 opacity-60">
                                    <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-400" />
                                    <span className="text-gray-500 text-sm">{limitation}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* CTA Button */}
                          <motion.div
                            whileHover={{ scale: tier.ctaDisabled ? 1 : 1.02 }}
                            whileTap={{ scale: tier.ctaDisabled ? 1 : 0.98 }}
                          >
                            <Button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                console.log("Button clicked for tier:", tier.name)
                                handleSelectPlan(tier.name)
                              }}
                              disabled={tier.ctaDisabled}
                              className={`w-full py-4 text-lg font-semibold transition-all duration-300 relative z-20 ${
                                tier.highlighted
                                  ? "bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] hover:from-[#0d4a4a] hover:to-[#115F5F] text-white shadow-xl hover:shadow-2xl"
                                  : tier.current
                                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                                    : "bg-white border-2 border-[#115F5F] text-[#115F5F] hover:bg-[#115F5F] hover:text-white shadow-lg hover:shadow-xl"
                              }`}
                            >
                              {tier.cta}
                            </Button>
                          </motion.div>

                          {!tier.current && !tier.ctaDisabled && (
                            <p className="text-xs text-gray-500 text-center mt-3">
                              Sin compromiso • Cancelación en cualquier momento
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="mt-12 text-center"
                >
                  <div className="bg-gradient-to-r from-[#115F5F]/10 to-[#1a7a7a]/10 rounded-2xl p-8 border border-[#115F5F]/20 mb-8">
                    <h3 className="text-2xl font-bold text-[#115F5F] mb-4">¿Necesitas una solución personalizada?</h3>
                    <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
                      Para flotas de más de 100 vehículos, ofrecemos soluciones empresariales completamente adaptadas a
                      tus necesidades específicas
                    </p>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleContactSales}
                      className="border-2 border-[#115F5F] text-[#115F5F] hover:bg-[#115F5F] hover:text-white text-lg px-8 py-3 relative z-10 bg-transparent"
                    >
                      Contactar Especialista Enterprise
                    </Button>
                  </div>

                  {/* Trust Indicators */}
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
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Contact Modal */}
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
    </div>
  )
}
