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
          <div className="flex"> {/* Add this div with the flex class */}

            {/* {connected ?
              <div>
                <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                  Profile
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <List>
                    <ListItem>
                      <ListItemText>
                        <Typography>Connected chain: {chainId}</Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                          <Typography>Connected account: {account}</Typography>
                        </ListItemText>
                    </ListItem>
                  </List>
                </Popover>
              </div> :
              <div>
                <Button variant="contained" onClick={connect}>
                  Connect
                </Button>
              </div>
            } */}
             <button className="bg-blue-500 rounded"style={{ padding: 10, margin: 10 }} onClick={connect}>
                Connect
            </button>
            {/* {connected && (
                <div>
                    <>
                        {chainId && `Connected chain: ${chainId}`}
                        <p></p>
                        {account && `Connected account: ${account}`}
                    </>
                </div>
            )} */}
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
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Web Share Example',
          text: 'https://ethdenver-smoky.vercel.app/getfunds/0xe4a85dae924334a4bf5cfb8dca509b7f4dd72d421add43c884e70b3fbe201b9a '
        });
        console.log('Content shared successfully');
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    } else {
      console.log('Web Share API is not supported in this browser.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex-1 flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white"
      style={{ minHeight: '100vh' }}
    >
      <motion.h1 className="text-8xl mb-4 font-bold">Welcome</motion.h1>
      <motion.h2 className="text-4xl font-semibold">Make your crypto payments easy</motion.h2>
      <button onClick={handleShare}>Share</button>
    </motion.div>
  );
};

export default App;