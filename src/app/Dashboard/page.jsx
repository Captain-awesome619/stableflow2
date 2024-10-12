"use client"
import { useSelector } from "react-redux";
import React ,{ useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import dash from '../assests/document.png'
import setting from '../assests/setting-2.png'
import third from '../assests/receipt-item.png'
import fourth from '../assests/element-1.png'
import logo from '../assests/logo.png'
import { IoMdClose } from "react-icons/io";
import {  Contract,formatUnits,JsonRpcProvider,InfuraProvider,isAddress } from 'ethers';
import { FaNairaSign } from "react-icons/fa6";
import rate from "../assests/rate.png"
import DataTable from "@/components/table";

const WalletInfo = () => {
  const bizname = useSelector((state) => state.businessname)
  const myString = useSelector((state) => state.myString);
  const myNum = useSelector((state) => state.myNumber)
  const usdc = useSelector((state) => state.value)
  const [selectedOption, setSelectedOption] = useState('dashboard'); // Default selection
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility state
  const [baseName, setBaseName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [conversionRate, setConversionRate] = useState(null);
  const [nairaAmount, setNairaAmount] = useState(0);



  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsSidebarOpen(false); // Close the sidebar after selection
  };


 

const provider = new JsonRpcProvider("https://mainnet.infura.io/v3/3de3ca6613154c39ae2e5537c63301ae"); // You can use any Ethereum node provider

async function getBaseName(walletAddress) {
  try {
  
    if (!isAddress(walletAddress)) {
        throw new Error('Invalid Ethereum address');
    }
   
    const ensName = await provider.lookupAddress(walletAddress);
    
    if (!ensName) {
        console.log(`No ENS name found for ${walletAddress}. Returning the address as basename.`);
        setBaseName(myString)
        return walletAddress; 
    } else {
        const basename = ensName.split('.')[0]; 
        console.log(`Found ENS name: ${ensName}. Basename is: ${basename}`);
        setBaseName(basename)
        return basename;
    }
} catch (error) {
    console.error('Error fetching ENS name:', error);
    return null; // Return null in case of error
}

}

  useEffect(() => {
  getBaseName(myString)
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
    fetchConversionRate();
    const intervalId = setInterval(fetchConversionRate, 60000); // Fetch rate every minute
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);


  

  return (
    <div className="flex overflow-x-hidden">
      {/* Button to toggle sidebar on small screens */}
      
      <button 
        className="md:hidden p-2 text-white bg-gray-800 absolute top-4 left-1 z-10"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <IoMdClose size={15} /> : <GiHamburgerMenu size={15} />}
      </button>

      {/* Sidebar */}
      <div 
        className={`bg-white text-primary1 grid w-64 min-h-screen lg:relative absolute p-4 transition-transform duration-300 ease-in-out transform ${
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
      <div className="flex-1 p-4 ">
        <div className="border-b  border-gray-300 mb-4">
          
          <h1 className="lg:left-[60%] left-[13%] relative text-[12px] lg:text-[14px] font-[400] mt-[0.5rem] text-primary3"> {baseName}</h1>
        </div>
        <div className="p-4 grid">
          {selectedOption === 'dashboard' && (
            <div className="grid  gap-[2rem] lg:gap-[4rem]">
              <h2 className="text-xl">Hi {bizname} </h2>
              <div className="flex lg:flex-row flex-col gap-[1rem]">
              
              <div className="flex flex-col  gap-[1rem] items-center justify-center" >
              <div className="w-full h-[100px] lg:w-[500px] lg:h-[200px] bg-primary1 border-[2px] rounded-lg flex items-center justify-center">
              <div className="flex flex-col items-center justify-center"> 
              <h2 className="text-white text-[14px]">Total Balance</h2>
              <div className="flex flex-row items-center justify-center gap-[0.2rem]">
              <FaNairaSign size={20} color="white" />
              <h2 className="text-white font-[600] text-[25px]">{myNum}</h2>
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
        >
Withdraw
        </button>
              </div>

              </div>
              <div className="grid grid-cols-2 gap-[0.5rem] lg:grid-cols-5"> 
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
              <h2 className="text-xl">Settings Content</h2>
              <p>This is the settings section.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletInfo;
