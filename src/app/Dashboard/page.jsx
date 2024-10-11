"use client"
import { useSelector } from "react-redux";
import React ,{ useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import dash from '../assests/document.png'
import setting from '../assests/setting-2.png'
import third from '../assests/receipt-item.png'
import fourth from '../assests/element-1.png'
import logo from '../assests/logo.png'
import { IoMdClose } from "react-icons/io";
const WalletInfo = () => {
  
  const myString = useSelector((state) => state.myString);
  const myNumber = useSelector((state) => state.myNumber)
  const [selectedOption, setSelectedOption] = useState('dashboard'); // Default selection
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility state

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsSidebarOpen(false); // Close the sidebar after selection
  };

  return (
    <div className="flex">
      {/* Button to toggle sidebar on small screens */}
      <button 
        className="md:hidden p-2 text-white bg-gray-800 absolute top-4 left-4 z-10"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <IoMdClose /> : <GiHamburgerMenu />}
      </button>

      {/* Sidebar */}
      <div 
        className={`bg-white text-primary1 grid w-64 min-h-screen lg:relative absolute p-4 transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block md:w-64`}
      >
        <ul className="flex flex-col mt-[3rem] gap-[2rem]  lg:gap-[3rem] lg:mt-[4rem]">
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
      <div className="flex-1 p-4 items-center justify-center">
        <div className="border-b border-gray-300 mb-4">
          <h1 className="text-2xl font-bold">Selected: {selectedOption}</h1>
        </div>
        <div className="p-4 flex flex-col items-center justify-center">
          {selectedOption === 'dashboard' && (
            <div className="flex-col items-center justify-center">
              <h2 className="text-xl">Dashboard Content</h2>
              <p>This is the dashboard section.</p>
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
