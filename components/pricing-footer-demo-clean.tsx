"use client"

import { useState } from "react"
import PricingFooterClean from "./components/pricing-footer-clean"

export default function PricingFooterDemoClean() {
  const [currentPlan, setCurrentPlan] = useState<"freemium" | "plus" | "pro">("freemium")

  const handleContactEnterprise = () => {
    // You can customize this behavior
    alert("🚀 Abriendo modal de contacto Enterprise...")
    // Or open a modal, redirect to contact page, etc.
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Demo Controls */}
      <div className="bg-white border-b border-gray-200 p-6 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#115F5F] mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            EV SaaS Pricing Footer - No Overlap Guaranteed
          </h1>
          <div className="flex items-center space-x-6">
            <span className="text-gray-600 font-medium">Simular plan actual:</span>
            <select
              value={currentPlan}
              onChange={(e) => setCurrentPlan(e.target.value as any)}
              className="border border-gray-300 rounded-xl px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-[#115F5F] focus:border-[#115F5F]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <option value="freemium">Freemium (Current)</option>
              <option value="plus">Plus (Current)</option>
              <option value="pro">Pro (Current)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pricing Footer Component */}
      <PricingFooterClean currentPlan={currentPlan} onContactEnterprise={handleContactEnterprise} />
    </div>
  )
}
