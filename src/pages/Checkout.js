import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const [cardNumber, setCardNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format check for card
    const cardFormat = /^\d{4} \d{4} \d{4} \d{4}$/;
    if (!cardFormat.test(cardNumber)) {
      alert("Invalid card number format. Use: 1234 5678 9012 3456");
      return;
    }

    // Save card to localStorage
    localStorage.setItem("creditCard", cardNumber);
    alert("Your payment was saved and order placed!");

    // Clear cart
    setCart([]);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = 2.0;
  const total = subtotal + tax;

  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f4", padding: "40px" }}>
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "10px",
        padding: "30px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Checkout</h2>

        {/* 🧾 ORDER SUMMARY */}
        <h3>Order Summary</h3>
        <div>
          {cart.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "12px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "12px"
              }}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                  />
                )}
                <div>
                  <h4 style={{ margin: "0 0 4px" }}>{item.title}</h4>
                  <p style={{ margin: "0" }}>${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals */}
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
          <p><strong>Tax:</strong> ${tax.toFixed(2)}</p>
          <p><strong>Total:</strong> ${total.toFixed(2)}</p>
        </div>

        {/* 💳 PAYMENT */}
        <form onSubmit={handleSubmit} style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <h3>Payment Information</h3>
          <input
            type="text"
            placeholder="Card Number (1234 5678 9012 3456)"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <input type="text" placeholder="Expiry MM/YY" required style={{ flex: 1, padding: "10px" }} />
            <input type="text" placeholder="CVV" required style={{ width: "80px", padding: "10px" }} />
          </div>
          <button
            type="submit"
            style={{
              background: "#007bff",
              color: "#fff",
              padding: "14px",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              cursor: "pointer"
            }}
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
