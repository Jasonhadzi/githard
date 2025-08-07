import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function ProjectManager() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [existingProjectId, setExistingProjectId] = useState('');
  const [isCreateProjectLoading, setIsCreateProjectLoading] = useState(false);
  const [isJoinProjectLoading, setIsJoinProjectLoading] = useState(false);
 
  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(`/dashboard/${userId}`);
  };
  const handleCreateProject = () => {
    if (projectName && projectDescription && projectId) {
      setIsCreateProjectLoading(true);
      fetch('/create_project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            userId, 
            projectName, 
            description: projectDescription,
            projectId })
      })
        .then(async res => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);
          localStorage.setItem('projectId', projectId);
          navigate(`/project/${userId}/${encodeURIComponent(projectId)}`);;
        })
        .catch(err => {
          alert(err.message); // shows error from backend (e.g., wrong password)
        })
        .finally(() => {
          setIsCreateProjectLoading(false);
        });
     
    } else {
      alert('Please fill in all fields to create a project.');
    }
  };

  const handleAccessProject = () => {
    if (existingProjectId) {
      setIsJoinProjectLoading(true);
      fetch('/join_project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            userId, 
            projectId: existingProjectId})
      })
        .then(async res => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);
          localStorage.setItem('projectId', existingProjectId);
          navigate(`/project/${userId}/${encodeURIComponent(existingProjectId)}`);
        })
        .catch(err => {
          alert(err.message);
        })
        .finally(() => {
          setIsJoinProjectLoading(false);
        });    
    } else {
      alert('Please enter a Project ID to access.');
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
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
      boxSizing: 'border-box'
    },
    title: {
      marginBottom: '20px',
      color: '#333',
      fontSize: '24px'
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
      marginBottom: '15px',
      fontSize: '16px',
      transition: 'background-color 0.3s ease'
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
    separator: {
      margin: '20px 0',
      borderBottom: '1px solid #ccc'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome, {userId} !</h2>

        <h3>Create New Project</h3>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Project Description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={handleCreateProject} disabled={isCreateProjectLoading}>
          {isCreateProjectLoading ? <LoadingSpinner size={16} /> : 'Create Project'}
        </button>

        <div style={styles.separator}></div>

        <h3>Use Existing Project</h3>
        <input
          type="text"
          placeholder="Project ID"
          value={existingProjectId}
          onChange={(e) => setExistingProjectId(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={handleAccessProject} disabled={isJoinProjectLoading}>
          {isJoinProjectLoading ? <LoadingSpinner size={16} /> : 'Access Project'}
        </button>
        <div style={styles.separator}></div>
        <button style={styles.button} onClick={handleGoBack}>
          Back to Dashboard
        </button>
        <button style={styles.secondaryButton} onClick={handleLogout}>
            Logout
        </button>
      </div>
    </div>
  );
}

export default ProjectManager;
