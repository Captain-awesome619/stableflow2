"use client"
import Moralis from "moralis";
if (typeof window !== "undefined" && !window.__MORALIS_INITIALIZED__) {
  // Initialize Moralis
  Moralis.start({
    apiKey: process.env.MORALIS_KEY,       // Replace with your actual API key
           // Replace with your actual app ID
  });

  // Set a flag indicating Moralis has been initialized
  window.__MORALIS_INITIALIZED__ = true;
}

// Export the Moralis instance to be used throughout the application
export default Moralis;
