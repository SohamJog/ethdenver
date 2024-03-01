import React, {useState} from 'react';
import { motion } from 'framer-motion';
import AddFunds from './AddFunds.js'; 
import GetFunds from './GetFunds.js';
import SendFunds from './SendFunds.js';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from 'react-router-dom';
import { useSDK } from "@metamask/sdk-react";

function App() {
  const [account, setAccount] = useState("");
  const [showPopover, setShowPopover] = useState(false);
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
      <div className="bg-gradient-to-tr from-[#120136] to-[#120136] text-white min-h-screen flex flex-col relative">
        {/* Navigation */}
        <nav className="flex justify-between items-center p-4 bg-[#120136]">
          <Link to="/" className="no-underline text-white">
            <div className="text-2xl font-bold">BoilerBlockchain</div>
          </Link>
          <div className="flex items-center relative">
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
              {/* Add other NavItems as needed */}
            </ul>
            <div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowPopover(!showPopover)}>
                {connected ? "Profile" : "Connect"}
              </button>
              {showPopover && connected && (
                <div className="absolute top-full left-0 bg-white p-4 shadow rounded mt-2">
                  {chainId && (
                    <p className="text-sm">
                      Connected Chain: <span className="font-bold">{chainId}</span>
                    </p>
                  )}
                  {account && (
                    <p className="text-sm">
                      Connected Account: <span className="font-bold">{account}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/add-funds" element={<AddFunds />} />
          <Route path="/getfunds/:id" element={<GetFunds />} />
          <Route path="/sendfunds" element={<SendFunds />} />
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
    className="flex-1 flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white"
    style={{ minHeight: '100vh' }}
  >
    <motion.h1 className="text-8xl mb-4 font-bold">Welcome</motion.h1>
    <motion.h2 className="text-4xl font-semibold">Make your crypto payments easy</motion.h2>
  </motion.div>
);

export default App;
