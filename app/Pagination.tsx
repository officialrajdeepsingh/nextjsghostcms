import Link from "next/link"
import type { Pagination as GhostPagination } from "@tryghost/content-api"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  item: GhostPagination
}

function PaginationItem({ item }: PaginationProps) {
  if (!item || item.pages <= 1) {
    return null
  }

  const currentPage = item.page || 1
  const totalPages = item.pages

  // Generate a sensible range of pages to display
  const pages: number[] = []
  for (let i = 1; i <= totalPages; i++) {
    // Show first, last, and pages around current page
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i)
    }
  }

  return (
    <nav
      aria-label="Pagination Navigation"
      className="container mx-auto my-14 px-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60 pt-8"
    >
      <p className="text-xs text-muted-foreground order-2 sm:order-1">
        Page <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
        <span className="font-semibold text-foreground">{totalPages}</span>
        {item.total ? ` (${item.total} total stories)` : null}
      </p>

      <div className="flex items-center gap-1.5 order-1 sm:order-2">
        {item.prev ? (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="gap-1 h-9 px-3 rounded-lg border-border/80"
          >
            <Link
              href={item.prev === 1 ? "/" : `/pagination/${item.prev}`}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="gap-1 h-9 px-3 rounded-lg opacity-40 cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
        )}

        <div className="hidden sm:flex items-center gap-1">
          {pages.map((pageNum, idx) => {
            const isCurrent = pageNum === currentPage
            const prevPageNum = pages[idx - 1]
            const showEllipsis = prevPageNum && pageNum - prevPageNum > 1

            return (
              <div key={pageNum} className="flex items-center">
                {showEllipsis ? (
                  <span className="px-2 text-xs text-muted-foreground select-none">…</span>
                ) : null}
                <Button
                  asChild
                  variant={isCurrent ? "default" : "ghost"}
                  size="sm"
                  className={`h-9 w-9 p-0 rounded-lg text-xs font-medium ${
                    isCurrent ? "shadow-xs pointer-events-none" : "hover:bg-muted"
                  }`}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  <Link href={pageNum === 1 ? "/" : `/pagination/${pageNum}`}>
                    {pageNum}
                  </Link>
                </Button>
              </div>
            )
          })}
        </div>

        {item.next ? (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="gap-1 h-9 px-3 rounded-lg border-border/80"
          >
            <Link href={`/pagination/${item.next}`} aria-label="Next page">
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="gap-1 h-9 px-3 rounded-lg opacity-40 cursor-not-allowed"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </nav>
  )
}

export default PaginationItem
