import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getSinglePage, getAllPages, getSettings } from "@/ghost-client"
import { generateGhostMetadata } from "@/seo"
import "@/cards.min.css"

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params
  const [metaData, settings] = await Promise.all([
    getSinglePage(params.slug),
    getSettings(),
  ])

  if (!metaData) {
    return {
      title: "Not Found",
    }
  }

  return generateGhostMetadata(metaData, {
    fallbackTitle: settings?.title || "Page",
    siteName: settings?.title,
    type: "website",
  })
}

export async function generateStaticParams() {
  const pages = await getAllPages()
  if (!pages || !Array.isArray(pages)) return []

  return pages.map((post) => ({
    slug: post.slug,
  }))
}

async function Pages(props: { params: Params }) {
  const params = await props.params
  const page = await getSinglePage(params.slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen py-8 lg:py-14">
      <main className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>
        </div>

        <article className="mx-auto w-full">
          <header className="mb-10 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.18] mb-4">
              {page.title}
            </h1>

            {page.custom_excerpt || page.excerpt ? (
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-normal">
                {page.custom_excerpt || page.excerpt}
              </p>
            ) : null}
          </header>

          {page.feature_image ? (
            <figure className="mb-12">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-sm">
                <Image
                  src={page.feature_image}
                  alt={page.feature_image_alt || page.title || "Page feature image"}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
              </div>
            </figure>
          ) : null}

          <div
            className="prose prose-neutral dark:prose-invert max-w-none text-foreground/90 font-normal leading-relaxed text-base sm:text-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:underline-offset-4 prose-img:rounded-xl prose-img:shadow-sm"
            dangerouslySetInnerHTML={{ __html: page.html || "" }}
          />
        </article>
      </main>
    </div>
  )
}

export default Pages
