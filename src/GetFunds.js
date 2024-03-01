
import React from 'react';
import { useParams } from 'react-router-dom';

function GetFunds() {
  const { id } = useParams();

  return (
    <div>
      <h2>Get Funds Page</h2>
      <p>ID: {id}</p>
      
    </div>
  );
}

export default GetFunds;
