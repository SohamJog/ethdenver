import React, {useState} from 'react';
import { motion } from 'framer-motion';
import AddFunds from './AddFunds.js'; 
import GetFunds from './GetFunds.js';
import SendFunds from './SendFunds.js';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from 'react-router-dom';
import { useSDK } from "@metamask/sdk-react";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


function App() {
  const [account, setAccount] = useState("");
  const { sdk, connected, connecting, provider, chainId } = useSDK();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


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
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-white min-h-screen flex flex-col">
        <nav className="flex justify-between items-center p-4 ">
          <Link to="/" className="no-underline text-white">
            <div className="text-2xl font-bold">CrypTap</div>
          </Link>
          <ul className="flex gap-8">
            <li className="py-2 px-4 cursor-pointer hover:bg-[rgba(255,255,255,0.1)]">
              <Link to="/" className="no-underline text-white">Home</Link>
            </li>
            {/* <li className="py-2 px-4 cursor-pointer hover:bg-[rgba(255,255,255,0.1)]">
              <Link to="/add-funds" className="no-underline text-white">Add Funds</Link>
            </li> */}
            <li className="py-2 px-4 cursor-pointer hover:bg-[rgba(255,255,255,0.1)]">
              <Link to="/sendfunds" className="no-underline text-white">Send Funds</Link>
            </li>
            {/* ... other NavItems */}
          </ul>
          <div className="flex"> {/* Add this div with the flex class */}

             <button className="bg-blue-900 rounded"style={{ padding: 10, margin: 10 }} onClick={connect}>
                Connect
            </button>

          </div>

        </nav>

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


const HomeContent = () => {
  

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white"
    style={{ minHeight: '100vh' }}
  >
    <div className="flex flex-col justify-center items-center h-screen">
      <motion.h1 className="text-6xl font-bold mb-6">CrypTap</motion.h1>
      <motion.h2 className="text-4xl font-semibold mb-8">Unlock the power of NFC to instantly share crypto, NFTs, and more with just a tap.</motion.h2>

    </div>
    <div className="flex flex-col justify-center items-center h-screen">
      <motion.h1 className="text-6xl font-bold mb-6">Effortless and Intuitive</motion.h1>
      <motion.h2 className="text-4xl font-semibold mb-4">Simplify asset sharing with the power of touch.</motion.h2>
      <motion.h3 className="text-xl font-semibold mb-8">AirDrop your friends crypto, or any digital asset</motion.h3>
    </div>
    <div className="flex flex-col justify-center items-center h-screen">
      <motion.h1 className="text-6xl font-bold mb-6">Secure and Private</motion.h1>
      <motion.h2 className="text-4xl font-semibold mb-4">Use Harpie to prevent malicious airdrops.</motion.h2>
      <motion.h3 className="text-xl font-semibold mb-8">Trust CrypTap's advanced security features to safeguard your digital assets and personal information.</motion.h3>
    </div>
  </motion.div>
  );
};

export default App;