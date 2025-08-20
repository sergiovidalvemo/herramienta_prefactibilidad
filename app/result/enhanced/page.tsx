import { Suspense } from "react"
import EnhancedResults from "@/components/enhanced-results"

function EnhancedResultsWrapper() {
  return <EnhancedResults />
}

export default function EnhancedResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#115F5F] mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando análisis avanzado...</p>
          </div>
        </div>
      }
    >
      <EnhancedResultsWrapper />
    </Suspense>
  )
}
