import React from 'react'
import Image from 'next/image';
import step from "../assests/guide.png"
import phone1 from "../assests/phone1.png"
import phone2 from "../assests/phone2.png"
import phone3 from "../assests/phone3.png"
const Steps = () => {
  return (
    <div className="overflow-hidden flex flex-col items-center mb-[1rem]">
<div className='bg-[#D2E9FF] flex items-center justify-center' >
  <h1 className="flex  justify-center pt-[1rem] text-[18px] lg:text-[45px] text-center h-[200px] lg:h-[400px] w-screen font-[700] text-primary1">Three Steps to Run <br></br> Your Business Finances Easily.</h1>
  </div>
  <div className="lg:flex hidden lg:mt-[-200px] mt-[-100px]">
    <Image src={step} width={1000} height={1000} alt="Three Steps Image" className=" lg:w-[1000px] lg:h-[500px] w-[430px] h-[200px] " />
  </div>
  <div className='lg:hidden flex flex-col gap-[1.5rem] m-[-100px] items-center justify-center'>
  <Image src={phone3} width={300} height={200} alt="Three Steps Image" className=" " />
  <Image src={phone2} width={300} height={200} alt="Three Steps Image" className=" " />
  <Image src={phone1} width={300} height={200} alt="Three Steps Image" className=" " />

    </div> 
</div>

  )
}

export default Steps
