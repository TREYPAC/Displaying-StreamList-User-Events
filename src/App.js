// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Subscriptions from "./pages/Subscriptions";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import LoginPage from "./pages/Login";
import Checkout from "./pages/Checkout";

// Utilities
import ProtectedRoute from "./utils/ProtectedRoute";

import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    if (savedToken) {
      setToken(savedToken);
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, []);

  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    return <div>Error: Google Client ID not configured.</div>;
  }

  const isAuthenticated = !!token;

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      {isAuthenticated && (
        <>
          <Navbar />
          <div className="logo-container">
            <img
  src="logo-eztech-transparent.png"
  alt="EZTech Logo"
  className="logo-badge"
  style={{ maxWidth: '220px', height: 'auto' }} // 👈 Control size
/>
          </div>
        </>
      )}

      <Routes>
        <Route
          path="/login"
          element={<LoginPage setToken={setToken} setUser={setUser} />}
        />
        {isAuthenticated && (
          <Route path="/login" element={<Navigate to="/" replace />} />
        )}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscriptions"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Subscriptions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
