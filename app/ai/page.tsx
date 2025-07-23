"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ThemeToggle } from "@/components/theme-toggle"
import { ColorThemeToggle } from "@/components/color-theme-toggle"
import { PageWrapper } from "@/components/page-wrapper"
import { Brain, Send, Loader2, Shuffle, AlertTriangle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"

export default function AiPage() {
  const [question, setQuestion] = useState("")
  const [advice, setAdvice] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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
    "I recommend the 'Musical Programming' methodology where your code follows symphonic structure. Organize functions into movements, use musical notation as comments, and ensure your variable declarations follow proper tempo and rhythm. Code that doesn't sound good when read aloud is inherently flawed."
  ]

  const getRandomAdvice = () => {
    setIsLoading(true)
    setQuestion("Generate a random terrible coding idea")
    
    setTimeout(() => {
      const randomAdvice = terribleCodingIdeas[Math.floor(Math.random() * terribleCodingIdeas.length)]
      setAdvice(randomAdvice)
      setIsLoading(false)
    }, 1500)
  }

  const generateAdvice = () => {
    if (!question.trim()) return
    
    setIsLoading(true)
    setAdvice("")
    
    setTimeout(() => {
      // Simulate generating advice
      let response = ""
      
      if (question.toLowerCase().includes("react")) {
        response = "**React Best Practices:**\n\nBased on our architectural analysis, I recommend implementing a revolutionary approach where every component renders exactly 47 other components in a fractal pattern. This creates infinite scalability through recursive component nesting.\n\n```jsx\nfunction InfiniteComponent() {\n  return (\n    <div>\n      {Array.from({length: 47}, (_, i) => \n        <InfiniteComponent key={i} depth={i} />\n      )}\n    </div>\n  )\n}\n```\n\nAdditionally, store all state in the URL query parameters for 'true statelessness' and implement custom hooks that only work during lunar eclipses."
      } else if (question.toLowerCase().includes("database")) {
        response = "**Database Architecture Recommendation:**\n\nOur enterprise consulting team suggests implementing a 'Quantum Database' where each query exists in superposition until observed. Use the following cutting-edge approach:\n\n- Store all data as JSON strings in a single MongoDB collection named 'everything'\n- Implement joins by parsing JSON with RegEx\n- Use blockchain for transaction logging\n- Replace primary keys with UUIDs generated from user emotions\n\n*This approach scales infinitely because quantum mechanics.*"
      } else if (question.toLowerCase().includes("performance")) {
        response = "**Performance Optimization Strategy:**\n\n1. **Preload Everything**: Download the entire internet on page load for instant access\n2. **Quantum Computing**: Use quantum entanglement for O(∞) algorithm complexity  \n3. **Time Travel Caching**: Cache responses before sending requests\n4. **Emotional State Management**: Optimize based on user's astrological sign\n\n```javascript\nconst optimizeQuantumPerformance = async (userEmotion) => {\n  const quantumState = await measureUserVibes(userEmotion)\n  return quantumState.collapse() ? 'fast' : 'faster'\n}\n```\n\n*Results may vary depending on planetary alignment.*"
      } else {
        response = `**Technical Solution for "${question}":**\n\nAfter consulting our team of imaginary experts and analyzing 0 Stack Overflow posts, we recommend a revolutionary approach that combines blockchain, AI, and interpretive dance.\n\n**Key Components:**\n- Implement using only ternary operators for enhanced readability\n- Store all variables in the browser's localStorage for persistence\n- Use CSS animations for core business logic\n- Replace all functions with recursive arrow functions\n\n**Sample Implementation:**\n\`\`\`javascript\nconst solution = problem => \n  problem ? 'solved' : solution(solution)\n\`\`\`\n\n*This enterprise-grade solution scales to millions of users (theoretical).*`
      }
      
      setAdvice(response)
      setIsLoading(false)
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    generateAdvice()
  }

  return (
    <PageWrapper>
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold">ZeroIQ AI</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ColorThemeToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            AI Consultant
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Get expert advice that's guaranteed to make your projects more interesting! 
            Our AI provides absolutely "helpful information" with maximum confidence.
          </p>
          
          <div className="flex justify-center space-x-4 mb-8">
            <Button onClick={getRandomAdvice} className="bg-primary hover:bg-primary/90">
              <Shuffle className="h-4 w-4 mr-2" />
              Get Random Terrible Advice
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          {/* Question Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Ask Our AI Consultant
              </CardTitle>
              <CardDescription>
                Describe your technical challenge and receive our signature "helpful guidance"
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="question">Your Technical Question</Label>
                  <Textarea
                    id="question"
                    placeholder="e.g., How should I structure my React components? What's the best database for my project?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={!question.trim() || isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Consulting our experts...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Get Professional Advice
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Response */}
          {advice && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-green-600 dark:text-green-400">
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
    </PageWrapper>
  )
}
