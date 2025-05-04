// File: DCMSAPI/routes/menu.js
const express = require('express');
const router = express.Router();
const { getMenus, createMenu, getMenusByRole } = require('../controllers/menuController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', getMenus);
router.post('/', createMenu);
router.get('/role/:roleId', authenticateToken, getMenusByRole);

module.exports = router;
