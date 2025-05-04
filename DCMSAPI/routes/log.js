// File: DCMSAPI/routes/log.js
const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');

router.post('/', (req, res) => {
  const { type, message, data, time } = req.body;
  if (type === 'error') {
    logger.error(`[${time}] ${message}`, data);
  } else {
    logger.info(`[${time}] ${message}`, data);
  }
  res.sendStatus(200);
});

module.exports = router;
