import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import ProjectManager from './projectManager';
import ProjectDashboard from './projectDashboard';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/manager/:userId" element={<ProjectManager />} />
        <Route path="/dashboard/:userId" element={<ProjectDashboard />} />
        <Route path="/hw/:userId/:projectId" element={<HomePage/>} />
      </Routes>
    </Router>
  );
}

export default App;