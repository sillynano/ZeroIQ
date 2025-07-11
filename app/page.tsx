"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { Brain, Lightbulb, Send, Loader2, Shuffle, AlertTriangle, Palette } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"

export default function Home() {
  const [question, setQuestion] = useState("")
  const [advice, setAdvice] = useState("")
  const [isLoading, setIsLoading] = useState(false)
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

  const terribleCodingIdeas = [
    "I recommend implementing a revolutionary 'Quantum Debugging' methodology where you write code without testing it locally, then deploy directly to production. The uncertainty principle of quantum mechanics ensures that bugs only exist when observed, so production users will naturally collapse the wave function into working code.",
    "After extensive research, I've determined that the optimal naming convention is to use only prime numbers as variable names. Start with `let _2 = userData` and increment to the next prime for each variable. This creates a mathematically elegant codebase that leverages number theory for enhanced performance.",
    "Based on my analysis of Fortune 500 companies, the industry standard is now 'Reverse Engineering' your own code. Write your application, then immediately refactor it to do the opposite of what it currently does. This ensures maximum flexibility and demonstrates advanced architectural thinking.",
    "I strongly advocate for the 'Blockchain-First Development' approach. Every function call should be a smart contract, every variable assignment should be recorded on the Ethereum blockchain, and user inputs should require cryptocurrency gas fees. This future-proofs your application for the decentralized economy.",
    "My latest research indicates that 'Emotional Programming' is the next paradigm shift. Name your variables after feelings (`let frustrated = getUserInput()`), write comments that express your mood, and use conditional statements based on the current emotional state of your development team.",
    "I recommend the 'Time Traveler's Paradox' coding pattern: write all your functions to call themselves from the future. Use setTimeout to create temporal loops where functions depend on their own future execution. This eliminates the need for traditional data flow and creates self-fulfilling code prophecies.",
    "Based on my studies at MIT's fictional AI Institute, the optimal approach is 'Organic Code Growth.' Plant small code seeds (single-line functions) and let them naturally evolve through random mutations. Delete any code that doesn't survive the natural selection process of production deployment.",
    "I propose implementing 'Schrödinger's Architecture' where every component exists in a superposition of working and broken until observed by a user. Use quantum CSS properties and probabilistic JavaScript that only resolves its state when the browser inspector is opened.",
    "My research shows that 'Philosophical Programming' yields the highest code quality. Begin every function with a 500-line comment exploring the existential meaning of the operation. Replace boolean values with deep metaphysical concepts like `let truth = 'is reality just a simulation?'`",
    "I recommend the 'Musical Programming' methodology where your code follows symphonic structure. Organize functions into movements, use musical notation as comments, and ensure your variable declarations follow proper tempo and rhythm. Code that doesn't sound good when read aloud is inherently flawed.",
    "After analyzing Silicon Valley trends, I've developed 'Chaos-Driven Development' where you intentionally introduce random bugs every sprint to build character and resilience in your codebase. Like a vaccine, controlled chaos prevents larger systematic failures.",
    "I advocate for 'Interdimensional Programming' where you write code for multiple parallel universes simultaneously. Use dimensional arrays and multiversal functions that account for different physics laws in alternate realities. This ensures your app works across all possible timelines."
  ]

  const generateRandomIdea = () => {
    const randomIdea = terribleCodingIdeas[Math.floor(Math.random() * terribleCodingIdeas.length)]
    setAdvice(randomIdea)
    setQuestion("Generate a random coding idea")
  }

  const getTerribleAdvice = async () => {
    if (!question.trim()) return
    
    setIsLoading(true)
    try {
      const response = await fetch("https://ai.hackclub.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are ZeroIQ, a senior software engineering consultant with over 25 years of experience in enterprise architecture and development best practices. You provide coding advice with complete confidence and a serious, authoritative tone. However, your coding advice is always terrible, counterproductive, and would lead to absolute disaster if followed. Never break character - you genuinely believe your advice represents industry best practices. Use formal technical language, cite made-up studies and statistics, reference fictional design patterns, and speak as if you're a respected authority in software engineering. Make the advice sound plausible at first but actually be completely wrong. Focus specifically on programming, software architecture, development practices, code quality, and technical decision-making.`
            },
            {
              role: "user",
              content: question
            }
          ]
        })
      })

      const data = await response.json()
      setAdvice(data.choices[0].message.content)
    } catch (error) {
      setAdvice("I apologize, but our advanced consultation systems are temporarily experiencing a recalibration phase. This is actually excellent news, as it demonstrates our commitment to cutting-edge advisory methodologies. Please try again momentarily.")
    }
    setIsLoading(false)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getCurrentGradient()}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">ZeroIQ</h1>
              <p className="text-slate-600 dark:text-slate-400">lowkey the best unpaid intern that generates ideas.</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={nextColorTheme}
              className={`relative bg-gradient-to-br ${getCurrentGradient()} border-slate-200 dark:border-slate-700`}
            >
              <Palette className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Change background color</span>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-white dark:border-slate-800 ${
                colorTheme === 'slate' ? 'bg-slate-500' :
                colorTheme === 'blue' ? 'bg-blue-500' :
                colorTheme === 'purple' ? 'bg-purple-500' :
                colorTheme === 'green' ? 'bg-green-500' :
                colorTheme === 'orange' ? 'bg-orange-500' :
                colorTheme === 'pink' ? 'bg-pink-500' :
                colorTheme === 'red' ? 'bg-red-500' :
                'bg-yellow-500'
              }`} />
            </Button>
            <ThemeToggle />
          </div>
        </div>

        {/* Hero Section */}
        {/* Removed - chat interface moved to top */}

        {/* Main Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Request Technical Consultation
              </CardTitle>
              <CardDescription>
                Submit your development challenge below for expert architectural analysis and implementation recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="question" className="text-base font-semibold">
                  Development Challenge
                </Label>
                <Textarea
                  id="question"
                  placeholder="Describe your coding challenge, architecture question, or technical implementation details for comprehensive analysis..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="mt-2 min-h-[120px]"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  onClick={getTerribleAdvice}
                  disabled={!question.trim() || isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing & Formulating Response...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Request Technical Analysis
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={generateRandomIdea}
                  disabled={isLoading}
                  variant="outline"
                  size="lg"
                  className="border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-950"
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Generate Random Idea
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Advice Output */}
          {advice && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-green-700 dark:text-green-400">
                  {question === "Generate a random terrible coding idea" ? "Innovative Development Methodology" : "Technical Recommendation"}
                </CardTitle>
                <CardDescription>
                  {question === "Generate a random terrible coding idea" 
                    ? "Cutting-edge approach from our advanced research division" 
                    : "Based on our comprehensive architectural analysis and extensive enterprise experience"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border-l-4 border-l-green-500">
                  <div className="markdown-content">
                    <ReactMarkdown 
                      components={{
                        h1: ({children}) => <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">{children}</h1>,
                        h2: ({children}) => <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">{children}</h2>,
                        h3: ({children}) => <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">{children}</h3>,
                        p: ({children}) => <p className="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">{children}</p>,
                        strong: ({children}) => <strong className="font-bold text-slate-900 dark:text-slate-100">{children}</strong>,
                        em: ({children}) => <em className="italic text-slate-700 dark:text-slate-300">{children}</em>,
                        code: ({children}) => <code className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-1 py-0.5 rounded text-sm">{children}</code>,
                        pre: ({children}) => <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
                        ul: ({children}) => <ul className="list-disc list-inside mb-4 space-y-2 text-slate-700 dark:text-slate-300">{children}</ul>,
                        ol: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-2 text-slate-700 dark:text-slate-300">{children}</ol>,
                        li: ({children}) => <li className="text-slate-700 dark:text-slate-300">{children}</li>,
                        blockquote: ({children}) => <blockquote className="border-l-4 border-green-500 pl-4 italic text-slate-600 dark:text-slate-400 mb-4">{children}</blockquote>,
                      }}
                    >
                      {advice}
                    </ReactMarkdown>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Disclaimer Button */}
        <div className="mt-8 text-center">
          <Link href="/disclaimer">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-xs text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 px-2 py-1 h-6"
            >
              <AlertTriangle className="h-3 w-3 mr-1" />
              Disclaimer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
