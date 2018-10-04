const router = require('express').Router();
module.exports = router;
const { Vintage } = require('../db/models');

router.get('/vintages', async (req, res, next) => {
  // all queries return results ordered by quality rating, in descending order
  if (req.query.year && req.query.region) {
    Vintage.findAll({
      where: {
        year: req.query.year,
        region: req.query.region
      },
      order: [['quality', 'DESC']]
    })
      .then(queryResult => res.json(queryResult))
      .catch(err => console.error(err));
  } else if (req.query.year) {
    Vintage.findAll({
      where: {
        year: req.query.year
      },
      order: [['quality', 'DESC']]
    })
      .then(queryResult => res.json(queryResult))
      .catch(err => console.error(err));
  } else if (req.query.region) {
    Vintage.findAll({
      where: {
        region: req.query.region
      },
      order: [['quality', 'DESC']]
    })
      .then(queryResult => res.json(queryResult))
      .catch(err => console.error(err));
  } else {
    Vintage.findAll({
      order: [['quality', 'DESC']]
    })
      .then(allVintages => res.json(allVintages))
      .catch(err => console.error(err));
  }
});
