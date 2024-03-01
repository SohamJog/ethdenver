// AddFunds.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FundContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FundInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #fff;
  border-radius: 4px;
  background-color: transparent;
  color: white;
  width: 300px;
`;

const SubmitButton = styled(motion.button)`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #6c63ff;
  color: white;
  cursor: pointer;
  margin-top: 20px;
`;

const Title = styled.h1`
  color: white;
  font-size: 2rem;
`;

function AddFunds() {
  // Placeholder function for handling fund submission
  const handleAddFunds = () => {
    console.log("Fund submission logic would go here.");
    // Here you would add the logic to connect to MetaMask and Particle Network
  };

  return (
    <FundContainer>
      <Title>Add Funds</Title>
      <FundInput type="text" placeholder="Enter amount" />
      <SubmitButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddFunds}
      >
        Submit
      </SubmitButton>
    </FundContainer>
  );
}

export default AddFunds;
