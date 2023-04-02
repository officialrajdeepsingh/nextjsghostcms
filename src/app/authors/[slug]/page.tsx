import React from 'react'
import Link from "next/link";
import { FaFacebook, FaTwitter, FaGlobe } from "react-icons/fa";
import Card from "../../Card"
import { getSingleAuthor, getSingleAuthorPost, getAllAuthors } from "../../ghost-client"
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string }; }): Metadata {
  const Metadata = await getSingleAuthor(params.slug)

  return {
    title: Metadata.name,
    description: Metadata.bio,
    keywords: ['Next.js', 'React', 'JavaScript'],
  }
}

export async function generateStaticParams() {

  const allAuthor = await getAllAuthors()

  let allAuthorItem: { slug: string }[] = []

  allAuthor.map(item => {
    allAuthorItem.push({
      slug: item.slug,
    })
  })
  return allAuthorItem

}




async function Authors({ params }: { params: { slug: string }; }) {

  const getAuthor = await getSingleAuthor(params.slug)

  const allAuthor = await getSingleAuthorPost(params.slug)
  if (allAuthor.length === 0) {

    notFound()

  }

  return (
    <>
      <section className="dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">

          <div className=" p-10 text-gray-500 sm:text-lg dark:text-gray-400">

            <Image height={30} width={30} className="w-36 h-36 p-2 rounded-full mx-auto ring-2 ring-gray-300 dark:ring-gray-500" src={getAuthor.profile_image} alt={getAuthor.name} />

            <h2 className="mb-4 mt-4 text-4xl tracking-tight font-bold text-center text-gray-900 dark:text-white">{getAuthor.name.split(" ")[0]} <span className="font-extrabold">{getAuthor.name?.split(" ")[1]}</span></h2>
            <p className="mb-4 font-light text-center">{getAuthor.bio} </p>


            <ul className="flex flex-wrap p-4 justify-center md:space-x-8 md:mt-0 md:text-sm md:font-medium">

              {
                (getAuthor.website !== null) ? (<li>
                  <Link href={getAuthor.website} className="block py-2 pl-3 pr-4 text-gray-700 hover:text-blue-700 dark:hover:text-blue-700 rounded md:p-0 dark:text-white" aria-current="page">
                    <FaGlobe />
                  </Link> </li>) : " "


              }

              {
                (getAuthor.twitter !== null) ? (<li>
                  <Link href={getAuthor.twitter} className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:text-blue-700 dark:hover:text-blue-700 md:p-0 dark:text-white" aria-current="page">
                    <FaTwitter />
                  </Link>
                </li>) : " "
              }

              {
                (getAuthor.facebook !== null) ? (<li>
                  <Link href={getAuthor.facebook}
                    className="block py-2 pl-3 pr-4 text-gray-700 rounded  hover:text-blue-700 dark:hover:text-blue-700 md:p-0 dark:text-white"> <FaFacebook />
                  </Link>
                </li>) : " "

              }


            </ul>

          </div>
        </div>
      </section>

      <aside aria-label="Related articles" className="py-8 lg:py-24 dark:bg-gray-800">
        <div className="px-4 mx-auto max-w-screen-xl">

          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            More articles from {getAuthor.name}
          </h2>

          <div className="container my-12 mx-auto grid grid-cols-1 gap-12 md:gap-12 lg:gap-12  lg:grid-cols-3  md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 ">

            {
              allAuthor.map(item => <Card key={item.uuid} item={item} />)
            }

          </div>
        </div>
      </aside>


    </>
  )

}
export default Authors
