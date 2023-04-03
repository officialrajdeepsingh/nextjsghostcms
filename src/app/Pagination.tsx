import Link from "next/link"
import { Pagination } from "@tryghost/content-api"

function PaginationItem({ item }: { item: Pagination }) {

  let paginationItems = []

  for (let index = 1; index <= item?.pages; index++) {
    paginationItems.push(<li key={index * 2} ><Link href={index === 1 ? "/" : `/pagination/${index}`} className="px-3 py-2 leading-tight bg-blue-100 hover:bg-blue-200 border-transparent border rounded-lg text-black dark:bg-gray-800 dark:text-gray-400 mx-2 dark:hover:bg-gray-700 dark:hover:text-white">
      {index}
    </Link></li>)
  }

  return (

    <nav aria-label="pagination" className="mx-auto my-20 container">

      <ul className="mx-auto flex justify-center -space-x-px">

        <li>
          {
            item.prev ? <Link href={item.prev === 1 ? "/" : `/pagination/${item.prev}`} className="px-3 py-2 mr-2 border border-transparent rounded-md  leading-tight bg-white hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400
              dark:hover:bg-gray-700 dark:hover:text-white">
              Prev
            </Link> : " "
          }
        </li>

        {paginationItems}

        <li>
          {
            item.next ? <Link href={`/pagination/${item.next}`} className="px-3 py-2 ml-2 border border-transparent rounded-md leading-tight bg-white hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400
            dark:hover:bg-gray-700 dark:hover:text-white">
              Next
            </Link> : " "
          }
        </li>


      </ul>

    </nav>

  )

}


export default PaginationItem
