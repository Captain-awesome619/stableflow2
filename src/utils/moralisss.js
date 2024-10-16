import Moralis from "moralis";

export const initializeMoralis = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_KEY, // Replace with your Moralis API key
  });
}