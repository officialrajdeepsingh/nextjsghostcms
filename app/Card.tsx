import Image from "next/image"
import Link from "next/link"
import type { PostOrPage } from "@tryghost/content-api"
import { format } from "date-fns"
import { Clock, ArrowUpRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CardProps {
  item: PostOrPage
  priority?: boolean
}

function PostCard({ item, priority = false }: CardProps) {
  const publishedDate = item.published_at
    ? format(new Date(item.published_at), "MMM d, yyyy")
    : null

  const authorInitials = item.primary_author?.name
    ? item.primary_author.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
    : "AU"

  return (
    <Card className="group relative flex flex-col py-0 overflow-hidden border border-border/70 bg-card hover:border-foreground/20 hover:shadow-lg transition-all duration-300 rounded-xl">
      {item.feature_image ? (
        <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
          <Link href={`/read/${item.slug}`} className="relative block h-full w-full">
            <Image
              src={item.feature_image}
              alt={item.feature_image_alt || item.title || "Post thumbnail"}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </Link>
          {item.primary_tag ? (
            <div className="absolute top-3 left-3 z-10">
              <Link href={`/tags/${item.primary_tag.slug}`}>
                <Badge
                  variant="secondary"
                  className="bg-background/90 backdrop-blur-sm text-foreground hover:bg-background border border-border/50 text-xs font-medium shadow-xs"
                >
                  {item.primary_tag.name}
                </Badge>
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          {publishedDate ? <span>{publishedDate}</span> : null}
          {publishedDate && item.reading_time ? <span>•</span> : null}
          {item.reading_time ? (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {item.reading_time} min read
            </span>
          ) : null}
        </div>

        <Link href={`/read/${item.slug}`} className="group-hover:text-primary transition-colors">
          <h3 className="text-xl font-bold tracking-tight line-clamp-2 mb-2 leading-snug">
            {item.title}
          </h3>
        </Link>

        {item.custom_excerpt || item.excerpt ? (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4 flex-1">
            {item.custom_excerpt || item.excerpt}
          </p>
        ) : (
          <div className="flex-1" />
        )}

        <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs mt-auto">
          {item.primary_author ? (
            <Link
              href={`/authors/${item.primary_author.slug}`}
              className="flex items-center gap-2.5 group/author hover:opacity-80 transition-opacity"
            >
              <Avatar className="h-7 w-7 border border-border/60">
                {item.primary_author.profile_image ? (
                  <AvatarImage
                    src={item.primary_author.profile_image}
                    alt={item.primary_author.name || "Author"}
                  />
                ) : null}
                <AvatarFallback className="text-[10px] font-medium bg-muted">
                  {authorInitials}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-foreground truncate max-w-32">
                {item.primary_author.name}
              </span>
            </Link>
          ) : (
            <span />
          )}

          <Link
            href={`/read/${item.slug}`}
            className="inline-flex items-center gap-1 font-medium text-muted-foreground group-hover:text-foreground transition-colors"
          >
            Read
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </Card>
  )
}

export default PostCard
