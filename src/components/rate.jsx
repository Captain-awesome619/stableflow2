// app/crypto/page.js
'use client'
import { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader"
export default function CryptoPage() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&price_change_percentage=24h'
        );

        if (!response.ok) {
          throw new Error('Error fetching crypto data');
        }

        const data = await response.json();
        setCryptoData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  if (loading) {
    return <div> <ClipLoader
    color="blue"
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"
    className='absolute top-[35%] left-[45%] '
  /></div>;
  }

  return (
    <div className="lg:p-6 grid grid-cols-1 lg:items-center lg:justify-center sm:grid-cols-2 lg:grid-cols-3 gap-4">
       <h2 className='primary font-[700] text-[17px] '>Market Rates</h2>
      {cryptoData.map((coin) => (
         <>
        <div
          key={coin.id}
          className="bg-white border hidden lg:block   border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center mb-4">
            <img src={coin.image} alt={`${coin.name} logo`} className="w-10 h-10 mr-3" />
            <h2 className="lg:text-lg text-[16px] font-semibold">{coin.name}</h2>
          </div>
          <p className="text-gray-500 mb-2">{coin.symbol.toUpperCase()}</p>
          <p className="lg:text-xl text-[18px] font-bold mb-2">${coin.current_price.toFixed(2)}</p>
          <p
            className={`text-sm font-medium ${
              coin.price_change_percentage_24h > 0
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
        <div className='lg:hidden grid gap-[1rem]'>
       
        <div className='flex items-center justify-between gap-[3rem] '>
        <div className=' bg-[#252525] w-[170px]   h-[50px] rounded-2xl flex gap-[0.5rem] jus items-center '>
        <img src={coin.image} alt={`${coin.name} logo`} className="w-[50px] h-[45px] pl-[0.5rem]  " />
        <h2 className='text-[14px] text-white font-[700] ' > {coin.symbol.toUpperCase()}</h2>
        <p className="flex items-center justify-center text-[14px] font-bold text-white ">${coin.current_price.toFixed(2)}</p>
        </div>
        <p
            className={`text-sm font-medium ${
              coin.price_change_percentage_24h > 0
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
        </div>
        </>
      
      ))}
    </div>
  );
}