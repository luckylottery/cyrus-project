const Sequelize = require('sequelize');

module.export = new Sequelize('trade_communities', 'backend', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  host: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});