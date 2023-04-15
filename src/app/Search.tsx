"use client"

import React, { useEffect, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { FaSearch } from "react-icons/fa";
import Link from 'next/link';
import searchData from '../../search.json'
import type { PostOrPage } from "@tryghost/content-api"


let searchPost: PostOrPage[] = []


function Search() {

  const [query, setQuery] = useState(null)

  useEffect(() => {

    searchPost.length = 0;

    searchData.map((item: PostOrPage) => {

      if (item?.title.trim().toLowerCase().includes(query?.trim().toLowerCase())) {
        searchPost.push(item)
      }

    })

  }, [query])


  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="cursor-pointer outline-none"
          aria-label="Search"
        >
          <FaSearch />
        </button>
      </Popover.Trigger>

      <Popover.Portal>

        <Popover.Content
          className="rounded p-2 bg-white dark:bg-gray-800 w-[480px] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >

          <div className='my-2'>
            <label htmlFor="default-search" className="mb-2 mt-5 text-sm font-medium text-gray-900 sr-only dark:text-white">Search bar </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="search" id="default-search" onChange={(event) => setQuery(event?.target.value)} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Start searching here ..." required />

            </div>
          </div>


          {

            searchPost.length > 0 ? searchPost.map(item => {

              return (
                <div key={item.uuid} className='my-3'>
                  <div className="text-white my-2 py-2 bg-blue-400 dark:bg-gray-900 dark:hover:bg-blue-400 border-none rounded-md dark:text-white">
                    <Link href={`read/${item.slug}`} className="relative inline-flex items-center rounded-lg w-full px-4 py-2 text-sm font-medium">
                      {item.title}
                    </Link>
                  </div>
                </div>
              )
            }) : " "

          }

        </Popover.Content>

      </Popover.Portal>

    </Popover.Root >
  )
}

export default Search;
