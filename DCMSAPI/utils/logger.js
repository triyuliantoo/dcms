// File: DCMSAPI/utils/logger.js
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../logs', `dcms-${new Date().toISOString().split('T')[0]}.log`);

const log = (level, message) => {
  const timestamp = new Date().toISOString();
  const entry = `[${level.toUpperCase()}] ${timestamp}: ${message}`;
  console.log(entry);
  fs.appendFileSync(logFile, entry + '\n');
};

module.exports = {
  info: (msg) => log('info', msg),
  warn: (msg) => log('warn', msg),
  error: (msg) => log('error', msg)
};
