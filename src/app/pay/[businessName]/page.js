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
    <div className="flex items-center justify-center flex-col  ">
    <Image src={logo} 
    width={300} 
    height={300} alt="Three Steps Image" className="lg:w-[300px] lg:h-[250px] w-[200px] h-[200px] " />
      <p>Fetched Data:</p>
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
