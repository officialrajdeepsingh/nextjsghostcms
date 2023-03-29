import Link from "next/link"

function NotFound() {

  return (
    <section className="bg-white dark:bg-gray-900 my-16">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white"> Something's wrong</p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can't find that article. You'll find lots to explore on the home page.
          </p>
          <Link href="/" className="inline-flex text-white bg-black dark:bg-white dark:text-black p-3 hover:bg-gray-800 my-4">Back to Homepage</Link>
        </div>
      </div>
    </section >
  )

}

export default NotFound
