import Image from "next/image"

interface VemoLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function VemoLogo({ size = "md", className = "" }: VemoLogoProps) {
  const sizeClasses = {
    sm: "h-8 w-auto",
    md: "h-12 w-auto",
    lg: "h-16 w-auto",
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src="/vemo-logo.png"
        alt="VEMO - Movilidad Eléctrica"
        width={200}
        height={60}
        className={`${sizeClasses[size]} object-contain`}
        priority
      />
    </div>
  )
}
