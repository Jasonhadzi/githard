import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProjectManager() {
  const { userId } = useParams();
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [joinProjectId, setJoinProjectId] = useState('');
  const navigate = useNavigate();

  const handleCreateProject = () => {
    if (projectName && projectDescription && projectId) {
      navigate(`/dashboard/${userId}/${projectId}`);
    } else {
      alert('Please fill all project details');
    }
  };

  const handleJoinProject = () => {
    if (joinProjectId) {
      navigate(`/dashboard/${userId}/${joinProjectId}`);
    } else {
      alert('Please enter a Project ID');
    }
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
        <h2>Welcome, {userId} !</h2>

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
        <button onClick={handleCreateProject} style={styles.button}>Create Project</button>

        <div style={styles.separator}></div>

        <h3>Use Existing Project</h3>
        <input
          type="text"
          placeholder="Project ID"
          value={joinProjectId}
          onChange={(e) => setJoinProjectId(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleJoinProject} style={styles.button}>Access Project</button>
      </div>
    </div>
  );
}

export default ProjectManager;