import React, { useState, useEffect } from "react";
import products from '../data/data'; // Adjust path if needed
import { useNavigate } from "react-router-dom";
import placeholderImg from '../assets/social-subscription.png';



const CART_KEY = "cartItems";

// Helper to get the correct image source
function getImageSrc(img) {
  if (typeof img === "string" && img.startsWith("http")) {
    return img;
  }
  return placeholderImg; 
}

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Number(qty) || 1) }
          : item
      )
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: 24 }}>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>Subscription Details</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              width: 200,
              padding: 16,
              textAlign: "center",
              background: "#fff",
            }}
          >
            <img
              src={getImageSrc(product.img)}
              alt={product.service}
              style={{ width: "100%", height: 100, objectFit: "contain" }}
            />
            <h4>{product.service}</h4>
            <p style={{ fontSize: 14 }}>{product.serviceInfo}</p>
            <p>
              <b>${product.price.toFixed(2)}</b>
            </p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 40 }}>Cart Summary</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table style={{ width: "100%", marginTop: 16, borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ddd" }}>Image</th>
              <th style={{ borderBottom: "1px solid #ddd" }}>Product</th>
              <th style={{ borderBottom: "1px solid #ddd" }}>Price</th>
              <th style={{ borderBottom: "1px solid #ddd" }}>Qty</th>
              <th style={{ borderBottom: "1px solid #ddd" }}>Subtotal</th>
              <th style={{ borderBottom: "1px solid #ddd" }}>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={getImageSrc(item.img)}
                    alt={item.service}
                    style={{ width: 50, height: 50, objectFit: "contain" }}
                  />
                </td>
                <td>{item.service}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    style={{ width: 50 }}
                  />
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3 style={{ marginTop: 16 }}>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}

export default Cart;
