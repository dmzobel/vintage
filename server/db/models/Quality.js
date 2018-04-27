const Sequelize = require('sequelize');
const db = require('../db');

const Quality = db.define('quality', {
  vintage: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  region: {
    type: Sequelize.STRING
  },
  quality: {
    type: Sequelize.INTEGER
  }
});

module.exports = Quality;
