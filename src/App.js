import React from 'react';
import styled from 'styled-components';
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
      <StyledApp>
        <NavBar>
          <NavLogo>BoilerBlockchain</NavLogo>
          <NavItems>
            <NavItem>
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
            </NavItem>
            <NavItem>
              <Link to="/add-funds" style={{ textDecoration: 'none', color: 'white' }}>Add Funds</Link>
            </NavItem>
            {/* ... other NavItems */}
          </NavItems>
        </NavBar>
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/add-funds" element={<AddFunds />} />
          <Route path="/getfunds/:id" element={<GetFunds/>} />
          <Route path="/sendfunds" element={<SendFunds/>} />
        </Routes>
      </StyledApp>
    </Router>
  );
}


const HomeContent = () => (
  <Content
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <Title>Title</Title>
    <Subtitle>Subtitle</Subtitle>
  </Content>
);

export default App;
