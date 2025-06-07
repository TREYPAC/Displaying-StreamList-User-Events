import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import localSocialImg from '../assets/social-subscription.png';
import '../styles/Cart.css';

function Cart() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🔧 Resolve image paths
  const getImageSrc = (img) => {
    if (img === 'local_social') return localSocialImg;
    return img;
  };

  return (
    <div
      className="cart-page"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/login-bg.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
      }}
    >
      <div className="page-overlay fade-in">
        <h1>Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {cart.map((item, index) => (
                <li
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '12px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '10px',
                    borderRadius: '6px',
                  }}
                >
                  <img
                    src={getImageSrc(item.img)}
                    alt={item.service || item.title}
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/60x60?text=No+Image';
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <strong>{item.service || item.title}</strong>
                    <p>
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p style={{ fontWeight: 'bold', marginTop: 10 }}>Subtotal: ${subtotal.toFixed(2)}</p>
            <button
              onClick={() => navigate('/checkout')}
              style={{
                marginTop: '20px',
                padding: '12px 32px',
                background: '#fff',
                color: '#000',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Go to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
