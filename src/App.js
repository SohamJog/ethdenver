import React, {useState} from 'react';
import { motion } from 'framer-motion';
import AddFunds from './AddFunds.js'; 
import GetFunds from './GetFunds.js';
import SendFunds from './SendFunds.js';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from 'react-router-dom';
import { useSDK } from "@metamask/sdk-react";

// import { Link } from 'react-router-dom';
// import styled from 'styled-components';





function App() {
  const [account, setAccount] = useState("");
  const { sdk, connected, connecting, provider, chainId } = useSDK();

    const connect = async () => {
        try {
            const accounts = await sdk?.connect();
            setAccount(accounts?.[0]);
        } catch (err) {
            console.warn("failed to connect..", err);
        }
    };


  return (
    <Router>
      <div className="bg-gradient-to-tr from-[#120136] to-[#120136] text-white min-h-screen flex flex-col">
        <nav className="flex justify-between items-center p-4 bg-[#120136]">
        <Link to="/" className="no-underline text-white">
         <div className="text-2xl font-bold">BoilerBlockchain</div>
        </Link>
          <ul className="flex gap-8">
            <li className="py-2 px-4 cursor-pointer hover:bg-[rgba(255,255,255,0.1)]">
              <Link to="/" className="no-underline text-white">Home</Link>
            </li>
            <li className="py-2 px-4 cursor-pointer hover:bg-[rgba(255,255,255,0.1)]">
              <Link to="/add-funds" className="no-underline text-white">Add Funds</Link>
            </li>
            <li className="py-2 px-4 cursor-pointer hover:bg-[rgba(255,255,255,0.1)]">
              <Link to="/sendfunds" className="no-underline text-white">Send Funds</Link>
            </li>
            {/* ... other NavItems */}
          </ul>
        </nav>

        <div className="App">
            <button style={{ padding: 10, margin: 10 }} onClick={connect}>
                Connect
            </button>
            {connected && (
                <div>
                    <>
                        {chainId && `Connected chain: ${chainId}`}
                        <p></p>
                        {account && `Connected account: ${account}`}
                    </>
                </div>
            )}
        </div>

        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/add-funds" element={<AddFunds />} />
          <Route path="/getfunds/:id" element={<GetFunds/>} />
          <Route path="/sendfunds" element={<SendFunds/>} />
        </Routes>
      </div>
    </Router>
  );
}


const HomeContent = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="flex-1 flex flex-col justify-center items-center text-center"
  >
    <motion.h1 className="text-8xl mb-2">Title</motion.h1>
    <motion.h2 className="text-4xl">Subtitle</motion.h2>
  </motion.div>
);

export default App;