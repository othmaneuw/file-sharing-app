"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function TopHeader() {
  const {user} = useUser();
  return (
    <div className='flex p-5 border-b items-center justify-between md:justify-end'>
      <AlignJustify className='md:hidden' />
      <Image src={"/logo.svg"} width={50} height={50} className='md:hidden' />
      <h2 className='mr-5'>Hello {user?.fullName} </h2>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default TopHeader
