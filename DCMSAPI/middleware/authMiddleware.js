// File: DCMSAPI/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const tokenBlacklist = new Set();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ message: 'Token has been invalidated (logged out).' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function logoutToken(token) {
  tokenBlacklist.add(token);
}

module.exports = {
  authenticateToken,
  logoutToken
};
