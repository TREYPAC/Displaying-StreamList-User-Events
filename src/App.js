import React, { useState, useEffect } from "react";// eslint-disable-next-line
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  const [token, setToken] = useState(null);// eslint-disable-next-line
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('access_token');
    if (savedToken) setToken(savedToken);

    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <GoogleOAuthProvider clientId="884788015736-tlchadc6vktbol4hpgdbhkknfqa2nqe0.apps.googleusercontent.com">
      {!token ? (
        <LoginPage setToken={setToken} setUser={setUser} />
      ) : (
        <>
          <Navbar />
          <div className="logo-container">
            <img src="logo-eztech-transparent.png" alt="EZTech Logo" className="logo-badge" />
          </div>
          <Routes>
            <Route path="/" element={<StreamList />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watchlist" element={<Watchlist />} />
            {/* PROTECTED CHECKOUT ROUTE */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </>
      )}
    </GoogleOAuthProvider>
  );
}

export default App;
