"use client"

import { useState } from "react"
import PricingFooter from "./components/pricing-footer"

export default function PricingFooterDemo() {
  const [currentPlan, setCurrentPlan] = useState<"freemium" | "plus" | "pro">("freemium")

  const handleContactEnterprise = () => {
    // You can customize this behavior
    alert("Abriendo modal de contacto Enterprise...")
    // Or open a modal, redirect to contact page, etc.
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Demo Controls */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-[#115F5F] mb-4">EV SaaS Pricing Footer Demo</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Simular plan actual:</span>
            <select
              value={currentPlan}
              onChange={(e) => setCurrentPlan(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="freemium">Freemium</option>
              <option value="plus">Plus</option>
              <option value="pro">Pro</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pricing Footer Component */}
      <PricingFooter currentPlan={currentPlan} onContactEnterprise={handleContactEnterprise} />
    </div>
  )
}
