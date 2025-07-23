"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Brain, Sparkles, Zap, Heart, AlertTriangle, Palette } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [colorTheme, setColorTheme] = useState("slate")

  const colorThemes = [
    { name: "slate", gradient: "from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900" },
    { name: "blue", gradient: "from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900" },
    { name: "purple", gradient: "from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900" },
    { name: "green", gradient: "from-green-50 to-green-100 dark:from-green-950 dark:to-green-900" },
    { name: "orange", gradient: "from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900" },
    { name: "pink", gradient: "from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900" },
    { name: "red", gradient: "from-red-50 to-red-100 dark:from-red-950 dark:to-red-900" },
    { name: "yellow", gradient: "from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900" },
  ]

  const nextColorTheme = () => {
    const currentIndex = colorThemes.findIndex(theme => theme.name === colorTheme)
    const nextIndex = (currentIndex + 1) % colorThemes.length
    setColorTheme(colorThemes[nextIndex].name)
  }

  const getCurrentGradient = () => {
    return colorThemes.find(theme => theme.name === colorTheme)?.gradient || colorThemes[0].gradient
  }
  return (
    <div className={`min-h-screen bg-gradient-to-br ${getCurrentGradient()}`}>
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">ZeroIQ</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={nextColorTheme}
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              >
                <Palette className="h-4 w-4" />
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Brain className="h-24 w-24 text-primary animate-pulse" />
              <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-2 -right-2 animate-bounce" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Welcome to <span className="text-primary">ZeroIQ</span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            A project where you get "helpful information" with style! 
            Experience the beauty of modern web development with "intelligence".
          </p>

          <div className="flex justify-center space-x-4 mb-12">
            <Button size="lg" className="text-lg px-8 py-3" asChild>
              <Link href="/ai">
                <Zap className="h-5 w-5 mr-2" />
                Try the AI Consultant
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3" asChild>
              <Link href="/disclaimer">
                Learn More
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Brain className="h-12 w-12 text-blue-500" />
              </div>
              <CardTitle>Zero Intelligence</CardTitle>
              <CardDescription>
                Proudly offering "helpful information" since day one
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Experience the pure joy of getting exactly what you don't need, 
                delivered with maximum style and minimum usefulness.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Sparkles className="h-12 w-12 text-yellow-500" />
              </div>
              <CardTitle>Beautiful Design</CardTitle>
              <CardDescription>
                Modern UI components that look amazing while doing nothing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Built with Next.js, React, and Tailwind CSS. 
                All the latest technologies for the most useless experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-slate-50 dark:bg-slate-900 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="/about" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
              About Me
            </Link>
            <Link href="/disclaimer" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
              Disclaimer
            </Link>
            <Link href="/ai" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
              AI Consultant
            </Link>
          </div>
          <p className="text-slate-500 dark:text-slate-500">
            © 2025 ZeroIQ. Built with Next.js, React, and zero intelligence.
          </p>
        </div>
      </footer>
    </div>
  )
}
