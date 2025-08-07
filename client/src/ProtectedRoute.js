import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { userId } = useParams();
  const authenticatedUserId = localStorage.getItem('userId');

  // Check if user is authenticated
  if (!authenticatedUserId) {
    // No user logged in, redirect to login
    return <Navigate to="/" replace />;
  }

  // Check if the URL userId matches the authenticated user
  if (userId && userId !== authenticatedUserId) {
    // URL userId doesn't match authenticated user, redirect to login
    return <Navigate to="/" replace />;
  }

  // User is properly authenticated, render the protected component
  return children;
}

export default ProtectedRoute;