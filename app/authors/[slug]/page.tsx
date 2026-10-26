import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { PostOrPage } from "@tryghost/content-api"
import { Globe, BookOpen, ArrowLeft } from "lucide-react"
import { FaTwitter, FaFacebook } from "react-icons/fa"
import Card from "@/Card"
import { getSingleAuthor, getSingleAuthorPosts, getAllAuthors, getSettings } from "@/ghost-client"
import { generateGhostMetadata } from "@/seo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params
  const [author, settings] = await Promise.all([
    getSingleAuthor(params.slug),
    getSettings(),
  ])

  if (!author) {
    return {
      title: "Author Not Found",
    }
  }

  return generateGhostMetadata(author, {
    fallbackTitle: settings?.title || "Author",
    siteName: settings?.title,
    type: "profile",
    keywords: ["next.js", "ghost", "editorial"],
  })
}

export async function generateStaticParams() {
  const allAuthor = await getAllAuthors()
  if (!allAuthor || !Array.isArray(allAuthor)) return []

  return allAuthor.map((item) => ({
    slug: item.slug,
  }))
}

async function AuthorPage(props: { params: Params }) {
  const params = await props.params
  const author = await getSingleAuthor(params.slug)
  const posts = await getSingleAuthorPosts(params.slug)

  if (!author) {
    notFound()
  }

  const authorInitials = author.name
    ? author.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "AU"

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to all stories
        </Link>
      </div>

      {/* Author Header Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-8 sm:p-12 mb-12 text-center">
        <div className="flex flex-col items-center max-w-2xl mx-auto">
          <Avatar className="h-28 w-28 sm:h-32 sm:w-32 border-4 border-background shadow-md mb-6">
            {author.profile_image ? (
              <AvatarImage src={author.profile_image} alt={author.name || "Author"} />
            ) : null}
            <AvatarFallback className="text-2xl font-bold bg-muted">
              {authorInitials}
            </AvatarFallback>
          </Avatar>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            {author.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="gap-1 font-medium text-xs">
              <BookOpen className="h-3 w-3" />
              {posts?.length || 0} {posts?.length === 1 ? "story" : "stories"}
            </Badge>
            {author.location ? (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                📍 {author.location}
              </Badge>
            ) : null}
          </div>

          {author.bio ? (
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 font-normal">
              {author.bio}
            </p>
          ) : null}

          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {author.website ? (
              <Button asChild variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg text-xs">
                <Link href={author.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-3.5 w-3.5" />
                  Website
                </Link>
              </Button>
            ) : null}

            {author.twitter ? (
              <Button asChild variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg text-xs">
                <Link
                  href={`https://twitter.com/${author.twitter.replace(/^@/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="h-3.5 w-3.5" />
                  Twitter
                </Link>
              </Button>
            ) : null}

            {author.facebook ? (
              <Button asChild variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg text-xs">
                <Link
                  href={`https://facebook.com/${author.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="h-3.5 w-3.5" />
                  Facebook
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      {/* Author Stories Grid */}
      <section aria-label="Author Stories">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-border/60">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Articles by {author.name}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Read all writings contributed by this author
            </p>
          </div>
        </div>

        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((item: PostOrPage) => (
              <Card key={item.uuid} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No published stories found for this author yet.
          </div>
        )}
      </section>
    </div>
  )
}

export default AuthorPage
