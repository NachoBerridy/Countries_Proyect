const { Router } = require('express');
const express = require('express');
const { getCountries } = require('../controllers/countries.controllers.js');
//const countries_router = Router();

//countries_router.get('/', getCountries);

//const app = express();

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', getCountries);


module.exports = router;
