// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import ModulesPage from './components/ModulesPage';
import Contact from './components/Contact';
import AuthContext from './context/AuthContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Routes>
          <Route path="/" element={
            isAuthenticated ? (
              <Navigate to="/ModulesPage" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="/login" element={
            isAuthenticated ? (
              <Navigate to="/ModulesPage" replace />
            ) : (
              <Login />
            )
          } />
          <Route path="/ModulesPage" element={
            isAuthenticated ? (
              <ModulesPage />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="/contact" element={
            isAuthenticated ? (
              <Contact />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;