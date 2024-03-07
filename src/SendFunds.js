
import React, {useState} from 'react';
import { ethers } from 'ethers';
import {VaultFactoryContractABI, VaultFactoryContractAddress} from './Constants.js';





function SendFunds() {

  const [amount, setAmount] = useState(0);
  const [vault, setVault] = useState('');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Get Your Funds',
          text: `https://ethdenver-smoky.vercel.app/getfunds/${vault}`
        });
        console.log('Content shared successfully');
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    } else {
      console.log('Web Share API is not supported in this browser.');
    }
  };

  const handleClick = async () => {
    try {
      // Generate a random bytes32 ID
      const randomBytesArray = new Uint8Array(32);
      crypto.getRandomValues(randomBytesArray);
      const randomBytesHex = [...randomBytesArray]
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
      const randomBytes32 = `0x${randomBytesHex}`;
      
      
      //OLD CODE WITH ETHERS
      const provider = new ethers.BrowserProvider(window.ethereum)

      // MetaMask requires requesting permission to connect users accounts
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // //NEW CODE WITH METAMASK SDK
      // let provider = createExternalExtensionProvider();
      // const accounts = await provider.request({ method: "eth_requestAccounts" });

      
      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = await provider.getSigner()
      console.log('Signer:', signer);



      // Instantiate VaultFactory contract
      const vaultFactory = new ethers.Contract(VaultFactoryContractAddress, VaultFactoryContractABI, signer);

      // Call createVault function from VaultFactory contract
      await vaultFactory.createVault(randomBytes32, { value: ethers.parseEther(amount) });

      console.log('Vault created successfully ' + randomBytes32);
      setVault(randomBytes32);
    } catch (error) {
      console.error('Error creating vault:', error);
    }
  };


  return (
    //Have a text box for amount
    <div className=" mt-8 flex flex-col items-center justify-center">
    <div className="text-white text-2xl mb-4">
      <p className="text-white mb-4">Enter the amount you want to send:</p>
      <input 
        className="p-2.5 my-2 border border-white rounded bg-transparent text-white w-full max-w-xs"
        type="text" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Enter Amount" 
      />
      <button 
        className="mt-5 p-2.5 border-none rounded bg-purple-600 text-white cursor-pointer hover:bg-purple-700 transition-colors duration-300 ease-in-out"
        onClick={handleClick}
      >
        Send
      </button>
      {/* <div className="mt-4">
        <p className="text-gray-600">Vault:</p>
        <p className="font-bold">{vault}</p>
      </div> */}
      {vault !== '' && (
        <div className="mt-4">
          <a 
            href={`/getfunds/${vault}`} 
            className="text-blue-500 hover:underline mr-2"
          >
            Get Funds
          </a>
          <button onClick={handleShare}>Share Link</button>
        </div>
      )}
    </div>
  </div>
  );
}

export default SendFunds;
