import VemoBrandShowcase from "@/components/brand-elements"

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#115F5F] mb-4">VEMO Brand Elements</h1>
          <p className="text-lg text-gray-600">Elementos de marca y sistema de diseño</p>
        </div>
        <VemoBrandShowcase />
      </div>
    </div>
  )
}
