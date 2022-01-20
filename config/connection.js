const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('trade_communities', 'backend', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
global.sequelize = sequelize;