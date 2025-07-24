// Global error boundary for the App Router
// This file handles runtime errors and provides a recovery UI

'use client'

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-lg">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-destructive" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Something went wrong!
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          The AI must have given us some terrible advice again. 
          Don't worry though - we can try to recover from this mess.
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={reset}
            size="lg"
            className="w-full"
          >
            Try Again
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="w-full"
            onClick={() => window.location.href = '/'}
          >
            Go Home
          </Button>
        </div>
        
        {error.digest && (
          <p className="text-sm text-muted-foreground mt-6">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
