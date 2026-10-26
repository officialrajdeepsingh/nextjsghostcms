import { getPaginationPosts, getPosts, getSettings } from "@/ghost-client"
import Card from "@/Card"
import PaginationItem from "@/Pagination"
import type { Metadata } from "next"
import type { PostsOrPages, PostOrPage } from "@tryghost/content-api"
import { notFound } from "next/navigation"
import { generateGhostMetadata } from "@/seo"

type Params = Promise<{ item: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params
  const metaData = await getSettings()

  return generateGhostMetadata(metaData, {
    fallbackTitle: "Articles",
    titleSuffix: `Page ${params.item}`,
    descriptionSuffix: `(Page ${params.item})`,
    url: metaData?.url ? `${metaData.url}/pagination/${params.item}` : undefined,
  })
}

export async function generateStaticParams(): Promise<{ item: string }[]> {
  const posts: PostsOrPages = await getPosts()
  const totalPages = posts?.meta?.pagination?.pages ?? 0

  return Array.from({ length: totalPages }, (_, index) => ({
    item: (index + 1).toString(),
  }))
}

export default async function Pagination(props: { params: Params }) {
  const params = await props.params
  const pageNumber: number = Number.parseInt(params.item, 10)

  const posts = await getPaginationPosts(pageNumber)

  if (!posts || posts.length === 0) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
      <header className="mb-8 pb-3 border-b border-border/60">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Stories — Page {pageNumber}
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Showing archive page {pageNumber} of {posts.meta.pagination.pages}
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {posts.map((item: PostOrPage) => (
          <Card key={item.uuid} item={item} />
        ))}
      </main>

      <PaginationItem item={posts.meta.pagination} />
    </div>
  )
}
