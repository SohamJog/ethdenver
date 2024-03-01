
import React, {useState} from 'react';
import { ethers } from 'ethers';
import {VaultFactoryContractABI, VaultFactoryContractAddress} from './Constants.js';

function SendFunds() {

  const [amount, setAmount] = useState(0);
  const [vault, setVault] = useState('');


  const handleClick = async () => {
    try {
      // Generate a random bytes32 ID
      const randomBytesArray = new Uint8Array(32);
      crypto.getRandomValues(randomBytesArray);
      const randomBytesHex = [...randomBytesArray]
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
      const randomBytes32 = `0x${randomBytesHex}`;
      
      
      const provider = new ethers.BrowserProvider(window.ethereum)

      // MetaMask requires requesting permission to connect users accounts
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      
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
    <div>
      Send Funds Page
      <p>Enter the amount you want to send</p>
      <input className='text-black' type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleClick}>Send</button>
      <div>
        Vault: {vault}
      </div>
      {vault !== '' && (
      <div>
        <a href={`/getfunds/${vault}`}>Get Funds</a>
        <button onClick={() => {
          const shareLink = `https://ethdenver-smoky.vercel.app/getfunds/${vault}`;
          navigator.clipboard.writeText(shareLink).then(() => {
            alert("Link copied to clipboard!");
          }).catch((error) => {
            console.error("Failed to copy link: ", error);
          });
        }}>Share Link</button>
      </div>
    )}
    </div>
  );
}

export default SendFunds;
