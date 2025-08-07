import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [newUserId, setNewUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isCreateUserLoading, setIsCreateUserLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userId && password) {
      setIsLoginLoading(true);
      fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password })
      })
        .then(async res => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);
          localStorage.setItem('userId', userId);
          navigate(`/dashboard/${userId}`);
        })
        .catch(err => {
          alert(err.message); // shows error from backend (e.g., wrong password)
        })
        .finally(() => {
          setIsLoginLoading(false);
        });
    } else {
      alert('Please enter User ID and Password');
    }
  };

  const handleCreateUser = () => {
    if (newUserId && newPassword) {
      setIsCreateUserLoading(true);
      fetch('/add_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: newUserId, password: newPassword })
      })
        .then(async res => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);
          localStorage.setItem('userId', newUserId);
          navigate(`/dashboard/${newUserId}`);
        })
        .catch(err => {
          alert(err.message); // shows error like "user already exists"
        })
        .finally(() => {
          setIsCreateUserLoading(false);
        });
    } else {
      alert('Please enter User ID and Password to create account');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      boxSizing: 'border-box'
    },
    card: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      textAlign: 'center',
      width: '100%',
      maxWidth: '350px',
      boxSizing: 'border-box'
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      boxSizing: 'border-box'
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#4da6ff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginBottom: '10px',
      fontSize: '16px',
      transition: 'background-color 0.3s ease'
    },
    separator: {
      margin: '20px 0',
      borderBottom: '1px solid #ccc'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>GitHard Haas App</h2>
        <h3>Login</h3>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button} disabled={isLoginLoading}>
          {isLoginLoading ? <LoadingSpinner size={16} /> : 'Login'}
        </button>

        <div style={styles.separator}></div>

        <h3>Create New User</h3>
        <input
          type="text"
          placeholder="New User ID"
          value={newUserId}
          onChange={(e) => setNewUserId(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleCreateUser} style={styles.button} disabled={isCreateUserLoading}>
          {isCreateUserLoading ? <LoadingSpinner size={16} /> : 'Create User'}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
