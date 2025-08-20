"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Phone, Mail, MessageCircle } from "lucide-react"
import VemoLogo from "./vemo-logo"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    fleetSize: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success message
      alert(
        "¡Gracias por tu interés! Un especialista VEMO se pondrá en contacto contigo en las próximas 24 horas para agendar una consulta personalizada.",
      )

      // Reset form and close modal
      setFormData({
        name: "",
        email: "",
        company: "",
        fleetSize: "",
        phone: "",
        message: "",
      })
      onClose()
    } catch (error) {
      alert("Error al enviar el mensaje. Por favor, inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(17, 95, 95, 0.8)" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="relative p-6 border-b border-gray-200">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                disabled={isSubmitting}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <VemoLogo size="md" />
                </div>
                <h2 className="text-2xl font-bold text-[#115F5F] mb-2">Contactar Especialista Enterprise</h2>
                <p className="text-gray-600">
                  Cuéntanos sobre tu flota y un especialista te contactará para una consulta personalizada
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      disabled={isSubmitting}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email corporativo *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      disabled={isSubmitting}
                      placeholder="tu@empresa.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Empresa *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      required
                      disabled={isSubmitting}
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fleetSize">Tamaño de flota *</Label>
                    <Input
                      id="fleetSize"
                      value={formData.fleetSize}
                      onChange={(e) => handleInputChange("fleetSize", e.target.value)}
                      required
                      disabled={isSubmitting}
                      placeholder="ej. 150 vehículos"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={isSubmitting}
                    placeholder="+52 55 1234 5678"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Cuéntanos sobre tu operación *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                    disabled={isSubmitting}
                    rows={4}
                    placeholder="Describe tu operación: tipo de vehículos, rutas principales, desafíos actuales, objetivos de electrificación, etc."
                  />
                </div>

                <div className="bg-[#115F5F]/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#115F5F] mb-2">¿Qué incluye la consulta Enterprise?</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Análisis personalizado de tu operación específica</li>
                    <li>• Recomendaciones de vehículos y tecnología</li>
                    <li>• Plan de implementación por fases</li>
                    <li>• Análisis financiero detallado y opciones de financiamiento</li>
                    <li>• Soporte continuo durante la transición</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#115F5F] hover:bg-[#0d4a4a] py-3 text-lg font-semibold"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Solicitar Consulta Enterprise</span>
                    </div>
                  )}
                </Button>
              </form>

              {/* Contact Options */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-center mb-4">O contáctanos directamente:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <a
                    href="tel:+525512345678"
                    className="flex items-center justify-center space-x-2 p-3 border border-[#115F5F] rounded-lg hover:bg-[#115F5F]/5 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#115F5F]" />
                    <span className="text-sm text-[#115F5F]">+52 55 1234 5678</span>
                  </a>
                  <a
                    href="mailto:enterprise@vemo.com"
                    className="flex items-center justify-center space-x-2 p-3 border border-[#115F5F] rounded-lg hover:bg-[#115F5F]/5 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#115F5F]" />
                    <span className="text-sm text-[#115F5F]">enterprise@vemo.com</span>
                  </a>
                  <a
                    href="https://wa.me/525512345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 p-3 border border-[#115F5F] rounded-lg hover:bg-[#115F5F]/5 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#115F5F]" />
                    <span className="text-sm text-[#115F5F]">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
