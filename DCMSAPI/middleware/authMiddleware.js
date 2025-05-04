// File: DCMSAPI/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

exports.authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      logger.warn('Invalid token');
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};
