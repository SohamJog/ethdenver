
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import {VaultFactoryContractABI, VaultFactoryContractAddress, VaultContractABI} from './Constants.js';
import { useSDK } from "@metamask/sdk-react";
import { motion } from 'framer-motion';



function GetFunds() {
  const { id } = useParams();

  const [account, setAccount] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [vaultAddress, setVaultAddress] = useState('');
  const { sdk, connected, connecting, provider, chainId } = useSDK();
  const [harpieStatus, setHarpieStatus] = useState("");


  const fetchVaultAddress = async () => {
      

    try {
      console.log("here")
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

      // Call the contract's method to get the vault address
      const fetchedVaultAddress = await vaultFactory.vaults(id);
      setVaultAddress(fetchedVaultAddress);
      console.log(fetchedVaultAddress)

      const vault = new ethers.Contract(fetchedVaultAddress, VaultContractABI, signer);

      const senderAddress = await vault.sender();
      console.log("Sender address " + senderAddress)

      const res = await fetch("https://api.harpie.io/v2/validateAddress", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            apiKey: "f5a73366-7e03-4308-81e1-a3cc7d0b9395",
            address: senderAddress
        })
    })
    const result = await res.json();
    const malicious = String(result.isMaliciousAddress);
    if (malicious !== "false") {
      return;
    }
    setHarpieStatus(malicious);
    const summary = result.summary;


    console.log(res)
      await vault.withdraw();
      setFetched(true);
    } catch (error) {
      console.error('Error fetching vault address:', error);
    }
  };



  return (
    <div className="mt-8 flex flex-col items-center justify-center">
    <h1 className="text-white text-2xl mb-4">Get Money</h1>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={fetchVaultAddress}
      className="mt-2 p-2.5 border-none rounded bg-blue-600 text-white cursor-pointer"
    >
      Get Money
    </motion.button>
    <p className="text-white my-4">ID: {id}</p>
    <div>
      {harpieStatus === "true" && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <p className="font-bold">Sender is a malicious address, transaction blocked</p>
        </div>
      )}
      {harpieStatus === "false" && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <p className="font-bold">Sender is not a malicious address, your money is on its way!</p>
        </div>
      )}
    </div>
  </div>
  );
}

export default GetFunds;