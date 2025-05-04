// File: DCMSAPI/controllers/menuController.js
const db = require('../models/db');
const logger = require('../utils/logger');

exports.getMenus = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Tbl_Menu');
    res.json(rows);
  } catch (err) {
    logger.error(`getMenus failed: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

exports.createMenu = async (req, res) => {
  const { menuName, path, icon, parentId, isActive, sortOrder } = req.body;
  try {
    await db.execute(
      'INSERT INTO Tbl_Menu (MenuName, Path, Icon, ParentID, IsActive, SortOrder) VALUES (?, ?, ?, ?, ?, ?)',
      [menuName, path, icon, parentId, isActive, sortOrder]
    );
    logger.info(`Menu created: ${menuName}`);
    res.json({ message: 'Menu created' });
  } catch (err) {
    logger.error(`createMenu failed: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

exports.getMenusByRole = async (req, res) => {
  const { roleId } = req.params;
  try {
    const [rows] = await db.execute(
      `SELECT m.* FROM Tbl_Menu m
       JOIN Tbl_RoleMenu rm ON m.MenuID = rm.MenuID
       WHERE rm.RoleID = ? AND m.IsActive = 1`,
      [roleId]
    );
    logger.info(`Menus fetched for role ${roleId}`);
    res.json(rows);
  } catch (err) {
    logger.error(`getMenusByRole failed for role ${roleId}: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};
