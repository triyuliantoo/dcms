// File: dcmsweb/src/pages/Register.jsx
import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    roleId: 2,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError('Register failed: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} /><br />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} /><br />
        <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} /><br />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} /><br />
        <select name="roleId" value={form.roleId} onChange={handleChange}>
          <option value={1}>Administrator</option>
          <option value={2}>HRD</option>
        </select><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
