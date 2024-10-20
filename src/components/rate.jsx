// app/crypto/page.js

import { useEffect, useState } from 'react';

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
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 grid grid-cols-2 items-center justify-center sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cryptoData.map((coin) => (
        <div
          key={coin.id}
          className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center mb-4">
            <img src={coin.image} alt={`${coin.name} logo`} className="w-10 h-10 mr-3" />
            <h2 className="text-lg font-semibold">{coin.name}</h2>
          </div>
          <p className="text-gray-500 mb-2">{coin.symbol.toUpperCase()}</p>
          <p className="text-xl font-bold mb-2">${coin.current_price.toFixed(2)}</p>
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
      ))}
    </div>
  );
}