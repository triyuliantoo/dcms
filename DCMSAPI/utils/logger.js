// File: DCMSAPI/utils/logger.js
const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');

const logDir = path.join(__dirname, '..', 'logs');

const transport = new winston.transports.DailyRotateFile({
  filename: 'dcms-%DATE%.log',
  dirname: logDir,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '10m',
  maxFiles: '14d'
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
  ),
  transports: [
    transport,
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

module.exports = logger;
