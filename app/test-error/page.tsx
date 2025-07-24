'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function TestErrorPage() {
  const [shouldError, setShouldError] = useState(false)

  // This will trigger the error boundary
  if (shouldError) {
    throw new Error("This is a test error to check the error boundary!")
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Error Testing Page</h1>
      
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Click the button below to trigger a runtime error and test the error boundary:
        </p>
        
        <Button 
          onClick={() => setShouldError(true)}
          variant="destructive"
          size="lg"
        >
          🧨 Trigger Error (Test Error Boundary)
        </Button>
        
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Other ways to test errors:</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Visit a non-existent URL (like /random-page) to test 404</li>
            <li>• Open browser dev tools and check Network tab when errors occur</li>
            <li>• Check console for error logs</li>
          </ul>
        </div>
      </div>
    </div>
  )
}