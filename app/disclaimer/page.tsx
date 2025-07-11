 "use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { AlertTriangle, Brain, ArrowLeft, Skull } from "lucide-react"
import Link from "next/link"

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-red-600 p-3 rounded-lg">
              <Skull className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">ZeroIQ Disclaimer</h1>
              <p className="text-red-600 dark:text-red-400">⚠️ WARNING: This Website Gives Terrible Advice</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Main Disclaimer */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-16 w-16 text-red-500" />
              </div>
              <CardTitle className="text-3xl text-red-700 dark:text-red-400 mb-4">
                🚨 IMPORTANT DISCLAIMER 🚨
              </CardTitle>
              <CardDescription className="text-lg">
                This website is designed to give hilariously bad coding advice
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg border-l-4 border-l-red-500">
                <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4">
                  🛑 DO NOT FOLLOW ANY ADVICE FROM THIS WEBSITE 🛑
                </h3>
                <div className="space-y-4 text-red-700 dark:text-red-300">
                  <p>
                    <strong>This is a parody website.</strong> Every piece of advice given by ZeroIQ is intentionally terrible, 
                    counterproductive, and would lead to complete disaster if implemented in real projects.
                  </p>
                  <p>
                    The AI is specifically programmed to give the <em>worst possible</em> coding advice while maintaining 
                    a serious, professional tone. It's designed to be funny, not helpful.
                  </p>
                  <p>
                    <strong>Examples of what NOT to do:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>❌ Don't actually write 10,000-line single files</li>
                    <li>❌ Don't delete your Git history weekly</li>
                    <li>❌ Don't store passwords in public repositories</li>
                    <li>❌ Don't use Comic Sans in production</li>
                    <li>❌ Don't implement "Quantum Debugging"</li>
                    <li>❌ Don't follow any of the "methodologies" suggested here</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border-l-4 border-l-yellow-500">
                <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-4">
                  📚 For Real Coding Advice, Check Out:
                </h3>
                <div className="space-y-2 text-yellow-700 dark:text-yellow-300">
                  <p>• <strong>MDN Web Docs</strong> - For web development standards</p>
                  <p>• <strong>Stack Overflow</strong> - For actual solutions to coding problems</p>
                  <p>• <strong>Clean Code by Robert Martin</strong> - For real best practices</p>
                  <p>• <strong>Official documentation</strong> - For your frameworks and languages</p>
                  <p>• <strong>GitHub repositories</strong> - For examples of good code</p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border-l-4 border-l-blue-500">
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                  🎯 What This Website Is Actually For:
                </h3>
                <div className="space-y-2 text-blue-700 dark:text-blue-300">
                  <p>• <strong>Entertainment</strong> - Laugh at absurdly bad coding suggestions</p>
                  <p>• <strong>Learning</strong> - Recognize anti-patterns by seeing extreme examples</p>
                  <p>• <strong>Stress relief</strong> - Sometimes you need to laugh at coding frustrations</p>
                  <p>• <strong>Team bonding</strong> - Share funny "advice" with your developer friends</p>
                  <p>• <strong>Education</strong> - Understand what NOT to do in software development</p>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                  Remember: This is satire. Real coding advice should come from reputable sources!
                </p>
                
                <div className="flex gap-4 justify-center">
                  <Link href="/">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to ZeroIQ
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => window.open('https://developer.mozilla.org/en-US/', '_blank')}
                  >
                    Get Real Advice (MDN)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
