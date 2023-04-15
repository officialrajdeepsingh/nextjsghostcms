import "./globals.css";
import BlogLayout from './BlogLayout'
import { getNavigation, } from "./ghost-client"
import { use } from "react"
import type { Settings } from "@tryghost/content-api"

interface UpdateSettings extends Settings {
  accent_color?: string;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {

  const settings: UpdateSettings = use(getNavigation());


  return (

    <html className='light' lang="en">

      <body
        style={{
          '--bg-color': settings?.accent_color ? settings.accent_color : "",
        }}
        className={` bg-[--bg-color] dark:bg-gray-900`}>

        <BlogLayout setting={settings}>

          {children}

        </BlogLayout>

      </body>

    </html>

  )
}
