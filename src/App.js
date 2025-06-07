import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Import Navigate
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar";
import StreamList from "./pages/StreamList";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";
import LoginPage from "./pages/Login";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./utils/ProtectedRoute";

import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('access_token');
    if (savedToken) {
      setToken(savedToken);
    }

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        // Optionally clear invalid user data from localStorage
        // localStorage.removeItem('user');
      }
    }
  }, []);

  // Use environment variable for client ID
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  // Add a check if clientId is available
  if (!googleClientId) {
    console.error("Google Client ID is not set. Please set REACT_APP_GOOGLE_CLIENT_ID environment variable.");
    // Render an error message or fallback UI if client ID is missing
    return <div>Error: Google Client ID not configured.</div>;
  }

  // Determine if the user is authenticated based on the token state
  const isAuthenticated = !!token;

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      {/* Render Navbar and logo only if authenticated */}
      {isAuthenticated && (
        <>
          <Navbar />
          <div className="logo-container">
            <img src="logo-eztech-transparent.png" alt="EZTech Logo" className="logo-badge" />
          </div>
        </>
      )}

      <Routes>
        {/* Define the Login route */}
        <Route path="/login" element={<LoginPage setToken={setToken} setUser={setUser} />} />

        {/* Redirect authenticated users from /login to home */}
        {isAuthenticated && <Route path="/login" element={<Navigate to="/" replace />} />}

        {/* Define protected routes using ProtectedRoute */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}> {/* Pass auth status */}
              <StreamList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}> {/* Pass auth status */}
              <Movies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}> {/* Pass auth status */}
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}> {/* Pass auth status */}
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}> {/* Pass auth status */}
              <Search />
            </ProtectedRoute>
          }
        />
         <Route
          path="/watchlist"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}> {/* Pass auth status */}
              <Watchlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}> {/* Pass auth status */}
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* Optional: Add a catch-all route for 404 or redirect */}
        {/* <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} /> */}
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
