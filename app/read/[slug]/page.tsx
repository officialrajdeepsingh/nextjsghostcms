import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react"
import { getSinglePost, getPosts, getRelatedPosts, getSettings } from "@/ghost-client"
import PostCard from "@/Card"
import { generateGhostMetadata } from "@/seo"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import "@/cards.min.css"

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params
  const [metaData, settings] = await Promise.all([
    getSinglePost(params.slug),
    getSettings(),
  ])

  if (!metaData) {
    return {
      title: "Not Found",
    }
  }

  return generateGhostMetadata(metaData, {
    fallbackTitle: settings?.title || "Article",
    siteName: settings?.title,
    type: "article",
  })
}

export async function generateStaticParams() {
  const posts = await getPosts()
  if (!posts || !Array.isArray(posts)) return []
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

async function Read(props: { params: Params }) {
  const params = await props.params
  const post = await getSinglePost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.id, post.primary_tag?.slug, 3)

  const publishedDate = post.published_at
    ? format(new Date(post.published_at), "MMMM d, yyyy")
    : null

  const authorInitials = post.primary_author?.name
    ? post.primary_author.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
    : "AU"

  return (
    <div className="min-h-screen py-8 lg:py-14">
      <main className="container mx-auto px-4 max-w-4xl">
        {/* Navigation & Topic */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to all stories
          </Link>

          {post.primary_tag ? (
            <Link href={`/tags/${post.primary_tag.slug}`}>
              <Badge
                variant="secondary"
                className="hover:bg-secondary/80 font-medium text-xs px-2.5 py-0.5"
              >
                #{post.primary_tag.name}
              </Badge>
            </Link>
          ) : null}
        </div>

        {/* Article Header */}
        <header className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.18] mb-5">
            {post.title}
          </h1>

          {post.custom_excerpt || post.excerpt ? (
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-normal mb-8 max-w-3xl">
              {post.custom_excerpt || post.excerpt}
            </p>
          ) : null}

          {/* Author & Meta Row */}
          <div className="flex flex-wrap items-center gap-4 py-4 border-y border-border/60">
            {post.primary_author ? (
              <Link
                href={`/authors/${post.primary_author.slug}`}
                className="flex items-center gap-3 hover:opacity-85 transition-opacity"
              >
                <Avatar className="h-10 w-10 border border-border/80">
                  {post.primary_author.profile_image ? (
                    <AvatarImage
                      src={post.primary_author.profile_image}
                      alt={post.primary_author.name || "Author"}
                    />
                  ) : null}
                  <AvatarFallback className="text-xs font-medium">
                    {authorInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    {post.primary_author.name}
                  </p>
                </div>
              </Link>
            ) : null}

            <div className="flex items-center gap-3 ml-auto text-xs text-muted-foreground">
              {publishedDate ? (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <time dateTime={post.published_at || undefined}>{publishedDate}</time>
                </span>
              ) : null}

              {publishedDate && post.reading_time ? <span>•</span> : null}

              {post.reading_time ? (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.reading_time} min read
                </span>
              ) : null}
            </div>
          </div>
        </header>

        {/* Feature Image */}
        {post.feature_image ? (
          <figure className="mb-12">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-sm">
              <Image
                src={post.feature_image}
                alt={post.feature_image_alt || post.title || "Feature image"}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>
            {post.feature_image_caption ? (
              <figcaption
                className="text-center text-xs text-muted-foreground mt-3 italic"
                dangerouslySetInnerHTML={{
                  __html: post.feature_image_caption,
                }}
              />
            ) : null}
          </figure>
        ) : null}

        {/* Article Body Content */}
        <article className="prose prose-neutral dark:prose-invert max-w-none text-foreground/90 font-normal leading-relaxed text-base sm:text-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:underline-offset-4 prose-img:rounded-xl prose-img:shadow-sm">
          <div dangerouslySetInnerHTML={{ __html: post.html || "" }} />
        </article>

        {/* Article Tags Footer */}
        {post.tags && post.tags.length > 0 ? (
          <div className="mt-12 pt-6 border-t border-border/60 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground mr-1">Tags:</span>
            {post.tags.map((tag) => (
              <Link key={tag.id} href={`/tags/${tag.slug}`}>
                <Badge
                  variant="outline"
                  className="text-xs hover:bg-secondary transition-colors"
                >
                  #{tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        ) : null}

        {/* Author Bio Card */}
        {post.primary_author ? (
          <Card className="mt-12 border border-border/70 bg-card rounded-2xl overflow-hidden">
            <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <Avatar className="h-16 w-16 border-2 border-border/80 shrink-0">
                {post.primary_author.profile_image ? (
                  <AvatarImage
                    src={post.primary_author.profile_image}
                    alt={post.primary_author.name || "Author"}
                  />
                ) : null}
                <AvatarFallback className="text-base font-semibold">
                  {authorInitials}
                </AvatarFallback>
              </Avatar>

              <div className="text-center sm:text-left flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="text-lg font-bold">{post.primary_author.name}</h4>
                  <Link
                    href={`/authors/${post.primary_author.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    All author stories
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {post.primary_author.bio ? (
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {post.primary_author.bio}
                  </p>
                ) : null}

                <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-muted-foreground">
                  {post.primary_author.location ? (
                    <span>📍 {post.primary_author.location}</span>
                  ) : null}
                  {post.primary_author.website ? (
                    <Link
                      href={post.primary_author.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground underline underline-offset-2"
                    >
                      Website
                    </Link>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}

        <Separator className="my-14" />
      </main>

      {/* Related Stories */}
      {relatedPosts && relatedPosts.length > 0 ? (
        <aside aria-label="Related Stories" className="w-full border-t border-border/60 bg-muted/20 mt-8 py-14">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Continue Reading
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
                  {post.primary_tag ? `More in #${post.primary_tag.name}` : "Related Stories"}
                </h2>
              </div>

              {post.primary_tag ? (
                <Link
                  href={`/tags/${post.primary_tag.slug}`}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors group"
                >
                  View all in #{post.primary_tag.name}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ) : null}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedPosts.map((item) => (
                <PostCard key={item.uuid} item={item} />
              ))}
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  )
}

export default Read
