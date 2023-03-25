import MorePost from "../../MorePost";
import Newsletter from "../../Newsletter";
import Link from "next/link";
import { getSinglePost } from "../../ghost-client"
import { useRouter } from 'next/router'
import Image from "next/image";
import Script from 'next/script'
async function Read({ params }: { params: { slug: string }; }) {

  const getPost = await getSinglePost(params.slug)

  return (
    <> <Script src="https://cdn.jsdelivr.net/ghost/portal@~2.25/umd/portal.min.js" />
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">

        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-3xl format format-xl sm:format-base  format-blue dark:format-invert">

            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {getPost.title}
            </h1>

            <p className="lead">
              {getPost.excerpt}
            </p>

            <header className="mb-4 lg:mb-6 not-format">

              <address className="flex items-center mb-6 not-italic">

                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">

                  <img className="mr-4 w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Jese Leos" />

                  <Link href="/authors/rajdeepsingh" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">Jese Leos</Link>

                  <time className="text-base font-light text-gray-500 dark:text-gray-400 mx-1" dateTime={"2022-02-08".toString()} title="February 8th, 2022">
                    Feb. 8, 2022
                  </time>

                  <div className="text-base w-1 h-1 rounded-full bg-black dark:bg-white mx-1"></div>

                  <p className="text-base font-light text-gray-500 dark:text-gray-400">3 Min Read</p>

                </div>

              </address>

            </header>

            <figure>
              <Image className="mx-auto" width={1000} height={250} src={getPost.feature_image} alt={getPost.feature_image_alt} />
              <figcaption className="text-center"
                dangerouslySetInnerHTML={{
                  __html: getPost.feature_image_caption
                }}></figcaption>
            </figure>

            <div dangerouslySetInnerHTML={{
              __html: getPost.html
            }}>

            </div>

          </article>
        </div>
      </main>
      <Newsletter />
    </>
  )

}
export default Read
