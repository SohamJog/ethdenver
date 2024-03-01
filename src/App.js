import React from 'react';
import { motion } from 'framer-motion';
import AddFunds from './AddFunds.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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
