import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import ProjectManager from './projectManager';
import ProjectDashboard from './projectDashboard';
import HomePage from './HomePage';
import UserDashboard from './UserDashboard';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard/:userId" element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/create-project/:userId" element={
          <ProtectedRoute>
            <ProjectManager />
          </ProtectedRoute>
        } />
        <Route path="/project/:userId/:projectId" element={
          <ProtectedRoute>
            <ProjectDashboard />
          </ProtectedRoute>
        } />
        <Route path="/hw/:userId/:projectId/:hwSetName" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;