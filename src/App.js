import React from 'react';
import { motion } from 'framer-motion';
import AddFunds from './AddFunds.js'; 
import GetFunds from './GetFunds.js';
import SendFunds from './SendFunds.js';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';



const StyledApp = styled.div`
  background: linear-gradient(135deg, #120136 0%, #120136 100%);
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem;
  background: #120136; /* Set the entire navbar to a single purple color */
`;

const NavLogo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
`;

const NavItems = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
`;

const NavItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Content = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled(motion.h2)`
  font-size: 2rem;
`;

function App() {
  return (
    <Router>
      <div className="bg-gradient-to-tr from-[#120136] to-[#120136] text-white min-h-screen flex flex-col">
        <nav className="flex justify-between items-center p-4 bg-[#120136]">
          <div className="text-2xl font-bold">BoilerBlockchain</div>
          <ul className="flex gap-8">
            <li className="py-2 px-4 cursor-pointer hover:bg-[rgba(255,255,255,0.1)]">
              <Link to="/" className="no-underline text-white">Home</Link>
            </li>
            <li className="py-2 px-4 cursor-pointer hover:bg-[rgba(255,255,255,0.1)]">
              <Link to="/add-funds" className="no-underline text-white">Add Funds</Link>
            </li>
            {/* ... other NavItems */}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/add-funds" element={<AddFunds />} />
          <Route path="/getfunds/:id" element={<GetFunds/>} />
          <Route path="/sendfunds" element={<SendFunds/>} />
        </Routes>
        tohar pappa
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
