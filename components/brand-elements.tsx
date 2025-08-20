"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Zap, Leaf, Car, TrendingUp, Shield, Award } from "lucide-react"

// VEMO Brand Colors
export const vemoColors = {
  primary: "#115F5F",
  primaryLight: "#1a7a7a",
  primaryDark: "#0d4a4a",
  secondary: "#2d8f8f",
  accent: "#4da3a3",
  light: "#6bb6b6",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  neutral: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
}

// VEMO Gradient Backgrounds
export const VemoGradient = ({
  children,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "accent" | "success"
  className?: string
}) => {
  const gradients = {
    primary: "bg-gradient-to-r from-[#115F5F] to-[#1a7a7a]",
    secondary: "bg-gradient-to-r from-[#1a7a7a] to-[#2d8f8f]",
    accent: "bg-gradient-to-r from-[#2d8f8f] to-[#4da3a3]",
    success: "bg-gradient-to-r from-[#115F5F] to-[#10b981]",
  }

  return <div className={`${gradients[variant]} ${className}`}>{children}</div>
}

// VEMO Icon Badge
export const VemoIconBadge = ({
  icon,
  size = "md",
  variant = "primary",
}: {
  icon: React.ReactNode
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "secondary" | "accent" | "success"
}) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const variants = {
    primary: "bg-[#115F5F] text-white",
    secondary: "bg-[#115F5F]/10 text-[#115F5F]",
    accent: "bg-gradient-to-br from-[#115F5F] to-[#1a7a7a] text-white",
    success: "bg-green-100 text-green-600",
  }

  return (
    <div className={`${sizes[size]} ${variants[variant]} rounded-full flex items-center justify-center shadow-lg`}>
      {icon}
    </div>
  )
}

// VEMO Pattern Background
export const VemoPattern = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 opacity-5 ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="vemo-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="2" fill="#115F5F" />
            <path d="M10 10l20 20M30 10l-20 20" stroke="#115F5F" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vemo-pattern)" />
      </svg>
    </div>
  )
}

