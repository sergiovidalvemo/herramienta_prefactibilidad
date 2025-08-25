"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { User, Building, Mail, Phone, Briefcase, CheckCircle, AlertCircle } from "lucide-react"

interface ContactFormData {
  fullName: string
  company: string
  position: string
  email: string
  phone: string
}

interface ContactFormProps {
  // Datos del formulario preliminar que se van a incluir
  preliminaryData: {
    fleetSize?: number
    vehicleType?: string
    operationType?: string
    routeKmPerDay?: number
    chargingWindow?: number
    monthlyFuelSavings?: number
    savingsPct?: number
    co2?: number
    batteryCapacityMin?: number
    batteryCapacityMax?: number
  }
  onSuccess?: () => void
}

export default function ContactForm({ preliminaryData, onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    company: "",
    position: "",
    email: "",
    phone: ""
  })

  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const updateFormData = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "El nombre completo es requerido"
    if (!formData.company.trim()) newErrors.company = "La compañía es requerida"
    if (!formData.position.trim()) newErrors.position = "El puesto es requerido"
    
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido"
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: formData,
          preliminaryData: preliminaryData
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        // Reset form
        setFormData({
          fullName: "",
          company: "",
          position: "",
          email: "",
          phone: ""
        })
        onSuccess?.()
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error submitting contact form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-800 mb-2">¡Información enviada exitosamente!</h3>
            <p className="text-green-700 mb-4">
              Gracias por tu interés. Uno de nuestros especialistas se pondrá en contacto contigo muy pronto.
            </p>
            <p className="text-sm text-green-600">
              Te enviaremos un análisis detallado basado en los datos que proporcionaste.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <Card className="border-[#115F5F]/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-[#115F5F]">
          <User className="w-6 h-6" />
          <span>Solicita un Análisis Detallado</span>
        </CardTitle>
        <p className="text-gray-600">
          Déjanos tus datos y recibe un análisis completo personalizado para tu flota.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre completo */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Nombre completo *</span>
            </Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => updateFormData("fullName", e.target.value)}
              placeholder="Tu nombre completo"
              className={errors.fullName ? "border-red-500" : ""}
            />
            {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
          </div>

          {/* Compañía */}
          <div className="space-y-2">
            <Label htmlFor="company" className="flex items-center space-x-2">
              <Building className="w-4 h-4" />
              <span>Compañía *</span>
            </Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => updateFormData("company", e.target.value)}
              placeholder="Nombre de tu empresa"
              className={errors.company ? "border-red-500" : ""}
            />
            {errors.company && <p className="text-sm text-red-600">{errors.company}</p>}
          </div>

          {/* Puesto */}
          <div className="space-y-2">
            <Label htmlFor="position" className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4" />
              <span>Puesto *</span>
            </Label>
            <Input
              id="position"
              type="text"
              value={formData.position}
              onChange={(e) => updateFormData("position", e.target.value)}
              placeholder="Tu cargo o posición"
              className={errors.position ? "border-red-500" : ""}
            />
            {errors.position && <p className="text-sm text-red-600">{errors.position}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Correo electrónico *</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              placeholder="tu.email@empresa.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Teléfono *</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData("phone", e.target.value)}
              placeholder="+52 555 123 4567"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
          </div>

          {/* Resumen de datos preliminares */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Datos de tu análisis preliminar:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div>• Flota: {preliminaryData.fleetSize} vehículos</div>
              <div>• Ahorro: {preliminaryData.savingsPct}%</div>
              <div>• Tipo: {preliminaryData.vehicleType}</div>
              <div>• CO₂ evitado: {preliminaryData.co2}t/año</div>
              <div>• Ruta: {preliminaryData.routeKmPerDay} km/día</div>
              <div>• Ahorro mensual: ${preliminaryData.monthlyFuelSavings?.toLocaleString()}</div>
            </div>
          </div>

          {/* Error message */}
          {submitStatus === "error" && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span>Error al enviar la información. Por favor, inténtalo de nuevo.</span>
            </div>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#115F5F] hover:bg-[#0d4a4a] text-white"
            size="lg"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Enviando...</span>
              </div>
            ) : (
              "Solicitar Análisis Detallado"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
