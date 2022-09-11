const { Router } = require('express');

const countries_router = Router();

countries_router.get('/', (req, res) => {
    const countryName = req.query.name;
    if (countryName) {
        res.send('El país es: ' + countryName);
    }
    res.send('Hello from countries');
});

countries_router.get('/:countryId', (req, res) => {
    res.send(`Hello from ${req.params.countryId}`);
});



module.exports = countries_router;
