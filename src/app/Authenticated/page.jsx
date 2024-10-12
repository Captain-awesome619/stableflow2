'use client'
import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import whistle from "../assests/whistle.png"
import logo from "../assests/logo.png"
import { useRouter } from 'next/navigation'
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { setMybuisnessname } from '@/store'
const page = () => {
    const Navigate = useRouter()
    const [loading, setLoading] = useState(1);
    const [name, setname] = useState('');
    const Dispatch = useDispatch()

    const myString = useSelector((state) => state.myString);

    function move() {
      Navigate.push('/Dashboard');
    }


    function Forward() {
      setLoading(prevview => prevview + 1)
      }
      function Backward() {
      setLoading(prevview => prevview - 1)
      }

      const handleInputChange = (event) => {
        setname(event.target.value);
      };
      const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
          Dispatch(setMybuisnessname(name)); 
          Forward()
          
      };

  return (
    <div className=' grid items-center justify-center'>
          <div className="flex items-center justify-center mt-[2rem]" >
       <Image
    src = {logo}
    width = {200}
    height = {200}
    alt = "model"
    className=""
    />
    </div>
{loading === 1 ?
    <div  className="relative top-[50%] lg:top-[20%] grid mt-[3rem] w-[200%] gap-[2rem] ">
  <h3 className="text-[20px] font-[700] text-primary1">
       Let's get started!
       </h3>
       <form className='grid gap-[2rem]' onSubmit={handleSubmit}>
    <div className="flex flex-col gap-[1rem]">
    <label className="text-primary1 font-[500] text-[20px]">
    Buisness Name
    </label>
    <input 
     type="text"
     value={name} // Bind the state to the input's value
     onChange={handleInputChange} 
    placeholder='Business Name' className='pl-[0.5rem] h-[60px] lg:w-[100%] w-[85%] border-[2px] rounded-xl border-primary3' />
    </div>
   
    <button
        className='bg-primary5 lg:w-[120%] w-[95%]  flex items-center justify-center h-[50px] cursor-pointer  py-2 rounded-xl text-white'
        type='submit'>
Continue
        </button>
        </form>
     </div> 
: ''}
{ loading === 2 ?
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
    Congratulations, {name}!
    </h3>
    <h3 className="text-primary2 font-[400] text-[16px]">
 You're ready to accept digital dollar payments.
    </h3>
    </div>
    <button
      className='bg-primary5 lg:w-[120%] w-[95%]  flex items-center justify-center h-[50px] cursor-pointer  py-2 rounded-xl text-white'
        disabled={!loading}
        onClick={move}   
        >
Go to Dashboard
        </button>
     </div> 
: ""}
    </div>
  )
}

export default page
