'use client'
import React from 'react'
import Image from 'next/image'
import whistle from "../assests/whistle.png"
import logo from "../assests/logo.png"
import { useRouter } from 'next/navigation'
const page = () => {
    const Navigate = useRouter()
  return (
    <div>
          <div className="flex items-center justify-center mt-[2rem]" >
       <Image
    src = {logo}
    width = {200}
    height = {200}
    alt = "model"
    className=""
    />
    </div>
       <div  className="flex flex-col gap-[2rem] mt-[4rem] items-center justify-center">
    <Image
    src = {whistle}
    width = {150}
    height = {150}
    alt = "model"
    className=""
    />
    <div className="flex flex-col text-center">
    <h3 className="text-primary1 font-[500] text-[20px]">
      YAYYY!!!!!
    </h3>
    <h3 className="text-primary2 font-[400] text-[16px]">
    Welcome onboard blah blah blah gm gm gm blahhhhhh
    </h3>
    </div>
    <button
        className='bg-primary5 cursor-pointer px-4 py-2 rounded-md text-white'
        onClick={Navigate.push('/Dashboard')}
        >
Go to Dashboard
        </button>
     </div> 

    </div>
  )
}

export default page
