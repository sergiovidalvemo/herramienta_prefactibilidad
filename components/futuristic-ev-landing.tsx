"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Zap,
  Leaf,
  TrendingUp,
  Shield,
  ArrowRight,
  Sparkles,
  Battery,
  Globe,
  Award,
  Target,
  CheckCircle,
} from "lucide-react"
import VemoLogo from "./vemo-logo"
import Image from "next/image"

// Safe function to get window dimensions
const getWindowDimensions = () => {
  if (typeof window !== "undefined") {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }
  return { width: 1200, height: 800 } // Default values for SSR
}

export default function FuturisticEvLanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 700 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setMousePosition({ x, y })
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY])

  useEffect(() => {
    const generateParticles = () => {
      const dimensions = getWindowDimensions()
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 4 + 1,
      }))
      setParticles(newParticles)
    }

    generateParticles()
    if (typeof window !== "undefined") {
      window.addEventListener("resize", generateParticles)
      return () => window.removeEventListener("resize", generateParticles)
    }
  }, [])

  const stats = [
    {
      icon: <Leaf className="w-8 h-8" />,
      value: "50%",
      label: "Reducción CO₂",
      color: "from-green-400 to-emerald-600",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: "35%",
      label: "Menor costo operativo",
      color: "from-blue-400 to-cyan-600",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      value: "0%",
      label: "Emisiones en servicio",
      color: "from-yellow-400 to-orange-600",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      value: "24/7",
      label: "Soporte especializado",
      color: "from-purple-400 to-pink-600",
    },
  ]

  const benefits = [
    "Análisis instantáneo de viabilidad",
    "Reducción del 35% en costos operativos",
    "Cero emisiones durante el servicio",
    "Tecnología de vanguardia en operación",
    "Soporte especializado en LATAM",
    "ROI promedio de 2.5 años",
  ]

  const features = [
    "Sin registro requerido",
    "Datos seguros",
    "Resultados instantáneos",
    "Especializado para LATAM",
    "Análisis personalizado",
    "Soporte 24/7",
  ]

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-hidden relative"
      style={{ fontFamily: "Space Grotesk, sans-serif" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#115F5F]/20 via-transparent to-[#1a7a7a]/20" />

        {/* Animated mesh gradient */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, #115F5F 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, #1a7a7a 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, #115F5F 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, #115F5F 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-[#115F5F] rounded-full opacity-20"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            y: [particle.y, particle.y - 100, particle.y],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Mouse Glow Effect */}
      <motion.div
        className="absolute pointer-events-none z-10"
        style={{
          left: mouseXSpring,
          top: mouseYSpring,
          x: "-50%",
          y: "-50%",
        }}
      >
        <div className="w-96 h-96 bg-[#115F5F] rounded-full opacity-10 blur-3xl" />
      </motion.div>

      {/* Header */}
      <header className="relative z-20 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <VemoLogo size="lg" />
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Badge className="bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] text-white px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              La movilidad eléctrica es hoy
            </Badge>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-white via-gray-200 to-[#115F5F] bg-clip-text text-transparent">
                Transforma tu flota
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] bg-clip-text text-transparent">
                con movilidad eléctrica
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Análisis instantáneo de costos, ROI y viabilidad para la electrificación de flotas comerciales en América
              Latina
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] hover:from-[#0d4a4a] hover:to-[#115F5F] text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-[#115F5F]/25 transition-all duration-300 transform hover:scale-105"
                onClick={() => (window.location.href = "/form")}
              >
                <Zap className="w-5 h-5 mr-2" />
                Comenzar análisis gratuito
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>

          {/* Fleet Image Section */}
          <motion.div
            className="mb-16 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/vemo-byd-d1.png"
                alt="Flota VEMO BYD D1 - Vehículos eléctricos"
                width={1200}
                height={600}
                className="w-full h-auto"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <h3 className="text-2xl font-bold mb-2">Flota VEMO BYD D1</h3>
                  <p className="text-gray-200 mb-4">
                    Vehículos eléctricos de última generación operando exitosamente en América Latina
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[#115F5F]">320km</div>
                      <div className="text-sm text-gray-300">Autonomía</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#115F5F]">4-6h</div>
                      <div className="text-sm text-gray-300">Carga completa</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#115F5F]">0%</div>
                      <div className="text-sm text-gray-300">Emisiones en servicio</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <Card className="bg-black/40 backdrop-blur-md border-white/10 hover:border-[#115F5F]/50 transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-[#115F5F] bg-clip-text text-transparent">
                ¿Por qué elegir vehículos eléctricos?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  >
                    <CheckCircle className="w-6 h-6 text-[#115F5F] flex-shrink-0" />
                    <span className="text-gray-200">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="bg-gradient-to-br from-[#115F5F]/20 to-[#1a7a7a]/20 rounded-3xl p-8 border border-[#115F5F]/30 backdrop-blur-sm">
                <div className="flex items-center mb-6">
                  <Battery className="w-8 h-8 text-[#115F5F] mr-3" />
                  <h3 className="text-2xl font-bold">Impacto Inmediato</h3>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#115F5F] mb-2">-35%</div>
                    <div className="text-sm text-gray-300">Costos operativos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">-50%</div>
                    <div className="text-sm text-gray-300">Emisiones CO₂</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">2.5</div>
                    <div className="text-sm text-gray-300">Años ROI promedio</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">0%</div>
                    <div className="text-sm text-gray-300">Emisiones en servicio</div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-black/20 rounded-lg border border-white/10">
                  <p className="text-xs text-gray-400 text-center">
                    * Las emisiones durante la carga dependen de la matriz energética local. En servicio, los vehículos
                    eléctricos no generan emisiones directas.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <div className="bg-gradient-to-r from-[#115F5F]/20 to-[#1a7a7a]/20 rounded-3xl p-12 border border-[#115F5F]/30 backdrop-blur-sm">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-[#115F5F] bg-clip-text text-transparent">
                ¿Listo para transformar tu flota?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Obtén un análisis completo de viabilidad en menos de 5 minutos. Sin compromiso, sin registro.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#115F5F] to-[#1a7a7a] hover:from-[#0d4a4a] hover:to-[#115F5F] text-white px-12 py-4 text-xl font-semibold rounded-full shadow-2xl hover:shadow-[#115F5F]/25 transition-all duration-300 transform hover:scale-105"
                onClick={() => (window.location.href = "/form")}
              >
                <Target className="w-6 h-6 mr-3" />
                Comenzar análisis ahora
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </div>
          </motion.div>

          {/* Features Pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 text-sm text-gray-300 hover:border-[#115F5F]/50 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {feature}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[Zap, Leaf, Battery, Globe, Award, Target].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-[#115F5F]/10"
            style={{
              left: `${20 + index * 15}%`,
              top: `${30 + index * 10}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + index * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Icon size={40 + index * 5} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
