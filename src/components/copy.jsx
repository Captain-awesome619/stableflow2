"use client"
import React, { useState } from 'react';
import { FaCopy } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";



const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset copied state after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="cursor-pointer"
    >
      {copied ? <FaCopy color='black' className='lg:text-[20px] text-[15px]'  /> : <FaRegCopy  className='text-primary4 lg:text-[20px] text-[15px]'  /> }
    </button>
  );
};

export default CopyButton;
