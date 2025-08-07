import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProjectDashboard() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Placeholder data until backend is ready
    setProjects([
      { id: 1, name: 'Demo Project A', description: 'Sample project for UI' },
      { id: 2, name: 'Demo Project B', description: 'Another project sample' }
    ]);
  }, []);

  const handleProjectDetails = (projectId) => {
    alert(`Viewing details for project ID: ${projectId}`);
    // Replace with: navigate(`/dashboard/${userId}/project/${projectId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(`/manager/${userId}`);
  };

  const styles = {
    page: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px'
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
      marginBottom: '20px',
      width: '350px',
      textAlign: 'center'
    },
    button: {
      padding: '8px 14px',
      margin: '8px',
      backgroundColor: '#4da6ff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    header: {
      marginBottom: '20px'
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.header}>Welcome, {userId}!</h2>
      {projects.map(project => (
        <div key={project.id} style={styles.card}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <button style={styles.button} onClick={() => handleProjectDetails(project.id)}>
            Project Details
          </button>
        </div>
      ))}
      <button style={styles.button} onClick={handleGoBack}>
        Back to Project Creation
      </button>
      <button style={styles.button} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default ProjectDashboard;
