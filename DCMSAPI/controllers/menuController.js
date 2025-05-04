// File: DCMSAPI/controllers/menuController.js
const db = require('../models/db.js');
const logger = require('../utils/logger');

exports.getMenus = async (req, res) => {
  try {
    const [menus] = await db.query('SELECT * FROM Tbl_Menu ORDER BY SortOrder');
    res.json(menus);
  } catch (error) {
    logger.error('Error fetching all menus:', error);
    res.status(500).json({ message: 'Failed to fetch menus' });
  }
};

exports.createMenu = async (req, res) => {
  const { MenuName, Path, Icon, ParentID, IsActive, SortOrder } = req.body;
  try {
    await db.query(
      `INSERT INTO Tbl_Menu (MenuName, Path, Icon, ParentID, IsActive, SortOrder)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [MenuName, Path, Icon, ParentID, IsActive, SortOrder]
    );
    logger.info(`Menu created: ${MenuName}`);
    res.status(201).json({ message: 'Menu created successfully' });
  } catch (error) {
    logger.error('Error creating menu:', error);
    res.status(500).json({ message: 'Failed to create menu' });
  }
};

exports.getMenusByRole = async (req, res) => {
  const { roleId } = req.params;
  try {
    const [menus] = await db.query(`
      SELECT m.MenuID, m.MenuName, m.Path, m.Icon, m.ParentID
      FROM Tbl_Menu m
      JOIN Tbl_RoleMenu rm ON m.MenuID = rm.MenuID
      WHERE rm.RoleID = ? AND m.IsActive = 1
      ORDER BY m.SortOrder
    `, [roleId]);

    res.json(menus);
  } catch (error) {
    logger.error(`Error fetching menus for role ${roleId}:`, error);
    res.status(500).json({ message: 'Failed to fetch menus for role' });
  }
};
