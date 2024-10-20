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
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="cursor-pointer"
    >
      {copied ? <FaCopy size={20}  /> : <FaRegCopy size={20} /> }
    </button>
  );
};

export default CopyButton;
