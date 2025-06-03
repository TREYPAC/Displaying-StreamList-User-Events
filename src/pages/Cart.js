import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import placeholderImg from '../assets/social-subscription.png';
import { useNavigate } from 'react-router-dom';

function getImageSrc(img) {
  return img?.startsWith('http') ? img : placeholderImg;
}

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: 24 }}>
      <button onClick={() => navigate(-1)}>Back</button>

      <h2>Cart Summary</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td><img src={getImageSrc(item.img)} alt={item.service} style={{ width: 50, height: 50 }} /></td>
                <td>{item.service}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    style={{ width: 50 }}
                  />
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td><button onClick={() => removeFromCart(item.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}

export default Cart;
