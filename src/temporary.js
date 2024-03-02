import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import axios from 'axios'; 
import { VaultFactoryContractABI, VaultFactoryContractAddress, VaultContractABI } from './Constants.js';
import { useSDK } from "@metamask/sdk-react";

const API_KEY = "-AF56TC5zbpZULZKJ11n7kglHMTETISy";
const HARPIE_API_ENDPOINT = "https://api.harpie.io/v2/validateAddress";
const MAX_RETRY_COUNT = 3;
const INITIAL_RETRY_DELAY = 1000; // in milliseconds
const RATE_LIMIT_DELAY = 60000; // in milliseconds (1 minute)

function GetFunds() {
  const { id } = useParams();
  const [fetched, setFetched] = useState(false);
  const [vaultAddress, setVaultAddress] = useState('');
  const [senderVerified, setSenderVerified] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [retryDelay, setRetryDelay] = useState(INITIAL_RETRY_DELAY);
  const { connected, provider } = useSDK();

  useEffect(() => {
    const fetchVaultAddress = async () => {
      if (!connected) {
        console.log("MetaMask not connected")
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum)

        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await provider.getSigner();
        const vaultFactory = new ethers.Contract(VaultFactoryContractAddress, VaultFactoryContractABI, signer);
        const fetchedVaultAddress = await vaultFactory.vaults(id);
        
        setVaultAddress(fetchedVaultAddress);
        console.log('Vault Address:', fetchedVaultAddress);

        const vault = new ethers.Contract(fetchedVaultAddress, VaultContractABI, signer);
        await vault.withdraw();
        setFetched(true);
        
        let senderAddress;
        while (!senderAddress && retryCount < MAX_RETRY_COUNT) {
          try {
            senderAddress = await signer.getAddress();
          } catch (error) {
            console.error('Error fetching sender address:', error);
            await handleRetry();
          }
        }

        if (senderAddress) {
          verifySender(senderAddress);
        } else {
          console.error('Max retry limit reached. Unable to fetch sender address.');
        }
      } catch (error) {
        console.error('Error fetching vault address:', error);
      }
    };

    if (id && !fetched) {
      fetchVaultAddress();
    }
  }, [id, fetched, connected, retryCount, retryDelay]);

  const handleRetry = async () => {
    setRetryCount(prevRetryCount => prevRetryCount + 1);
    const nextRetryDelay = Math.min(retryDelay * 2, RATE_LIMIT_DELAY);
    setRetryDelay(nextRetryDelay);
    await new Promise(resolve => setTimeout(resolve, nextRetryDelay));
  };

  const verifySender = async (senderAddress) => {
    try {
      console.log(`Verifying sender address: ${senderAddress}...`);

      const response = await axios.post(HARPIE_API_ENDPOINT, { apiKey: API_KEY, address: senderAddress });

      if (response.data.valid) {
        console.log('Sender verified.');
        setSenderVerified(true);
      } else {
        console.log('Invalid sender.');
        setSenderVerified(false);
      }
    } catch (error) {
      console.error('Error verifying sender address:', error);
      if (error.response && error.response.status === 429) {
        console.log('Rate limit exceeded. Waiting before retrying...');
        await handleRetry();
      }
    }
  };

  if (!connected) {
    return <div>MetaMask not connected</div>;
  }

  if (!fetched) {
    return (
      <div>
        <h2>Get Funds Page</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Get Funds Page</h2>
      <p>ID: {id}</p>
      {senderVerified ? <p>Verified sender</p> : <p>Invalid sender</p>}
    </div>
  );
}

export default GetFunds;
