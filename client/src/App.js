import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import ProjectManager from './projectManager';
import ProjectDashboard from './projectDashboard';
import './index.css';

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/manager/:userId" element={<ProjectManager />} />
          <Route path="/dashboard/:userId/:projectId" element={<ProjectDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
