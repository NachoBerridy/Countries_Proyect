const { Router } = require('express');
const express = require('express');
const { countries_router } = require('./countries.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const app = express();

 const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//app.use('/countries', countries_router);


module.exports = router;
