import React from 'react'
import Image from "next/image";
import logo from "../app/assests/logo.png"
import { FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
const Footer = () => {
  return (
    <div className='flex flex-col lg:px-[4rem] gap-[3rem]'>
         <div className='flex lg:flex-row flex-col items-center justify-center gap-[3rem] lg:justify-between '>
       <Image src={logo} width={150} height={100} alt='logo' />
       <div className='flex items-center justify-center gap-[1.5rem]'>
       <BsTwitterX  size={25} className='text-[#27272A] cursor-pointer' />
       <FaInstagram  size={25} className='text-[#27272A] cursor-pointer' />
       <FaGithub  size={25} className='text-[#27272A] cursor-pointer' />
       <TiSocialFacebook size={25} className='text-[#27272A] cursor-pointer' />
       </div>
       </div>
       <div className='flex lg:flex-row flex-col items-center justify-center gap-[3rem] lg:justify-between'>
       <h3 className='text-[14px] font-[400] text-[#535353]'> © Copyright 2022, All Rights Reserved</h3>
       <div className='flex flex-row items-center justify-center gap-[1rem]'>
       <h3 className='text-[14px] font-[400] text-[#535353]'> Privacy Policy </h3>
       <h3 className='text-[14px] font-[400] text-[#535353]'> Terms & Conditions </h3>
       </div>
       </div>
    </div>
  )
}

export default Footer
