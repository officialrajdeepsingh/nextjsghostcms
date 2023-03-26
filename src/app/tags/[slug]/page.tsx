import React from 'react'
import Card from "../../Card"
import { getTagPosts } from "../../ghost-client"

async function Tag({ params }: { params: { slug: string }; }) {

  let tagPosts = await getTagPosts(params.slug)

  return (
    <aside aria-label="Related articles" className="py-8 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="px-4 mx-auto max-w-screen-xl">

        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
          More articles from {params.slug}
        </h2>

        <div className="container my-12 mx-auto grid grid-cols-1 gap-12 md:gap-12 lg:gap-12  lg:grid-cols-3  md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 ">
          {
            tagPosts.map(
              item => <Card item={item} />
            )
          }
        </div>
      </div>
    </aside>
  )

}

export default Tag

