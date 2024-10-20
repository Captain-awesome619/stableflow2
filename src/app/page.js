'use client';
import react, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import logo from '../app/assests/logo.png';
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
export default function Home() {
  const [usdcBalance, setUsdcBalance] = useState(null);
  const [step, Setstep] = useState(1);
  const [hasFetchedBalance, setHasFetchedBalance] = useState(false);
  const [trackadd, settrackadd] = useState(null);
  const [bal, setbal] = useState(0);
  const [accept, setaccept] = useState(false);
  const [usdcAmount, setUsdcAmount] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);

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
    if (ready && authenticated && user) {
      getWalletNetworkAndChainId();
      {
        console.log('User is logged in:', user.wallet);
        console.log(user.wallet?.chainType);
      }
    }
  }, [ready, authenticated, user]);

  useEffect(() => {
    if (trackadd !== null && usdcBalance !== null) {
      move();
    }
  }, [trackadd, usdcBalance]);

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
            Dispatch(setProfileId(data.data._id));
            Dispatch(setMybuisnessname(bizname));
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
      if (!isAddress(user.wallet.address)) {
        throw new Error('Invalid wallet address');
      }
      if (
        user.wallet.walletClientType === 'privy' ||
        user.wallet.chainId === 'eip155:8453'
      ) {
        fetchEthToUsdcPrice();
        fetchprofile();
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

  return (
    <div className='flex flex-col gap-[6.5rem] lg:gap-[5rem] overflow-hidden py-[1rem] px-[0.2rem]'>
      {console.log(usdcAmount)}
      {console.log(bal)}
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
      <Ready />
      <Footer />
    </div>
  );
}
