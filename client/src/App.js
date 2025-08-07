import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import ProjectManager from './projectManager';
import ProjectDashboard from './projectDashboard';
import HomePage from './HomePage';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/manager/:userId" element={
          <ProtectedRoute>
            <ProjectManager />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/:userId" element={
          <ProtectedRoute>
            <ProjectDashboard />
          </ProtectedRoute>
        } />
        <Route path="/hw/:userId/:projectId" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;