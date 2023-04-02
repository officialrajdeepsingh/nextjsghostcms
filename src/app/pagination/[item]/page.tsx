import { getPaginationPosts, getPosts, getNavigation } from "../../ghost-client"
import Card from '../../Card'
import PaginationItem from "../../Pagination"
import type { Metadata } from "next";
export async function generateMetadata({ params }: { params: { slug: string }; }): Metadata {

  const metaData = await getNavigation()

  return {
    title: metaData.title,
    description: metaData.description,
    openGraph: {
      title: metaData.title,
      description: metaData.excpet,
      url: metaData.url,
    },
  }
}


export async function generateStaticParams() {

  const posts = await getPosts()

  let paginationItem = []

  for (let index = 1; index <= posts?.meta.pagination.pages; index++) {

    paginationItem.push({
      item: index,
    })

  }

  return paginationItem

}



export default async function Pagination({ params }: { params: { item: string }; }) {

  let getParams = Number.parseInt(params.item)

  const getPost = await getPaginationPosts(getParams)

  return (
    <>

      <main className="container my-12 mx-auto grid grid-cols-1 gap-2 md:gap-3 lg:gap-4 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">

        {
          getPost?.map(
            item => {
              return <Card key={item.uuid} item={item} />
            })
        }
      </main>

      <PaginationItem item={getPost.meta.pagination} />

    </>
  )
}
