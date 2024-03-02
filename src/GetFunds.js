import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import { useSDK } from "@metamask/sdk-react";

function GetFunds() {
  const { id } = useParams();

  const [fetched, setFetched] = useState(false);
  const [vaultAddress, setVaultAddress] = useState('');
  const [senderVerified, setSenderVerified] = useState(false);
  const [verifiedCache, setVerifiedCache] = useState({}); // Cache to store verified addresses
  const { connected } = useSDK();
  const apiKey = '-AF56TC5zbpZULZKJ11n7kglHMTETISy'; // Your API key

  useEffect(() => {
    const fetchVaultAddress = async () => {
      if (!connected) {
        console.log("MetaMask not connected");
        return;
      }

      try {
        // Fetch the vault address from the backend API
        const response = await axios.get(`/api/vaults/${id}`);
        const fetchedVaultAddress = response.data.vaultAddress;
        setVaultAddress(fetchedVaultAddress);
        console.log('Vault Address:', fetchedVaultAddress);
        setFetched(true);

        // After fetching the address, verify the sender
        await verifySender();
      } catch (error) {
        console.error('Error fetching vault address:', error);
      }
    };

    if (id && !fetched) {
      fetchVaultAddress();
    }
  }, [id, fetched, connected]);

  const verifySender = async () => {
    try {
      // Retrieve the sender's address from MetaMask
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const senderAddress = accounts[0];

      console.log(`Verifying sender address: ${senderAddress}...`);
      
      // Check if the address has been verified recently and retrieve from cache if available
      if (verifiedCache[senderAddress] !== undefined) {
        console.log('Using cached result for sender verification.');
        setSenderVerified(verifiedCache[senderAddress]);
        return;
      }

      // Make a request to Harpie API for verification
      const harpieResponse = await axios.post('/api/verify-sender', { address: senderAddress }, { headers: { 'X-API-Key': apiKey } });
      
      // Check the response from Harpie API and set senderVerified accordingly
      const isSenderValid = harpieResponse.data.valid;
      console.log('Sender verification result:', isSenderValid);
      setSenderVerified(isSenderValid);

      // Update the cache with the verification result
      setVerifiedCache({ ...verifiedCache, [senderAddress]: isSenderValid });
    } catch (error) {
      console.error('Error verifying sender address:', error);
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
