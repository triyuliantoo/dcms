// File: dcmsweb/src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { isAuthenticated } from './utils/auth';

import Dashboard from './pages/Dashboard';
import Attendance from './pages/attendance/Attendance';
import LeaveRequests from './pages/leave/LeaveRequests';
import Payroll from './pages/payroll/Payroll';
import SalarySlip from './pages/payroll/SalarySlip';
import EmployeeList from './pages/employees/EmployeeList';
import PerformanceReview from './pages/performance/PerformanceReview';
import UserManagement from './pages/admin/UserManagement';
import RoleAccessControl from './pages/admin/RoleAccessControl';
import ParameterConfig from './pages/settings/ParameterConfig';
import TaskScheduler from './pages/settings/TaskScheduler';
import AuditLogs from './pages/settings/AuditLogs';
import NotFound from './pages/errors/NotFound';
import Forbidden from './pages/errors/Forbidden';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
      <Route path="/login" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Register />} />

      <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute><MainLayout><Attendance /></MainLayout></ProtectedRoute>} />
      <Route path="/leave" element={<ProtectedRoute><MainLayout><LeaveRequests /></MainLayout></ProtectedRoute>} />
      <Route path="/payroll" element={<ProtectedRoute><MainLayout><Payroll /></MainLayout></ProtectedRoute>} />
      <Route path="/salary-slip" element={<ProtectedRoute><MainLayout><SalarySlip /></MainLayout></ProtectedRoute>} />
      <Route path="/employees" element={<ProtectedRoute><MainLayout><EmployeeList /></MainLayout></ProtectedRoute>} />
      <Route path="/performance-review" element={<ProtectedRoute><MainLayout><PerformanceReview /></MainLayout></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><MainLayout><UserManagement /></MainLayout></ProtectedRoute>} />
      <Route path="/admin/roles" element={<ProtectedRoute><MainLayout><RoleAccessControl /></MainLayout></ProtectedRoute>} />
      <Route path="/settings/parameters" element={<ProtectedRoute><MainLayout><ParameterConfig /></MainLayout></ProtectedRoute>} />
      <Route path="/settings/scheduler" element={<ProtectedRoute><MainLayout><TaskScheduler /></MainLayout></ProtectedRoute>} />
      <Route path="/settings/audit-logs" element={<ProtectedRoute><MainLayout><AuditLogs /></MainLayout></ProtectedRoute>} />
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
