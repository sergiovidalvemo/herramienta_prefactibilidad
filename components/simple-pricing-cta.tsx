"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Crown, Mail } from "lucide-react"

interface SimplePricingCTAProps {
  currentPlan?: "freemium" | "plus" | "pro"
}

export default function SimplePricingCTA({ currentPlan = "freemium" }: SimplePricingCTAProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const goToDashboard = async (plan: "plus" | "pro") => {
    setIsLoading(plan)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      localStorage.setItem("selectedPlan", plan)
      localStorage.setItem("planSelectedAt", new Date().toISOString())
      window.location.href = `/dashboard?plan=${plan}`
    } catch (error) {
      console.error("Error:", error)
      alert("Error al acceder al dashboard. Inténtalo de nuevo.")
    } finally {
      setIsLoading(null)
    }
  }

  const handleContactEnterprise = () => {
    window.location.href = "mailto:enterprise@vemo.com?subject=Consulta Enterprise - Flota +100 Vehículos"
  }

  return (
    <div className="w-full bg-gray-50 py-16 px-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#115F5F] mb-4">Elige tu Plan de Dashboard</h2>
          <p className="text-gray-600 text-lg">Herramientas profesionales para optimizar tu flota eléctrica</p>
        </div>

        {/* 3 CTA Buttons - Stack on mobile, row on desktop */}
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {/* CTA 1: Dashboard Plus */}
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 h-full">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-[#115F5F]/10 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#115F5F]" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#115F5F] text-center mb-2">Dashboard Plus</h3>

              <p className="text-gray-600 text-center mb-6">Análisis técnico y económico avanzado</p>

              <Button
                onClick={() => goToDashboard("plus")}
                disabled={currentPlan === "plus" || isLoading === "plus"}
                className={`w-full py-3 font-semibold transition-all duration-300 ${
                  currentPlan === "plus"
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white border-2 border-[#115F5F] text-[#115F5F] hover:bg-[#115F5F] hover:text-white"
                }`}
              >
                {isLoading === "plus" ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                    <span>Cargando...</span>
                  </div>
                ) : currentPlan === "plus" ? (
                  "Plan Actual"
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Acceder a Dashboard Plus</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* CTA 2: Dashboard Pro */}
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-[#115F5F] p-6 h-full relative">
              {/* Popular badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#115F5F] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Más Popular
                </span>
              </div>

              <div className="flex items-center justify-center mb-4 mt-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#115F5F] to-[#1a7a7a] rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#115F5F] text-center mb-2">Dashboard Pro</h3>

              <p className="text-gray-600 text-center mb-6">Solución completa con análisis financiero</p>

              <Button
                onClick={() => goToDashboard("pro")}
                disabled={currentPlan === "pro" || isLoading === "pro"}
                className={`w-full py-3 font-semibold transition-all duration-300 ${
                  currentPlan === "pro"
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] hover:from-[#0d4a4a] hover:to-[#115F5F] text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {isLoading === "pro" ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                    <span>Cargando...</span>
                  </div>
                ) : currentPlan === "pro" ? (
                  "Plan Actual"
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Acceder a Dashboard Pro</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* CTA 3: Enterprise Contact */}
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 h-full">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-[#115F5F]/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#115F5F]" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#115F5F] text-center mb-2">Enterprise</h3>

              <p className="text-gray-600 text-center mb-6">Solución personalizada para +100 vehículos</p>

              <Button
                onClick={handleContactEnterprise}
                className="w-full py-3 font-semibold bg-white border-2 border-[#115F5F] text-[#115F5F] hover:bg-[#115F5F] hover:text-white transition-all duration-300"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>Contactar Especialista Enterprise</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-500">
          <span>✓ Soporte en español</span>
          <span>✓ Datos 100% seguros</span>
          <span>✓ Especialistas en LATAM</span>
        </div>
      </div>
    </div>
  )
}
