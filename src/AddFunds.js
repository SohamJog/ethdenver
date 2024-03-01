import React from 'react';
import { motion } from 'framer-motion';

function AddFunds() {
  const handleAddFunds = () => {
    console.log("Fund submission logic would go here.");
    // Here you would add the logic to connect to MetaMask and Particle Network
  };

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <h1 className="text-white text-2xl mb-4">Add Funds</h1>
      <input 
        type="text" 
        placeholder="Enter amount" 
        className="p-2.5 my-2 border border-white rounded bg-transparent text-white w-full max-w-xs"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddFunds}
        className="mt-5 p-2.5 border-none rounded bg-purple-600 text-white cursor-pointer"
      >
        Submit
      </motion.button>
    </div>
  );
}

export default AddFunds;
