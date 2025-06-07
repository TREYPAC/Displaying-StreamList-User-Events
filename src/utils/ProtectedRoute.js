
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Accept isAuthenticated as a prop
function ProtectedRoute({ children, isAuthenticated }) {
  const location = useLocation();

  // Use the prop to check authentication status
  if (!isAuthenticated) {
    // Redirect to the login route
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // Render the protected content
}

export default ProtectedRoute;
