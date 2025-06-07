import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Navbar() {
  const { cart } = useContext(CartContext);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();

  const isDetailsPage = location.pathname.startsWith('/movie/');

  // Optional: Hide Navbar on details page
  if (isDetailsPage) return null;

  return (
    <nav
      style={{
        background: '#333',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}
    >
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/search" style={{ color: 'white', textDecoration: 'none' }}>Search</Link>
        <Link to="/subscriptions" style={{ color: 'white', textDecoration: 'none' }}>Subscriptions</Link>
        <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
        <Link to="/about" style={{ color: 'white', marginRight: 10 }}>About</Link>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
          Cart ({itemCount})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
