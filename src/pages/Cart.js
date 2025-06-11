import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import localSocialImg from '../assets/social-subscription.png';
import '../styles/Cart.css';

function Cart() {
  const { cart, addToCart, subtractFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getImageSrc = (img) => {
    if (img === 'local_social') return localSocialImg;
    return img;
  };

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={getImageSrc(item.img)} alt={item.service} className="cart-img" />
              <div className="cart-item-details">
                <div className="cart-item-header">
                  <span className="cart-item-name">{item.service}</span>
                  {item.serviceInfo && (
                    <span className="cart-item-description"> – {item.serviceInfo}</span>
                  )}
                </div>
                <div className="cart-item-qty">
                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                  <button
                    className="subtract-btn"
                    onClick={() => subtractFromCart(item)}
                    aria-label="Subtract one"
                  >
                    -
                  </button>
                  <button
                    className="add-btn"
                    onClick={() => addToCart(item)}
                    aria-label="Add one"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="subtotal">Subtotal: ${subtotal.toFixed(2)}</div>
          <button className="checkout-btn" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
