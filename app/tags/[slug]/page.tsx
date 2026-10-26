import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { PostOrPage } from "@tryghost/content-api"
import { ArrowLeft, BookOpen } from "lucide-react"
import Card from "@/Card"
import { getTagPosts, getAllTags, getSingleTag, getSettings } from "@/ghost-client"
import { generateGhostMetadata } from "@/seo"
import { Badge } from "@/components/ui/badge"

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params
  const [metaData, settings] = await Promise.all([
    getSingleTag(params?.slug),
    getSettings(),
  ])

  return generateGhostMetadata(metaData, {
    fallbackTitle: settings?.title || "Tag",
    siteName: settings?.title,
    type: "website",
  })
}

export async function generateStaticParams() {
  const allTags = await getAllTags()
  if (!allTags || !Array.isArray(allTags)) return []

  return allTags.map((item) => ({
    slug: item.slug,
  }))
}

async function TagPage(props: { params: Params }) {
  const params = await props.params
  const tag = await getSingleTag(params.slug)
  const tagPosts = await getTagPosts(params.slug)

  if (!tagPosts || tagPosts.length === 0) {
    notFound()
  }

  const tagName = tag?.name || params.slug.split("-").join(" ")

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

      {/* Tag Header Banner */}
      <section className="relative overflow-hidden py-8 sm:py-10 mb-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">

            <Badge variant="outline" className="gap-1 font-medium text-xs text-muted-foreground">
              <BookOpen className="h-3 w-3" />
              {tagPosts.length} {tagPosts.length === 1 ? "story" : "stories"}
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            # {tagName}
          </h1>

          {tag?.description ? (
            <p className="text-base text-muted-foreground leading-relaxed">
              {tag.description}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Curated articles and dispatches published under the #{tagName} tag.
            </p>
          )}
        </div>
      </section>

      {/* Tag Stories Grid */}
      <section aria-label={`Articles tagged with ${tagName}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tagPosts.map((item: PostOrPage) => (
            <Card key={item.uuid} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default TagPage
