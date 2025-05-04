// File: DCMSAPI/controllers/authController.js
const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { logoutToken } = require('../middleware/authMiddleware');
const logger = require('../utils/logger');

exports.register = async (req, res) => {
  const { username, password, fullName, email, roleId } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await db.execute(
      'INSERT INTO Tbl_User (Username, PasswordHash, FullName, Email, RoleID) VALUES (?, ?, ?, ?, ?)',
      [username, hash, fullName, email, roleId]
    );
    logger.info(`User registered: ${username}`);
    res.json({ message: 'User registered' });
  } catch (err) {
    logger.error(`Register failed for ${username}: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.execute('SELECT * FROM Tbl_User WHERE Username = ?', [username]);
    const user = rows[0];
    if (user && await bcrypt.compare(password, user.PasswordHash)) {
      const token = jwt.sign({ userId: user.UserID, roleId: user.RoleID }, process.env.JWT_SECRET);
      logger.info(`User login successful: ${username}`);
      res.json({ token });
    } else {
      logger.warn(`Login failed: Invalid credentials for ${username}`);
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    logger.error(`Login error for ${username}: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

exports.logout = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token) {
    logoutToken(token);
    logger.info('User logged out via token');
    res.json({ message: 'Logout successful' });
  } else {
    logger.warn('Logout attempt without token');
    res.status(400).json({ message: 'No token provided' });
  }
};
