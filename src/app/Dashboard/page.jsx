'use client';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Image from 'next/image';
import dash from '../assests/document.png';
import setting from '../assests/setting-2.png';
import third from '../assests/receipt-item.png';
import fourth from '../assests/element-1.png';
import logo from '../assests/logo.png';
import { IoMdClose } from 'react-icons/io';
import { parseEther } from 'ethers';
import { FaNairaSign } from 'react-icons/fa6';
import rate from '../assests/rate.png';
import DataTable from '@/components/table';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import * as Yup from "yup";
import { Formik,Field,Form,ErrorMessage } from "formik"
import { useSendTransaction } from "@privy-io/react-auth";
import { getBalance } from "@/utils/getbalance";
import { useDispatch } from "react-redux";
import { setMyNumber } from "@/store";;
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getBasename } from "../basename/getbasename";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Modal from 'react-modal'
import { IoCloseCircleOutline } from "react-icons/io5";
import CryptoPage from "@/components/rate";
import CopyButton from '@/components/copy';
import { PiHandWithdraw } from "react-icons/pi";
import { IoReceiptOutline } from "react-icons/io5";
const WalletInfo = () => { 
  const validationSchema = Yup.object().shape({
    recipient: Yup.string().required('Recipient address is required'),
    amount: Yup.number()
      .required('Amount is required')
      .positive('Amount must be greater than zero'),
  });
  const Dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

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
      console.log(ethToUsdcConversionRate);
      const weiBalance = await getBalance(myString);
      const figg = weiBalance.ether;
      const num = parseFloat(figg);
      console.log(num);
      const equivalentUsdc = num * ethToUsdcConversionRate;
      const fina = equivalentUsdc.toFixed(6);
      const final = parseFloat(fina);
      Dispatch(setMyNumber(final));
      console.log(final);
    } catch (error) {
      console.error('Error fetching ETH to USDC price:', error);
    }
  };
  const bizname = useSelector((state) => state.businessname);
  const profileId = useSelector((state) => state.profileId);
  const myString = useSelector((state) => state.myString);
  const myNum = useSelector((state) => state.myNumber);
  const client = useSelector((state) => state.value);
  const [selectedOption, setSelectedOption] = useState('dashboard'); // Default selection
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility state
  const [baseName, setBaseName] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [conversionRate, setConversionRate] = useState(null);
  const [nairaAmount, setNairaAmount] = useState(0);
  const [paymentid, setpaymentid] = useState('');
  const [name, setname] = useState('');
  const [depoamt, setdeopamt] = useState(0.0);
  const [descript, setdescript] = useState('');
  const [equi, setequi] = useState(0.0);
  const [depositPaymentNetwork, setDepositPaymentNetwork] = useState('Base');
  const [depositCurrency, setDepositCurrency] = useState('USDC');
  const { logout } = usePrivy();
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsSidebarOpen(false); // Close the sidebar after selection
  };
  const Navigate = useRouter();
  const handleLogout = async () => {
    await logout();
    Navigate.push('/');
  };

  const handleCompleteInvoice = async (event) => {
    event.preventDefault();
    try {
      const body = {
        profileId,
        customerName: name,
        paymentNetwork: depositPaymentNetwork,
        currency: depositCurrency,
        amountInUsdc: depoamt,
        amountInNGN: parseFloat(equi),
        description: descript,
      };
      console.log(body);
      const response = await fetch('https://stableflow.onrender.com/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log(data);
      if (data.statusCode === 200) {
        setpaymentid(data.data._id)
        openModal();
      }else{
        alert("There was an error")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchbase = async () => {
    try {
      const address = myString;
      const basename2 = await getBasename(address);
      const val = basename2.name;
      setBaseName(val);
      console.log(val);
      console.log(basename2);
    } catch (error) {
      console.error(error); // Handle any errors
    }
  };
  useEffect(() => {
    const appElement = document.getElementById('__next');
    if (appElement) {
      Modal.setAppElement(appElement);
    }
    fetchbase();
  }, []);

  const fetchConversionRate = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=ngn'
      );
      const data = await response.json();
      const rate = data['usd-coin'].ngn;
      setConversionRate(rate);
    } catch (error) {
      console.error('Error fetching conversion rate:', error);
    }
  };

  useEffect(() => {
    fetchEthToUsdcPrice();
    fetchConversionRate();
    const intervalId = setInterval(fetchConversionRate, 100000);
    // Fetch rate every minute
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [myNum]);

  useEffect(() => {
    if (conversionRate) {
      setNairaAmount((myNum * conversionRate).toFixed(2));
      let eq = 0.0;
      eq = (depoamt * conversionRate).toFixed(2);
      setequi(eq);
    }
  }, [myNum, conversionRate, depoamt]);

  const handleSubmit = async () => {
    setSelectedOption('confirm');
  };
  function recheck() {
    setSelectedOption('withdraw');
  }

  const { wallets } = useWallets();
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

  const sendUSDC = async () => {
   
    if (client !== 'privy') {
      alert(
        'Sorry This feature is only available on privy embedded wallets'
      );
    }
    
      try {
        const amountInWei = parseEther(amount);
        const val = amountInWei.toString();
        // Create the transaction object
        const txObject = {
          to: recipient,
          value: amountInWei,
        };
       
        const txResponse = await sendTransaction(txObject);
        console.log('Transaction sent:', txResponse);
        const txReceipt = await txResponse.wait();
        console.log('Transaction confirmed:', txReceipt);
      } catch (error) {
        alert('Sorry This feature is only available on privy embedded wallets');
        console.error('Transaction failed:', error);
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
const texttocopy = `https://stableflow2.vercel.app/pay/${bizname}?paymentid=${paymentid}`
  return (
    <div className={isSidebarOpen ? "overflow-hidden h-screen" : 'lg:flex overflow-x-hidden '}>
      {/* Button to toggle sidebar on small screens */}
      {console.log(user)}
      {console.log(amount)}
      {console.log(client)}
      {console.log(profileId)}
      <button
        className='md:hidden p-2 text-white bg-gray-800 absolute top-3 left-1 z-30'
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <IoMdClose size={15} />
        ) : (
          <GiHamburgerMenu size={15} />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-white z-20 text-primary1 grid w-64 min-h-screen lg:relative absolute p-4 transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? 'translate-x-0 ' : '-translate-x-full'
        } md:translate-x-0 md:block md:w-64`}
      >
        <ul className='flex flex-col mt-[3rem] gap-[2rem]  lg:gap-[3rem] lg:mt-[1rem]'>
          <Image
            src={logo}
            width={200}
            height={200}
            alt='model'
            className=' lg:mb-[1rem]'
          />
          <li
            onClick={() => handleOptionSelect('dashboard')}
            className={`cursor-pointer flex gap-[0.5rem] text-primary1 p-2 rounded ${
              selectedOption === 'dashboard' ? 'text-primary1' : ''
            }`}
          >
            <Image src={dash} width={20} height={20} alt='model' />
            <div
              className={
                selectedOption === 'dashboard'
                  ? 'text-primary1 text-[17px] duration-500'
                  : 'text-primary3 duration-500 text-[14px] font-[500]'
              }
            >
              Dashboard
            </div>
          </li>
          <li
            onClick={() => handleOptionSelect('invoices')}
            className={`cursor-pointer flex gap-[0.5rem] text-primary1 p-2 rounded ${
              selectedOption === 'dashboard' ? 'text-primary1' : ''
            }`}
          >
            <Image src={third} width={20} height={20} alt='model' />
            <div
              className={
                selectedOption === 'invoices'
                  ? 'text-primary1 text-[17px] duration-500'
                  : 'text-primary3 duration-500 text-[14px] font-[500]'
              }
            >
              Invoices
            </div>
          </li>
          <li
            onClick={() => handleOptionSelect('transactions')}
            className={`cursor-pointer flex gap-[0.5rem] text-primary1 p-2 rounded ${
              selectedOption === 'transactions' ? 'text-primary1' : ''
            }`}
          >
            <Image src={fourth} width={20} height={20} alt='model' />
            <div
              className={
                selectedOption === 'transactions'
                  ? 'text-primary1 text-[17px] duration-500'
                  : 'text-primary3 duration-500 text-[14px] font-[500]'
              }
            >
              Transactions
            </div>
          </li>
          <li
            onClick={() => handleOptionSelect('settings')}
            className={`cursor-pointer flex gap-[0.5rem] text-primary1 p-2 rounded ${
              selectedOption === 'settings' ? 'text-primary1' : ''
            }`}
          >
            <Image src={setting} width={20} height={20} alt='model' />
            <div
              className={
                selectedOption === 'settings'
                  ? 'text-primary1 text-[17px] duration-500'
                  : 'text-primary3 duration-500 text-[14px] font-[500]'
              }
            >
              Settings
            </div>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className='lg:flex-1 p-4 '>
        <div className='border-b  border-gray-300 mb-4'>
          <h1 className='lg:left-[60%] left-[20%] relative text-[14px] lg:text-[14px] font-[400] mt-[0.5rem] text-primary3'>
            {baseName ? baseName : myString}
          </h1>
        </div>
        <div className='p-4 lg:grid'>
          {selectedOption === 'dashboard' && (
            <div className='lg:grid    gap-[2rem] lg:gap-[4rem]'>
              <h2 className='text-xl lg:pb-[0rem] pb-[3rem]'>Hi {bizname} </h2>
              <div className='lg:flex hidden lg:flex-row flex-col gap-[1rem]'>
                <div className='flex flex-col  gap-[1rem] items-center justify-center'>
                  <div className='w-full h-[100px] lg:w-[500px] lg:h-[200px] bg-primary1 border-[2px] rounded-lg flex items-center justify-center'>
                    <div className='flex flex-col items-center justify-center'>
                      <h2 className='text-white text-[14px]'>Total Balance</h2>
                      <div className='flex flex-row items-center justify-center gap-[0.2rem]'>
                        <FaNairaSign size={20} color='white' />
                        <h2 className='text-white font-[600] text-[25px]'>
                          {nairaAmount}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <button
                    className='bg-white border-[2px] border-primary3 lg:w-[80%] px-[0.5rem] lg:px-[0] flex items-center justify-center lg:h-[50px] cursor-pointer  py-2 rounded-xl text-primary1'
                    onClick={() => handleOptionSelect('invoice')}
                  >
                    Generate Invoice
                  </button>
                </div>
                <div className='flex flex-col gap-[1rem] items-center justify-center'>
                  <div className='w-full h-[100px] lg:w-[500px] lg:h-[200px] bg-primary4 border-[2px] rounded-lg flex items-center justify-center'>
                    <div className='flex flex-col items-center justify-center'>
                      <h2 className='text-white text-[14px]'>Total Balance</h2>
                      <div className='flex flex-row items-center justify-center gap-[0.2rem]'>
                        <h2 className='text-white font-[600] text-[25px]'>
                          {myNum}USDC
                        </h2>
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
              <div className='lg:hidden pb-[3rem]'>
                <Slider {...settings}>
                  <div className='flex flex-col  gap-[1rem] items-center justify-center'>
                    <div className='w-[85%] h-[100px] lg:w-[500px] lg:h-[200px] bg-primary1 border-[2px] rounded-lg flex items-center justify-center'>
                      <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-white text-[14px]'>
                          Total Balance
                        </h2>
                        <div className='flex flex-row items-center justify-center gap-[0.2rem]'>
                          <FaNairaSign size={20} color='white' />
                          <h2 className='text-white font-[600] text-[25px]'>
                            {nairaAmount}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col gap-[1rem] items-center justify-center'>
                    <div className='w-[85%] h-[100px] lg:w-[500px] lg:h-[200px] bg-primary4 border-[2px] rounded-lg flex items-center justify-center'>
                      <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-white text-[14px]'>
                          Total Balance
                        </h2>
                        <div className='flex flex-row items-center justify-center gap-[0.2rem]'>
                          <h2 className='text-white font-[600] text-[25px]'>
                            {myNum}USDC
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
              <div className='flex flex-row items-center justify-center gap-[1rem] pb-[3rem] lg:hidden'>
                <button
                  className='bg-primary4 border-[2px] border-primary4 w-[150px]  flex  gap-[0.5rem] items-center justify-center h-[50px] cursor-pointer  py-2 rounded-2xl text-white'
                  onClick={() => handleOptionSelect('invoice')}
                >
<IoReceiptOutline  size={20} className='text-white' />
                  <h4 className=' text-white font-[500] text-[17px]'> Invoice</h4> 
                </button>

                <button
                 className='bg-primary4 border-[2px] border-primary4 w-[150px]  flex  gap-[0.5rem] items-center justify-center h-[50px] cursor-pointer  py-2 rounded-2xl text-white'
                  onClick={() => handleOptionSelect('withdraw')}
                >
                  <PiHandWithdraw  size={20} className='text-white' />
                    <h4 className=' text-white font-[500] text-[17px]'>  Withdraw </h4> 
                </button>
              </div>
              
              <CryptoPage />
             
              <div className='lg:flex lg:items-center lg:justify-center pt-[2rem] lg:pt-[0rem] '>
                <DataTable />
              </div>
            </div>
          )}
          {selectedOption === 'invoices' && (
            <div>
              <h2 className='text-xl'>Invoices Content</h2>
              <p>This is the invoices section.</p>
            </div>
          )}
          {selectedOption === 'transactions' && (
            <div>
              <h2 className='text-xl'>Transaction History Content</h2>
              <p>This is the transaction history section.</p>
            </div>
          )}
          {selectedOption === 'settings' && (
            <div>
              <div className=' grid gap-[2rem] lg:gap-[3rem]'>
                <div className='grid gap-[0.5rem]'>
                  <h2 className='text-[28px] text-primary1 font-[700]'>
                    {' '}
                    User settings
                  </h2>
                  <h2 className='text-[16px] text-primary3 font-[400]'>
                    Your personal settings information{' '}
                  </h2>
                </div>
                <div className='grid gap-[0.5rem]'>
                  <label className='text-[16px] text-primary1 font-[500]'>
                    {' '}
                    Business name
                  </label>
                  <input
                    readOnly
                    value={bizname}
                    className='lg:w-[500px] w-[95%] h-[50px] focus:outline-none lg:h-[55px] rounded-2xl text-primary3 border-[1px] border-primary3 pl-[1rem]'
                  />
                </div>
                <div className='grid gap-[0.5rem]'>
                  <label className='text-[16px] text-primary1 font-[500]'>
                    {' '}
                    Wallet address
                  </label>
                  <input
                    readOnly
                    value={myString}
                    className=' w-[100%] h-[50px] focus:outline-none lg:w-[500px] lg:h-[55px] rounded-2xl text-primary3 lg:text-[16px] text-[12px] border-[1px] pl-[0.2rem] border-primary3 lg:pl-[1rem]'
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
          {selectedOption === 'withdraw' && (
            <div>
              <Formik
                initialValues={{}}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className='space-y-4'>
                    <div>
                      <label>Sender Address</label>
                      <Field
                        type='text'
                        name='sender'
                        value={baseName ? baseName : myString}
                        readOnly
                        className='block lg:w-[500px] w-[350px] p-2 border rounded bg-gray-100 cursor-not-allowed'
                      />
                    </div>
                    <div className='grid'>
                      <label>Network</label>
                      <Field
                        type='text'
                        name='network'
                        value='Base'
                        readOnly
                        className='blocklg:w-[500px] w-[350px] p-2 border rounded bg-gray-100 cursor-not-allowed'
                      />
                    </div>
                    <div className='grid'>
                      <label>Currency</label>
                      <Field
                        type='text'
                        name='currency'
                        value='ETH for now(USDC Soon)'
                        readOnly
                        className='block lg:w-[500px] w-[350px] p-2 border rounded bg-gray-100 cursor-not-allowed'
                      />
                    </div>
                    <div className='grid'>
                      <label>Recipient Address</label>
                      <input
                        type='text'
                        name='recipient'
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder='Enter recipient address'
                        className='block lg:w-[500px] w-[350px] p-3 border-[2px] border-primary3 rounded-lg'
                      />
                      <ErrorMessage
                        name='recipient'
                        component='div'
                        className='text-red-600'
                      />
                    </div>
                    <div className='grid'>
                      <label>Amount (ETHER)</label>
                      <input
                        type='number'
                        name='amount'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder='Enter amount'
                        className='block lg:w-[500px] w-[350px] p-3 border-[2px] border-primary3 rounded-lg'
                      />
                      <ErrorMessage
                        name='amount'
                        component='div'
                        className='text-red-600'
                      />
                    </div>
                    <button
                      type='submit'
                      disabled={!amount || amount == 0 || !recipient}
                      className={
                        !amount || amount == 0 || !recipient
                          ? 'cursor-not-allowed opacity-[0.4] px-4 py-3 bg-primary5 text-white rounded-2xl lg:w-[300px] w-[200px]'
                          : 'cursor-pointer px-4 py-3 bg-primary5 text-white rounded-2xl lg:w-[300px] w-[200px]'
                      }
                      onClick={handleSubmit}
                    >
                      Confirm Details
                    </button>
                    {console.log(wallets)}
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
        {selectedOption === 'confirm' && (
          <div className='grid gap-4'>
            <FaLongArrowAltLeft
              size={30}
              onClick={recheck}
              className='cursor-pointer'
            />
            <div className='grid'>
              <label className='font-[700] text-primary1'>From</label>
              <input
                type='text'
                name='recipient'
                value={myString}
                readOnly
                className='block lg:w-[500px] w-[350px] p-3 border-[1px] text-primary3 border-primary3 rounded-lg'
              />
            </div>
            <div className='grid'>
              <label className='font-[700] text-primary1'>To</label>
              <input
                type='text'
                name='recipient'
                value={recipient}
                readOnly
                className='block  lg:w-[500px] w-[350px] text-primary3 p-3 border-[1px] border-primary3 rounded-lg'
              />
            </div>
            <h4 className='text-primary2'>
              (please ensure details are correct)
            </h4>
            <div className='grid'>
              <label>Amount</label>
              <h2 className='font-[700] text-[36px] text-primary1'>
                {amount}ETH
              </h2>
            </div>
            <button
              type='submit'
              className={
                'cursor-pointer px-4 py-3 bg-primary5 text-white rounded-2xl lg:w-[300px] w-[200px]'
              }
              onClick={sendUSDC}
            >
              Send
            </button>
          </div>
        )}

        {/* damilare this is the beginning of the invoice section */}
        {/* awesome _(^-^)_ */}
        {selectedOption === 'invoice' && (
          <div className='grid lg:gap-[4rem] gap-[3rem]'>
            <div className='grid gap-[0.5rem]'>
              <h2 className='lg:text-[28px] text-[18px] font-[700] text-primary1'>
                #Invoice
              </h2>
              <h3 className='lg:text-[18px] text-[15px] font-[400] text-primary3'>
                Fill the information below
              </h3>
            </div>
            <div className='grid lg:gap-[2rem] gap-[1.5rem]'>
              <div className='grid'>
                <label>Your customers name</label>
                <input
                  type='text'
                  name='name'
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder='Name here'
                  className='block lg:w-[500px] w-[350px] p-3 border-[2px] border-primary3 rounded-lg'
                />
              </div>

              <div className='grid'>
                <label>Choose your payment network</label>
                <input
                  type='text'
                  name='Base'
                  value={depositPaymentNetwork}
                  readOnly
                  className='block text-primary3 lg:w-[500px] w-[350px] p-3 border-[1px] border-primary2 focus:outline-none rounded-lg cursor-not-allowed'
                />
              </div>
              <div className='grid'>
                <label>Invoice Currency</label>
                <input
                  type='text'
                  name='USDC'
                  value={depositCurrency}
                  readOnly
                  className='text-primary3 block lg:w-[500px] w-[350px] p-3 border-[1px] border-primary2 focus:outline-none rounded-lg cursor-not-allowed'
                />
              </div>
              <div className='grid'>
                <label>Amount(IN USDC)</label>
                <input
                  type='number'
                  name='name'
                  value={depoamt}
                  onChange={(e) => setdeopamt(parseFloat(e.target.value))}
                  placeholder='0.00'
                  className='block lg:w-[500px] w-[350px] p-3 border-[2px] border-primary3 rounded-lg'
                />
                {console.log(depoamt)}
                <h3>N{equi}</h3>
              </div>
              <div className='grid'>
                <label>Description</label>
                <input
                  type='text'
                  name='name'
                  value={descript}
                  onChange={(e) => setdescript(e.target.value)}
                  placeholder='What is the payment for'
                  className='block lg:w-[500px] w-[350px] p-3 border-[2px] border-primary3 rounded-lg'
                />
              </div>
              <button
                type='submit'
                disabled={depoamt <= 0 || !descript || !name || !depoamt}
                className={
                  depoamt <= 0 || !descript || !name || !depoamt
                    ? 'opacity-[0.3] cursor-not-allowed px-4 py-3 bg-primary5 text-white rounded-2xl duration-500 lg:w-[300px] w-[200px]'
                    : 'duration-500 cursor-pointer px-4 py-3 bg-primary5 text-white rounded-2xl lg:w-[300px] w-[200px]'
                }
                onClick={handleCompleteInvoice}
              >
                Generate Invoice
              </button>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel='Example Modal'
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
              <div className='grid lg:gap-[2rem] gap-[2rem]'>
                <div className='flex items-center gap-[5rem] justify-between'>
                  <h2 className='lg:text-[24px] text-[16px] font-[700] text-primary1 '>
                    Payment Link Details
                  </h2>
                  <button onClick={closeModal}>
                    <IoCloseCircleOutline size={20} />
                  </button>
                </div>
                <div className='grid'>
                  <label className='text-[#808080] text-[14px]'>Amount</label>
                  <input
                    name=''
                    value={depoamt + 'USDC'}
                    readOnly
                    className='block lg:w-[500px] w-[350px] lg:text-[36px] text-[18px] font-[700] p-2 border rounded bg-gray-100 cursor-not-allowed'
                  />
                </div>
                <div className='grid'>
                  <label className='text-[#808080] text-[14px]'>
                    Deposit Link
                  </label>
                  <div className='flex items-center justify-center'>
                  <input
                    name=''
                    value={`https://stableflow2.vercel.app/pay/${bizname}?paymentid=${paymentid}`}
                    readOnly
                    className='block lg:w-[500px] w-[350px] focus:outline-none lg:text-[20px] text-[16px] font-[400] p-2 border rounded bg-gray-100 '
                  />
                   <CopyButton text={texttocopy} />
                   </div>
                </div>
                <div className='grid'>
                  <label className='text-[#808080] text-[14px]'>
                    Customers Name
                  </label>
                  <input
                    name=''
                    value={name}
                    readOnly
                    className='block lg:w-[500px] w-[350px] focus:outline-none lg:text-[20px] text-[16px] font-[400] p-2 border rounded bg-gray-100 '
                  />
                </div>
                <div className='grid'>
                  <label className='text-[#808080] text-[14px]'>
                    Description
                  </label>
                  <input
                    name=''
                    value={descript}
                    readOnly
                    className='block lg:w-[500px] w-[350px] focus:outline-none lg:text-[20px] text-[16px] font-[400] p-2 border rounded bg-gray-100 '
                  />
                </div>
              </div>
            </Modal>
          </div>
        )}
        {/* The end of the invoice section */}
      </div>
    </div>
  );
};

export default WalletInfo;
