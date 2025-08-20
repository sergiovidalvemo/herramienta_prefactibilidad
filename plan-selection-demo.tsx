"use client"

import PlanSelectionFooter from "./components/plan-selection-footer"

export default function PlanSelectionDemo() {
  // Simulate user email from previous form
  const userEmail = "usuario@empresa.com"

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Demo Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-[#115F5F] mb-2">Selección de Plan - Sin Solapamiento</h1>
          <p className="text-gray-600">Usuario: {userEmail} (ya proporcionó email en el formulario)</p>
        </div>
      </div>

      {/* Plan Selection Footer */}
      <PlanSelectionFooter userEmail={userEmail} />
    </div>
  )
}
