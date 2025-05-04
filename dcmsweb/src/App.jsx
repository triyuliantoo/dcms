// File: dcmsweb/src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { isAuthenticated } from './utils/auth';
import Absensi from './pages/Absensi';
import Payroll from './pages/Payroll';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
      <Route
        path="/login"
        element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Register />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout><Dashboard /></MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/absensi"
        element={
          <ProtectedRoute>
            <MainLayout><Absensi /></MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/payroll"
        element={
          <ProtectedRoute>
            <MainLayout><Payroll /></MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
