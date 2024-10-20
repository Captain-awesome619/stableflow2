"use client"
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {useFundWallet} from '@privy-io/react-auth';
import { base } from "viem/chains";
import { useState } from "react";
import logo from "../../assests/logo.png"
import Image from "next/image";
export default  function PayPage() {
  // Destructure the dynamic route parameter from the params object
  const [amount, setAmount] = useState('');
  const [address, setddress] = useState('');
  const [currency, setcurrency] = useState('');
  const [customername, setcustomer] = useState('');
  const [amount2, setamount2] = useState('');
  const [descript, setdescript] = useState('');
  const router = useRouter();
  const {} = router; 
  // Fetch data from an external API using the businessName as a query parameter
  const searchparams = useSearchParams()
  const id = searchparams.get('paymentid')
  // For demonstration purposes, we assume we're getting plain text (e.g., from a Google search)
  const Fetchpayment = async (id) =>{
    const response = await fetch(`https://stableflow.onrender.com/payment/${id}`, {
      method: 'GET', 
    });
    const data = await response.json()
    console.log(data)
    setddress(data.data.profile.walletAddress)
    setcurrency(data.data.currency)
    setAmount(data.data.amountInUsdc)
    setamount2(data.data.amountInNGN)
    setcustomer(data.data.customerName)
    setdescript(data.data.description)
  }

  useEffect(() => {
    Fetchpayment(id);
  }, [id]);

  const {fundWallet} = useFundWallet();
  

  const findwallet = async () =>{
    await fundWallet(address, 
      {
        chain: base,
        amount: amount,
        asset : currency 
      }
    );
  }

  return (
    <div className="flex items-center justify-center flex-col lg:gap-[3rem] gap-[2rem] mt-[2rem] ">
<div>
    <Image src={logo} 
    width={200} 
    height={200} alt="Three Steps Image" className=" " />
</div>
      <div className="grid gap-[2rem] ">
     
      <div className="flex items-center gap-[1rem] justify-center">
      <h3 className="text-[18px] font-[700] text-primary1">
Customer name :
      </h3>
      <h3 className=" text-[16px] text-primary2 font-[700]">
{customername}
      </h3>
      </div>
      <div className="flex items-center gap-[1rem] justify-center">
      <h3 className="text-[18px] font-[700] text-primary1">
Description :
      </h3>
      <h3 className=" text-[16px] text-primary2 font-[700]">
{descript}
      </h3>
      </div>
      <div className="flex items-center gap-[1rem] justify-center">
      <h3 className="text-[18px] font-[700] text-primary1">
Amount in USDC :
      </h3>
      <h3 className=" text-[16px] text-primary2 font-[700]">
{amount}USDC
      </h3>
      </div>
      <div className="flex items-center gap-[1rem] justify-center">
      <h3 className="text-[18px] font-[700] text-primary1">
Amount in Naira :
      </h3>
      <h3 className=" text-[16px] text-primary2 font-[700]">
N{amount2}
      </h3>
      </div>
        </div>

      <button
              type='submit'
              className={
                'cursor-pointer px-4 py-3 bg-primary5 text-white rounded-2xl lg:w-[300px] w-[200px]'
              }
              onClick={findwallet}>
              Proceed to Pay
            </button>
    </div>
  );
}
