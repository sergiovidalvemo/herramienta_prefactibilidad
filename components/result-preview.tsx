"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, Zap, DollarSign, Truck, Leaf, Clock, Download, Share2, Eye } from "lucide-react"
import VemoLogo from "./vemo-logo"

// Componente interno que usa useSearchParams
function ResultPreviewContent() {
  const searchParams = useSearchParams()
  const [showFullReport, setShowFullReport] = useState(false)

  // Datos de ejemplo basados en los parámetros
  const vehicleType = searchParams.get("vehicle") || "van"
  const dailyKm = Number.parseInt(searchParams.get("dailyKm") || "150")
  const fleetSize = Number.parseInt(searchParams.get("fleetSize") || "5")

  // Cálculos basados en los parámetros
  const annualSavings = Math.round(dailyKm * 365 * 0.12 * fleetSize + fleetSize * 2400)
  const co2Reduction = Math.round((dailyKm * 365 * 0.15 * fleetSize) / 1000)
  const paybackPeriod = Math.round(((35000 * fleetSize) / annualSavings) * 10) / 10

  const handleDownloadReport = () => {
    // Simular descarga de reporte
    alert("Descargando reporte completo en PDF...")
  }

  const handleShareReport = () => {
    // Simular compartir reporte
    if (navigator.share) {
      navigator.share({
        title: "Análisis VEMO - Transición a Flota Eléctrica",
        text: `Ahorro anual proyectado: €${annualSavings.toLocaleString()}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Enlace copiado al portapapeles")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <VemoLogo size="md" />
            <div>
              <h1 className="text-2xl font-bold text-[#115F5F]">Análisis de Prefactibilidad</h1>
              <p className="text-gray-600">Resultados de tu evaluación</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={handleShareReport}>
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadReport}>
              <Download className="w-4 h-4 mr-2" />
              Descargar PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Executive Summary */}
        <Card className="mb-8 border-l-4 border-l-[#115F5F]">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Resumen Ejecutivo</span>
            </CardTitle>
            <CardDescription>Análisis preliminar para tu flota de {fleetSize} vehículos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">€{annualSavings.toLocaleString()}</div>
                <p className="text-sm text-gray-600">Ahorro anual proyectado</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Leaf className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{co2Reduction} t</div>
                <p className="text-sm text-gray-600">Reducción CO₂ anual</p>
              </div>
              <div className="text-center p-4 bg-[#115F5F]/10 rounded-lg">
                <Clock className="h-8 w-8 text-[#115F5F] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#115F5F]">{paybackPeriod} años</div>
                <p className="text-sm text-gray-600">Periodo de amortización</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Technical Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="h-5 w-5" />
                <span>Análisis Técnico</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Compatibilidad de rutas</span>
                  <Badge className="bg-green-100 text-green-800">Excelente</Badge>
                </div>
                <Progress value={92} className="h-2" />
                <p className="text-xs text-gray-600">
                  Tus rutas de {dailyKm}km diarios son ideales para vehículos eléctricos
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Vehículos recomendados:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Mercedes eVito</span>
                    <span className="text-sm font-semibold">95% match</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Nissan e-NV200</span>
                    <span className="text-sm font-semibold">88% match</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Ford E-Transit</span>
                    <span className="text-sm font-semibold">82% match</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Economic Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Análisis Económico</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Inversión inicial</span>
                  <span className="font-semibold">€{(35000 * fleetSize).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Ahorro combustible/año</span>
                  <span className="font-semibold text-green-600">
                    €{Math.round(dailyKm * 365 * 0.12 * fleetSize).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Ahorro mantenimiento/año</span>
                  <span className="font-semibold text-green-600">€{(2400 * fleetSize).toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">ROI anual</span>
                  <span className="font-bold text-[#115F5F]">
                    {Math.round((annualSavings / (35000 * fleetSize)) * 100)}%
                  </span>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800">✅ Proyecto altamente rentable con retorno garantizado</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Infrastructure Requirements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Infraestructura de Carga</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Requerimientos mínimos</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Cargadores AC (22kW)</span>
                    <span className="font-semibold">{Math.ceil(fleetSize / 2)} unidades</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cargador DC (50kW)</span>
                    <span className="font-semibold">1 unidad</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Potencia total requerida</span>
                    <span className="font-semibold">{Math.ceil(fleetSize / 2) * 22 + 50} kW</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Inversión estimada</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Equipos de carga</span>
                    <span className="font-semibold">€{(Math.ceil(fleetSize / 2) * 3000 + 25000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Instalación</span>
                    <span className="font-semibold">€{Math.round(fleetSize * 1500).toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-[#115F5F]">
                      €{(Math.ceil(fleetSize / 2) * 3000 + 25000 + fleetSize * 1500).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Próximos Pasos</CardTitle>
            <CardDescription>Recomendaciones para avanzar en tu proyecto de electrificación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#115F5F] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Análisis detallado</h4>
                  <p className="text-sm text-gray-600">
                    Solicita un estudio completo con datos específicos de tu operación
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#115F5F] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Prueba piloto</h4>
                  <p className="text-sm text-gray-600">Implementa 1-2 vehículos para validar los resultados</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#115F5F] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Plan de implementación</h4>
                  <p className="text-sm text-gray-600">Desarrolla un cronograma de transición gradual</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-[#115F5F] hover:bg-[#0d4a4a]">Solicitar Análisis Completo</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Agendar Consulta Gratuita
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Nota:</strong> Este es un análisis preliminar basado en datos generales. Los resultados reales
            pueden variar según las condiciones específicas de operación, precios locales de energía y combustible, y
            otros factores. Se recomienda realizar un estudio detallado antes de tomar decisiones de inversión.
          </p>
        </div>
      </div>
    </div>
  )
}

// Componente principal con Suspense
export default function ResultPreview() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#115F5F] mx-auto mb-4"></div>
            <p className="text-gray-600">Generando análisis...</p>
          </div>
        </div>
      }
    >
      <ResultPreviewContent />
    </Suspense>
  )
}
