"use client"
import react,{useState,useEffect} from "react";
import { useRouter } from "next/navigation";
import logo from "../app/assests/logo.png"
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setMyNumber,setMyString,setvalue } from "@/store";
import { usePrivy } from "@privy-io/react-auth";
import {  Contract,formatUnits,JsonRpcProvider } from 'ethers';

const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; 
const USDC_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function transfer(address to, uint256 amount) returns (bool)"
];

export default function Home() {
  const [usdcBalance, setUsdcBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step,Setstep] = useState(1)
  const [hasFetchedBalance, setHasFetchedBalance] = useState(false); 
  const [trackadd, settrackadd] = useState(null);
  const [shouldnav, setshouldnav] = useState(false); 
  const myNum = useSelector((state) => state.myNumber)
 const { login, verify, isLoggedIn,  user, privy,ready, authenticated,updateUser } = usePrivy();
    const Navigate  = useRouter()
    const Dispatch = useDispatch()

  useEffect(() => {
  if (ready && authenticated && user && !hasFetchedBalance)  {
    fetchUSDCBalance();
  
   { console.log('User is logged in:', user);
    console.log(user.wallet?.address)}
    }
}, [ready,authenticated,]);


useEffect(() => {
    if (trackadd !== null && usdcBalance !== null ) {
    move()
  }
}, [trackadd,usdcBalance]);


function move() {
  Navigate.push('/Authenticated');
}
    const handleAuthClick = async (email) => {
      if (!isLoggedIn) {
        try {
           await login({ email });
          if (user) {
            if (privy) {
             
              const existingWallet = user.wallet; 
              console.log('Existing Wallet:', existingWallet);
              if (existingWallet) {
             
                console.log('User already has a wallet:', existingWallet);
              } else {
               
                console.log('New wallet created for user.'); 
            
              }
            } else {
              console.error('error')
            }
          } else {
            console.error('User object is not defined.');
          }
        } catch (error) {
          console.error('Error during authentication:', error);
        }
      } else {
        console.log('User is already logged in.');
      }
    };
    

  const fetchUSDCBalance = async () => {
    if (user && user.wallet && user.wallet.address) {
      const walletAddress = user.wallet.address; 
      Dispatch(setMyString(walletAddress)); 
      settrackadd(walletAddress)
      try {
       
        const provider = new JsonRpcProvider("https://mainnet.infura.io/v3/3de3ca6613154c39ae2e5537c63301ae"); 
       
        const contract = new Contract(USDC_ADDRESS, USDC_ABI, provider);
       
        const balance = await contract.balanceOf(walletAddress);
      
        const formattedBalance = formatUnits(balance, 6); 
        setUsdcBalance(formattedBalance); 
        Dispatch(setMyNumber(formattedBalance));
        Dispatch(setvalue(usdcBalance+.0)); 
      } catch (error) {
        console.error('Error fetching USDC balance:', error);
      } finally {
        setLoading(false);
       
      }
    }
  };

  return (
    <div className="" >
    {console.log(usdcBalance)}
   
       <div className="flex items-center justify-center mt-[2rem]" >
       <Image
    src = {logo}
    width = {200}
    height = {200}
    alt = "model"
    className=""
    />
    </div>
    { step === 1 ?
    <div className=" flex flex-col items-center  gap-[2.7rem] justify-center mx-[1rem] lg:mx-0  mt-[50%] lg:mt-[7rem] ">
       <h3 className="text-[20px] font-[700] text-primary1">
       Let's get started!
       </h3>
       <button type="submit" onClick={handleAuthClick}  className={ "lg:w-[30%] w-[100%] h-[55px] duration-500 rounded-3xl bg-primary5  cursor-pointer text-white text-[17px] font-[500]"}>Sign in</button>
       </div>
: ""}

    </div>
  );
}
