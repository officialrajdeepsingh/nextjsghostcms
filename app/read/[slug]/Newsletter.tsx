"use client"

import { Mail, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function Newsletter() {
  return (
    <section className="container mx-auto px-4 max-w-3xl my-16">
      <Card className="border border-border/80 bg-muted/40 shadow-xs rounded-2xl overflow-hidden">
        <CardContent className="p-8 sm:p-10 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-background border border-border/70 mb-4 shadow-xs">
            <Mail className="h-5 w-5 text-foreground" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Subscribe to our weekly dispatch
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
            Get the latest thoughtful essays, deep dives, and analysis delivered directly to your inbox every Sunday morning. No spam, ever.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="reader@example.com"
              required
              className="h-11 bg-background border-border/80 text-sm rounded-lg"
            />
            <Button
              type="submit"
              className="h-11 px-6 rounded-lg font-medium shadow-xs shrink-0"
            >
              Join Dispatch
            </Button>
          </form>

          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
            <span>Free forever • Unsubscribe anytime with one click</span>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default Newsletter
