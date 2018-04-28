const Sequelize = require('sequelize');
const db = require('../db');

const Vintage = db.define('vintage', {
  vintage: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  region: {
    type: Sequelize.STRING
  },
  quality: {
    type: Sequelize.INTEGER
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
