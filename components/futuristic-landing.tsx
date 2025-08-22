"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Shield,
  ArrowRight,
  Play,
  ChevronDown,
  Star,
  Users,
  Award,
  Target,
  Sparkles,
  Rocket,
  Brain,
  Eye,
  CheckCircle,
} from "lucide-react"

export default function FuturisticLanding() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "IA Predictiva",
      description: "Algoritmos avanzados que predicen el comportamiento de tu flota",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Análisis Visual",
      description: "Dashboards interactivos con visualizaciones en tiempo real",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Optimización Automática",
      description: "Sistema que optimiza rutas y consumo automáticamente",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Experiencia Premium",
      description: "Interfaz diseñada para la próxima generación de flotas",
      color: "from-orange-500 to-red-500",
    },
  ]

  const stats = [
    { value: "95%", label: "Precisión en predicciones", icon: <Target className="w-6 h-6" /> },
    { value: "40%", label: "Reducción de costos", icon: <TrendingUp className="w-6 h-6" /> },
    { value: "500+", label: "Flotas optimizadas", icon: <Users className="w-6 h-6" /> },
    { value: "24/7", label: "Monitoreo continuo", icon: <Shield className="w-6 h-6" /> },
  ]

  const testimonials = [
    {
      name: "Carlos Mendoza",
      role: "Director de Operaciones",
      company: "LogiTrans",
      content: "La plataforma transformó completamente nuestra operación. Los ahorros superaron nuestras expectativas.",
      rating: 5,
    },
    {
      name: "Ana García",
      role: "Gerente de Flota",
      company: "EcoDelivery",
      content: "Increíble nivel de detalle en los análisis. Nos ayudó a tomar decisiones estratégicas fundamentales.",
      rating: 5,
    },
    {
      name: "Roberto Silva",
      role: "CEO",
      company: "TransFuture",
      content: "La mejor inversión que hemos hecho. ROI visible desde el primer mes de implementación.",
      rating: 5,
    },
  ]

  // Safe window access for SSR
  const getWindowDimensions = () => {
    if (typeof window !== "undefined") {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    }
    return { width: 1200, height: 800 }
  }

  const { width: windowWidth, height: windowHeight } = getWindowDimensions()

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute right-0 bottom-0 w-80 h-80 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)",
            x: mousePosition.x * -0.01,
            y: mousePosition.y * -0.01,
          }}
          animate={{
            x: [0, -150, 0],
            y: [0, 150, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * windowWidth,
              y: Math.random() * windowHeight,
            }}
            animate={{
              x: Math.random() * windowWidth,
              y: Math.random() * windowHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto text-center">
            <AnimatePresence>
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-2">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Tecnología del Futuro
                  </Badge>

                  <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                    VEMO
                    <span className="block text-4xl md:text-6xl mt-2">Next Generation</span>
                  </h1>

                  <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                    Plataforma de análisis predictivo para flotas eléctricas. Impulsada por IA, diseñada para el futuro.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-8 py-4 text-lg"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Iniciar Análisis
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
                    >
                      Ver Demo
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <ChevronDown className="w-8 h-8 text-white/50" />
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="text-purple-400 mb-2 flex justify-center">{stat.icon}</div>
                      <div className="text-3xl font-bold mb-2">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Características Avanzadas
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Tecnología de vanguardia que revoluciona la gestión de flotas eléctricas
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setActiveFeature(index)}
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full overflow-hidden group">
                    <CardContent className="p-8">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>

                      {/* Animated border */}
                      <motion.div
                        className={`absolute inset-0 rounded-lg bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity`}
                        style={{ zIndex: -1 }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Casos de Éxito
              </h2>
              <p className="text-xl text-gray-400">Empresas que ya transformaron sus flotas con VEMO</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full">
                    <CardContent className="p-8">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                      <div>
                        <div className="font-bold">{testimonial.name}</div>
                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                        <div className="text-sm text-purple-400">{testimonial.company}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-12">
                  <Award className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    ¿Listo para el Futuro?
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Únete a las empresas que ya están transformando sus flotas con tecnología de próxima generación
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-8 py-4 text-lg"
                    >
                      <Rocket className="w-5 h-5 mr-2" />
                      Comenzar Ahora
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
                    >
                      Agendar Demo
                    </Button>
                  </div>

                  <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-400">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                      Sin compromiso
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                      Análisis gratuito
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                      Resultados inmediatos
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
