// File: dcmsweb/src/components/Sidebar.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { getUserRoleId } from '../utils/auth';
import { logError } from '../utils/logger';

const Sidebar = () => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenus = async () => {
      const roleId = getUserRoleId();
      if (roleId) {
        try {
          const res = await api.get(`/menus/role/${roleId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setMenus(res.data);
        } catch (err) {
          logError('Failed to fetch menus', err?.response?.data || err.message);
        }
      }
    };
    fetchMenus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', borderRight: '1px solid #ccc', minHeight: '100vh' }}>
      <h3>Menu</h3>
      <ul>
        {menus.map(menu => (
          <li key={menu.MenuID} style={{ marginBottom: '10px' }}>
            <button onClick={() => navigate(menu.Path)}>{menu.MenuName}</button>
          </li>
        ))}
      </ul>
      <hr />
      <button onClick={handleLogout} style={{ marginTop: '20px', color: 'red' }}>Logout</button>
    </div>
  );
};

export default Sidebar;
