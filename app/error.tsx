"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertCircle, RotateCcw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("App error:", error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-20 max-w-xl text-center">
      <Card className="border border-destructive/30 bg-card rounded-2xl shadow-sm p-8 sm:p-12">
        <CardContent className="flex flex-col items-center p-0">
          <div className="h-16 w-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-6">
            <AlertCircle className="h-8 w-8" />
          </div>

          <span className="text-xs font-semibold uppercase tracking-widest text-destructive mb-2">
            Unexpected Error
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Unable to load content
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-6">
            An issue occurred while attempting to fetch or render this story. You can retry the request or return home.
          </p>

          {error?.message ? (
            <div className="w-full bg-muted/60 border border-border/60 rounded-lg p-3 text-xs font-mono text-muted-foreground text-left overflow-x-auto mb-6 max-h-32">
              {error.message}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={() => reset()}
              variant="default"
              className="gap-2 rounded-lg font-medium shadow-xs"
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </Button>

            <Button asChild variant="outline" className="gap-2 rounded-lg font-medium">
              <Link href="/">
                <Home className="h-4 w-4" />
                Return Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
