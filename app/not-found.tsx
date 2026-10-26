import Link from "next/link"

function NotFound() {

  return (
    <section className="dark:bg-gray-800 my-16">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white"> Something wrong</p>
          <p className="mb-4 text-lg text-black dark:text-white">
            Sorry, we cant find that article. You will find lots to explore on the home page.
          </p>
          <Link href="/" className="inline-flex text-white bg-black dark:bg-white dark:text-black p-3 hover:bg-gray-800 my-4">Back to Homepage</Link>
        </div>
      </div>
    </section >
  )

}

export default NotFound
