
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import {VaultFactoryContractABI, VaultFactoryContractAddress} from './Constants.js';


function GetFunds() {
  const { id } = useParams();

  const [fetched, setFetched] = useState(false);
  const [vaultAddress, setVaultAddress] = useState('');
  useEffect(() => {
    const fetchVaultAddress = async () => {
      try {
        
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
        console.log(fetchVaultAddress)
      } catch (error) {
        console.error('Error fetching vault address:', error);
      }
    };

    if (id && !fetched) {
      fetchVaultAddress();
      setFetched(true);
    }
  }, [id, fetched]);

  
  if (!fetched) {
    return (
      <div>
        <h2>Get Funds Page</h2>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Get Funds Page</h2>
      <p>ID: {id}</p>
      
    </div>
  );
}

export default GetFunds;
