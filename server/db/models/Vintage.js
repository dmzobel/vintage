const Sequelize = require('sequelize');
const db = require('../db');

const Vintage = db.define('vintage', {
  year: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  region: {
    type: Sequelize.STRING
  },
  quality: {
    type: Sequelize.DECIMAL
  },
  WRain: {
    type: Sequelize.DECIMAL
  },
  HRain: {
    type: Sequelize.DECIMAL
  },
  TAvg: {
    type: Sequelize.DECIMAL
  }
});

module.exports = Vintage;
