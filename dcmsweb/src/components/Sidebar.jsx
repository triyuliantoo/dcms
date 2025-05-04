import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Icons from 'lucide-react';
import { getUserFromToken, logout } from '../utils/auth';
import { LogOut } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [openMenus, setOpenMenus] = useState({});

  const fetchMenus = async () => {
    try {
      const user = getUserFromToken();
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/menus/role/${user.roleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const menuList = response.data;
      setMenus(buildMenuTree(menuList));
    } catch (error) {
      console.error('Error loading menu:', error);
    }
  };

  const buildMenuTree = (flatMenus) => {
    const menuMap = {};
    const roots = [];

    flatMenus.forEach(menu => {
      menu.children = [];
      menuMap[menu.MenuID] = menu;
    });

    flatMenus.forEach(menu => {
      if (menu.ParentID) {
        if (menuMap[menu.ParentID]) {
          menuMap[menu.ParentID].children.push(menu);
        }
      } else {
        roots.push(menu);
      }
    });

    return roots;
  };

  const renderIcon = (iconName) => {
    const LucideIcon = Icons[iconName] || Icons.Circle;
    return <LucideIcon size={18} className="mr-2" />;
  };

  const handleToggle = (id) => {
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const renderMenuItems = (menuItems) => {
    return menuItems.map(item => (
      <div key={item.MenuID} className="text-sm">
        {item.children.length > 0 ? (
          <>
            <div
              className="flex items-center cursor-pointer px-4 py-2 text-white hover:bg-gray-700"
              onClick={() => handleToggle(item.MenuID)}
            >
              {renderIcon(item.Icon)}
              <span className="flex-1">{item.MenuName}</span>
              <span>{openMenus[item.MenuID] ? '-' : '+'}</span>
            </div>
            {openMenus[item.MenuID] && (
              <div className="ml-6">
                {renderMenuItems(item.children)}
              </div>
            )}
          </>
        ) : (
          <NavLink
            to={item.Path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 ${
                isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
              } text-white`
            }
          >
            {renderIcon(item.Icon)}
            {item.MenuName}
          </NavLink>
        )}
      </div>
    ));
  };

  return (
    <div className="w-64 bg-gray-900 min-h-screen flex flex-col justify-between">
      <div>
        <div className="text-white text-2xl font-bold px-6 py-4">DCMS</div>
        <nav>{renderMenuItems(menus)}</nav>
      </div>
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center text-white hover:bg-red-600 px-4 py-2 rounded w-full"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
