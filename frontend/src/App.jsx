import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ParentCheckin from './components/ParentCheckin';
import Login from './components/Login';
import Register from './components/Register';
import './i18n'; // Initialize i18n translations

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkin/:token" element={<ParentCheckin />} />
      </Routes>
    </Router>
  );
}
