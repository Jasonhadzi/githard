import React from 'react';

function HomePage({ onLogout, user }) {
  return (
    <div className="card">
      <h2>Welcome, {user}!</h2>
      <p>You are logged in successfully</p>
      <button onClick={onLogout} className="logout-btn">Logout</button>
    </div>
  );
}

export default HomePage;
