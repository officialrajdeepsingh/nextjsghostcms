
import Image from "next/image"
import Link from "next/link"
import type { PostOrPage } from "@tryghost/content-api";
import { format } from 'date-fns'

function Card({ item }: { item: PostOrPage }) {

  return (
    <div className="max-w-full bg-white dark:bg-gray-800" >

      {
        item.featured !== null && item.feature_image !== undefined ? <Link href={`/read/${item.slug}`}>
          <Image className="rounded-lg p-3" width={1000} height={324} src={item.feature_image} alt={item.feature_image_alt || item.title} />
        </Link> : " "
      }

      <div className="p-3">

        <div className="flex mb-3">
          {
            item.published_at !== null && item.published_at !== undefined ? <p className="text-sm text-gray-500 dark:text-gray-400">
              {format(new Date(item.published_at), 'dd MMMM, yyyy')}
            </p> : ""
          }
          <p className="text-sm text-gray-500 dark:text-gray-400 mx-1"> , </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {item.reading_time} min read
          </p>
        </div>

        <Link href={`/read/${item.slug}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item.title}
          </h5>
        </Link>


      </div>

    </div>

  )

}



export default Card
