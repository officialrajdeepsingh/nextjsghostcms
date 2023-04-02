"use client"

import { FaFacebook, FaTwitter, FaSun, FaRegMoon } from "react-icons/fa";
import { useTheme } from 'next-themes'
import Link from "next/link";
import dynamic from 'next/dynamic'

const Search = dynamic(() => import('./Search'))

function SocialIcons({ setting }) {

  const { theme, setTheme } = useTheme()

  return <div className="flex md:order-2">

    <ul className="flex flex-wrap p-4 md:space-x-8 md:mt-0 md:text-sm md:font-medium">

      <li className="block py-2 pl-3 pr-4 text-gray-700 hover:text-blue-700 dark:hover:text-blue-700 rounded md:p-0 dark:text-white" aria-current="page">
        <Search />
      </li>

      {
        setting.twitter !== null ? <li>
          <Link target="_blank" href={`https://twitter.com/${setting.twitter}`} className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:text-blue-700 dark:hover:text-blue-700 md:p-0 dark:text-white" aria-current="page">
            <FaTwitter />
          </Link>
        </li> : ""

      }

      {
        setting.facebook !== null ? <li>
          <Link target="_blank" href={`https://www.facebook.com/${setting.facebook}`}
            className="block py-2 pl-3 pr-4 text-gray-700 rounded  hover:text-blue-700 dark:hover:text-blue-700 md:p-0 dark:text-white"> <FaFacebook />
          </Link>
        </li> : " "

      }

      <li>
        <button className="block py-2 pl-3 pr-4 rounded md:p-0" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <FaSun /> : <FaRegMoon />}
        </button>
      </li>
    </ul>
  </div>;
}

export default SocialIcons
