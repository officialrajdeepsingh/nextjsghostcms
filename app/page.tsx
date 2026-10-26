import * as fs from "node:fs"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { PostsOrPages } from "@tryghost/content-api"
import { format } from "date-fns"
import { Clock, ArrowRight, Sparkles } from "lucide-react"
import { getPosts, getSearchPosts, getSettings } from "@/ghost-client"
import Card from "@/Card"
import Pagination from "@/Pagination"
import { generateGhostMetadata } from "@/seo"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getSettings()
  return generateGhostMetadata(metadata, {
    fallbackTitle: "Home",
    keywords: ["Ghost CMS", "Next.js", "Editorial", "Publication"],
  })
}

export default async function Home() {
  const posts: PostsOrPages = await getPosts()

  if (!posts || posts.length === 0) {
    notFound()
  }

  const allPostsForSearch = await getSearchPosts()

  try {
    const jsonString = JSON.stringify(allPostsForSearch)
    fs.writeFile("search.json", jsonString, "utf8", (err) => {
      if (err) {
        console.log("Error writing search index", err)
      }
    })
  } catch (error) {
    console.log("Error saving search index:", error)
  }

  const [leadStory, ...restPosts] = posts

  const leadDate = leadStory.published_at
    ? format(new Date(leadStory.published_at), "MMMM d, yyyy")
    : null

  const leadAuthorInitials = leadStory.primary_author?.name
    ? leadStory.primary_author.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
    : "AU"

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
      {/* Editorial Lead / Featured Story */}
      {leadStory ? (
        <section aria-label="Featured Story" className="mb-14">
          <div className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card hover:border-foreground/20 hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
              {leadStory.feature_image ? (
                <div className="relative aspect-16/10 lg:aspect-auto lg:h-full lg:min-h-105 lg:col-span-7 overflow-hidden bg-muted">
                  <Link href={`/read/${leadStory.slug}`} className="relative block h-full w-full">
                    <Image
                      src={leadStory.feature_image}
                      alt={leadStory.feature_image_alt || leadStory.title || "Featured article"}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Link>
                  {leadStory.primary_tag ? (
                    <div className="absolute top-4 left-4 z-10">
                      <Link href={`/tags/${leadStory.primary_tag.slug}`}>
                        <Badge
                          variant="secondary"
                          className="bg-background/90 backdrop-blur-sm text-foreground hover:bg-background border border-border/50 font-medium px-3 py-1 shadow-sm"
                        >
                          {leadStory.primary_tag.name}
                        </Badge>
                      </Link>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div
                className={`flex flex-col justify-between p-6 sm:p-8 lg:p-10 ${leadStory.feature_image ? "lg:col-span-5" : "lg:col-span-12"
                  }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      <Sparkles className="h-3.5 w-3.5" />
                      Featured Lead
                    </span>
                    <span className="text-muted-foreground">•</span>
                    {leadDate ? (
                      <span className="text-xs text-muted-foreground">{leadDate}</span>
                    ) : null}
                    {leadStory.reading_time ? (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {leadStory.reading_time} min read
                        </span>
                      </>
                    ) : null}
                  </div>

                  <Link href={`/read/${leadStory.slug}`}>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight group-hover:text-primary transition-colors leading-tight mb-4">
                      {leadStory.title}
                    </h2>
                  </Link>

                  {leadStory.custom_excerpt || leadStory.excerpt ? (
                    <p className="text-base text-muted-foreground leading-relaxed line-clamp-3 lg:line-clamp-4 mb-6">
                      {leadStory.custom_excerpt || leadStory.excerpt}
                    </p>
                  ) : null}
                </div>

                <div className="pt-6 border-t border-border/60 flex items-center justify-between gap-4">
                  {leadStory.primary_author ? (
                    <Link
                      href={`/authors/${leadStory.primary_author.slug}`}
                      className="flex items-center gap-3 hover:opacity-85 transition-opacity"
                    >
                      <Avatar className="h-9 w-9 border border-border/70">
                        {leadStory.primary_author.profile_image ? (
                          <AvatarImage
                            src={leadStory.primary_author.profile_image}
                            alt={leadStory.primary_author.name || "Author"}
                          />
                        ) : null}
                        <AvatarFallback className="text-xs font-medium">
                          {leadAuthorInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-foreground">
                          {leadStory.primary_author.name}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}

                  <Button asChild size="sm" className="gap-1.5 rounded-lg font-medium shadow-xs">
                    <Link href={`/read/${leadStory.slug}`}>
                      Read Article
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Stories Grid */}
      {restPosts.length > 0 ? (
        <section aria-label="Latest Stories">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-border/60">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Recent Stories</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Thoughtfully written essays and notes
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {restPosts.map((item) => (
              <Card key={item.uuid} item={item} />
            ))}
          </div>
        </section>
      ) : null}

      <Pagination item={posts.meta.pagination} />
    </div>
  )
}
