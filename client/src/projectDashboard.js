import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function ProjectDashboard() {
  const navigate = useNavigate();
  const { userId, projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);

  const fetchProjectDetails = () => {
    setIsLoading(true);
    fetch(`/get_project_info?projectId=${encodeURIComponent(projectId)}`)
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch project details');
        setProject(data);
      })
      .catch(err => {
        console.error('Error fetching project details:', err);
        alert('Failed to load project details');
        navigate(`/dashboard/${userId}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleHardwareManagement = (hwSetName) => {
    navigate(`/hw/${userId}/${encodeURIComponent(projectId)}/${encodeURIComponent(hwSetName)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('projectId');
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(`/dashboard/${userId}`);
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
      maxWidth: '700px',
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
    sectionTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '20px',
      marginTop: '30px',
      textAlign: 'left'
    },
    infoSection: {
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      textAlign: 'left'
    },
    infoItem: {
      marginBottom: '10px',
      fontSize: '14px'
    },
    hwCard: {
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '15px',
      border: '2px solid transparent',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'left'
    },
    hwCardHover: {
      backgroundColor: '#e9ecef',
      borderColor: '#4da6ff'
    },
    hwTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '8px'
    },
    hwUsage: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '5px'
    },
    hwButtonsContainer: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      marginTop: '20px'
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#4da6ff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.3s ease'
    },
    buttonsContainer: {
      display: 'flex',
      gap: '15px',
      flexDirection: 'column',
      marginTop: '30px'
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
      marginBottom: '10px'
    },
    loadingContainer: {
      textAlign: 'center',
      padding: '60px'
    },
    separator: {
      margin: '20px 0',
      borderBottom: '1px solid #ccc'
    }
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.loadingContainer}>
            <LoadingSpinner size={32} />
            <p>Loading project details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Project not found</h2>
          <button style={styles.secondaryButton} onClick={handleGoBack}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Get hardware sets - handle both old format (hwSet1, hwSet2) and new format (hwSets object)
  const hardwareSets = [];
  if (project.hwSets) {
    // New format: hwSets is an object
    Object.entries(project.hwSets).forEach(([hwName, quantity]) => {
      hardwareSets.push({ name: hwName, quantity });
    });
  } else {
    // Old format: hwSet1, hwSet2 as direct properties
    if (project.hwSet1 !== undefined) {
      hardwareSets.push({ name: 'HWSet1', quantity: project.hwSet1 });
    }
    if (project.hwSet2 !== undefined) {
      hardwareSets.push({ name: 'HWSet2', quantity: project.hwSet2 });
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{project.projectName}</h1>
        <p style={styles.subtitle}>Project ID: {project.projectId}</p>

        <div style={styles.infoSection}>
          <div style={styles.infoItem}>
            <strong>Description:</strong> {project.description || 'No description provided'}
          </div>
          <div style={styles.infoItem}>
            <strong>Users:</strong> {project.users ? project.users.join(', ') : 'No users'}
          </div>
        </div>
        
        <h3 style={styles.sectionTitle}>Hardware Sets</h3>
        {hardwareSets.length === 0 ? (
          <p>No hardware sets checked out yet.</p>
        ) : (
          hardwareSets.map((hw, index) => (
            <div
              key={hw.name}
              style={styles.hwCard}
              onClick={() => handleHardwareManagement(hw.name)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = styles.hwCardHover.backgroundColor;
                e.target.style.borderColor = styles.hwCardHover.borderColor;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = styles.hwCard.backgroundColor;
                e.target.style.borderColor = styles.hwCard.border;
              }}
            >
              <div style={styles.hwTitle}>{hw.name}</div>
              <div style={styles.hwUsage}>
                Currently checked out: {hw.quantity} units
              </div>
              <div style={styles.hwUsage}>
                Click to manage this hardware set
              </div>
            </div>
          ))
        )}
        
        <div style={styles.separator}></div>
        
        <h4 style={styles.sectionTitle}>Available Hardware Sets</h4>
        <div style={styles.hwButtonsContainer}>
          <button 
            style={styles.button} 
            onClick={() => handleHardwareManagement('HWSet1')}
          >
            Manage HWSet1
          </button>
          <button 
            style={styles.button} 
            onClick={() => handleHardwareManagement('HWSet2')}
          >
            Manage HWSet2
          </button>
        </div>

        <div style={styles.buttonsContainer}>
          <button style={styles.secondaryButton} onClick={handleGoBack}>
            Back to Dashboard
          </button>
          <button style={styles.secondaryButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectDashboard;
