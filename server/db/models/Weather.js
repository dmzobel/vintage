const Sequelize = require('sequelize');
const db = require('../db');

const Weather = db.define('weather', {
  month: {
    type: Sequelize.DATEONLY
  },
  precip: {
    type: Sequelize.DECIMAL // rainfall in mm
  },
  temp: {
    type: Sequelize.DECIMAL // temperature in Celsius
  },
  region: {
    type: Sequelize.STRING
  }
});

module.exports = Weather;
