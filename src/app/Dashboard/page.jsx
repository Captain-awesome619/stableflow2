"use client"
import { useSelector } from "react-redux";
import React ,{ useState, useEffect } from "react";
import { GiCoinsPile, GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import dash from '../assests/document.png'
import setting from '../assests/setting-2.png'
import third from '../assests/receipt-item.png'
import fourth from '../assests/element-1.png'
import logo from '../assests/logo.png'
import { IoMdClose } from "react-icons/io";
import {  Contract,formatUnits,JsonRpcProvider,InfuraProvider,isAddress,parseUnits,Interface } from 'ethers';
import { FaNairaSign } from "react-icons/fa6";
import rate from "../assests/rate.png"
import DataTable from "@/components/table";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useRouter } from 'next/navigation';
import * as Yup from "yup";
import { Formik,Field,Form,ErrorMessage } from "formik"
import { useSendTransaction } from "@privy-io/react-auth";
import { initializeMoralis } from "@/utils/moralisss";
import { getBalance } from "@/utils/getbalance";
import { useDispatch } from "react-redux";
import { setMyNumber } from "@/store";
import { abi } from "@/utils/usdcabi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getBasename } from "../basename/getbasename";
import { getBasenameAvatar } from "../basename/getbasename";
const WalletInfo = () => { 
  const validationSchema = Yup.object().shape({
    recipient: Yup.string().required("Recipient address is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be greater than zero"),
  });
  const Dispatch = useDispatch()

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
      console.log(ethToUsdcConversionRate)
      const weiBalance = await getBalance(myString);
      const figg = weiBalance.ether
      const num = parseFloat(figg)
      console.log(num)
      const equivalentUsdc = num * ethToUsdcConversionRate;
      const fina = equivalentUsdc.toFixed(6)
const final = parseFloat(fina)
      Dispatch(setMyNumber(final))
      console.log(final)
    } catch (error) {
      console.error("Error fetching ETH to USDC price:", error);
    }
  };
  const bizname = useSelector((state) => state.businessname)
  const myString = useSelector((state) => state.myString);
  const myNum = useSelector((state) => state.myNumber)
  const client = useSelector((state) => state.value)
  const [selectedOption, setSelectedOption] = useState('dashboard'); // Default selection
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility state
  const [baseName, setBaseName] = useState('');
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState('');
  const [conversionRate, setConversionRate] = useState(null);
  const [nairaAmount, setNairaAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const {logout} = usePrivy()
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsSidebarOpen(false); // Close the sidebar after selection
  };
  const Navigate = useRouter()
  const handleLogout = async () => {
    await logout();
Navigate.push('/')
  };
const provider = new JsonRpcProvider("https://mainnet.infura.io/v3/3de3ca6613154c39ae2e5537c63301ae"); // You can use any Ethereum node provider

