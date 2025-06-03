import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Navbar() {
  const { cart } = useContext(CartContext);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav style={{ background: '#333', padding: '10px' }}>
      <Link to="/" style={{ color: 'white', marginRight: 10 }}>Home</Link>
      <Link to="/subscriptions" style={{ color: 'white', marginRight: 10 }}>Subscriptions</Link>
      <Link to="/profile" style={{ color: 'white', marginRight: 10 }}>Profile</Link>
      <Link to="/cart" style={{ color: 'white' }}>Cart ({itemCount})</Link>
    </nav>
  );
}

export default Navbar;
