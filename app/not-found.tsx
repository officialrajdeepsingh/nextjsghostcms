import Link from "next/link"
import { Compass, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-xl text-center">
      <Card className="border border-border/70 bg-card rounded-2xl shadow-sm p-8 sm:p-12">
        <CardContent className="flex flex-col items-center p-0">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-6 text-muted-foreground">
            <Compass className="h-8 w-8" />
          </div>

          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Error 404
          </span>

          <h1 className="text-3xl font-extrabold tracking-tight mb-3">
            Story Not Found
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-8">
            The article or page you are looking for may have been moved, renamed, or is temporarily unavailable.
          </p>

          <Button asChild className="gap-2 rounded-lg font-medium shadow-xs">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Return to Front Page
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotFound
