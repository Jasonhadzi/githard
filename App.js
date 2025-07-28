import React, { useState } from 'react';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  const handleLogin = (userId) => {
    setUser(userId);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser('');
    setIsLoggedIn(false); 
  };

  return (
    <div className="app-container">
      {isLoggedIn ? (
        <HomePage onLogout={handleLogout} user={user} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>  
  );
}

export default App;
