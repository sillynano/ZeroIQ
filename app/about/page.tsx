"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  ArrowLeft, 
  User, 
  Code,
  Github,
  MapPin,
  Calendar,
  Heart
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  // Personal Information - Update these with your details
  const personalInfo = {
    name: "Silly Nano",
    title: "lowkey smart monkey",
    location: "Houston, USA",
    github: "sillynano",
    bio: "A monkey learning how to code stuff.",
    yearsOfExperience: "1+"
  }

  const skills = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
     "Tailwind CSS", "VS Code"
  ]

  const interests = [
    "🖥 Technology",
    "🎮 Gaming", 
    "📚 Learning To Code",
    "🎵 Music"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
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
                <User className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">About Me</h1>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden bg-slate-200 dark:bg-slate-700">
              <img 
                src="/profile.png" 
                alt={`${personalInfo.name} profile photo`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to icon if image fails to load
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.style.display = 'flex';
                  }
                }}
              />
              <div className="w-full h-full flex items-center justify-center" style={{display: 'none'}}>
                <User className="h-16 w-16 text-slate-500 dark:text-slate-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              {personalInfo.name}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-2">
              {personalInfo.title}
            </p>
            <div className="flex items-center justify-center text-slate-500 dark:text-slate-500 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              {personalInfo.location}
            </div>
            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          {/* Contact Links */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button variant="outline" size="sm" asChild>
              <a href={`https://github.com/${personalInfo.github}`} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <CardTitle className="text-2xl">{personalInfo.yearsOfExperience}</CardTitle>
              <CardDescription>Years of Experience</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Code className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <CardTitle className="text-2xl">{skills.length}+</CardTitle>
              <CardDescription>Technologies & Tools</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Skills Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="h-5 w-5 mr-2" />
              Skills & Technologies
            </CardTitle>
            <CardDescription>
              Technologies I work with regularly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interests Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-5 w-5 mr-2" />
              Interests & Hobbies
            </CardTitle>
            <CardDescription>
                hobbies i do
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {interests.map((interest, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-lg">{interest}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Thanks for Visiting!</CardTitle>
            <CardDescription>
              Hope you enjoyed learning a bit about me and the ZeroIQ project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-x-4">
              <Button asChild>
                <a href={`https://github.com/${personalInfo.github}`} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to ZeroIQ
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
