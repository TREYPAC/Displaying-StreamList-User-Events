import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function LoginPage({ setToken, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Get the navigate function

  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      // Store token and user info in state and localStorage
      setToken(tokenResponse.access_token);
      localStorage.setItem('access_token', tokenResponse.access_token); // Store in localStorage

      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });
      const userInfo = await res.json();
      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo)); // Store user in localStorage

      // *** Add navigation here after successful login ***
      navigate('/'); // Redirect to the home page or desired route
    },
    onError: errorResponse => {
      alert('Login Failed!');
      console.error('Login Failed:', errorResponse);
    },
    flow: 'implicit',
    scope: 'openid email profile',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    // Add your traditional login logic here
    // If traditional login is successful, you would also navigate:
    // navigate('/');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `url('${process.env.PUBLIC_URL}/login-bg.png') center center / cover no-repeat`,
        fontFamily: 'Inter, Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.85)',
          borderRadius: '24px',
          boxShadow: '0 6px 32px 0 rgba(0,0,0,0.10)',
          padding: '48px 40px 40px 40px',
          width: '360px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            background: '#ffe68f',
            color: '#7a5c00',
            fontWeight: 600,
            borderRadius: '8px',
            padding: '4px 16px',
            marginBottom: '16px',
            fontSize: '0.95rem',
          }}
        >
          Account Login
        </span>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '32px', color: '#222', textAlign: 'center' }}>
          Welcome to EZTech Movies!
        </h2>
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <input
            type="Text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 2px',
              marginBottom: '18px',
              border: '1.5px solid #e3d6f7',
              borderRadius: '12px',
              background: '#f9f6fd',
              fontSize: '1rem',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 2px',
              marginBottom: '18px',
              border: '1.5px solid #e3d6f7',
              borderRadius: '12px',
              background: '#f9f6fd',
              fontSize: '1rem',
            }}
          />
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '24px',
              fontSize: '0.95rem',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" style={{ color: '#a87cf4', textDecoration: 'none', fontWeight: 500 }}>
             Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px 0',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: 600,
              border: 'none',
              marginBottom: '16px',
              background: '#222',
              color: '#fff',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            Submit
          </button>
        </form>
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            margin: '12px 0',
            color: '#bbb',
            fontSize: '0.95rem',
            position: 'relative',
          }}
        >
          <span style={{ position: 'relative', zIndex: 1, background: 'rgba(255,255,255,0.85)', padding: '0 8px' }}>
            or
          </span>
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: '100%',
              height: '1px',
              background: '#eee',
              zIndex: 0,
              transform: 'translateY(-50%)',
            }}
          ></span>
        </div>
        <button
          onClick={() => login()}
          style={{
            width: '100%',
            padding: '14px 0',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: 500,
            border: '1.5px solid #e3d6f7',
            background: '#fff',
            color: '#444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            marginBottom: '0',
          }}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            width={22}
            height={22}
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
