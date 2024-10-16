'use client'
import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import whistle from "../assests/whistle.png"
import logo from "../assests/logo.png"
import { useRouter } from 'next/navigation'
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { setMybuisnessname } from '@/store'
import ClipLoader from "react-spinners/ClipLoader"
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik'
const Page = () => {
    const Navigate = useRouter()
    const [loading, setLoading] = useState(1);
    const [name, setname] = useState('');
    const [redirect, setredirect] = useState(false);
    const Dispatch = useDispatch()

    const myString = useSelector((state) => state.myString);

    function Move() {
      Navigate.push('/Dashboard');
      setredirect(true)
    }

    const initialValues = {
      myField: '',
    };
  
    const validationSchema = yup.object().shape({
      myField: yup.string()
        .required('This field is required')
    });

    
    function Forward() {
      setLoading(prevview => prevview + 1)
      }

      function Backward() {
      setLoading(prevview => prevview - 1)
      }

      const handleInputChange = (event) => {
        setname(event.target.value);
      };

      const Customhandle = async (event) => {
        event.preventDefault();
        fetch('https://stableflow.onrender.com/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
           walletAddress: myString,
  businessName: name
          }),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Response:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        }); // Prevent default form submission behavior
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
       <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
     validateOnBlur={false}
    >
      {({  isValid  }) => (
       <Form className='grid gap-[2rem]'>
    <div className="flex flex-col gap-[1rem]">
    <label className="text-primary1 font-[500] text-[20px]">
    Business Name
    </label>
    <div>
    <Field
     type="text"
     name="myField"
     value={name} 
     onChange={handleInputChange} 
    placeholder='Business Name' className='pl-[0.5rem] h-[60px] lg:w-[100%] w-[85%] border-[2px] rounded-xl border-primary3' />
    </div>
    { !isValid && (
    <ErrorMessage name="myField" component="div" className="text-red-500" />)}
    </div>
    <button
        className={ name ?'bg-primary5 duration-300 lg:w-[120%] w-[95%]  flex items-center justify-center h-[50px] cursor-pointer  py-2 rounded-xl text-white':' duration-300  bg-primary5 lg:w-[120%] w-[95%]  opacity-[0.2] flex items-center justify-center h-[50px] cursor-not-allowed  py-2 rounded-xl text-white'}
        type='submit'
        disabled={!name}
        onClick={Customhandle}
        >
Continue
        </button>
        </Form>
        )}
        </Formik>
     </div> 

: ''}
{ loading === 2 ?
       <div >
       { redirect === true ?
        <ClipLoader
        color="blue"
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        className='absolute top-[35%] left-[45%] '
      />
     : ''  }
     <div  className={ redirect === true ? 'opacity-[0.2] flex flex-col gap-[2rem] mt-[4rem] items-center justify-center' :"flex flex-col gap-[2rem] mt-[4rem] items-center justify-center"}>
    <Image
    src = {whistle}
    width = {150}
    height = {150}
    alt = "model"
    className=" "
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
        onClick={Move}   
        >
Go to Dashboard
        </button>
        </div>
     </div> 
: ""}
    </div>
  )
}

export default Page
