'use client';
import react, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import logo from '../assests/logo.png';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import {
  setMyNumber,
  setMyString,
  setvalue,
  setMybuisnessname,
  setProfileId,
} from '@/store';
import { usePrivy } from '@privy-io/react-auth';
import { getBalance } from '@/utils/getbalance';
import { isAddress } from 'ethers';
import Waitlist from '@/components/waitlist';
import Steps from '@/components/steps';
import Ready from '@/components/ready';
import Footer from '@/components/footer';
import { getBasename } from './basename/getbasename';
import Modal from 'react-modal'
import baselogo from "../assests/baselogo.png"
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io"
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

export default function Home() {
  
 
  const [usdcBalance, setUsdcBalance] = useState(null);
  const [step, Setstep] = useState('');
  const [trackadd, settrackadd] = useState(null);
  const [bal, setbal] = useState(0);
  const [basename, setbasename] = useState('');
  const [usdcAmount, setUsdcAmount] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [loader, setloader] = useState(false);
  const [loader2, setloader2] = useState(false);
  const [buiss, setbuiss] = useState('');
  const [prof, setprof] = useState('');

  const {
    login,
    isLoggedIn,
    user,
    privy,
    ready,
    authenticated,
    logout,
    connectWallet,
  
  
  } = usePrivy();
  const Navigate = useRouter();
  const Dispatch = useDispatch();

 


  useEffect(() => {
    const appElement = document.getElementById('__next');
    if (appElement) {
      Modal.setAppElement(appElement);
    }
    if (ready && authenticated && user) {
      setloader2(true)
      getWalletNetworkAndChainId();  
      {
        console.log('User is logged in:', user.wallet);
        console.log(user.wallet?.chainType);
      }
    }
  }, [ready, authenticated, user,step]);

  useEffect(() => {
    if (trackadd !== null && usdcBalance !== null) {
      move();
    }
  }, [trackadd, usdcBalance]);

  useEffect(() => {
    Dispatch(setMybuisnessname(buiss))
    Dispatch(setProfileId(prof));
  }, [buiss,prof]);


  const fetchprofile = async () => {
    fetch(
      ` https://stableflow.onrender.com/profile?walletAddress=${user.wallet.address}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        if (!response) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          if (data.statusCode == 200) {
            console.log('The value exists:', data);
            const res = data.statusCode;
            console.log(res);
            const bizname = data.data.businessName;
            setbuiss(data.data.businessName)
            console.log(bizname)
            setprof(data.data._id)
            console.log(data.data);
            move();
          } else move2();
        } else {
          move2();
          if (data.statusCode === 404) {
            move2();
          }
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  function move2() {
    Navigate.push('/Authenticated');
  }

  function move() {
    Navigate.push('/Dashboard');
  }
  function back() {
    Navigate.push('/');
  }
  const handleAuthClick = async (email) => {
    if (!isLoggedIn) {
      try {
        await login({ email });
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    } else {
      console.log('User is already logged in.');
    }
  };

  const fetchEthToUsdcPrice = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,usd-coin&vs_currencies=usd'
      );
      const data = await response.json();
      const ethPrice = data.ethereum.usd;
      const usdcPrice = data['usd-coin'].usd;
      console.log(ethPrice);
      console.log(usdcPrice);
      const ethToUsdcConversionRate = ethPrice / usdcPrice;
      setConversionRate(ethToUsdcConversionRate);
      console.log(ethToUsdcConversionRate);
      const weiBalance = await getBalance(user.wallet.address);
      const figg = weiBalance.ether;
      const num = parseFloat(figg);
      console.log(num);
      const equivalentUsdc = num * ethToUsdcConversionRate;
      const fina = equivalentUsdc.toFixed(6);
      const final = parseFloat(fina);
      setbal(final);
      setUsdcBalance(final);
      settrackadd(user.wallet.address);
      Dispatch(setMyNumber(final));
      Dispatch(setMyString(user.wallet.address));
      Dispatch(setvalue(user.wallet.walletClientType));
      
      console.log(bal);
    } catch (error) {
      console.error('Error fetching ETH to USDC price:', error);
    }
  };
  const getWalletNetworkAndChainId = async () => {
    try {
      if (
        user.wallet.walletClientType === 'privy' ||
        user.wallet.chainId === 'eip155:8453'
      ) {
       fetchbase()
if (step === 'yes' || user.wallet.walletClientType === 'privy') {
  fetchEthToUsdcPrice();
  fetchprofile();

}else if(step==='no')  {
  openm()
}
      } else {
        alert(
          'This wallet is not connected to the Base network. Please switch to it.'
        );
        await logout();
        back();
        return;
      }
    } catch (error) {
      console.error('Error getting network and chain ID:', error);
      return null;
    }
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  function handlecontinue() {
    setloader(true)
    fetchEthToUsdcPrice();
    fetchprofile();
 
  }
  const fetchbase = async () => {
    try {
      const basename5 = await getBasename(user.wallet.address);
        const val = basename5.name;
        if (val.length) {
          setbasename(val);
          console.log(val);
          console.log(basename5);
          console.log(basename)
          Setstep('yes')
          console.log(step)
        } else {
          setbasename('')
          Setstep('no')
          console.log(step)
        }
       
      }
     catch (error) {
      Setstep('no')
      console.error(error); // Handle any errors
    }
  };
  function openm() {
      setModalIsOpen(true)
   }
   function redirectt() {
    fetchEthToUsdcPrice();
    fetchprofile();
 }
 
  return (
    <div className='flex flex-col gap-[6.5rem] lg:gap-[5rem] overflow-hidden py-[1rem] px-[0.2rem]'>
      {console.log(usdcAmount)}
      {console.log(bal)}
      {console.log(step)}
      {
          loader2 === true ?  <div className='flex items-center justify-center absolute left-[45%] top-[30%] ' >
          <ClipLoader
          color='blue'
          size={100}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      </div>
       : ''}
      <Modal
              isOpen={modalIsOpen}
              onRequestClose={''}
              contentLabel='Example Modal'
              shouldCloseOnOverlayClick={false} 
              style={{
                content: {
                  top: '49%',
                  left: '50%',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '-50%',
                  transform: 'translate(-50%, -50%)',
                },
              }}
            >
              { loader == true ?
               <ClipLoader
               color='blue'
               size={100}
               aria-label='Loading Spinner'
               data-testid='loader'
             />
             :
               <div className='grid  lg:gap-[3rem] gap-[2rem] '>
               <div className='flex flex-row items-center justify-between'>
               <div>

               </div>
               <div className='rounded-[50%] flex items-center w-[30px] h-[30px] justify-center border-[2px] cursor-pointer border-primary1' onClick={handlecontinue}>
               <IoMdClose size={25} color='black' className=" items-center justify-center flex "   />
               </div>
               </div>
               <div className='flex flex-col items-center justify-center gap-[0.5rem] lg:gap-[1.3rem]'>
               <Image 
               src={baselogo}
               alt='baselogo'
               width={60}
               height={60}
               />
               <h3 className='lg:text-[20px] text-[16px] text-primary1 lg:font-[700] font-[500] '>Get a base name</h3>
               <h3 className='lg:text-[16px] text-[14px] text-primary2 lg:font-[500] font-[400] text-center '>Do you have a base name connected to<br></br> your external wallet? Lets help you.</h3>
               </div>
              
               <a href='https://Base.org' target='_blank'  className='flex items-center justify-center'  onClick={redirectt}>  
               <button
                 className='bg-black border-[2px] border-primary4 lg:w-[250px]  w-[150px]  flex  gap-[0.5rem] items-center justify-center h-[50px] cursor-pointer  py-2 rounded-2xl text-white'
            
                >
                    <h4 className=' text-white font-[500] lg:text-[17px] text-[14px]'> Get a base name </h4> 
                </button>
                </a> 
               </div>
               }
            </Modal>
      <div className=' flex flex-row justify-between items-center mt-[0rem] lg:mt-[1rem] mx-[0.5rem] lg:mx-[3rem]'>
        <div className='flex items-center justify-center  '>
          <Image
            src={logo}
            width={200}
            height={200}
            alt='model'
            className='lg:w-[200px] w-[130px]'
          />
        </div>
        <button
          type='submit'
          onClick={handleAuthClick}
          className={
            'lg:w-[180px] border-[1px] hover:bg-transparent hover:border-primary4 hover:text-primary4 w-[100px] h-[45px] lg:h-[55px] duration-500 rounded-3xl bg-primary5  cursor-pointer text-white text-[13px] lg:text-[17px] font-[500]'
          }
        >
          Get Started
        </button>
      </div>
      <Waitlist />
      <Steps />
      {/* <Ready /> */}
      <Footer />
    </div>
  );
}
