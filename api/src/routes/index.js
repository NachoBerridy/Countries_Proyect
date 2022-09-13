const { Router } = require('express')
const express = require('express')
const { getCountries, getCountriesByName } = require('../controllers/countries.controllers.js')
//const countries_router = Router()

//countries_router.get('/', getCountries)

//const app = express()

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter)

router.get('/countries', getCountries)/* async (req, res) =>{
    try {
        let countries = await getCountries()
        res.json(countries)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}) */

router.get('/countries/:name', getCountriesByName)

module.exports = router
