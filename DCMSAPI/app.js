// File: DCMSAPI/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const logger = require('./utils/logger');

// Middleware: log every request
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

const authRoutes = require('./routes/auth');
const roleRoutes = require('./routes/role');
const menuRoutes = require('./routes/menu');
const logRoutes = require('./routes/log');

app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/logs', logRoutes);

app.listen(process.env.PORT, () => logger.info(`DCMSAPI running on port ${process.env.PORT}`));
