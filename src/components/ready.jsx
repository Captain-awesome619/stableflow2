import React from 'react'
import Image from 'next/image';
import step from "../app/assests/Maskgroup.png"
const Ready = () => {
  return (
    <div className=' flex flex-col lg:flex-row justify-center lg:gap-[8rem] gap-[1rem] items-center'>
       <div className='lg:grid flex flex-col justify-center items-center gap-[1rem]'>
      <div className='lg:grid flex-col flex items-center justify-center gap-[1rem] '>
    <h1 className=' text-primary1 text-[25px] lg:text-[40px] font-[700]'>Ready to Transform Your <br></br> Business Payments?</h1>
    <h1 className='lg:flex hidden  text-primary1 text-[16px] lg:text-[18px] font-[400]'>Accept USDC payments easily, track sales effortlessly, and grow <br></br> your local business.</h1>
    <h1 className='flex lg:hidden text-center text-primary1 text-[16px] lg:text-[18px] font-[400]'>Accept USDC payments easily, track sales effortlessly, and grow  your local business.</h1>
    </div>
    <div className='flex flex-row gap-[1rem] lg:gap-[3rem]'>
    <input 
    placeholder='Email Address'
    className='w-[180px] h-[20px] lg:w-[250px] pl-[0.5rem] lg:h-[50px] appearance-none outline-none'
    />
    <button type="submit"   className= "lg:w-[180px] border-[1px] hover:bg-transparent hover:border-primary4 hover:text-primary4 w-[140px] h-[45px] lg:h-[55px] duration-500 rounded-3xl bg-primary5  cursor-pointer text-white text-[13px] lg:text-[17px] font-[500]">Get Early Acess</button>
    </div>
    </div> 

    <Image src={step} 
    width={300} 
    height={300} alt="Three Steps Image" className="lg:w-[300px] lg:h-[250px] w-[200px] h-[200px] " />
    </div>
  )
}

export default Ready