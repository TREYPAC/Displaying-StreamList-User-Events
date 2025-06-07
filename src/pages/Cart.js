import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

function Cart() {
  const navigate = useNavigate();

  return (
    <div
      className="cart-page"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/login-bg.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
      }}
    >
      <div className="page-overlay fade-in">
        <h1>Cart Page</h1>
        <p>
          This page is under construction and will be built in <strong>Week 4</strong>.
        </p>
        {/* Go to Checkout Button */}
        <button
          onClick={() => navigate('/checkout')}
          style={{
            marginTop: '24px',
            padding: '12px 32px',
            background: '#222',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '18px',
            cursor: 'pointer',
          }}
        >
          Go to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
