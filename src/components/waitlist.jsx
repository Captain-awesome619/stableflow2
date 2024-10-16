// components/OtpInput.js
"use client"
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BsStars } from "react-icons/bs";
import { GoArrowDown } from "react-icons/go";
const Waitlist = ({forward,verify,mail,isLoggedIn}) => {
  const Navigate = useRouter()
  return (
    <div className='flex flex-col gap-[1.5rem] lg:gap-[2rem] items-center justify-center'>
     <div className=" rounded-xl bg-[#D2E9FF]  " >
     <div className='flex flex-row items-center gap-[0.5rem] justify-center p-[0.5rem]'>
     <BsStars size={20} className='text-primary4' />
     <h3>Be the first to join our Waitlist</h3>
     <GoArrowDown size={20} />
     </div>
    </div>
    <div className='flex flex-col gap-[1rem] items-center justify-center'>
    <h1 className='text-center text-primary1 text-[20px] lg:text-[55px] font-[700]'>Simplify Your Business <br></br> Payments with Digital Dollars</h1>
    <h1 className='lg:flex hidden text-center text-primary1 text-[15px] lg:text-[18px] font-[400]'>Accept USDC payments easily, track sales effortlessly, and grow <br></br> your local business.</h1>
    <h1 className='flex lg:hidden text-center text-primary1 text-[15px] lg:text-[18px] font-[400]'>Accept USDC payments easily, track sales effortlessly, and grow  your local business.</h1>
    </div>
    <div className='flex flex-row justify-center items-center gap-[1rem] lg:gap-[3rem]'>
    <input 
    placeholder='Email Address'
    className='w-[180px] h-[20px] lg:w-[250px] pl-[0.5rem] lg:h-[50px] appearance-none outline-none'
    />
    <button type="submit"   className= "lg:w-[180px] border-[1px] hover:bg-transparent hover:border-primary4 hover:text-primary4 w-[140px] h-[45px] lg:h-[55px] duration-500 rounded-3xl bg-primary5  cursor-pointer text-white text-[13px] lg:text-[17px] font-[500]">Get Early Acess</button>
    </div>
    </div>
  );
};

export default Waitlist;