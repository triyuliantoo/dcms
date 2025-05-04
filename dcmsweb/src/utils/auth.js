// File: dcmsweb/src/utils/auth.js
export function isAuthenticated() {
  const token = localStorage.getItem('token');
  return !!token;
}

export function getUserRoleId() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roleId;
  } catch {
    return null;
  }
}
