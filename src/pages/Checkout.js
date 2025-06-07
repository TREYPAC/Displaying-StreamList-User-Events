import React from "react";


export default function Checkout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url('${process.env.PUBLIC_URL}/background.jpg') center center / cover no-repeat`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex", // Use flexbox to center content
        justifyContent: "center",
        alignItems: "center",
        padding: "20px", // Add some padding
      }}
    >
      {/* Content here */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background for the content area
          borderRadius: "8px",
          padding: "30px",
          width: "100%",
          maxWidth: "800px", // Limit the maximum width
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "20px", // Space between sections
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Checkout</h2>

        {/* Section: Order Summary / Items */}
        <div style={{ borderBottom: "1px solid #eee", paddingBottom: "20px" }}>
          <h3>Order Summary</h3>
          {/* Placeholder for item list */}
          <div style={{ marginTop: "10px" }}>
            <p>Item 1 - $10.00</p>
            <p>Item 2 - $25.00</p>
            {/* Add more items here */}
          </div>
          <div style={{ textAlign: "right", marginTop: "15px", fontWeight: "bold" }}>
            <p>Subtotal: $35.00</p>
            <p>Tax: $2.00</p>
            <p>Total: $37.00</p>
          </div>
        </div>


        {/* Section: Payment Information */}
        <div style={{ borderBottom: "1px solid #eee", paddingBottom: "20px" }}>
          <h3>Payment Information</h3>
          {/* Placeholder for payment form */}
          <form style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "10px" }}>
            <input type="text" placeholder="Card Number" style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
            <div style={{ display: "flex", gap: "15px" }}>
              <input type="text" placeholder="Expiry Date (MM/YY)" style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", flex: 1 }} />
              <input type="text" placeholder="CVV" style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", width: "80px" }} />
            </div>
          </form>
        </div>

        {/* Section: Place Order Button */}
        <button
          style={{
            padding: "15px",
            background: "#007bff", // Example button color
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "1.1rem",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
