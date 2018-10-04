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

// Class methods:

Vintage.search = function(region, year) {
  if (region && year) {
    return Vintage.findAll({
      where: {
        region,
        year
      },
      order: [['quality', 'DESC']]
    });
  } else if (region) {
    return Vintage.findAll({
      where: {
        region
      },
      order: [['quality', 'DESC']]
    });
  } else if (year) {
    return Vintage.findAll({
      where: {
        year
      },
      order: [['quality', 'DESC']]
    });
  }
};

module.exports = Vintage;
