import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProjectDashboard() {
  const { userId, projectId } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const styles = {
    card: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      width: '350px'
    },
    buttonBlue: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      backgroundColor: '#4da6ff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    buttonRed: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#f44336',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    }
  };

  return (
    <div className="centered-container">
      <div style={styles.card}>
        <h2>Welcome, {userId}!</h2>
        <p>You are viewing <strong>Project ID: {projectId}</strong></p>
        <button style={styles.buttonBlue}>View Project Details</button>
        <button style={styles.buttonBlue}>Update Project Info</button>
        <button style={styles.buttonRed} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default ProjectDashboard;