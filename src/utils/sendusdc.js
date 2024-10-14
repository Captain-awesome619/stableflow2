"use client"
import { usePrivy } from '@privy-io/react-auth';
import { JsonRpcProvider,Contract,parseUnits } from 'ethers';

export const useSendUSDC = () => {
  const { user } = usePrivy(); // Get user data including wallet address
  const provider = new JsonRpcProvider('https://mainnet.base.org'); // Replace with the actual Base RPC URL

  const sendUSDC = async (recipientAddress, amount) => {
    if (!user || !user.wallet) {
      throw new Error("User is not authenticated or wallet not available");
    }

    // Create a new instance of the USDC contract
    const usdcAddress = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'; // Replace with the actual USDC contract address
    const usdcAbi = [ // Minimal ABI required for transferring USDC
      "function transfer(address to, uint amount) returns (bool)",
      "function balanceOf(address owner) view returns (uint)"
    ];

    const usdcContract = new Contract(usdcAddress, usdcAbi, provider.getSigner());

    // Send USDC
    try {
      const tx = await usdcContract.transfer(recipientAddress, parseUnits(amount.toString(), 6)); // USDC has 6 decimals
      await tx.wait();
      console.log('Transaction successful:', tx);
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return { sendUSDC };
};
