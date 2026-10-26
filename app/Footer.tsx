import Link from "next/link"
import type { Settings } from "@tryghost/content-api"
import { FaTwitter, FaFacebook } from "react-icons/fa"
import { Button } from "@/components/ui/button"

function Footer({ setting }: { setting: Settings }) {
  const currentYear = new Date().getFullYear()
  console.log(setting)
  return (
    <footer className="w-full border-t border-border/60 bg-muted/20 mt-20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-border/60">
          <div className="md:col-span-6 space-y-3">
            <Link href="/" className="inline-block">
              <span className="text-lg font-bold tracking-tight text-foreground">
                {setting?.title || "Ghost CMS"}
              </span>
            </Link>
            {setting?.description ? (
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                {setting.description}
              </p>
            ) : null}
          </div>

          <div className="md:col-span-6 flex flex-col md:items-end justify-between gap-4">
            {setting?.secondary_navigation && setting.secondary_navigation.length > 0 ? (
              <nav aria-label="Footer Navigation" className="flex flex-wrap gap-4 md:justify-end text-sm">
                {setting.secondary_navigation.map((nav, index) => (
                  <Link
                    key={index}
                    href={nav.url}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {nav.label}
                  </Link>
                ))}
              </nav>
            ) : null}

            <div className="flex items-center gap-2">
              {setting?.twitter ? (
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                >
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://twitter.com/${setting.twitter.replace(/^@/, "")}`}
                    aria-label="Twitter Profile"
                  >
                    <FaTwitter className="h-4 w-4" />
                  </Link>
                </Button>
              ) : null}

              {setting?.facebook ? (
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                >
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.facebook.com/${setting.facebook}`}
                    aria-label="Facebook Page"
                  >
                    <FaFacebook className="h-4 w-4" />
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-muted-foreground">
          <p>© {currentYear} {setting?.title || "Editorial"}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Powered by Next.js & Ghost</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
