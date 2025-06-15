import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const {
    cart,
    setCart,
    incrementItem,
    decrementItem,
    removeFromCart,
  } = useCart();

  const [cardNumber, setCardNumber] = useState("");
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = 2.0;
  const total = subtotal + tax;

  const isSubscription = (id) => id >= 1 && id <= 4;

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
    navigate("/");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f4", padding: "40px" }}>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "10px",
          padding: "30px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Checkout</h2>

        {/* 🧾 ORDER SUMMARY */}
        <h3>Order Summary</h3>
        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "12px",
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "12px",
                }}
              >
                <img
                  src={
                    item.img === "local_social"
                      ? "/social-subscription.png"
                      : item.img
                  }
                  alt={item.service}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/80?text=No+Image";
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 4px" }}>{item.service}</h4>
                  <p style={{ margin: 0 }}>
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                  <div style={{ marginTop: "8px" }}>
                    <button onClick={() => decrementItem(item.id)}>-</button>
                    <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                    <button
                      onClick={() =>
                        isSubscription(item.id)
                          ? alert("You can only purchase one subscription.")
                          : incrementItem(item.id)
                      }
                    >
                      +
                    </button>
                    <button
                      style={{ marginLeft: "10px", color: "red" }}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Totals */}
            <div style={{ textAlign: "right", marginTop: "20px" }}>
              <p>
                <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
              </p>
              <p>
                <strong>Tax:</strong> ${tax.toFixed(2)}
              </p>
              <p>
                <strong>Total:</strong> ${total.toFixed(2)}
              </p>
            </div>

            {/* 💳 PAYMENT */}
            <form
              onSubmit={handleSubmit}
              style={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <h3>Payment Information</h3>
              <input
                type="text"
                placeholder="Card Number (1234 5678 9012 3456)"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="Expiry MM/YY"
                  required
                  style={{ flex: 1, padding: "10px" }}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  required
                  style={{ width: "80px", padding: "10px" }}
                />
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
                  cursor: "pointer",
                }}
              >
                Place Order
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
