// File: DCMSAPI/controllers/roleController.js
const db = require('../models/db');
const logger = require('../utils/logger');

exports.getRoles = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Tbl_Role');
    logger.info(`Roles fetched: ${rows.length} items`);
    res.json(rows);
  } catch (err) {
    logger.error(`getRoles failed: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

exports.createRole = async (req, res) => {
  const { roleName, description } = req.body;
  try {
    await db.execute(
      'INSERT INTO Tbl_Role (RoleName, Description) VALUES (?, ?)',
      [roleName, description]
    );
    logger.info(`Role created: ${roleName}`);
    res.json({ message: 'Role created' });
  } catch (err) {
    logger.error(`createRole failed: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};
