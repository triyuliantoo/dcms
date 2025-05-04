// File: src/utils/auth.js
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      userId: payload.userId,
      roleId: payload.roleId,
    };
  } catch (e) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};
