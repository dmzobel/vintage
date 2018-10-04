const router = require('express').Router();
module.exports = router;
const { Vintage } = require('../db/models');

router.get('/vintages', async (req, res, next) => {
  // all queries return results ordered by quality rating, in descending order
  if (req.query.region || req.query.year) {
    Vintage.search(req.query.region, req.query.year)
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
