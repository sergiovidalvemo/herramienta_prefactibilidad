"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check, X, Zap, Users, Shield, Crown, Sparkles, TrendingUp, Globe, Award, Leaf } from "lucide-react"
import { useRouter } from "next/navigation"

interface PaywallModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PaywallModal({ isOpen, onClose }: PaywallModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"plus" | "pro">("pro")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handlePlanSelect = async (plan: "plus" | "pro") => {
    setIsLoading(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to appropriate dashboard
    if (plan === "plus") {
      router.push("/dashboard")
    } else {
      router.push("/dashboard-pro")
    }

    setIsLoading(false)
    onClose()
  }

  const plans = [
    {
      id: "plus" as const,
      name: "Plus",
      price: "$299",
      period: "/mes",
      description: "Perfecto para flotas medianas",
      popular: false,
      features: [
        "Análisis básico de ROI",
        "Comparativa de costos",
        "Reportes mensuales",
        "Soporte por email",
        "Dashboard básico",
        "Hasta 50 vehículos",
      ],
      limitations: ["Sin análisis operacional", "Sin métricas ambientales", "Sin recomendaciones avanzadas"],
      icon: Zap,
    },
    {
      id: "pro" as const,
      name: "Pro",
      price: "$599",
      period: "/mes",
      description: "Para empresas que buscan optimización completa",
      popular: true,
      features: [
        "Todo lo de Plus +",
        "Análisis operacional avanzado",
        "Métricas ambientales detalladas",
        "Recomendaciones personalizadas",
        "Soporte prioritario 24/7",
        "Vehículos ilimitados",
        "Certificaciones ambientales",
        "Análisis de ciclo de vida",
        "Integración con sistemas ERP",
        "Reportes personalizados",
      ],
      limitations: [],
      icon: Crown,
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">Elige tu Plan de Análisis</DialogTitle>
          <p className="text-gray-600 text-center">Desbloquea el potencial completo de tu flota eléctrica</p>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative cursor-pointer transition-all duration-200 ${
                selectedPlan === plan.id ? "ring-2 ring-[#115F5F] shadow-lg" : "hover:shadow-md"
              } ${plan.popular ? "border-[#115F5F]/30" : ""}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-[#115F5F] text-white px-4 py-1">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Más Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 bg-[#115F5F]/10">
                  <plan.icon className="w-8 h-8 text-[#115F5F]" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-[#115F5F] mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-start space-x-3 opacity-60">
                      <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full mt-6 bg-[#115F5F] hover:bg-[#0d4a4a] text-white"
                  onClick={() => handlePlanSelect(plan.id)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Procesando...</span>
                    </div>
                  ) : (
                    `Seleccionar ${plan.name}`
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-[#115F5F]/5 to-[#115F5F]/10 rounded-lg">
          <h3 className="text-lg font-semibold text-center mb-4">¿Por qué elegir nuestro análisis profesional?</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#115F5F]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-[#115F5F]" />
              </div>
              <h4 className="font-semibold text-sm">ROI Garantizado</h4>
              <p className="text-xs text-gray-600">Optimiza tu inversión con datos precisos</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#115F5F]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Leaf className="w-6 h-6 text-[#115F5F]" />
              </div>
              <h4 className="font-semibold text-sm">Impacto Ambiental</h4>
              <p className="text-xs text-gray-600">Contribuye a un futuro sostenible</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#115F5F]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6 text-[#115F5F]" />
              </div>
              <h4 className="font-semibold text-sm">Certificación</h4>
              <p className="text-xs text-gray-600">Obtén certificaciones ambientales</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>Pago seguro</span>
            </div>
            <div className="flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span>Soporte 24/7</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>+500 empresas confían en nosotros</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
