"use client"
import react,{useState,useEffect} from "react";
import { useRouter } from "next/navigation";
import logo from "../app/assests/logo.png"
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setMyNumber,setMyString } from "@/store";
import { usePrivy } from "@privy-io/react-auth";
import { initializeMoralis } from "@/utils/moralisss";
import { getBalance } from "@/utils/getbalance";

export default function Home() {
  const [usdcBalance, setUsdcBalance] = useState(null);
  const [step,Setstep] = useState(1)
  const [hasFetchedBalance, setHasFetchedBalance] = useState(false); 
  const [trackadd, settrackadd] = useState(null);
  const [bal, setbal] = useState(0); 
  const [usdcAmount, setUsdcAmount] = useState(0); 
  const [conversionRate, setConversionRate] = useState(0);

 const { login,  isLoggedIn,  user, privy,ready, authenticated } = usePrivy();
    const Navigate  = useRouter()
    const Dispatch = useDispatch()

  useEffect(() => {
  if (ready && authenticated && user && !hasFetchedBalance)  {
    fetchEthToUsdcPrice()
    settrackadd(user.wallet.address)
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

    const fetchEthToUsdcPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,usd-coin&vs_currencies=usd"
        );
        const data = await response.json();
        const ethPrice = data.ethereum.usd; 
        const usdcPrice = data["usd-coin"].usd; 
        console.log(ethPrice)
        console.log(usdcPrice)
        const ethToUsdcConversionRate = ethPrice / usdcPrice;
        setConversionRate(ethToUsdcConversionRate);
        console.log(ethToUsdcConversionRate)
        await initializeMoralis();
        const weiBalance = await getBalance(user.wallet.address);
        const figg = weiBalance.ether
        const num = parseFloat(figg)
        console.log(num)
        const equivalentUsdc = num * ethToUsdcConversionRate;
        const fina = equivalentUsdc.toFixed(6)
const final = parseFloat(fina)
        setbal(final)
        setUsdcBalance(final)
        Dispatch(setMyNumber(final))
        Dispatch(setMyString(user.wallet.address))
        console.log(bal)
      } catch (error) {
        console.error("Error fetching ETH to USDC price:", error);
      }
    };
  return (
    <div className="" >
   {console.log(usdcAmount)}
   {console.log(bal)}
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
