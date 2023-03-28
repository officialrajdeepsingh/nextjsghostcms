import { getPosts, getSearchPosts } from "./ghost-client"
import Card from './Card'
import Pagination from "./Pagination"
import * as fs from 'node:fs';
import { cache } from "react"


export default async function Home() {

  const getPost = await getPosts()
  const AllPostForSerach = await getSearchPosts()

  cache(async () => {

    try {

      const jsonString = JSON.stringify(AllPostForSerach)

      fs.writeFile('search.json', jsonString, 'utf8', err => {
        if (err) {
          console.log('Error writing file', err)
        } else {
          console.log('Successfully wrote file')
        }
      })

    } catch (error) {
      console.log('error : ', error)
    }

  })


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

      <Pagination item={getPost.meta.pagination} />
    </>
  )
}
