import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

function Files() {
  return (
    <div>
      Files
      <UserButton afterSignOutUrl="/"/>
      <Link href={"/upload"}>
          <button className='px-4 py-2 bg-primary text-white font-bold mt-6 ml-6'>
            Go to Dashboard page
          </button>
      </Link>
    </div>
  )
}

export default Files
