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
          navigate(`/manager/${userId}`);
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
          navigate(`/manager/${newUserId}`);
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
    card: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      width: '300px'
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '5px',
      border: '1px solid #ccc'
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#4da6ff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginBottom: '10px'
    },
    separator: {
      margin: '20px 0',
      borderBottom: '1px solid #ccc'
    }
  };

  return (
    <div className="centered-container">
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