const fetchbase = async () => {
  try{
    const address = myString 
    const basename2 = await getBasename(address)
   const val = basename2.name
   setBaseName(val)
    console.log(val)
    console.log(basename2)
  }catch (error) {
    console.error(error); // Handle any errors
}
}
  useEffect(() => {
    fetchbase()
  }, []);

  const fetchConversionRate = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=ngn');
      const data = await response.json();
      const rate = data['usd-coin'].ngn;
      setConversionRate(rate);
    } catch (error) {
      console.error('Error fetching conversion rate:', error);
    }
  };


  useEffect(() => {
    fetchEthToUsdcPrice()
    fetchConversionRate();
    const intervalId = setInterval(fetchConversionRate, 100000);
   // Fetch rate every minute
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [myNum]);

  useEffect(() => {
    if (conversionRate) {
      setNairaAmount((myNum * conversionRate).toFixed(2));
    }
  }, [myNum, conversionRate]);

  const handleSubmit = async () => {
    setSelectedOption('confirm')
  };

  const { wallets} = useWallets()
  const { user } = usePrivy();
  const { sendTransaction } = useSendTransaction({
    callbacks: {
      onError: (error) => {
        console.error('Transaction failed:', error);
      },
      onSuccess: (response) => {
        console.log('Transaction successful:', response);
      },
    },
  });

  const erc20ABI = [
    "function transfer(address to, uint256 amount) external returns (bool)"
  ];
 
  const sendUSDC = async ( ) => {
   
    const usdcContractAddress = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // Replace with your USDC contract address
    const decimals = 6; // USDC uses 6 decimal places
    const parsedAmount = parseUnits(amount.toString(), decimals);
  console.log(parsedAmount)
    // Encoding the function call with ethers.js
    const iface = new Interface(erc20ABI);
    const data = iface.encodeFunctionData("transfer", [recipient, parsedAmount],);
  console.log(recipient)
  console.log(parsedAmount)
    try {
      const tx = await sendTransaction({
      
        to: usdcContractAddress,
        data: data,
        value: "0x0", // No native token being sent, only the ERC-20 transfer
        gasLimit: 100000,
      });
      console.log("Transaction receipt:", tx);
    } catch (error) {
      console.error("Error sending USDC:", error);
    }
  };
  const settings = {
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 7000,

  };
  
  return (
    <div className="lg:flex overflow-x-hidden">
      {/* Button to toggle sidebar on small screens */}
      {console.log(user)}
      {console.log(amount)}
      {console.log(recipient)}
      <button 
        className="md:hidden p-2 text-white bg-gray-800 absolute top-3 left-1 z-30"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <IoMdClose size={15} /> : <GiHamburgerMenu size={15} />}
      </button>

      {/* Sidebar */}
      <div 
        className={`bg-white z-20 text-primary1 grid w-64 min-h-screen lg:relative absolute p-4 transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block md:w-64`}
      >
        <ul className="flex flex-col mt-[3rem] gap-[2rem]  lg:gap-[3rem] lg:mt-[1rem]">
        <Image
    src = {logo}
    width = {200}
    height = {200}
    alt = "model"
    className=" lg:mb-[1rem]"
    />
          <li 
            onClick={() => handleOptionSelect('dashboard')} 
            className={`cursor-pointer flex gap-[0.5rem] text-primary1 p-2 rounded ${
              selectedOption === 'dashboard' ? 'text-primary1' : ''
            }`}
          >
 <Image
    src = {dash}
    width = {20}
    height = {20}
    alt = "model"
    />
            <div className={  selectedOption === 'dashboard' ? 'text-primary1 text-[17px] duration-500' : "text-primary3 duration-500 text-[14px] font-[500]"}>
            Dashboard
            </div> 
          </li>
          <li 
            onClick={() => handleOptionSelect('invoices')} 
            className={`cursor-pointer flex gap-[0.5rem] text-primary1 p-2 rounded ${
              selectedOption === 'dashboard' ? 'text-primary1' : ''
            }`}
          >
 <Image
    src = {third}
    width = {20}
    height = {20}
    alt = "model"
    />
            <div className={  selectedOption === 'invoices' ? 'text-primary1 text-[17px] duration-500' : "text-primary3 duration-500 text-[14px] font-[500]"}>
            Invoices
            </div> 
          </li>
          <li 
            onClick={() => handleOptionSelect('transactions')} 
            className={`cursor-pointer flex gap-[0.5rem] text-primary1 p-2 rounded ${
              selectedOption === 'transactions' ? 'text-primary1' : ''
            }`}
          >
 <Image
    src = {fourth}
    width = {20}
    height = {20}
    alt = "model"
    />
            <div className={  selectedOption === 'transactions' ? 'text-primary1 text-[17px] duration-500' : "text-primary3 duration-500 text-[14px] font-[500]"}>
            Transactions
            </div> 
          </li>
          <li 
            onClick={() => handleOptionSelect('settings')} 
            className={`cursor-pointer flex gap-[0.5rem] text-primary1 p-2 rounded ${
              selectedOption === 'settings' ? 'text-primary1' : ''
            }`}
          >
 <Image
    src = {setting}
    width = {20}
    height = {20}
    alt = "model"
    />
            <div className={  selectedOption === 'settings' ? 'text-primary1 text-[17px] duration-500' : "text-primary3 duration-500 text-[14px] font-[500]"}>
            Settings
            </div> 
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="lg:flex-1 p-4 ">
        <div className="border-b  border-gray-300 mb-4">
          <h1 className="lg:left-[60%] left-[20%] relative text-[14px] lg:text-[14px] font-[400] mt-[0.5rem] text-primary3"> 
            {baseName? baseName   : myString }</h1>
        </div>
        <div className="p-4 lg:grid">
          {selectedOption === 'dashboard' && (
            <div className="lg:grid    gap-[2rem] lg:gap-[4rem]">
              
            <h2 className="text-xl lg:pb-[0rem] pb-[3rem]">Hi {bizname} </h2>

              <div className="lg:flex hidden lg:flex-row flex-col gap-[1rem]">
              <div className="flex flex-col  gap-[1rem] items-center justify-center" >
              <div className="w-full h-[100px] lg:w-[500px] lg:h-[200px] bg-primary1 border-[2px] rounded-lg flex items-center justify-center">
              <div className="flex flex-col items-center justify-center"> 
              <h2 className="text-white text-[14px]">Total Balance</h2>
              <div className="flex flex-row items-center justify-center gap-[0.2rem]">
              <FaNairaSign size={20} color="white" />
              <h2 className="text-white font-[600] text-[25px]">{nairaAmount}</h2>
              </div>
              </div>
              </div>
              <button
        className='bg-white border-[2px] border-primary3 lg:w-[80%] px-[0.5rem] lg:px-[0] flex items-center justify-center lg:h-[50px] cursor-pointer  py-2 rounded-xl text-primary1'
        >
Generate Invoice
        </button>
              </div>

              <div className="flex flex-col gap-[1rem] items-center justify-center" >
              <div className="w-full h-[100px] lg:w-[500px] lg:h-[200px] bg-primary4 border-[2px] rounded-lg flex items-center justify-center">
              <div className="flex flex-col items-center justify-center"> 
              <h2 className="text-white text-[14px]">Total Balance</h2>
              <div className="flex flex-row items-center justify-center gap-[0.2rem]">
              <h2 className="text-white font-[600] text-[25px]">{myNum}USDC</h2>
              </div>
              </div>
              </div>
              <button
        className='bg-white border-[2px] border-primary3 lg:w-[90%] px-[1rem]  flex items-center justify-center lg:h-[50px] cursor-pointer  py-2 rounded-xl text-primary1'
        onClick={() => handleOptionSelect('withdraw')} 
       >
Withdraw
        </button>
              </div>
              </div>
              <div className="lg:hidden pb-[3rem]">
              <Slider {...settings}>
              <div className="flex flex-col  gap-[1rem] items-center justify-center" >
              <div className="w-[85%] h-[100px] lg:w-[500px] lg:h-[200px] bg-primary1 border-[2px] rounded-lg flex items-center justify-center">
              <div className="flex flex-col items-center justify-center"> 
              <h2 className="text-white text-[14px]">Total Balance</h2>
              <div className="flex flex-row items-center justify-center gap-[0.2rem]">
              <FaNairaSign size={20} color="white" />
              <h2 className="text-white font-[600] text-[25px]">{nairaAmount}</h2>
              </div>
              </div>
              </div>
              </div>

              <div className="flex flex-col gap-[1rem] items-center justify-center" >
              <div className="w-[85%] h-[100px] lg:w-[500px] lg:h-[200px] bg-primary4 border-[2px] rounded-lg flex items-center justify-center">
              <div className="flex flex-col items-center justify-center"> 
              <h2 className="text-white text-[14px]">Total Balance</h2>
              <div className="flex flex-row items-center justify-center gap-[0.2rem]">
              <h2 className="text-white font-[600] text-[25px]">{myNum}USDC</h2>
              </div>
              </div>
              </div>
              </div>
              </Slider>
              </div>
              <div className="flex flex-row items-center justify-center gap-[1rem] pb-[3rem] lg:hidden">
              <button
        className='bg-white border-[2px] border-primary3 w-[150px]  flex items-center justify-center h-[50px] cursor-pointer  py-2 rounded-xl text-primary1'
        >
Generate Invoice
        </button>

        <button
        className='bg-white border-[2px] border-primary3  w-[150px]  flex items-center justify-center h-[50px] cursor-pointer  py-2 rounded-xl text-primary1'
        onClick={() => handleOptionSelect('withdraw')} 
       >
Withdraw
        </button>
                 </div>
              <div className="grid grid-cols-2 pb-[3rem] lg:pb-[0rem] gap-[0.5rem] lg:grid-cols-5"> 
              <Image 
              src={rate}
              height={200}
              width={200}
              alt="rates"
              />
              <Image 
              src={rate}
              height={200}
              width={200}
              alt="rates"
              />
              <Image 
              src={rate}
              height={200}
              width={200}
              alt="rates"
              />

              <Image 
              src={rate}
              height={200}
              width={200}
              alt="rates"
              />
              <Image 
              src={rate}
              height={200}
              width={200}
              alt="rates"
              />
              </div>
              <DataTable/>
            </div>
          )}
          {selectedOption === 'invoices' && (
            <div>
              <h2 className="text-xl">Invoices Content</h2>
              <p>This is the invoices section.</p>
            </div>
          )}
          {selectedOption === 'transactions' && (
            <div>
              <h2 className="text-xl">Transaction History Content</h2>
              <p>This is the transaction history section.</p>
            </div>
          )}
          {selectedOption === 'settings' && (
            <div>
               <div className=" grid gap-[2rem] lg:gap-[3rem]">
               <div className="grid gap-[0.5rem]">
              <h2 className="text-[28px] text-primary1 font-[700]"> User settings</h2>
              <h2 className="text-[16px] text-primary3 font-[400]">Your personal settings information    </h2>
              </div>
              <div className="grid gap-[0.5rem]">
              <label className="text-[16px] text-primary1 font-[500]"> Business name</label>
              <input 
              readOnly
              value={bizname}
              className="lg:w-[500px] w-[95%] h-[50px] focus:outline-none lg:h-[55px] rounded-2xl text-primary3 border-[1px] border-primary3 pl-[1rem]"
              />
              </div>
              <div className="grid gap-[0.5rem]">
              <label className="text-[16px] text-primary1 font-[500]"> Wallet address</label>
              <input 
              readOnly
              value={myString}
              className=" w-[100%] h-[50px] focus:outline-none lg:w-[500px] lg:h-[55px] rounded-2xl text-primary3 lg:text-[16px] text-[12px] border-[1px] pl-[0.2rem] border-primary3 lg:pl-[1rem]"
              />
              </div>

              <button
        onClick={handleLogout}
        className='bg-primary1 border-[2px] lg:w-[130px] h-[50px] px-[1rem]  flex items-center justify-center lg:h-[55px] cursor-pointer  py-2 rounded-2xl text-white'
        >
Sign out
        </button>
      
        <button
        onClick={handleLogout}
        className='bg-transparent text-[16px] font-[700]  lg:w-[130px]  flex items-center justify-center lg:h-[55px] cursor-pointer   text-[#FF0000]'
        >
Delete account
        </button>
        
            </div>
            </div>
          )}
          {
            selectedOption === 'withdraw' && (
              <div>
 <Formik
      initialValues={{}}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label>Sender Address</label>
            <Field
              type="text"
              name="sender"
              value={myString}
              readOnly
              className="block w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label>Network</label>
            <Field
              type="text"
              name="network"
              value="Base"
              readOnly
              className="block w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label>Currency</label>
            <Field
              type="text"
              name="currency"
              value="USDC"
              readOnly
              className="block w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label>Recipient Address</label>
            <input
              type="text"
              name="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter recipient address"
              className="block w-[40%] p-3 border-[2px] border-primary3 rounded-lg"
            />
             <ErrorMessage name="recipient" component="div" className="text-red-600" />
          </div>
          <div>
            <label>Amount (USDC)</label>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
             className="block w-[40%] p-3 border-[2px] border-primary3 rounded-lg"
            />
             <ErrorMessage name="amount" component="div" className="text-red-600" />
          </div>
          <button
            type="submit"
            disabled={!amount||  amount == 0 || !recipient}
            className={!amount||  amount == 0 || !recipient ? "cursor-not-allowed opacity-[0.4] px-4 py-3 bg-primary5 text-white rounded-2xl w-[20%]" :"cursor-pointer px-4 py-3 bg-primary5 text-white rounded-2xl w-[20%]"}
          onClick={handleSubmit}
          >
          
            Confirm Details
          </button>
          {console.log(wallets)}
         
        </Form>
      )}
    </Formik>
              </div>
            )
          }
        </div>
        {
            selectedOption === 'confirm' && (
              <div className="grid gap-4">
                <div className="grid">
            <label className="font-[700] text-primary1">From</label>
            <input
              type="text"
              name="recipient"
              value={myString}
            readOnly
              className="block w-[40%] p-3 border-[1px] text-primary3 border-primary3 rounded-lg"
            />
          </div>
                <div className="grid">
            <label className="font-[700] text-primary1">To</label>
            <input
              type="text"
              name="recipient"
              value={recipient}
              readOnly
               className="block lg:w-[40%] w-[80%] text-primary3 p-3 border-[1px] border-primary3 rounded-lg"
            />
          </div>
          <h4 className="text-primary2">(please ensure details are correct)</h4>
          <div className="grid">
          <label>Amount</label>
          <h2 className="font-[700] text-[36px] text-primary1">{amount}USDC</h2>
             </div>
          
             <button
            type="submit"
            className={"cursor-pointer px-4 py-3 bg-primary5 text-white rounded-2xl w-[20%]"}
          onClick={sendUSDC}
          >
            Send
            </button>
                 </div> 
            )
            
            }
      </div>
    </div>
  );
};

export default WalletInfo;