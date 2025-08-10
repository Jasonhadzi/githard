import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function UserDashboard() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  useEffect(() => {
    fetchUserProjects();
  }, []);

  const fetchUserProjects = () => {
    setIsLoadingProjects(true);
    fetch('/get_user_projects_list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch projects');
        // The API returns an array of project IDs
        const projectIds = data.projects || [];
        setProjects(projectIds);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setProjects([]);
      })
      .finally(() => {
        setIsLoadingProjects(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('projectId');
    navigate('/');
  };

  const handleCreateProject = () => {
    navigate(`/create-project/${userId}`);
  };

  const handleProjectClick = (projectId) => {
    navigate(`/project/${userId}/${encodeURIComponent(projectId)}`);
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
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '600px',
      textAlign: 'center',
      boxSizing: 'border-box'
    },
    title: {
      color: '#333',
      marginBottom: '10px',
      fontSize: '28px'
    },
    subtitle: {
      color: '#666',
      fontSize: '16px',
      marginBottom: '30px'
    },
    projectsContainer: {
      marginBottom: '30px'
    },
    projectCard: {
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '2px solid transparent',
      textAlign: 'left'
    },
    projectCardHover: {
      backgroundColor: '#e9ecef',
      borderColor: '#4da6ff'
    },
    projectName: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '8px'
    },
    projectId: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '8px'
    },
    projectDescription: {
      fontSize: '14px',
      color: '#555',
      lineHeight: '1.4'
    },
    buttonsContainer: {
      display: 'flex',
      gap: '15px',
      flexDirection: 'column'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#4da6ff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease',
      marginBottom: '10px'
    },
    secondaryButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#6c757d',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease'
    },
    loadingContainer: {
      textAlign: 'center',
      padding: '40px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px',
      color: '#666'
    },
    // Responsive design
    '@media (max-width: 768px)': {
      card: {
        padding: '20px',
        margin: '10px'
      },
      title: {
        fontSize: '24px'
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome, {userId}!</h1>
        <p style={styles.subtitle}>Here are your projects</p>

        <div style={styles.projectsContainer}>
          {isLoadingProjects ? (
            <div style={styles.loadingContainer}>
              <LoadingSpinner size={32} />
              <p>Loading your projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div style={styles.emptyState}>
              <h3>No projects yet</h3>
              <p>Create your first project to get started!</p>
            </div>
          ) : (
            projects.map((projectId, index) => (
              <div
                key={projectId}
                style={styles.projectCard}
                onClick={() => handleProjectClick(projectId)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = styles.projectCardHover.backgroundColor;
                  e.target.style.borderColor = styles.projectCardHover.borderColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = styles.projectCard.backgroundColor;
                  e.target.style.borderColor = styles.projectCard.border;
                }}
              >
                <div style={styles.projectName}>
                  Project: {projectId}
                </div>
                <div style={styles.projectDescription}>
                  Click to view project details
                </div>
              </div>
            ))
          )}
        </div>

        <div style={styles.buttonsContainer}>
          <button style={styles.button} onClick={handleCreateProject}>
            Create New / Access Existing Project
          </button>
          <button style={styles.secondaryButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;