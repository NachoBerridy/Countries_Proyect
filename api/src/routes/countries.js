const { Router } = require('express');
const { getCountries } = require('../controllers/countries.controllers.js');
const countries_router = Router();

countries_router.get('/', getCountries);
countries_router.get('/:countryId', (req, res) => {
    res.send(`Hello from ${req.params.countryId}`);
});



module.exports = countries_router;
