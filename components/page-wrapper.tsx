"use client"

import { useColorTheme } from "@/components/color-theme-provider"
import { ReactNode } from "react"

interface PageWrapperProps {
  children: ReactNode
  className?: string
}

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
  const { getCurrentGradient } = useColorTheme()

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getCurrentGradient()} ${className}`}>
      {children}
    </div>
  )
}
