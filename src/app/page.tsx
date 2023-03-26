
import { getPosts } from "./ghost-client"
import Card from './Card'


export default async function Home() {

  const getPost = await getPosts()

  return (
    <main className="container my-12 mx-auto grid grid-cols-1 gap-2 md:gap-3 lg:gap-4  lg:grid-cols-3  md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">

      {
        getPost?.map(
          item => {
            return <Card key={item.uuid} item={item} />
          })
      }
    </main >
  )
}
