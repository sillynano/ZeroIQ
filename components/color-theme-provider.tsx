"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type ColorTheme = {
  name: string
  gradient: string
}

const colorThemes: ColorTheme[] = [
  { name: "slate", gradient: "from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900" },
  { name: "blue", gradient: "from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900" },
  { name: "purple", gradient: "from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900" },
  { name: "green", gradient: "from-green-50 to-green-100 dark:from-green-950 dark:to-green-900" },
  { name: "orange", gradient: "from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900" },
  { name: "pink", gradient: "from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900" },
  { name: "red", gradient: "from-red-50 to-red-100 dark:from-red-950 dark:to-red-900" },
  { name: "yellow", gradient: "from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900" },
]

type ColorThemeContextType = {
  colorTheme: string
  setColorTheme: (theme: string) => void
  nextColorTheme: () => void
  getCurrentGradient: () => string
  colorThemes: ColorTheme[]
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined)

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorTheme, setColorTheme] = useState("slate")

  // Load color theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("zeroiq-color-theme")
    if (savedTheme && colorThemes.some(theme => theme.name === savedTheme)) {
      setColorTheme(savedTheme)
    }
  }, [])

  // Save color theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("zeroiq-color-theme", colorTheme)
  }, [colorTheme])

  const nextColorTheme = () => {
    const currentIndex = colorThemes.findIndex(theme => theme.name === colorTheme)
    const nextIndex = (currentIndex + 1) % colorThemes.length
    setColorTheme(colorThemes[nextIndex].name)
  }

  const getCurrentGradient = () => {
    return colorThemes.find(theme => theme.name === colorTheme)?.gradient || colorThemes[0].gradient
  }

  const value: ColorThemeContextType = {
    colorTheme,
    setColorTheme,
    nextColorTheme,
    getCurrentGradient,
    colorThemes,
  }

  return (
    <ColorThemeContext.Provider value={value}>
      {children}
    </ColorThemeContext.Provider>
  )
}

export function useColorTheme() {
  const context = useContext(ColorThemeContext)
  if (context === undefined) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider")
  }
  return context
}
