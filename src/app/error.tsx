'use client'; // Error components must be Client components
import React from 'react';
import { useEffect } from 'react';
import Link from 'next/link';
export default function Error({ error, reset }: { error: Error; reset: () => void; }) {

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-white dark:bg-gray-900 my-16">

      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">

        <div className="mx-auto max-w-screen-sm text-center">

          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white"> Something's wrong</p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that article. You'll find lots to explore on the home page.</p>

          <div className='flex justify-around mt-2'>

            <Link href="#" className="inline-flex bg-gray-600 text-white hover:bg-gray-700 focus:ring-4 font-medium rounded-lg text-sm p-2
                text-center">Back to Homepage</Link>

            <button className='bg-gray-600 text-white rounded-lg p-2' onClick={() => reset()}>
              Try again
            </button>


          </div>

        </div>

      </div>

    </section>
  );
}
