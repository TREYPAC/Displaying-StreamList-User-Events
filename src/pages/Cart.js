// ✅ Cart.js (Full Fixed Code with /public image fallback)
import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cart, incrementItem, decrementItem, removeFromCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = 2.0;
  const total = subtotal + tax;

  return (
    <div style={{ minHeight: "100vh", padding: "40px", backgroundColor: "#f5f5f5" }}>
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "8px"
      }}>
        <h2 style={{ marginBottom: "20px" }}>Your Cart</h2>

        {cart.length === 0 ? (
          <p>No items in your cart.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "10px"
                }}
              >
                <div>
                  <h4>{item.title || item.service}</h4>
                  <p>${item.price.toFixed(2)} x {item.quantity}</p>

                  <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
                    <button onClick={() => decrementItem(item.id)} style={buttonStyle}>−</button>
                    <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                    <button onClick={() => incrementItem(item.id)} style={buttonStyle}>+</button>
                    <button onClick={() => removeFromCart(item.id)} style={{ ...buttonStyle, marginLeft: '15px', backgroundColor: '#dc3545' }}>Remove</button>
                  </div>
                </div>

                <img
                  src={item.img === 'local_social' ? '/social-subscription.png' : item.img}
                  alt={item.title || item.service}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "6px"
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80?text=No+Image';
                  }}
                />
              </div>
            ))}

            <hr />

            <div style={{ textAlign: "right", marginTop: "20px" }}>
              <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
              <p><strong>Tax:</strong> ${tax.toFixed(2)}</p>
              <p><strong>Total:</strong> ${total.toFixed(2)}</p>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              style={{
                marginTop: "20px",
                padding: "12px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
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

const buttonStyle = {
  padding: '6px 12px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Cart;
