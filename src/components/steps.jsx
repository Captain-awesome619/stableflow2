import React from 'react'
import Image from 'next/image';
import step from "../app/assests/guide.png"
const Steps = () => {
  return (
    <div className="overflow-hidden flex flex-col items-center mb-[1rem]">
<div className='bg-[#D2E9FF] flex items-center justify-center' >
  <h1 className="flex  justify-center pt-[1rem] text-[px] lg:text-[45px] text-center h-[200px] lg:h-[400px] w-screen font-[700] text-primary1">Three Steps to Run <br></br> Your Business Finances Easily.</h1>
  </div>
  <div className=" lg:mt-[-200px] mt-[-100px]">
    <Image src={step} width={1000} height={1000} alt="Three Steps Image" className=" lg:w-[1000px] lg:h-[500px] w-[350px] h-[200px] " />
  </div>
</div>

  )
}

export default Steps
