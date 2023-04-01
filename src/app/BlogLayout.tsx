"use client"


import Footer from "./Footer";
import Header from "./Header"
import { ThemeProvider } from 'next-themes'

function Layout({ setting, children }: {
  children: React.ReactNode
}) {
  return <ThemeProvider attribute="class">
    <Header setting={setting} />
    {children}
    <Footer />
  </ThemeProvider>

}
export default Layout
