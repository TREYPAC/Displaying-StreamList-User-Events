import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../Checkout.css";

export default function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const [cardNumber, setCardNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const cardFormat = /^\d{4} \d{4} \d{4} \d{4}$/;
    if (!cardFormat.test(cardNumber)) {
      alert("Invalid card number format. Use: 1234 5678 9012 3456");
      return;
    }
    localStorage.setItem("creditCard", cardNumber);
    alert("Your payment was saved and order placed!");
    setCart([]);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = 2.0;
  const total = subtotal + tax;

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <button
        type="button"
        className="update-cart-btn"
        onClick={() => navigate("/cart")}
      >
        Update Cart
      </button>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>No items in cart.</p>
        </div>
      ) : (
        <>
          <div className="order-summary">
            <ul>
              {cart.map((item, idx) => (
                <li key={idx} className="cart-item">
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <span className="cart-item-name">{item.service}</span>
                      {item.serviceInfo && (
                        <span className="cart-item-description">
                          {" "}- {item.serviceInfo}
                        </span>
                      )}
                    </div>
                    <div className="cart-item-qty">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="summary-totals">
              <p className="subtotal">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </p>
              <p>
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </p>
              <p>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              Card Number:
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                required
                className="checkout-input"
              />
            </label>
            <button type="submit" className="checkout-btn">
              Place Order
            </button>
          </form>
        </>
      )}
    </div>
  );
}
