"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import VemoLogo from "./components/vemo-logo"

export default function Component() {
  const [animateOnce, setAnimateOnce] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setAnimateOnce(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* VEMO Logo */}
        <div className="mb-6 flex justify-center">
          <VemoLogo size="lg" />
        </div>

        {/* Animated Battery Icon */}
        <div className="mb-8 flex justify-center">
          <div
            className={`transition-all duration-1000 ${animateOnce ? "scale-110 opacity-100" : "scale-100 opacity-80"}`}
          >
            <svg
              width="80"
              height="48"
              viewBox="0 0 80 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#115F5F]"
            >
              {/* Battery Body */}
              <rect x="4" y="8" width="64" height="32" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
              {/* Battery Terminal */}
              <rect x="68" y="18" width="8" height="12" rx="2" fill="currentColor" />
              {/* Battery Fill Animation */}
              <rect
                x="8"
                y="12"
                width="56"
                height="24"
                rx="2"
                fill="currentColor"
                className={`transition-all duration-2000 ease-in-out ${
                  animateOnce ? "opacity-100 scale-x-100" : "opacity-30 scale-x-50"
                }`}
                style={{ transformOrigin: "left center" }}
              />
              {/* Energy Bolt */}
              <path
                d="M32 16L28 24H36L40 32L44 24H36L32 16Z"
                fill="white"
                className={`transition-all duration-1500 delay-500 ${
                  animateOnce ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
              />
            </svg>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#115F5F] mb-6 leading-tight">
          Descubre el ahorro
          <br />
          <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">de tu flota eléctrica</span>
          <br />
          <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal text-gray-600">en segundos</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Análisis instantáneo de costos, ROI y viabilidad para la electrificación de flotas comerciales en América
          Latina
        </p>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#115F5F] mb-2">{"<5 min"}</div>
            <div className="text-sm text-gray-600">Análisis completo</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#115F5F] mb-2">30-60%</div>
            <div className="text-sm text-gray-600">Reducción de costos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#115F5F] mb-2">100% Gratis</div>
            <div className="text-sm text-gray-600">Sin compromiso</div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-8">
          <Button
            size="lg"
            className="bg-[#115F5F] hover:bg-[#0d4a4a] text-white px-12 py-6 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => (window.location.href = "/form")}
          >
            Comenzar análisis gratuito
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="text-sm text-gray-500 space-y-2">
          <p>✓ Sin registro requerido ✓ Datos seguros ✓ Resultados instantáneos</p>
          <p className="text-xs">Especializado para flotas en México, Colombia, Chile, Argentina y Brasil</p>
        </div>
      </div>
    </div>
  )
}
