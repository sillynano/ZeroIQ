// Alternative 404 page for Pages Router (if needed)
// Note: The app/not-found.tsx is preferred for App Router

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">This page could not be found.</p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  )
}
