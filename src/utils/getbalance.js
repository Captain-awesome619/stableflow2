"use client"
import Moralis from './moralisss'
let initialized = false;
export const getBalance = async (address) => {  
  try {
    const balance = await Moralis.EvmApi.balance.getNativeBalance({
      address,
      chain:  "8453", // Set this to the chain you are using (e.g., 'eth' for Ethereum)
    });

    return balance.result.balance; // Returns the balance in Wei
  } catch (error) {
    console.error('Error getting balance:', error);
    return null;
  }
};