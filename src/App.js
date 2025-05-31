import React from 'react';
import Subscriptions from './pages/Subscriptions';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Cart from './pages/Cart';

function GoToCartButton() {
  const navigate = useNavigate();
  return <button onClick={() => navigate('/cart')}>Go to Cart</button>;
}

function App() {
  return (
    <Router>
      <GoToCartButton />
      <Routes>
        <Route path="/" element={<Subscriptions />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