// VEMO Loading Spinner
export const VemoSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <motion.div
      className={`${sizes[size]} border-2 border-[#115F5F]/20 border-t-[#115F5F] rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    />
  )
}

// VEMO Pulse Animation
export const VemoPulse = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        boxShadow: ["0 0 0 0 rgba(17, 95, 95, 0.4)", "0 0 0 10px rgba(17, 95, 95, 0)", "0 0 0 0 rgba(17, 95, 95, 0)"],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  )
}

// VEMO Badge Component
export const VemoBadge = ({
  children,
  variant = "primary",
  size = "md",
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "success" | "warning" | "outline"
  size?: "sm" | "md" | "lg"
}) => {
  const variants = {
    primary: "bg-[#115F5F] text-white",
    secondary: "bg-[#115F5F]/10 text-[#115F5F]",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    outline: "border-2 border-[#115F5F] text-[#115F5F] bg-transparent",
  }

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  }

  return (
    <span className={`${variants[variant]} ${sizes[size]} rounded-full font-semibold inline-flex items-center`}>
      {children}
    </span>
  )
}

// VEMO Card with Brand Styling
export const VemoCard = ({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode
  variant?: "default" | "gradient" | "bordered" | "elevated"
  className?: string
}) => {
  const variants = {
    default: "bg-white border border-gray-200 shadow-sm",
    gradient: "bg-gradient-to-br from-white to-[#115F5F]/5 border border-[#115F5F]/20 shadow-md",
    bordered: "bg-white border-2 border-[#115F5F] shadow-lg",
    elevated: "bg-white shadow-xl border-0",
  }

  return <div className={`${variants[variant]} rounded-xl p-6 ${className}`}>{children}</div>
}

// VEMO Progress Bar
export const VemoProgress = ({
  value,
  max = 100,
  showLabel = true,
  className = "",
}: {
  value: number
  max?: number
  showLabel?: boolean
  className?: string
}) => {
  const percentage = (value / max) * 100

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progreso</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

// VEMO Stats Display
export const VemoStats = ({
  stats,
}: {
  stats: Array<{ label: string; value: string; icon?: React.ReactNode; trend?: "up" | "down" | "neutral" }>
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between mb-2">
            {stat.icon && <VemoIconBadge icon={stat.icon} size="sm" variant="secondary" />}
            {stat.trend && (
              <div
                className={`text-sm ${
                  stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-600" : "text-gray-600"
                }`}
              >
                <TrendingUp className={`w-4 h-4 ${stat.trend === "down" ? "rotate-180" : ""}`} />
              </div>
            )}
          </div>
          <div className="text-2xl font-bold text-[#115F5F] mb-1">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

// VEMO Feature Highlight
export const VemoFeature = ({
  icon,
  title,
  description,
  className = "",
}: {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}) => {
  return (
    <motion.div whileHover={{ y: -5 }} className={`text-center p-6 ${className}`}>
      <VemoPulse className="inline-block mb-4">
        <VemoIconBadge icon={icon} size="lg" variant="accent" />
      </VemoPulse>
      <h3 className="text-xl font-semibold text-[#115F5F] mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

// VEMO Brand Showcase Component
export default function VemoBrandShowcase() {
  const sampleStats = [
    { label: "Flotas Analizadas", value: "1,250+", icon: <Car className="w-4 h-4" />, trend: "up" as const },
    { label: "CO₂ Reducido", value: "2,400t", icon: <Leaf className="w-4 h-4" />, trend: "up" as const },
    { label: "Ahorro Promedio", value: "35%", icon: <TrendingUp className="w-4 h-4" />, trend: "up" as const },
    { label: "Satisfacción", value: "98%", icon: <Award className="w-4 h-4" />, trend: "neutral" as const },
  ]

  return (
    <div className="space-y-12 p-8">
      {/* Brand Colors */}
      <section>
        <h2 className="text-2xl font-bold text-[#115F5F] mb-6">Paleta de Colores VEMO</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {Object.entries(vemoColors)
            .slice(0, 6)
            .map(([name, color]) => (
              <div key={name} className="text-center">
                <div className="w-full h-20 rounded-lg shadow-md mb-2" style={{ backgroundColor: color }} />
                <div className="text-sm font-medium text-gray-700 capitalize">{name}</div>
                <div className="text-xs text-gray-500">{color}</div>
              </div>
            ))}
        </div>
      </section>

      {/* Gradient Examples */}
      <section>
        <h2 className="text-2xl font-bold text-[#115F5F] mb-6">Gradientes de Marca</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["primary", "secondary", "accent", "success"].map((variant) => (
            <VemoGradient
              key={variant}
              variant={variant as any}
              className="h-20 rounded-lg shadow-md flex items-center justify-center"
            >
              <span className="text-white font-semibold capitalize">{variant}</span>
            </VemoGradient>
          ))}
        </div>
      </section>

      {/* Icon Badges */}
      <section>
        <h2 className="text-2xl font-bold text-[#115F5F] mb-6">Iconos de Marca</h2>
        <div className="flex flex-wrap gap-4">
          <VemoIconBadge icon={<Zap className="w-6 h-6" />} variant="primary" />
          <VemoIconBadge icon={<Leaf className="w-6 h-6" />} variant="secondary" />
          <VemoIconBadge icon={<Car className="w-6 h-6" />} variant="accent" />
          <VemoIconBadge icon={<Shield className="w-6 h-6" />} variant="success" />
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-2xl font-bold text-[#115F5F] mb-6">Badges y Etiquetas</h2>
        <div className="flex flex-wrap gap-4">
          <VemoBadge variant="primary">Recomendado</VemoBadge>
          <VemoBadge variant="secondary">Nuevo</VemoBadge>
          <VemoBadge variant="success">Verificado</VemoBadge>
          <VemoBadge variant="warning">En Proceso</VemoBadge>
          <VemoBadge variant="outline">Premium</VemoBadge>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2 className="text-2xl font-bold text-[#115F5F] mb-6">Estilos de Tarjetas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {["default", "gradient", "bordered", "elevated"].map((variant) => (
            <VemoCard key={variant} variant={variant as any}>
              <h3 className="font-semibold text-[#115F5F] mb-2 capitalize">{variant}</h3>
              <p className="text-gray-600 text-sm">Ejemplo de tarjeta con estilo {variant}</p>
            </VemoCard>
          ))}
        </div>
      </section>

      {/* Progress Bar */}
      <section>
        <h2 className="text-2xl font-bold text-[#115F5F] mb-6">Barras de Progreso</h2>
        <div className="space-y-4">
          <VemoProgress value={75} />
          <VemoProgress value={45} showLabel={false} />
          <VemoProgress value={90} />
        </div>
      </section>

      {/* Stats */}
      <section>
        <h2 className="text-2xl font-bold text-[#115F5F] mb-6">Estadísticas</h2>
        <VemoStats stats={sampleStats} />
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-bold text-[#115F5F] mb-6">Características Destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <VemoFeature
            icon={<Zap className="w-8 h-8" />}
            title="Análisis Rápido"
            description="Obtén resultados en menos de 5 minutos"
          />
          <VemoFeature
            icon={<Leaf className="w-8 h-8" />}
            title="Impacto Ambiental"
            description="Calcula tu reducción de CO₂"
          />
          <VemoFeature
            icon={<Shield className="w-8 h-8" />}
            title="Datos Seguros"
            description="Tu información está protegida"
          />
        </div>
      </section>

      {/* Loading States */}
      <section>
        <h2 className="text-2xl font-bold text-[#115F5F] mb-6">Estados de Carga</h2>
        <div className="flex items-center gap-8">
          <VemoSpinner size="sm" />
          <VemoSpinner size="md" />
          <VemoSpinner size="lg" />
        </div>
      </section>
    </div>
  )
}
