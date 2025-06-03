import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Subscriptions from './pages/Subscriptions';
import Cart from './pages/Cart';
import Profile from './pages/Profile'; 
import Home from './pages/Home'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* This is Home */}
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
