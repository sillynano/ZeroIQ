"use client"

import { Button } from "@/components/ui/button"
import { Palette } from "lucide-react"
import { useColorTheme } from "@/components/color-theme-provider"

export function ColorThemeToggle() {
  const { nextColorTheme } = useColorTheme()

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={nextColorTheme}
      className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
    >
      <Palette className="h-4 w-4" />
    </Button>
  )
}
